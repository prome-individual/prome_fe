import { create } from 'zustand';
import type { User } from '@/types';

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    resetUser: () => void;
}

interface AuthStore {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    resetAccessToken: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    resetUser: () => set({ user: null }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    resetAccessToken: () => set({ accessToken: null }),
}));
