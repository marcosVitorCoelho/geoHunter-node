import express from 'express';
import cors from 'cors'
import logger from 'morgan'
import regularUserRoutes from './routes/Users/RegularUsers/RegularUserRoutes'
import proUserRoutes from './routes/Users/ProUsers/ProUsersRoutes'
import distanceRoutes from './routes/DistanceRoutes'
import roleRoutes from './routes/RoleRoutes'
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
app.use('/api/v1/prouser', proUserRoutes)
app.use('/api/v1/role', roleRoutes)
app.use('/api/v1/', distanceRoutes)

connect()

