import { Schema } from 'mongoose';

export const BookingSchema = new Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  movieTime: { type: Date, required: true },
  theater: { type: String, required: true },
  seats: { type: [String], required: true },
});
