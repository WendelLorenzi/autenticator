import express from 'express'
import { router } from './routes'
import cors from 'cors';
import 'dotenv/config';
import connectDB from './providers/mongoDB/connection';
import swagguerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

const app = express();

connectDB();

app.use(express.json());
app.use(router);
app.use('/docs', swagguerUi.serve, swagguerUi.setup(swaggerDocs));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
app.use(cors());

// const corsOptions = {
//     origin: `${process.env.APP}`, 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
//   };
  
// app.use(cors(corsOptions));

export { app };