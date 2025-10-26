const ProductModel = require("../models/productSchema");
const api = require("../utils/api");
const UserModel = require("../models/User.models")


module.exports.AddtoCart = async (req, res) => {
    try {
        const userid = req.user.id;
        const { productid } = req.body;
        const user = await UserModel.findById(userid);
        if (!user) return api.error(res, null, "User not Found", 404);

        if (user.cart.includes(productid)) {
            return api.error(res, null, "Product already in the cart",400);

        }
        user.cart.push(productid);
        await user.save();

        api.success(res, null, "Product Added to Cart");

    } catch (error) {
        api.error(res, error);
    }
}



module.exports.GetCart = async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await UserModel.findById(userid).populate("cart");

        if (!user) return api.error(res, null, "User not found", 404);

        api.success(res, user.cart)
    } catch (error) {
        api.error(res, error);

    }

}

module.exports.RemoveCart = async (req, res) => {
    try {
        const userid = req.user.id;
        const productid = req.params.id;

        const user = await UserModel.findById(userid)
        if (!user) return api.error(res, null, "User not found", 404);

        user.cart = user.cart.filter(pid => pid.toString() !== productid);


        await user.save();

        api.success(res, null, "Product Removed Successfully", 200);

    } catch (error) {
        api.error(res, error);

    }
}