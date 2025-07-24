import React, { useState, useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import Geolocation from '@react-native-community/geolocation';
import Colors from '../../styles/Colors';
import Back from '../../common/Back';

const SafeView = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`;

const Container = styled.View`
    flex: 1;
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
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
`;

const LocationIcon = styled.Text`
    color: white;
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

const MapScreen = ({ navigation, route }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // route params에서 병원 타입 확인 (모든 병원 vs 심전도 병원)
    const { hospitalType = '모든 병원' } = route?.params || {};

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

                // 에러 코드별 처리
                let errorMessage = '';
                switch(error.code) {
                    case 1: // PERMISSION_DENIED
                        errorMessage = '위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.';
                        break;
                    case 2: // POSITION_UNAVAILABLE
                        errorMessage = '위치 정보를 사용할 수 없습니다. GPS가 켜져있는지 확인해주세요.';
                        break;
                    case 3: // TIMEOUT
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
                enableHighAccuracy: false, // 정확도를 낮춰서 빠르게 가져오기
                timeout: 10000, // 10초로 증가
                maximumAge: 60000, // 캐시된 위치 사용 (1분)
            }
        );
    };

    const moveToCurrentLocation = () => {
        if (currentLocation) {
            getCurrentLocation();
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

    if (isLoading || !currentLocation) {
        return (
            <SafeView>
                <Back navigation={navigation} />
                <LoadingContainer>
                    <LoadingText>지도를 불러오는 중...</LoadingText>
                </LoadingContainer>
            </SafeView>
        );
    }

    return (
        <SafeView>
            <Back navigation={navigation} />
            <Container>
                <MapContainer>
                    <NaverMapView
                        ref={setMapRef}
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        isShowLocationButton={false}
                        onInitialized={() => {
                            console.log('지도 준비 완료');
                        }}
                        onCameraChanged={(event) => {
                        }}
                    />

                    <LocationButton onPress={moveToCurrentLocation}>
                        <LocationIcon>📍</LocationIcon>
                    </LocationButton>
                </MapContainer>
            </Container>
        </SafeView>
    );
};

export default MapScreen;
