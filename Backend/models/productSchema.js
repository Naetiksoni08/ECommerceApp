const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        min: 0,
        max: 1000000,
        required: [true, "Product price is required"]
    },
    Image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [false, 'Product description is not required'],
    }

},
    {
        timestamps: true
    });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
