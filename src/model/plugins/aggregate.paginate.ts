const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

module.exports = function paginate(schema, options) {
  schema.plugin(aggregatePaginate);
  schema.statics.aggregatePaginateCustom = function paginateQuery(query, paginate) {
    const options: any = {
      page: paginate.page || 1,
      limit: paginate.limit || 20,
    };
    return this.aggregatePaginate(query, options);
  };
};
