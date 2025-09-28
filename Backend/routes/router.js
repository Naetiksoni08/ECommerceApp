const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes")




router.use("/auth",authRoutes);
router.use("/product",productRoutes);



module.exports = router;