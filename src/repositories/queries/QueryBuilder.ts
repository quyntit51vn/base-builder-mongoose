import { ObjectId } from "mongodb";
import mongoose, { Model } from "mongoose";
import { cloneObj } from "../../utils/helper";
import { IModel, IRelationModel, TypeRelationShip } from "./model.interface";
import { IColumns, IOrder, IPaginate, QueryCondition } from "./query";
type queryMongoose<T> = (QueryCondition<T> & {
    sort?: IOrder<T>;
    limit?: number;
    skip?: number;
})
export class QueryBuilder<T> {
    protected model!: Model<T>;
    protected _columns: IColumns<T> = [];
    protected _order: IOrder<T>;
    protected _query: QueryCondition<T>;
    protected relations: Array<IRelationModel> = [];

    use(model: Model<T>) {
        this.model = model;
        return this;
    }

    select(columns: IColumns<T>): QueryBuilder<T> {
        this._columns = columns;
        return this;
    }

    query(query: QueryCondition<T>) {
        this._query = query;
        return this;
    }

    orderBy(order: IOrder<T>) {
        this._order = order;
        return this;
    }

    async paginate(paginate: IPaginate) {
        this.errorBuilder();
        const query: queryMongoose<T> = {
            ...this._query,
            limit: paginate.limit,
            skip: (paginate.page - 1) * paginate.limit,

        }
        if (this._order) {
            query.sort = this._order;
        }
        return await this.model.find(query).select(this._columns);
    }

    async get(): Promise<T[]> {
        this.errorBuilder();
        let query: queryMongoose<T> = {
            ...this._query,
        }
        if (this._order) {
            query.sort = this._order;
        }
        let promiseData = this.model.find(query);
        if (this._columns.length) {
            promiseData.select(this._columns);
        }
        let data: Array<any> = await promiseData;
        // console.log(this.model)
        if (this.relations.length) {
            let relationMap = await Promise.all(this.relations.map((item) => {
                let id: Array<ObjectId> = []
                switch (item.type) {
                    case TypeRelationShip.BelongTo:
                        id = data.map(e => new mongoose.Types.ObjectId(e[item.FK]));
                        break;
                    default:
                        break;
                }
                const dataRelation = new QueryBuilder().use(item.model.getModelSchema()).query({
                    [item.PK]: {
                        $in: id
                    }
                }).get();
                return dataRelation;
            }))
            relationMap = relationMap.reduce((target: any, item, index) => {
                const relation = this.relations[index];
                switch (relation.type) {
                    case TypeRelationShip.BelongTo:
                        target[this.relations[index].name] = item.reduce((targetChild, itemChild) => {
                            targetChild[itemChild[relation.PK].toString()] = itemChild;
                            return targetChild
                        }, {})

                    case TypeRelationShip.HasOne:

                        break;
                    case TypeRelationShip.HasMany:
                    default:
                        break;
                }

                return target;
            }, {})
            data = cloneObj(data)
            data = data.map((item) => {
                Object.keys(relationMap).forEach((key, index) => {
                    const relation = this.relations[index];
                    switch (relation.type) {
                        case TypeRelationShip.BelongTo:
                            item[key] = relationMap[key][item[relation.FK]] || null
                            break;
                        case TypeRelationShip.HasOne:
                            item[key] = relationMap[key][relation.PK] || null
                            break;
                        case TypeRelationShip.HasMany:
                            item[key] = relationMap[key][relation.PK] || []
                        default:
                            break;
                    }
                })
                return item;
            })
        }

        return data;
    }

    create(item: T): Promise<T> {
        return this.model.create(item);
    }

    with(relations: Array<IRelationModel>) {
        this.relations = relations;
        return this;
    }

    errorBuilder() {
        if (!this.model) throw new Error("Model is required");
        if (!this._query) throw new Error("Query is required");
        if (!this._columns) throw new Error("Column is required");
    }
}


