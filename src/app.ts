import express from 'express'
import { router } from './routes'
import cors from 'cors';
import 'dotenv/config';
import connectDB from './providers/mongoDB/connection';

const app = express()

connectDB();

app.use(express.json())
app.use(router)
app.use(cors());

const corsOptions = {
    origin: `${process.env.APP}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
  };
  
app.use(cors(corsOptions));

export { app }