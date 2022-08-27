import { Model } from "mongoose";
import { BaseModel } from "./Model";

export enum TypeRelationShip {
    HasOne = "HasOne",
    HasMany = "HasMany",
    BelongTo = "BelongTo"
}
export interface IRelationModel {
    name: string,
    model: IModel,
    FK: string,
    PK: string,
    type: TypeRelationShip
}

export interface IModel {
    attribute;
    relationsDefinitions: Array<IRelationModel>;
    getModelSchema();
}
