const router = require("express").Router();
const ReviewController = require("../controllers/Review.controller");


router.post("/product/:productId/reviews", ReviewController.CreateReview);  // create reviews

router.get("/product/:productId/reviews", ReviewController.getReviewsByProduct);  // create reviews

router.delete("/product/:productId/reviews/:reviewId", ReviewController.DeleteReview);  // create reviews



module.exports = router;

