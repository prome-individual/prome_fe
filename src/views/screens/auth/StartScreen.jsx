import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';

const Container = styled.View`
    flex: 1;
    background-color: #000;
    justify-content: center;
    align-items: center;
`;

const VideoContainer = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const StartScreen = ({ onFinish }) => {
    const [videoEnded, setVideoEnded] = useState(false);

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => {
            onFinish();
        }, 500); // 0.5초 후 메인 화면으로 전환
    };

    return (
        <Container>
            <VideoContainer>
                <Video
                    source={require('../../../assets/prome_start.mp4')}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    resizeMode="cover"
                    onEnd={handleVideoEnd}
                    repeat={false}
                    paused={false}
                    volume={1.0}
                    muted={false}
                />
            </VideoContainer>
        </Container>
    );
};

export default StartScreen;
