import express from 'express'
import { handleRegister } from '../controllers/user.controller';
import { loginHandle } from '../controllers/user.controller';
import { logoutHandle } from '../controllers/user.controller';
import { profileHandle } from '../controllers/user.controller';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const app = express();
const userRouter = express.Router();

userRouter.post('/register', handleRegister)
userRouter.post('/login',loginHandle )
userRouter.get('/logout', logoutHandle)
userRouter.get('/profile', isLoggedIn,  profileHandle)

export {
    userRouter
}