import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import { userInteface, userModel } from "../models/user.model";
import { getPayload } from "../utils/jwt/verifyToken";
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "";
export const isLoggedIn = async(req:Request, res:Response, next:NextFunction) => {

    if(!req.cookies.token){
        res.status(400).send({
            status: "failure",
            message: "Login first."
        })
        return;
    }

    const email  = await getPayload(req.cookies.token);
    const user = await userModel.findOne({email});
    if(!user) {
        res.status(400).send({
            status: "failure",
            message: "Login first."
        })
    }
    req.userInfo = user as userInteface;
    next();
}