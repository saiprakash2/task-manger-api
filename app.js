import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connect from "./config/dbConn.js";
import {logger, logEvents} from './middleware/logger.js';
import {errorHandler} from './middleware/errorHandler.js';
import {corsOptions} from './config/corsOptions.js';

import { authRouter } from './routes/authRoutes.js';
import { listRouter } from './routes/listRoutes.js';
import { taskRouter } from './routes/taskRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();


connect();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cookieParser());



/* ROUTE HANDLERS */
app.use('/auth',authRouter) //Auth Routes
app.use('/lists', listRouter) //List Routes
app.use('/list', taskRouter) //Task Routes




app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})