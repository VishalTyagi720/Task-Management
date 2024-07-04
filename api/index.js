import express from 'express'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import taskRouter from './routes/task.route.js';

const app = express();

app.use(express.json()); 

app.use(cookieParser());

dotenv.config();

// mongoDB connection below...
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Connected to MongoDB Database')
})
.catch((error) => {
    console.log(error)
})


app.listen(8800, () => {
    console.log('Server is running on port 8800..')
})


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const success = err.success;
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
    });
});