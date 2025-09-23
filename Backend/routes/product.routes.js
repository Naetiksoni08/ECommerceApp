const router = require("express").Router()
const ProductController = require("../controllers/product.controller");


router.get("/", ProductController.GetAllProducts); //bulk get products
router.get("/:id", ProductController.getProductById); // show specific product
router.post("/", ProductController.CreateProduct); // create a product
router.put("/:id", ProductController.UpdateProduct); // update a product
router.delete("/:id", ProductController.DeleteProduct); // delete a products 

