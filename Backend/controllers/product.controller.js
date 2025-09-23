const ProductModel = require("../models/productSchema");
const api = require("../utils/api");


module.exports.CreateProduct = async (req, res) => {
    try {
        const { name, price, Image, description } = req.body;
        const product = await ProductModel.create({ name, price, Image, description });
        api.success(res, product);
    } catch (error) {
        api.error(res, error)
    }

}


module.exports.getProductById = async (req, res) => {
    try {
        const productid = req.params.id;
        const Product = await ProductModel.findById(productid);
        // populate({path:"createdBy",select:"Fullname"});
        api.success(res, Product);
    } catch (error) {
        api.error(res, error);
    }

}

module.exports.GetAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({}) // get all  
        api.success(res, products);
    } catch (error) {
        api.error(res, error);
    }
}



module.exports.UpdateProduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const { name, price, Image, description } = req.body;

        const updatedproduct = await ProductModel.findByIdAndUpdate(productid, { name, price, Image, description }, { new: true });
        api.success(res, updatedproduct);
    } catch (error) {
        api.error(res, error);
    }
}


module.exports.DeleteProduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndDelete(productid);
        api.success(res, deletedProduct);
    } catch (error) {
        api.error(res, error);
    }
}




// create Product -- createproduct
// get specific product -- getproductbyid
// bulk get products -- getallproducts
// update products -- updateproduct
// delete products -- deleteproduct

