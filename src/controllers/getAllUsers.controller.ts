import mongoose from "mongoose";
import { userModel } from "../models/user.model";
import { Request, Response } from "express";

export const getUsersHandle = async(req:Request, res:Response) => {

    const users = await userModel.find({}).select("-password");
    if(!users){
        res.status(204).send({
            status: "success",
            message: "No users..."
        })
        return;
    }

    res.status(200).send({
        status: "success",
        message: "Users fetched successfully...",
        users
    })
}