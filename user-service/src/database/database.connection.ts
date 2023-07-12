import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

export class DatabaseConnection implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const host = process.env.MONGO_HOST || 'localhost';
    const port = process.env.MONGO_PORT || 27017;
    const db_name = process.env.MONGO_DB_NAME || 'db';
    const uri = `mongodb://${host}:${port}/${db_name}`;
    console.log(uri, 'Mongo_Connection_URI');
    return {
      uri,
    };
  }
}
