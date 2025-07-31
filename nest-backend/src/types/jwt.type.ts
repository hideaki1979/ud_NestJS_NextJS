export interface UserPayload {
  id: number;
  email: string;
  nickname: string | null;
  createdAt: Date;
  updatedAt: Date;
}
