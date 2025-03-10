import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { checkPass } from "../utils/bcrypt/verifyPassword";
import dotenv from 'dotenv'
import { generateToken } from "../utils/jwt/generateToken";
dotenv.config()

interface bodyInterface{
    email:string,
    password:string
}

const JWT_SECRET = process.env.JWT_SECRET;

export const loginHandle = async(req:Request<{}, {}, bodyInterface>, res:Response) => {

    const {email, password} = req.body;
    if( !email || !password ) {
        res.status(404).send({
            status: "failure",
            message: "email or password incorrect."
        })
        return;
    }

    const foundUser = await userModel.findOne({ email });

    if( !foundUser || foundUser == null ){
        res.status(404).send({
            status: "failure",
            message: "email or password incorrect."
        })
        return;
    }
    const isMatch = checkPass(password, foundUser?.password||"");
    if(!isMatch){
        res.status(404).send({
            status: "failure",
            message: "email or password incorrect."
        })
        return;
    }

    const token:string = await generateToken(email)||"";
    // console.log(token);
    res.cookie('token', token);

    res.status(200).send({
        status: "success",
        message: "Login successfully...",
        userInfo : {
            name: foundUser?.name,
            email: foundUser?.email,
            age: foundUser?.age,
            createdAt: foundUser?.createdAt
        }
    })
}