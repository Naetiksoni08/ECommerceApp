const router = require("express").Router();
const WishlistController = require("../controllers/wishlist.controller");

router.get("/", WishlistController.GetWishlist);
router.post("/add", WishlistController.AddToWishlist);
router.delete("/remove/:id", WishlistController.RemoveFromWishlist);

module.exports = router;