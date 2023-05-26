import express from 'express'
import { router } from './routes'
import cors from 'cors';
import 'dotenv/config';
import connectDB from './providers/mongoDB/connection';
import swagguerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
// import { json, urlencoded  } from 'body-parser';

const app = express();

app.use(express.json());
// app.use(urlencoded({ extended: true }));
connectDB();
app.use(router);
app.use(cors());
app.use('/docs', swagguerUi.serve, swagguerUi.setup(swaggerDocs));

export { app };