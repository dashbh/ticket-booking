import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schema/booking.interface';
import { CreateBookingDto } from './schema/create-booking.dto';
import { MoviesService } from './movies/movies.service';
import {
  BookingResponseDto,
  CreatedBookingResponseDto,
} from './schema/bookings.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<Booking>,
    private readonly moviesService: MoviesService,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<CreatedBookingResponseDto> {
    const createdBooking = new this.bookingModel(createBookingDto);
    createdBooking.save();

    const movie = await this.moviesService.getMovie(createBookingDto.movieId);

    const responseDto: CreatedBookingResponseDto = {
      id: createdBooking.id,
      movieName: movie.title,
      bookingTime: createdBooking.bookingTime,
    };

    return responseDto;
  }

  async getBooking(id: string): Promise<BookingResponseDto> {
    const booking = await this.bookingModel.findById(id).exec();

    if (booking) {
      const movie = await this.moviesService.getMovie(booking.movieId);
      const responseDto: BookingResponseDto = {
        id: booking.id,
        bookingTime: booking.bookingTime,
        movie: {
          id: movie.id,
          title: movie.title,
          director: movie.director,
          actors: movie.actors,
          genre: movie.genre,
          ratings: movie.ratings,
          ticket_price: movie.ticket_price,
        },
      };

      return responseDto;
    }

    return null;
  }
}
