import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingDto {
  @Field()
  @IsNotEmpty()
  readonly userId: string;

  @Field()
  @IsNotEmpty()
  readonly movieId: string;

  @Field(() => [String])
  @IsNotEmpty()
  readonly seats: string[];

  @Field()
  @IsNotEmpty()
  readonly theater: string;

  @Field()
  @IsNotEmpty()
  readonly movieTime: string;
}
