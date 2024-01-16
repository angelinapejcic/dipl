const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema =new Schema({
    category: String,
    link: String,
    price: String,
    image: String,
    store: String,
    additionalInfo: String
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
