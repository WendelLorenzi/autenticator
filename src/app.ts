import express from 'express'
import { router } from './routes'
import 'dotenv/config';
import connectDB from './providers/mongoDB/connection';

const app = express()

connectDB();

app.use(express.json())
app.use(router)

export { app }