import mongoose from "mongoose";

export interface IUser {
    _id?:  mongoose.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}
