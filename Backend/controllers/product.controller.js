const ProductModel = require("../models/productSchema");
const api = require("../utils/api");


module.exports.CreateProduct = async (req, res) => {
    try {
        const { name, price, Image, description } = req.body;
        const product = await ProductModel.create({ name, price, Image, description });
        api.success(res, product);
    } catch (error) {
        // console.log("error in creating product",error);
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
        // console.log("product fetched")
        api.success(res, products);
    } catch (error) {
        // console.log("error in bulk get");
        api.error(res, error);
    }
}



module.exports.UpdateProduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const { name, price, Image, description } = req.body;

        if (!productid) throw new Error("product id  Required !!");
        const data = {};

        if (name) data.name = name;
        if (price) data.price = price;
        if (Image) data.Image = Image;
        if (description) data.description = description;

        if (Object.keys(data).length == 0) {
            throw new Error("name,price,Image or description is Required !!"); // object is a class and usske andar .keys aur .values hai aur uske andar data pass karna hota hai fir uski length nikal lo agar equal to 0 hai that means ki bhai data is empty this is validation wala part backend level ka use joi or zod
        }

        const updatedproduct = await ProductModel.findByIdAndUpdate(productid, data, { new: true });
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

