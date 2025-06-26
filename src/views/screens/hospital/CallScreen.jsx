// CallScreen.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, mediaDevices } from 'react-native-webrtc';
import io from 'socket.io-client';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

import { BASE_URL, SOCKET_PORT, UPLOAD_PORT } from '../../../config/config';

// --- 서버 및 업로드 설정 (실제 IP 주소로 변경하세요!) ---
const SERVER_URL = `${BASE_URL}:${SOCKET_PORT}`;
const UPLOAD_URL = `${BASE_URL}:${UPLOAD_PORT}/upload-audio`;
// ----------------------------------------------------

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

const CallScreen = () => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [callStatus, setCallStatus] = useState('idle');
    const [myUserId, setMyUserId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [remoteUserId, setRemoteUserId] = useState('');

    const peerConnectionRef = useRef(null);
    const socketRef = useRef(null);
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
    const [isRecording, setIsRecording] = useState(false);
    const [recordedFilePath, setRecordedFilePath] = useState('');

    // --- UI 로그 ---
    const logRef = useRef([]);
    const [logs, setLogs] = useState([]);

    const addLog = useCallback((message) => {
        const timestamp = new Date().toLocaleTimeString();
        logRef.current.push(`[${timestamp}] ${message}`);
        if (logRef.current.length > 100) {
            logRef.current = logRef.current.slice(-100);
        }
        setLogs([...logRef.current]);
    }, []);

    // --- 권한 요청 ---
    const requestPermissions = useCallback(async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);
                const cameraGranted = granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED;
                const audioGranted = granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED;
                const storageGranted = Platform.Version >= 29 || granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;

                if (cameraGranted && audioGranted && storageGranted) {
                    addLog('[권한] 카메라, 마이크, 저장소 권한 허용됨.');
                    return true;
                } else {
                    addLog('[권한] 필요한 권한이 거부되었습니다.');
                    Alert.alert('권한 오류', '통화를 위해 마이크 및 저장소 권한이 필요합니다.');
                    return false;
                }
            } catch (err) {
                console.warn(err);
                addLog(`[권한 오류]: ${err.message}`);
                return false;
            }
        }
        return true;
    }, [addLog]);

    // --- 녹음 파일 백엔드 업로드 ---
    const uploadAudioFile = useCallback(async (filePath, userId, roomId) => {
        addLog(`[업로드] 녹음 파일 업로드 시작: ${filePath}`);
        try {
            const fileName = filePath.split('/').pop();
            const fileType = Platform.select({
                ios: 'audio/m4a',
                android: 'audio/mp4',
            });

            const response = await RNFS.uploadFiles({
                toUrl: UPLOAD_URL,
                files: [{
                    name: 'audio',
                    filename: fileName,
                    filepath: filePath,
                    filetype: fileType,
                }],
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                fields: {
                    userId: userId,
                    roomId: roomId,
                    callType: 'voice',
                },
            }).promise;

            addLog(`[업로드] 응답 상태: ${response.statusCode}`);
            addLog(`[업로드] 응답 본문: ${response.body}`);

            if (response.statusCode === 200 || response.statusCode === 201) {
                addLog('[업로드] 녹음 파일 업로드 성공!');
                Alert.alert('업로드 성공', '녹음 파일이 백엔드에 성공적으로 업로드되었습니다.');
            } else {
                addLog(`[업로드 오류] 녹음 파일 업로드 실패: ${response.statusCode} - ${response.body}`);
                Alert.alert('업로드 실패', `녹음 파일 업로드 중 오류가 발생했습니다: ${response.statusCode}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            addLog(`[업로드 오류] 파일 업로드 중 예상치 못한 오류: ${error.message}`);
            Alert.alert('업로드 오류', `파일 업로드 중 오류가 발생했습니다: ${error.message}`);
        }
    }, [addLog]);

    // --- 녹음 중지 ---
    const stopRecording = useCallback(async (upload = false) => {
        if (!isRecording) {
            addLog('[녹음] 녹음 중이 아닙니다.');
            return;
        }
        addLog('[녹음] 녹음 중지 중...');
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            addLog(`[녹음] 녹음 중지됨: ${result}`);
            setRecordedFilePath(result);
            setIsRecording(false);
            addLog(`[녹음] 녹음 파일 경로: ${result}`);
            Alert.alert('녹음 완료', `통화 녹음이 완료되었습니다.\n경로: ${result}`);
            
            if (upload) {
                await uploadAudioFile(result, myUserId, roomId);
            }
        } catch (error) {
            console.error('Failed to stop recording:', error);
            addLog(`[녹음 오류] 녹음 중지 실패: ${error.message}`);
        }
    }, [isRecording, audioRecorderPlayer, addLog, uploadAudioFile, myUserId, roomId]);

    // --- 통화 종료 ---
    const hangUp = useCallback(() => {
        addLog('[통화] 통화 종료 요청...');
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream.release();
            setLocalStream(null);
        }
        setRemoteStream(null);
        setCallStatus('idle');
        setRemoteUserId('');
        stopRecording(true); // 통화 종료 시 녹음 중지 및 업로드 시도

        if (socketRef.current && remoteUserId) {
            socketRef.current.emit('callEnd', { toUserId: remoteUserId, roomId: roomId });
        }
        addLog('[통화] 통화 종료 완료.');
    }, [addLog, localStream, remoteUserId, roomId, stopRecording]);

    // --- 로컬 미디어 스트림 시작 ---
    const startLocalStream = useCallback(async () => {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) { return null; }
        try {
            const stream = await mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            setLocalStream(stream);
            addLog('[미디어] 로컬 오디오 스트림 시작됨.');
            return stream;
        } catch (error) {
            console.error('Error getting user media:', error);
            addLog(`[미디어 오류] 로컬 스트림 가져오기 실패: ${error.message}`);
            return null;
        }
    }, [requestPermissions, addLog]);

    // --- 녹음 시작 ---
    const startRecording = useCallback(async () => {
        addLog('[녹음] 녹음 시작 중...');
        const path = Platform.select({
            ios: 'recorded_call.m4a',
            android: `${RNFS.DocumentDirectoryPath}/recorded_call_${new Date().getTime()}.mp4`,
        });
        try {
            const result = await audioRecorderPlayer.startRecorder(path);
            addLog(`[녹음] 녹음 시작됨: ${result}`);
            setIsRecording(true);
        } catch (error) {
            console.error('Failed to start recording:', error);
            addLog(`[녹음 오류] 녹음 시작 실패: ${error.message}`);
            setIsRecording(false);
        }
    }, [audioRecorderPlayer, addLog]);

    // --- PeerConnection 생성 ---
    const createPeerConnection = useCallback(async (stream) => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        const pc = new RTCPeerConnection(configuration);

        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        addLog('[WebRTC] PeerConnection 생성됨.');

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                addLog('[WebRTC] ICE Candidate 생성됨. 전송 중...');
                socketRef.current.emit('iceCandidate', {
                    toUserId: remoteUserId,
                    candidate: event.candidate.toJSON(),
                    roomId: roomId,
                });
            }
        };

        pc.ontrack = (event) => {
            addLog('[WebRTC] 원격 트랙 수신됨.');
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        pc.oniceconnectionstatechange = () => {
            addLog(`[WebRTC] ICE 연결 상태: ${pc.iceConnectionState}`);
            if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'closed' || pc.iceConnectionState === 'failed') {
                addLog('[WebRTC] ICE 연결이 끊어졌습니다. 통화 종료...');
            }
        };

        pc.onconnectionstatechange = () => {
            addLog(`[WebRTC] 연결 상태: ${pc.connectionState}`);
            if (pc.connectionState === 'connected') {
                addLog('[WebRTC] 통화 연결 성공!');
                setCallStatus('connected');
                startRecording();
            } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
                addLog('[WebRTC] 통화 연결 실패 또는 끊어짐.');
                hangUp();
            }
        };

        peerConnectionRef.current = pc;
        return pc;
    }, [addLog, remoteUserId, roomId, startRecording, hangUp]);

    // --- 통화 응답 (Answer 생성) ---
    const answerCall = useCallback(async () => {
        if (!peerConnectionRef.current || !localStream) {
            addLog('[통화 오류] PeerConnection 또는 로컬 스트림이 준비되지 않았습니다.');
            return;
        }

        setCallStatus('calling');
        addLog('[통화] 통화 응답 중...');

        try {
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            addLog('[WebRTC] Answer 생성 및 로컬 설정 완료. 전송 중...');

            socketRef.current.emit('answer', {
                toUserId: remoteUserId,
                // 오류 수정: answer.toJSON() 대신 type과 sdp 속성을 명시적으로 전송
                answer: { type: answer.type, sdp: answer.sdp }, 
                roomId: roomId,
            });
        } catch (error) {
            console.error('Error creating answer:', error);
            addLog(`[WebRTC 오류] Answer 생성 실패: ${error.message}`);
            setCallStatus('idle');
        }
    }, [addLog, localStream, remoteUserId, roomId]);

    // --- 통화 시작 (Offer 생성) ---
    const startCall = useCallback(async () => {
        if (callStatus === 'connecting' || callStatus === 'calling' || callStatus === 'connected') {
            addLog('[통화] 이미 통화 중이거나 연결 시도 중입니다.');
            return;
        }

        setCallStatus('connecting');
        addLog('[통화] 통화 시작 중...');

        const stream = await startLocalStream();
        if (!stream) {
            setCallStatus('idle');
            return;
        }

        const pc = await createPeerConnection(stream);
        if (!pc) {
            setCallStatus('idle');
            return;
        }

        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            addLog('[WebRTC] Offer 생성 및 로컬 설정 완료. 전송 중...');

            socketRef.current.emit('offer', {
                toUserId: remoteUserId,
                // 오류 수정: offer.toJSON() 대신 type과 sdp 속성을 명시적으로 전송
                offer: { type: offer.type, sdp: offer.sdp },
                roomId: roomId,
            });
        } catch (error) {
            console.error('Error creating offer:', error);
            addLog(`[WebRTC 오류] Offer 생성 실패: ${error.message}`);
            setCallStatus('idle');
        }
    }, [callStatus, addLog, startLocalStream, createPeerConnection, remoteUserId, roomId]);

    // --- useEffect: 초기 설정 및 소켓 이벤트 리스너 --- (최종 의존성 업데이트)
    useEffect(() => {
        socketRef.current = io(SERVER_URL, { transports: ['websocket'] });

        socketRef.current.on('connect', () => {
            console.log('Socket connected:', socketRef.current.id);
            addLog(`[소켓] 연결됨: ${socketRef.current.id}`);
            setCallStatus('registering');
        });

        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
            addLog('[소켓] 연결 해제됨');
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
                peerConnectionRef.current = null;
            }
            if (localStream) {
                localStream.release();
                setLocalStream(null);
            }
            setRemoteStream(null);
            setCallStatus('idle');
            stopRecording(false); 
        });

        socketRef.current.on('roomFull', () => {
            addLog('[방] 방이 가득 찼습니다.');
            Alert.alert('알림', '방이 가득 찼습니다. 다른 방을 시도해주세요.');
            setCallStatus('idle');
        });

        socketRef.current.on('waitingForOpponent', () => {
            addLog('[방] 상대방 기다리는 중...');
            setCallStatus('waiting');
        });

        socketRef.current.on('readyForCall', async (data) => {
            addLog(`[통화] 통화 준비 완료! 상대방 ID: ${data.callerId}`);
            setRemoteUserId(data.callerId);
            setCallStatus('ready');

            if (myUserId === data.callerId) {
                await startCall();
            } else {
                addLog('상대방의 전화를 기다리는 중...');
            }
        });

        socketRef.current.on('offer', async (data) => {
            addLog(`[시그널링] Offer 수신 from ${data.fromUserId}`);
            setCallStatus('ringing');
            setRemoteUserId(data.fromUserId);

            if (!localStream) {
                const stream = await startLocalStream();
                if (!stream) {
                    Alert.alert('오류', '마이크 권한이 없거나 스트림을 가져올 수 없습니다.');
                    setCallStatus('idle');
                    return;
                }
            }

            if (!peerConnectionRef.current) {
                await createPeerConnection(localStream);
            }

            try {
                // 수신된 offer 데이터가 이미 { type: ..., sdp: ... } 형태일 것이므로 그대로 사용
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                addLog('[WebRTC] 원격 Offer 설정 완료.');
                await answerCall();
            } catch (error) {
                console.error('Error handling offer:', error);
                addLog(`[WebRTC 오류] Offer 처리 중 오류: ${error.message}`);
            }
        });

        socketRef.current.on('answer', async (data) => {
            addLog(`[시그널링] Answer 수신 from ${data.fromUserId}`);
            try {
                // 수신된 answer 데이터가 이미 { type: ..., sdp: ... } 형태일 것이므로 그대로 사용
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
                addLog('[WebRTC] 원격 Answer 설정 완료. 통화 연결 시도 중...');
                setCallStatus('connected');
            } catch (error) {
                console.error('Error handling answer:', error);
                addLog(`[WebRTC 오류] Answer 처리 중 오류: ${error.message}`);
            }
        });

        socketRef.current.on('iceCandidate', async (data) => {
            addLog(`[시그널링] ICE Candidate 수신 from ${data.fromUserId}`);
            if (peerConnectionRef.current && data.candidate) {
                try {
                    // 수신된 candidate 데이터가 이미 { candidate: ..., sdpMid: ..., sdpMLineIndex: ... } 형태일 것이므로 그대로 사용
                    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                    addLog('[WebRTC] ICE Candidate 추가 완료.');
                } catch (error) {
                    console.error('Error adding ICE candidate:', error);
                    addLog(`[WebRTC 오류] ICE Candidate 추가 중 오류: ${error.message}`);
                }
            }
        });

        socketRef.current.on('callEnd', () => {
            addLog('[통화] 상대방이 통화를 종료했습니다.');
            hangUp();
        });

        socketRef.current.on('opponentDisconnected', (data) => {
            addLog(`[통화] 상대방 ${data.disconnectedUserId}가 연결을 해제했습니다.`);
            hangUp();
        });

        audioRecorderPlayer.addRecordBackListener((e) => {
            // console.log('Record Callback:', e.currentPosition);
        });

        return () => {
            if (localStream) {
                localStream.release();
                setLocalStream(null);
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
                peerConnectionRef.current = null;
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            audioRecorderPlayer.removeRecordBackListener();
            stopRecording(false); 
        };
    }, [
        localStream,
        isRecording,
        myUserId,
        addLog,
        answerCall,
        createPeerConnection,
        hangUp,
        startCall,
        startLocalStream,
        stopRecording,
        audioRecorderPlayer
    ]);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, alignItems: 'center' }}>
                <Text>RN WebRTC 음성 통화</Text>

                <View>
                    <Text>내 사용자 ID:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{myUserId || 'ID를 입력하거나 생성하세요'}</Text>
                        <Button title="ID 생성" onPress={() => {
                            const newId = `RNUser_${Math.floor(Math.random() * 10000)}`;
                            setMyUserId(newId);
                            addLog(`내 ID: ${newId}`);
                        }} />
                    </View>
                </View>

                <View>
                    <Text>방 ID:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{roomId || '방 ID를 입력하거나 생성하세요'}</Text>
                        <Button title="방 생성" onPress={() => {
                            const newRoomId = `Room_${Math.floor(Math.random() * 10000)}`;
                            setRoomId(newRoomId);
                            addLog(`방 ID: ${newRoomId}`);
                        }} />
                    </View>
                </View>

                <View>
                    {myUserId && roomId && callStatus === 'registering' && (
                        <Button
                            title="사용자 등록 & 방 참여"
                            onPress={() => {
                                socketRef.current.emit('register', myUserId);
                                addLog(`[소켓] 사용자 ${myUserId} 등록 요청.`);
                                socketRef.current.emit('joinRoom', { roomId: roomId, userId: myUserId });
                                addLog(`[소켓] 방 ${roomId} 참여 요청.`);
                                setCallStatus('joining');
                            }}
                        />
                    )}
                    {callStatus === 'ready' && (
                        <Button title={`통화 시작 (상대: ${remoteUserId})`} onPress={startCall} />
                    )}
                    {(callStatus === 'connecting' || callStatus === 'calling' || callStatus === 'connected' || callStatus === 'ringing') && (
                        <Button title="통화 종료" onPress={hangUp} color="red" />
                    )}
                </View>

                <Text>통화 상태: {callStatus}</Text>
                {isRecording && <Text>녹음 중...</Text>}
                {recordedFilePath ? <Text>녹음 파일: {recordedFilePath.split('/').pop()}</Text> : null}

                <View>
                    <Text>로그:</Text>
                    <Button title="로그 지우기" onPress={() => { logRef.current = []; setLogs([]); }} />
                    <ScrollView style={{ height: 200, borderWidth: 1 }}>
                        {logs.map((log, index) => (
                            <Text key={index}>{log}</Text>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CallScreen;