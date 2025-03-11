import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET||"";
export const getPayload = async(token:string) => {
    try {
        const {objectId} = await jwt.verify(token, JWT_SECRET) as {
            objectId: string
        };
        return objectId;
    } catch (error) {
        console.log(`Some Error occured : \n` , error);
    }
}