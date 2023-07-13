import { MovieResponseDto } from '../movies/movie.dto';

export class CreatedBookingResponseDto {
  id: string;
  movieName: string;
  bookingTime: Date;
}

export class BookingResponseDto {
  id: string;
  bookingTime: Date;
  movie: MovieResponseDto;
}
