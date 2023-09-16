import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingService } from 'src/booking.service';
import { BookingResponseDto, CreatedBookingResponseDto } from 'src/schema/bookings.dto';
import { CreateBookingDto } from 'src/schema/create-booking.dto';

@Resolver(() => CreatedBookingResponseDto)
export class BookingResolver {

    constructor(private bookingService: BookingService) { }

    @Query(() => BookingResponseDto)
    async getBooking(@Args('id') id: string): Promise<BookingResponseDto> {
        return this.bookingService.getBooking(id);
    }

    @Mutation(() => CreatedBookingResponseDto)
    async createBooking(@Args('input') input: CreateBookingDto): Promise<CreatedBookingResponseDto> {
        return this.bookingService.createBooking(input);
    }
}
