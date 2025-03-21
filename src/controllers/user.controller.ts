import { Request, Response } from "express";
import { userModel } from "../models/user.model"
import { checkPass } from "../utils/bcrypt/verifyPassword";
// import dotenv from 'dotenv'
import { generateToken } from "../utils/jwt/generateToken";
import { loginBodyInterface } from "../utils/types";
import { registerBodyInterface } from "../utils/types";
import { hashGenerator } from "../utils/bcrypt/hashGenerator";

export const handleRegister = async(req:Request<{}, {}, registerBodyInterface>, res:Response) => {

    // console.log(req.body)
    const {name, email, password, age} = req.body ;

    if( !name || !email || !password || !age ) {
        res.status(400).send({
            status:"failure",
            message: "Every field is mendatory."
        })
        return;
    }
    const alreadyExist = await userModel.findOne({email});
    if( alreadyExist ) {
        res.status(404).send({
            status: "failure",
            message: "User already exists..."
        })
        return;
    } 

    const hashedPass = await hashGenerator(password);
    // console.log(hashedPass)
    const createdUser = await userModel.create({
        name, email, password: hashedPass, age
    })
    // console.log(createdUser)
    res.status(201).send({
        status: "success",
        message: "Registered successfully...",
        user: {
            name: createdUser?.name,
            email: createdUser?.email,
            age: createdUser?.age,
            createdAt: createdUser?.createdAt
        }
    })
}

export const loginHandle = async(req:Request<{}, {}, loginBodyInterface>, res:Response) => {

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

    const token:string = await generateToken(foundUser._id.toString())||"";
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

export const logoutHandle = (req:Request, res:Response) => {

    if( !req.cookies.token){
        res.status(400).send({
            status: "failure",
            message: "Login Required..."
        })
        return;
    }

    res.clearCookie('token');

    res.status(200).send({
        status: "success",
        message: "Logged out successfully..."
    })
}

export const profileHandle = (req:Request, res:Response) => {

    const value = req.userInfo;
    res.status(200).send({
        status: "success",
        message: "Profile data fetched successfully...",
        user: {
            name: value?.name,
            email: value?.email,
            age: value?.age,
            createdAt: value?.createdAt
        }
    })
}