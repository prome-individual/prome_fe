import BASE_URL from '../config/config';
import axios from 'axios';
import { useAuthStore } from '../store/store';

export const ask = async (content, chatId = null) => {
    try {
        const accessToken = useAuthStore.getState().accessToken;

        const requestData = {
            content,
            ...(chatId && { chat_id: chatId }),
        };

        const res = await axios.post(
            `${BASE_URL}/chat/ask`,
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('질문하기 에러:', e);
        throw e;
    }
};

export const getChatAll = async () => {
    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('전체 채팅방 조회 에러:', e);
        throw e;
    }
};

export const getChat = async (chatId) => {
    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/${chatId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('특정 채팅방 조회 에러:', e);
        throw e;
    }
};

export const getChat7Period = async () => {
    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/period`,
            {
                params: { period: 7 },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('7일 채팅 조회 에러:', e);
        throw e;
    }
};

export const getChat30Period = async () => {
    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/period`,
            {
                params: { period: 30 },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('30일 채팅 조회 에러:', e);
        throw e;
    }
};
