const router = require("express").Router();
const { auth : authMiddleware } = require("../middlewares/auth");
const ProductController = require("../controllers/product.controller");


router.get("/", ProductController.GetAllProducts); //bulk get products
router.get("/:id", ProductController.getProductById); // show specific product
router.post("/", authMiddleware, ProductController.CreateProduct); // create a product
router.put("/:id", authMiddleware, ProductController.UpdateProduct); // update a product
router.delete("/:id", authMiddleware, ProductController.DeleteProduct); // delete a products 


module.exports = router;

