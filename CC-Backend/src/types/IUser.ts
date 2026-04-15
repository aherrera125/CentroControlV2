export interface IUser {
  id?: number;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  lastName: string;
  status?: boolean;
  role: "admin" | "user";
}
