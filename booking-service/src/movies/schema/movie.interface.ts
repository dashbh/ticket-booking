import { Document } from 'mongoose';

export interface Movie extends Document {
  id: number;
  title: string;
  director: string;
  actors: string[];
  genre: string[];
  ratings: number;
  ticket_price: number;
}
