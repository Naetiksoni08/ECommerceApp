const reviewModel = require("../models/Review.models");
const ProductModel = require("../models/productSchema");
const api = require("../utils/api");



module.exports.CreateReview = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const{productId} = req.params;

       if(!productId)  return api.error(res,"Product Id required",400);
       

        const review = await reviewModel.create({ text, rating });

        const product = await ProductModel.findById(productId);

      
        if(!product) return api.error(res,"Product not Found",404);
           

        product.review.push(review._id);
        await product.save();

        api.success(res, review);

    } catch (error) {

        api.error(res, error)
    }
}





module.exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findById(productId).populate('review');
        if (!product) return api.error(res, "Product not found", 404);

        api.success(res, product.review);

    } catch (error) {

        api.error(res, error);
    }
};


module.exports.DeleteReview = async (req, res) => {

    try {
        const { reviewId, productId } = req.params;

       
      const review = await reviewModel.findByIdAndDelete(reviewId);

        const product = await ProductModel.findById(productId);
        if (product) {
            product.review = product.review.filter(id => id.toString() !== reviewId);
            await product.save();
        }

        api.success(res, null, "Review deleted successfully");
    } catch (err) {

        api.error(res, err);
    }
};



