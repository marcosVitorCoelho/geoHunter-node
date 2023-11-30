import express from 'express';
import cors from 'cors'
import logger from 'morgan'
import regularUserRoutes from './routes/Users/RegularUsers/RegularUserRoutes'
import proUserRoutes from './routes/Users/ProUsers/ProUsersRoutes'
import bodyParser from 'body-parser';
import { connect } from './config/connection';
import { authMiddleware } from './middlewares/authToken';


export const app = express();


app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1/regularuser', regularUserRoutes)
app.use('/api/v1/prouser/user', proUserRoutes)

connect()

