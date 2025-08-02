export type AuthForm = {
    email: string;
    password: string;
}

export type EditedTask = {
    id: number;
    title: string;
    description?: string | null;
}

export interface UserPayload {
    id: number;
    email: string;
    nickname: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type TaskPayload = {
    title: string;
    description?: string | null;
}