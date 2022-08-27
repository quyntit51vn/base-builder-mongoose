import mongoose from "mongoose";

export interface IProduct {
    _id?: mongoose.Types.ObjectId,
    userId: string,
    name: string,
    price: number,
}
