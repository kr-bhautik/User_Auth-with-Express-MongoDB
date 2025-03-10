import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET||"";
export const getPayload = async(token:string) => {
    try {
        const {email} = await jwt.verify(token, JWT_SECRET) as {
            email: string
        };
        return email;
    } catch (error) {
        console.log(`Some Error occured : \n` , error);
    }
}