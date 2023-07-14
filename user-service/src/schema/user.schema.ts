import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  password: String,
  fullName: String,
  phone: String,
  bookings: [String],
  createdAt: { type: Date, default: Date.now },
});
