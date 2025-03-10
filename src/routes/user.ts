import express from 'express'
import { handleRegister } from '../controllers/register.controller';
import { loginHandle } from '../controllers/login.controller';
import { logoutHandle } from '../controllers/logout.controller';
import { profileHandle } from '../controllers/profile.controller';
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