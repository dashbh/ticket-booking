import { MovieResponseDto } from '../movies/schema/movie.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreatedBookingResponseDto {
  @Field()
  id: string;

  @Field()
  movieName: string;

  @Field()
  movieTime: Date;

  @Field(() => [String])
  seats: string[];

  @Field()
  theater: string;
}

@ObjectType()
export class BookingResponseDto {
  @Field()
  id: string;

  @Field()
  movieTime: Date;

  @Field(() => MovieResponseDto)
  movie: MovieResponseDto;

  @Field(() => [String])
  seats: string[];

  @Field()
  theater: string;
}
