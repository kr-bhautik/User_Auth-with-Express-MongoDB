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

export const getPaginatedUsersHandle = async(req:Request, res:Response) => {
    const {page} = req.params;
    const pageNum = parseInt(page);
    const users = await userModel.find({}).select("-password").limit(10).skip( pageNum == 0 ? 0 : (pageNum-1)*10);

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