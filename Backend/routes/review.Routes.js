const router = require("express").Router();
const ReviewController = require("../controllers/Review.controller");


router.post("/product/:productId/reviews", ReviewController.CreateReview);  // create reviews

router.get("/product/:productId/reviews", ReviewController.getReviewsByProduct);  // get reviews

router.delete("/product/:productId/reviews/:reviewId", ReviewController.DeleteReview);  // delete reviews



module.exports = router;

