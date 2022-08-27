import mongoose from "mongoose";
import { IUser } from "../../model/interface/IUser";
import { IModel, IRelationModel } from "./model.interface";

export abstract class BaseModel implements IModel {
    attribute;
    relationsDefinitions: Array<IRelationModel> = [];
    static modelSchema;
    abstract getModelSchema() 
}
