import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema';
import { DatabaseConnection } from './database/database.connection';
import { MoviesModule } from './movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { BookingResolver } from './graphql/booking.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection,
    }),
    MoviesModule,
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "graphql/booking.graphql"
  })
  ],
  controllers: [BookingController],
  providers: [BookingResolver, BookingService],
})
export class BookingModule {}
