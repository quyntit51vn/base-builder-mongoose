import { cloneObj } from "../utils/helper";

export abstract class BaseDTO {
  protected obj;
  protected user: any = null;
  abstract toSimpleJSON();

  protected abstract fillable: Array<string>;
  protected abstract fillableDB: Array<string>;
  protected default = {};
  protected cast = {};

  toJSON(fields: Array<string>) {
    const listFieldSuccess = fields.filter((e) => this.fillable.includes(e));

    let res = {};
    for (const field of listFieldSuccess) {
      res = cloneObj(res);
      res[field] =
        this.obj[field] || typeof this.obj[field] == 'boolean' || typeof this.obj[field] == 'number'
          ? this.obj[field]
          : this.default[field] != undefined
          ? this.default[field]
          : null;
      if (this.cast[field] instanceof Function) res[field] = this.cast[field](res[field]);
    }
    return res;
  }

  toDBJSON() {
    return this.toJSON(this.fillableDB);
  }

  setAttribute = (key, value) => {
    this.obj[key] = value;
  };

  setDefault = (key, value) => {
    this.default[key] = value;
  };

  setUser = (user) => {
    this.user = user;
    return this;
  };
}
