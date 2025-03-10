import { Request, Response } from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn"

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