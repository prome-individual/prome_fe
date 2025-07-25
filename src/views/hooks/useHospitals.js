// hooks/useHospitals.js
import { useState, useEffect } from 'react';

// Define dummy hospital data directly in the file
const DUMMY_HOSPITALS = [
    { id: 1, name: '서울대학교병원', address: '서울특별시 종로구 대학로 101', telephone: '02-2072-2114', latitude: 37.579617, longitude: 126.999913, department: '내과외과정형외과', type: 'general', category: '' },
    { id: 2, name: '연세대 세브란스병원', address: '서울특별시 서대문구 연세로 50-1', telephone: '02-2228-5800', latitude: 37.564457, longitude: 126.940849, department: '내과외과심장내과', type: 'general', category: '' },
    { id: 3, name: '삼성서울병원', address: '서울특별시 강남구 일원로 81', telephone: '02-3410-2114', latitude: 37.488033, longitude: 127.085484, department: '내과외과순환기내과', type: 'general', category: '' },
    { id: 4, name: '서울아산병원', address: '서울특별시 송파구 올림픽로43길 88', telephone: '02-3010-3114', latitude: 37.526924, longitude: 127.103851, department: '내과외과심장내과', type: 'general', category: '' },
    { id: 5, name: '강남세브란스병원', address: '서울특별시 강남구 언주로 211', telephone: '02-2019-3114', latitude: 37.519301, longitude: 127.043639, department: '내과외과정형외과', type: 'general', category: '' },
    { id: 6, name: '한양대학교병원', address: '서울특별시 성동구 왕십리로 222', telephone: '02-2290-8114', latitude: 37.559649, longitude: 127.043991, department: '내과외과정형외과', type: 'general', category: '' },
    { id: 7, name: '고려대학교안암병원', address: '서울특별시 성북구 고려대로 73', telephone: '02-920-5114', latitude: 37.586878, longitude: 127.027621, department: '내과외과심장내과', type: 'general', category: '' },
    { id: 8, name: '중앙대학교병원', address: '서울특별시 동작구 흑석로 102', telephone: '02-6299-1114', latitude: 37.506297, longitude: 126.957394, department: '내과외과정형외과', type: 'general', category: '' },
    { id: 9, name: '경희대학교병원', address: '서울특별시 동대문구 경희대로 23', telephone: '02-958-8114', latitude: 37.594668, longitude: 127.051394, department: '내과외과순환기내과', type: 'general', category: '' },
    { id: 10, name: '이대목동병원', address: '서울특별시 양천구 안양천로 1071', telephone: '02-2650-5114', latitude: 37.526581, longitude: 126.875266, department: '내과외과정형외과', type: 'general', category: '' },
];

const useHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate loading data by using the hardcoded array
        try {
            console.log('Loading dummy hospital data...');
            setHospitals(DUMMY_HOSPITALS);
            setIsLoading(false);
            console.log(`Successfully loaded ${DUMMY_HOSPITALS.length} dummy hospitals.`);
        } catch (e) {
            console.error('Error loading dummy data:', e);
            setError(e.message);
            setHospitals([]);
            setIsLoading(false);
        }
    }, []);

    // Function to filter hospitals based on user's location and a radius
    const filterNearbyHospitals = (userLat, userLng, radiusKm = 10) => {
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radius of the Earth in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        return hospitals
            .map(hospital => ({
                ...hospital,
                distance: calculateDistance(userLat, userLng, hospital.latitude, hospital.longitude)
            }))
            .filter(hospital => hospital.distance <= radiusKm)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 100); // Limit to the nearest 100 hospitals
    };

    return {
        hospitals,
        isLoading,
        error,
        filterNearbyHospitals,
    };
};

export default useHospitals;
