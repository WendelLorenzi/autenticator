import express from 'express'
import { router } from './routes'
import 'dotenv/config';
import connectDB from './providers/mongoDB/connection';
import swagguerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import Cors from './useCases/middleware/Cors';
import bodyParser from 'body-parser';

const app = express();

app.use(Cors);

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.use('/docs', swagguerUi.serve, swagguerUi.setup(swaggerDocs));
app.use(router);

export { app };


