import BASE_URL from '../config/config';
import axios, { AxiosError } from 'axios';
import { useAuthStore, useUserStore } from '../store/store';
import { mockUser, USE_MOCK } from '../config/mock';
import type { Login, Register } from '../types/auth';

export const login = async (id: string, password: string): Promise<Login> => {
    if (USE_MOCK) {
        if (id === 'test1' && password === '1234') {
            const data: Login = { accessToken: 'mock-token-12345', user: mockUser, success: true };
            useAuthStore.getState().setAccessToken(data.accessToken);
            useUserStore.getState().setUser(data.user);
            return data;
        }
        throw new Error('아이디 또는 비밀번호가 틀렸습니다.');
    }

    try {
        const res = await axios.post<Login>(
            `${BASE_URL}/auth/login`,
            { id, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        useAuthStore.getState().setAccessToken(res.data.accessToken);
        useUserStore.getState().setUser(res.data.user);
        return res.data;
    } catch (e) {
        console.error('로그인 에러:', e);
        throw e;
    }
};

export const logout = async (): Promise<{ success: boolean }> => {
    if (USE_MOCK) {
        useAuthStore.getState().resetAccessToken();
        useUserStore.getState().resetUser();
        return { success: true };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;
        const res = await axios.post<{ success: boolean }>(
            `${BASE_URL}/auth/logout`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        useAuthStore.getState().resetAccessToken();
        useUserStore.getState().resetUser();
        return res.data;
    } catch (e) {
        console.log('로그아웃 에러:', e);
        throw e;
    }
};

export const register = async (
    id: string,
    password: string,
    name: string,
    age: number,
    gender: string,
    phone: string
): Promise<Register> => {
    if (USE_MOCK) {
        return { success: true, message: '회원가입 성공' };
    }

    try {
        const res = await axios.post<Register>(
            `${BASE_URL}/auth/register`,
            { id, password, name, age, gender, phone },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        console.log('에러 메시지:', error.message);
        console.log('응답 상태:', error.response?.status);
        throw e;
    }
};
