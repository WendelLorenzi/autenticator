import cors, { CorsOptions } from 'cors';

const options: CorsOptions = {
    origin: process.env.APP,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  };

export default cors(options);
