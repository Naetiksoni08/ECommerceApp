const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
const { auth } = require("../middlewares/auth");



router.get("/", auth, CartController.GetCart);
router.post("/add", auth, CartController.AddtoCart);
router.delete("/removed/:id", auth, CartController.RemoveCart);

module.exports = router