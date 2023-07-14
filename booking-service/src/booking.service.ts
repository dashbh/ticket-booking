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
import { connect } from 'amqplib';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<Booking>,
    private readonly moviesService: MoviesService,
  ) {}

  async publishToRabbitMQ(message) {
    const connection = await connect(
      `amqp://guest:guest@${process.env.RABBITMQ_HOST || 'localhost'}:5672`,
    );
    const channel = await connection.createChannel();

    const booking_queue = 'booking-queue';
    await channel.assertQueue(booking_queue);
    channel.sendToQueue(booking_queue, Buffer.from(JSON.stringify(message)));
  }

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

    // Publish to message queue
    await this.publishToRabbitMQ({
      bookingId: createdBooking.id,
      userId: createdBooking.userId,
    });

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
