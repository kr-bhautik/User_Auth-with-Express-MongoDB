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

    const objectId  = await getPayload(req.cookies.token);
    const user = await userModel.findOne({_id: objectId});
    if(!user) {
        res.status(400).send({
            status: "failure",
            message: "Login first."
        })
        return;
    }
    req.userInfo = user as userInteface;
    next();
}