import { MovieResponseDto } from '../movies/schema/movie.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreatedBookingResponseDto {
  @Field()
  id: string;
  movieName: string;
  movieTime: Date;
  seats: [string];
  theater: string;
}

@ObjectType()
export class BookingResponseDto {
  @Field()
  id: string;
  movieTime: Date;
  movie: MovieResponseDto;
  seats: [string];
  theater: string;
}
