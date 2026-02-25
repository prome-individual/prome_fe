import { User } from './user';

interface Login {
    success: boolean;
    accessToken: string;
    user: User;
    message?: string;
}

interface Register {
    success: boolean;
    message: string;
}

export type { Login, Register };
