import mongoose from "mongoose";

export interface userInteface extends Document{

    name: string,
    email: string,
    password: string,
    age: string,
    createdAt: string
}

const userSchema = new mongoose.Schema<userInteface>({
    name: String,
    email: String,
    password: String,
    age: Number,
    createdAt: String
}, {timestamps: true})

export const userModel = mongoose.model("user", userSchema);