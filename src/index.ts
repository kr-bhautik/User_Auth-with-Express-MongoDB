import express, { Request, Response } from 'express'
import { userRouter } from './routes/user.route';
import dotenv from 'dotenv'
import { connection } from './db/connection';
import cookieParser from 'cookie-parser';
import { getUsersHandle } from './controllers/getAllUsers.controller';

dotenv.config();
connection()

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser())


app.get('/', (req:Request, res:Response) => {
    res.send("Hello")
})
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})

app.use('/user', userRouter);
app.get('/users', getUsersHandle)