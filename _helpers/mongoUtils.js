module.exports = pagination;

// custom pagination function
async function pagination(model, query, page, perPage) {
   return model.find(query).skip((page - 1) * perPage).limit(perPage - 0)
}