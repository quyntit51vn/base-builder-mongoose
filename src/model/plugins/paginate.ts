const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = function paginate(schema, options) {
  schema.plugin(mongoosePaginate);
  schema.statics.paginateCustom = function paginateQuery(query, paginate) {
    const options: any = {
      page: paginate.page || 1,
      limit: paginate.limit || 20,
    };
    return this.paginate(query, options);
  };
};
