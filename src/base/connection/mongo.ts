import mongoose, { ConnectOptions } from 'mongoose';
import { ENV } from '../../config';
export const connectMongoDb = () => {
    const connect = () => {
        const mongoUrl = ENV.mongoDbUrl;
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl,
            {
              keepAlive: true,
              useUnifiedTopology: true,
              useNewUrlParser: true,
              // useCreateIndex: true,
              // useFindAndModify: false
            } as ConnectOptions,
            (err) => {
              let dbStatus = '';
              if (err) {
                dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
              }
              dbStatus = `*    DB Connection: OK\n****************************\n`;
              console.log('****************************');
              console.log('*    Starting Server');
              console.log(`*    DB_URL: ${mongoUrl}`);
              console.log(`*    Port: ${process.env.PORT || 8080}`);
              console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
              console.log(`*    Database: MongoDB`);
              console.log(dbStatus);
            }
          );
        };
        connect();
      
        mongoose.connection.on('error', console.log);
        mongoose.connection.on('disconnected', connect);
}