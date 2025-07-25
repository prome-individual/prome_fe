import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Alert, PermissionsAndroid, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { NaverMapView, NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Geolocation from '@react-native-community/geolocation';
import Colors from '../../styles/Colors';
import Back from '../../common/Back';
import useHospitals from '../../hooks/useHospitals';

const SafeView = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`;

const Container = styled.View`
    flex: 1;
    margin-top: -10px;
`;

const MapContainer = styled.View`
    flex: 1;
    margin: 10px;
    border-radius: 12px;
    overflow: hidden;
`;

const LocationButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: white;
    justify-content: center;
    align-items: center;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
`;

const LocationIcon = styled.Text`
    color: ${Colors.primary};
    font-size: 20px;
    font-weight: bold;
`;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled.Text`
    font-size: 16px;
    color: ${Colors.primary};
`;

const BackWrapper = styled.View`
    top: 10px;
    left: 10px;
    z-index: 1000;
`;

const MapScreen = ({ navigation, route }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mapKey, setMapKey] = useState(0);
    const [nearbyHospitals, setNearbyHospitals] = useState([]);
    const [currentCamera, setCurrentCamera] = useState(null); // 현재 카메라 위치

    // route params에서 병원 타입 확인
    const { hospitalType = '모든 병원' } = route?.params || {};

    // Custom hook으로 병원 데이터 가져오기
    const { hospitals, isLoading: hospitalLoading, error, filterNearbyHospitals } = useHospitals();

    // filterNearbyHospitals 함수를 ref로 저장해서 안정화
    const filterNearbyHospitalsRef = useRef(filterNearbyHospitals);
    filterNearbyHospitalsRef.current = filterNearbyHospitals;

    // 화면 범위 내 병원 필터링 (카메라 이동 시)
    const updateHospitalsInView = useCallback((cameraInfo) => {
        if (hospitals.length > 0 && cameraInfo) {
            const { latitude, longitude, zoom } = cameraInfo;
            
            // 줌 레벨에 따른 반경 계산 (줌이 높을수록 작은 범위)
            const getRadiusFromZoom = (zoomLevel) => {
                // 줌 레벨에 따라 반경을 동적으로 계산
                // 줌 10: ~50km, 줌 15: ~5km, 줌 18: ~1km
                return Math.max(1, 100 / Math.pow(2, zoomLevel - 8));
            };
            
            const radius = getRadiusFromZoom(zoom);
            console.log(`줌 레벨 ${zoom}, 반경 ${radius.toFixed(1)}km`);
            
            const filtered = filterNearbyHospitalsRef.current(latitude, longitude, radius);
            
            // 병원 타입 필터링 (심전도 병원인 경우)
            let finalHospitals = filtered;
            if (hospitalType === '심전도 병원') {
                finalHospitals = filtered.filter(hospital => 
                    hospital.department && (
                        hospital.department.includes('심장') ||
                        hospital.department.includes('순환기') ||
                        hospital.department.includes('심전도') ||
                        hospital.department.includes('내과') ||
                        hospital.type === 'ecg'
                    )
                );
            }
            
            console.log(`화면 범위 내 병원 ${finalHospitals.length}개 필터링됨`);
            setNearbyHospitals(finalHospitals);
        }
    }, [hospitals, hospitalType]);

    // 현재 위치가 설정되었을 때 초기 병원 로드
    useEffect(() => {
        if (currentLocation && hospitals.length > 0) {
            const initialCamera = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                zoom: 15
            };
            setCurrentCamera(initialCamera);
            updateHospitalsInView(initialCamera);
        }
    }, [currentLocation, hospitals, updateHospitalsInView]);

    // 위치 권한 요청 (Android)
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: '위치 권한 요청',
                        message: '병원 찾기를 위해 현재 위치가 필요합니다.',
                        buttonNeutral: '나중에',
                        buttonNegative: '거부',
                        buttonPositive: '허용',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const getCurrentLocation = () => {
        setIsLoading(true);

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('위치 가져오기 성공:', latitude, longitude);
                setCurrentLocation({
                    latitude,
                    longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                console.error('위치 가져오기 실패:', error);

                let errorMessage = '';
                switch(error.code) {
                    case 1:
                        errorMessage = '위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.';
                        break;
                    case 2:
                        errorMessage = '위치 정보를 사용할 수 없습니다. GPS가 켜져있는지 확인해주세요.';
                        break;
                    case 3:
                        errorMessage = '위치 요청 시간이 초과되었습니다. 다시 시도해주세요.';
                        break;
                    default:
                        errorMessage = '위치를 가져올 수 없습니다.';
                }

                Alert.alert(
                    '위치 오류',
                    errorMessage + ' 기본 위치(서울)로 설정됩니다.',
                    [{ text: '확인' }]
                );

                setCurrentLocation({
                    latitude: 37.5665,
                    longitude: 126.9780,
                });
                setIsLoading(false);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    };

    const moveToCurrentLocation = () => {
        if (currentLocation) {
            setMapKey(prev => prev + 1);
            getCurrentLocation();
            // 현재 위치로 카메라 정보도 업데이트
            const newCamera = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                zoom: 15
            };
            setCurrentCamera(newCamera);
        }
    };

    useEffect(() => {
        const initLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) {
                getCurrentLocation();
            } else {
                Alert.alert(
                    '위치 권한 필요',
                    '병원 찾기를 위해 위치 권한이 필요합니다. 기본 위치로 설정됩니다.',
                    [{ text: '확인' }]
                );
                setCurrentLocation({
                    latitude: 37.5665,
                    longitude: 126.9780,
                });
                setIsLoading(false);
            }
        };

        initLocation();
    }, []);

    if (isLoading || hospitalLoading || !currentLocation) {
        return (
            <SafeView>
                <LoadingContainer>
                    <LoadingText>
                        {hospitalLoading ? '병원 데이터를 불러오는 중...' : '지도를 불러오는 중...'}
                    </LoadingText>
                </LoadingContainer>
            </SafeView>
        );
    }

    return (
        <SafeView>
            <BackWrapper>
                <Back navigation={navigation} />
            </BackWrapper>
            <Container>
                <MapContainer>
                    <NaverMapView
                        key={mapKey}
                        ref={setMapRef}
                        style={{ flex: 1 }}
                        initialCamera={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            zoom: 15,
                        }}
                        isShowLocationButton={false}
                        onInitialized={() => {
                            console.log('지도 준비 완료');
                        }}
                        onCameraChanged={(event) => {
                            const { latitude, longitude, zoom } = event;
                            const cameraInfo = { latitude, longitude, zoom };
                            setCurrentCamera(cameraInfo);
                            updateHospitalsInView(cameraInfo);
                        }}
                        onError={(e) => {
                            console.error('네이버 지도 error:', e);
                        }}
                    >
                        <NaverMapMarkerOverlay
                            latitude={currentLocation.latitude}
                            longitude={currentLocation.longitude}
                            anchor={{ x: 0.5, y: 1 }}
                            onTap={() => {
                                console.log('현재 위치 마커 클릭됨');
                            }}
                        />

                        {nearbyHospitals.map((hospital) => (
                            <NaverMapMarkerOverlay
                                key={hospital.id}
                                latitude={hospital.latitude}
                                longitude={hospital.longitude}
                                anchor={{ x: 0.5, y: 0.5 }}
                                width={12}
                                height={12}
                                onTap={() => {
                                    console.log(`${hospital.name} 클릭됨`);
                                    Alert.alert(
                                        hospital.name,
                                        `주소: ${hospital.address}\n전화: ${hospital.telephone || '정보 없음'}\n거리: ${hospital.distance ? hospital.distance.toFixed(1) + 'km' : '알 수 없음'}\n진료과목: ${hospital.department || '정보 없음'}`,
                                        [
                                            { text: '취소', style: 'cancel' },
                                            { text: '전화하기', onPress: () => {
                                                if (hospital.telephone) {
                                                    const phoneNumber = hospital.telephone.replace(/[^0-9]/g, '');
                                                    console.log(`전화하기: ${phoneNumber}`);
                                                }
                                            }},
                                        ]
                                    );
                                }}
                            >
                                <View style={{
                                    width: 6,
                                    height: 6,
                                    backgroundColor: '#FF4444',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                }}>
                                </View>
                            </NaverMapMarkerOverlay>
                        ))}
                    </NaverMapView>

                    <LocationButton onPress={moveToCurrentLocation}>
                        <LocationIcon>📍</LocationIcon>
                    </LocationButton>
                </MapContainer>
            </Container>
        </SafeView>
    );
};

export default MapScreen;
