import { Controller, Get, Param, Post, Body, UseFilters } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './schema/create-booking.dto';
import { HttpExceptionFilter } from './http-exception.filter';
import {
  BookingResponseDto,
  CreatedBookingResponseDto,
} from './schema/bookings.dto';

@Controller('booking')
@UseFilters(HttpExceptionFilter)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createBooking(
    @Body() input: CreateBookingDto,
  ): Promise<CreatedBookingResponseDto> {
    return this.bookingService.createBooking(input);
  }

  @Get(':id')
  getBooking(@Param('id') id: string): Promise<BookingResponseDto> {
    return this.bookingService.getBooking(id);
  }
}
