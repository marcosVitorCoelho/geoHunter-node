import express from 'express';
import cors from 'cors'
import logger from 'morgan'
import regularUserRoutes from './routes/RegularUserRoutes'
import bodyParser from 'body-parser';
import { connect } from './config/connection';

export const app = express();

app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', regularUserRoutes)

connect()

