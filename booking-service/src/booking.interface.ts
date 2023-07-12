import { Document } from 'mongoose';

export interface Booking extends Document {
  readonly id: string;
  readonly userId: string;
  readonly movieId: string;
  readonly createdAt: Date;
}
