export type LoginResponse = { token: string };
export type LoginRequest = { user: string; password: string };
export type RegisterRequest = { email: string; password: string ; re_password: string };

export type User = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  gender: number;
  birth: Date;
  last_login: Date | null;
  avatar: string;
  status: number;
  email_verified: boolean;
  timestamps: {
    created_at: Date | null;
    updated_at: Date | null;
  };
};
