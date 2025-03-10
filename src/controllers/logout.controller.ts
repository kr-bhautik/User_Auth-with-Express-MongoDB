import { Request, Response } from "express"

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