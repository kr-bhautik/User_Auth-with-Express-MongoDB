import mongoose from "mongoose"
export const connection = async() => {

    const MONGO_URL:string = process.env.MONGO_URL || "";
    try {
        await mongoose.connect(MONGO_URL);
        
    } catch (error:any) {
        console.log(error)
    }
}