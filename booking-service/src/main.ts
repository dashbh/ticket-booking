import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { BookingModule } from './booking.module';
import { ApolloServer } from 'apollo-server-express';

const typeDefs = `
  type Booking {
    id: ID!
    userId: String!
    date: String!
  }

  input CreateBookingInput {
    userId: String!
    date: String!
  }

  type Query {
    getBooking(id: ID!): Booking
    getAllBookings: [Booking]
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking
  }
`;

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);
  app.useGlobalPipes(new ValidationPipe());

  // const expressApp = express();

  // const server = new ApolloServer({
  //   typeDefs,
  // });

  // try {
  //   await server.start();
  //   console.log('Apollo Server started');
  // } catch (error) {
  //   console.error('Error starting Apollo Server:', error);
  // }

  // server.applyMiddleware({ app: expressApp });

  await app.listen(9002);
}

bootstrap();
