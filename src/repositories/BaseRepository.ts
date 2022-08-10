// interface write and Read DB
import { NotFoundError, QueryDBError } from "../base/custom-error";
import mongoose, { Model } from "mongoose";
import { query } from "express-validator";

export declare type Op = "$eq" | "$in";

export declare type singleOperator<T> = {
  [key in Op]?: {
    [name in keyof T]?: any;
  };
};

export declare type QueryCondition<T> = singleOperator<T>;
export abstract class BaseRepository<T> {
  protected model!: Model<T>;
  //we created constructor with arguments to manipulate mongodb operations

  setModel(model) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  async find(item: any): Promise<T[]> {
    return await this.model.find(item);
  }

  get(query, selects, paginate = null) {
    // ép kiểu dữ kiệu cho các param này
    if (paginate) this.paginate;
    else this.model.find(query).select(selects);
  }

  // async populate(relate: string): Promise<T[]> {
  //   return await this.model.populate(relate) as T[];
  // }

  async findOne(query: QueryCondition<T>): Promise<T> {
    return await this.model.findOne(query);
  }

  async findOneAndUpdate(filter: any, item: any): Promise<T[]> {
    return this.model.findOneAndUpdate(filter, item, {
      new: true,
    });
  }

  async findById(id: string): Promise<T> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      return null;
    }
  }

  async findOrFail(item: any) {
    try {
      const result = await this.findOne(item);
      if (!result) {
        throw new NotFoundError("Database Error: Không tìm thấy");
      }
      return result;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new QueryDBError(error.message);
      }
    }
  }

  async create(item: any): Promise<T> {
    return await this.model.create(item);
  }

  /**
   *
   * @param item to write DB
   * @param findItem  to find DB from filter findItem
   * if findItem = null then find by _id in item
   */
  async createOrUpdate(item: any, findItem: any = null): Promise<T> {
    let checkExist: any = await this.findById(item._id);
    if (findItem) {
      checkExist = await this.findOne(findItem);
    }
    let objSchema: any = null;
    if (checkExist) {
      objSchema = await this.update(checkExist._id, item);
    } else {
      try {
        if (!item._id) delete item._id;
        objSchema = await this.create(item);
      } catch (error) {
        delete item._id;
        objSchema = await this.create(item);
      }
    }
    return objSchema;
  }

  async update(id: string, item: any): Promise<T> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundError("Database Error: Không tìm thấy");
    }
    return await this.model.findByIdAndUpdate(id, item, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundError("Database Error: Không tìm thấy");
    }
    return await this.model.findByIdAndDelete(id);
  }

  deleteMany(item: any) {
    return this.model.find(item).deleteMany();
  }

  deleteManyByID(ids) {
    return this.model.deleteMany({
      _id: { $in: ids },
    });
  }

  async count(filter = {}) {
    return this.model.count(filter);
  }

  async paginate(query: any, paginate) {
    let total = await this.count(query);
    let data = this.find({
      ...query,
      limit: paginate.limit,
      skip: paginate.page * paginate.limit,
    });
    return {
      total: total,
      data: data,
    };
  }
}

export class BaseQueryHelper {
  public static fieldSearch = (keyword, fieldName) => {
    const keywordMatch = [
      {
        [fieldName]: { $regex: `${keyword}`, $options: "gi" },
      },
    ];
    return {
      $or: keywordMatch,
    };
  };
}
