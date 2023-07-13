import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.interface';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MoviesService } from './movies/movies.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<Booking>,
    private readonly moviesService: MoviesService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async getBooking(id: string): Promise<any> {
    const booking = await this.bookingModel.findById(id).exec();

    if (booking) {
      const movie = await this.moviesService.getMovie(booking.movieId);
      return { ...booking.toObject(), ...movie.toObject() };
    }

    return null;
  }
}
