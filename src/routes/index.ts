import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { IProduct } from "../model/interface/IProduct";
import { IUser } from "../model/interface/IUser";
import ProductModel from "../repositories/queries/Product";
import { QueryBuilder } from "../repositories/queries/QueryBuilder";
import UserModel from "../repositories/queries/UserModel";
// import webRoute from "./web";

// import authRoute from "./auth";

const router = Router();

// router.use("/api/v1/web", webRoute);
// router.use("/api/v1/auth", authRoute);
router.get("/", async (req: Request, res: Response) => {

    const user = UserModel.getInstance();
    const product = ProductModel.getInstance();

    const chemaUser = new QueryBuilder<IUser>().use(user.getModelSchema());
    // const userDb = chemaUser.create({
    //     lastName: "Quys",
    //     firstName: "quy",
    //     email: "quyproi51vn@gmail.com"+Date.now(),
    //     password: "xxx"
    // })


    // new QueryBuilder<IProduct>().use(product.getModelSchema()).create({
    //     name:"xx",
    //     price:2000,
    //     userId: "62f5f0c93cecb195c0e6f39f"
    // });
    const chemaProduct = new QueryBuilder<IProduct>().use(product.getModelSchema());
    const x = mongoose.Types.ObjectId
    const data = await chemaProduct.with(product.relationsDefinitions).query({
        _id: {
            $eq: new x("62f5fea809d46359c688c79b")
        }
    }).get();
    
    res.send({ data })
}

);

export default router;
