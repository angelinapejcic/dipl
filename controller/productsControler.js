const productsService = require('../service/productsService')

exports.getProducts = async (req, res, next) => {
    try {
        let options;
        if (req.query && req.query.page && req.query.perPage) {
            options =
            {
                page: req.query.page,
                perPage: req.query.perPage
            }
        }
        else {
            options =
            {
                page: 1,
                perPage: 10
            }
        }

        const products = await productsService.getProducts(req.query.search, options);
        res.status(200).json(products);
    } catch (e) {
        return next(e)
    }
}
