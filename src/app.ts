import express from 'express'
import { router } from './routes'
import 'dotenv/config';
import connectDB from './providers/mongoDB/connection';
import swagguerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import Cors from './useCases/middleware/Cors';

const app = express();

app.use(express.json());
connectDB();
app.use('/docs', swagguerUi.serve, swagguerUi.setup(swaggerDocs));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.APP);
    next();
});
app.use(Cors);
app.use(router);

export { app };


