import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly movieId: string;
}
