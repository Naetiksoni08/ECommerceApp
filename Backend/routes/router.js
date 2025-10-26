const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes")
const reviewRoutes = require("./review.Routes");
const cartRoutes = require("./cart.routes");



router.use("/auth",authRoutes);
router.use("/product",productRoutes);
router.use("/review",reviewRoutes);
router.use("/cart",cartRoutes);



module.exports = router;


