const productsModel = require('../models/productsModel')
const pagination = require('../_helpers/mongoUtils')

module.exports = {
    getProducts
};

async function getProducts(search, options) {
    let query;
    if (search) {
        query = { $or: [{ category: { $regex: search } }, { store: { $regex: search } }] }
    }
    else {
        query = {};
    }
    return pagination(productsModel, query, options.page, options.perPage);
}



