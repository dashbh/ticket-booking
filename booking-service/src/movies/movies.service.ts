import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.interface';
import { moviesSeedData } from 'src/database/movies';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedMovieList();
  }

  async seedMovieList(): Promise<void> {
    // Empty the movies database before insterting seed data.
    await this.movieModel.deleteMany({});
    for (const movie of moviesSeedData) {
      await this.movieModel.create(movie);
    }
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async getMovie(id: string): Promise<Movie> {
    return this.movieModel.findOne({ id }).exec();
  }
}
