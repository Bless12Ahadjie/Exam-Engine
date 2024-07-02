export interface Payload{
  message: string;
  status: number
}

export interface LoginPayload{
  message: string;
  status: number;
  userId: string;
  username: string;
  roles: string;
  token: string;
}
