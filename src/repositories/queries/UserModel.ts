import mongoose, { SchemaDefinitionType } from "mongoose";
import { IUser } from "../../model/interface/IUser";
import { BaseModel } from "./Model";
import { IModel, IRelationModel, TypeRelationShip } from "./model.interface";
import ProductModel from "./Product";

export default class UserModel extends BaseModel implements IModel {
    static instance: UserModel;
    static getInstance() {
        if (!UserModel.instance) UserModel.instance = new UserModel;
        return UserModel.instance
    }

    static table: string = "User";
    attributes: (keyof IUser)[] = ["_id", "email", "firstName", "lastName"];
    attribute: IUser;
    static schema: any = new mongoose.Schema<IUser>({
        firstName: { type: String, default: null },
        lastName: { type: String, default: null },
        email: { type: String, unique: true },
        password: { type: String }
    });
    getModelSchema() {
        if (!UserModel.modelSchema)
            UserModel.modelSchema = mongoose.model<IUser>(UserModel.table, UserModel.schema)
        return UserModel.modelSchema
    }
    relationsDefinitions: Array<IRelationModel> = [
        // {
        //     FK: "userId",
        //     PK: "_id",
        //     type: TypeRelationShip.HasMany,
        //     model: new ProductModel
        // }
    ];
}
