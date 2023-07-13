import { Schema } from 'mongoose';

export const BookingSchema = new Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
