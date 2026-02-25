interface Hospital {
    id: number;
    name: string;
    address: string;
    telephone: string;
    post: string;
    latitude: number;
    longitude: number;
    department: string;
    type: 'general' | 'heart';
}

export type { Hospital };
