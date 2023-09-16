import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MovieResponseDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  director: string;

  @Field(() => [String])
  actors: string[];

  @Field(() => [String])
  genre: string[];

  @Field()
  ratings: number;

  @Field()
  ticket_price: number;
}
