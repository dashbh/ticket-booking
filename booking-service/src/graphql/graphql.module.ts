import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookingResolver } from './booking.resolver';
import { BookingService } from 'src/booking.service';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "booking.graphql"
        })
    ],
    providers: [BookingResolver, BookingService],
})
export class GraphqlModule { }
