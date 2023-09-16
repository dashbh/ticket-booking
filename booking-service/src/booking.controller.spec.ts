import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MoviesService } from './movies/movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { Model } from 'mongoose';

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: BookingService;
  let movieModel: any;
  let bookingModel: any;
  const mockMovie = {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    genre: ['Crime', 'Drama'],
    ratings: 9.2,
    ticket_price: 13.0,
  }

  beforeEach(async () => {
    const httpService = {
      get: jest.fn(),
      post: jest.fn().mockImplementation(() => of({ data: {} })),
    };

    const mockModel = {
      constructor: jest.fn().mockResolvedValue({}),
      findOne: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        MoviesService,
        BookingService,
        { provide: HttpService, useValue: httpService },
        {
          provide: getModelToken('Movie'),
          useValue: mockModel,
        },
        {
          provide: getModelToken('Booking'),
          useValue: mockModel,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(BookingService);
    movieModel = module.get<Model<any>>(getModelToken('Movie'));
    bookingModel = module.get<Model<any>>(getModelToken('Booking'));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBooking', () => {
    it('should fetch a booking and return the response', async () => {

      const bookingId = '1';
      const mockBooking = {
        "id": 1,
        movie: {
          ...mockMovie
        },
        "movieTime": "9:30AM",
        "seats": ['1A'],
        "theater": 'Test',
      };

      bookingModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockBooking) });
      movieModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockMovie) });

      const expectedResult = {
        "id": 1,
        movie: {
          ...mockMovie
        },
        "movieTime": "9:30AM",
        "seats": ['1A'],
        "theater": 'Test',
      };

      const result = await controller.getBooking(bookingId);

      expect(result).toEqual(expectedResult);
    });
  });

  // describe('createBooking', () => {
  //   it('should create a booking and return the response', async () => {

  //     const movieId = '1';
  //     const mockMovie = { _id: movieId, title: 'Movie Title' };
  //     const mockBooking = {};
  //     movieModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockMovie) });

  //     bookingModel.create = jest.fn().mockResolvedValue(mockBooking);
  //     bookingModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockBooking) });

  //     const mockCreateBookingDto = {
  //       userId: "6505a05226b4d39e4a7fd4f2",
  //       movieId: "1",
  //       seats: ["1A", "2A"],
  //       theater: "PVR WhiteField - 1",
  //       movieTime: "Sat Sep 16 2023 18:05:29 GMT+0530 (India Standard Time)"
  //     };
  //     const expectedResult = {};

  //     const result = await controller.createBooking(mockCreateBookingDto);

  //     expect(result).toEqual(expectedResult);
  //   });
  // });

});
