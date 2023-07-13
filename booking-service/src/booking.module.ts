import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema';
import { DatabaseConnection } from './database/database.connection';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection,
    }),
    MoviesModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
