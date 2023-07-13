import { Schema } from 'mongoose';

export const MovieSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }],
  genre: [{ type: String, required: true }],
  ratings: { type: Number, required: true },
  ticket_price: { type: Number, required: true },
});
