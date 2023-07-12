import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  fullName: string;
  phone: string;
  createdAt: Date;
}
