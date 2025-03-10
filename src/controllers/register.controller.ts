import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { hashGenerator } from "../utils/bcrypt/hashGenerator";

interface bodyInterface {
    name: string,
    email: string,
    password: string,
    age: number
}
const handleRegister = async(req:Request<{}, {}, bodyInterface>, res:Response) => {

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
export {
    handleRegister
}