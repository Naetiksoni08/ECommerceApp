const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes")
const reviewRoutes = require("./review.Routes");



router.use("/auth",authRoutes);
router.use("/product",productRoutes);
router.use("/review",reviewRoutes);



module.exports = router;