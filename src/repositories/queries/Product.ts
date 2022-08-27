import mongoose from "mongoose";
import { IProduct } from "../../model/interface/IProduct";
import { IUser } from "../../model/interface/IUser";
import { BaseModel } from "./Model";
import { IModel, IRelationModel, TypeRelationShip } from "./model.interface";
import UserModel from "./UserModel";

type xx<T> = { [K in keyof T]?: any }

export default class ProductModel extends BaseModel implements IModel {

    static instance: ProductModel;
    static getInstance() {
        if (!ProductModel.instance) ProductModel.instance = new ProductModel;
        return ProductModel.instance
    }

    table: string = "Product";
    attributes: xx<IProduct> = {
        userId: { type: String, default: null },
        name: { type: String, default: null },
        price: { type: Number }
    };
    static schema: mongoose.Schema<IProduct> = new mongoose.Schema<IProduct>();
    getModelSchema() {
        if (!ProductModel.modelSchema)
            ProductModel.modelSchema = mongoose.model<IProduct>(this.table, ProductModel.schema)
        return ProductModel.modelSchema
    }
    relationsDefinitions: Array<IRelationModel> = [
        {
            name: "user",
            FK: "userId",
            PK: "_id",
            type: TypeRelationShip.BelongTo,
            model: UserModel.getInstance()
        }
    ];
}
