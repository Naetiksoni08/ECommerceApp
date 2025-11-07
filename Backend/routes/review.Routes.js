const router = require("express").Router();
const ReviewController = require("../controllers/Review.controller");
const { auth } = require("../middlewares/auth");


router.get("/product/:productId/reviews", ReviewController.getReviewsByProduct);  // get reviews
router.post("/product/:productId/reviews", auth, ReviewController.CreateReview);  // create reviews
router.delete("/product/:productId/reviews/:reviewId", auth, ReviewController.DeleteReview);  // delete reviews



module.exports = router;

