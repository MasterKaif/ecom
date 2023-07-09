const express = require("express")
const router = express.Router();

const productController = require("../controller/productController");
const { valdateAddOrUpdateProductRequest } = require("../requestValidator/requestValidator");

router.post("/create", valdateAddOrUpdateProductRequest, productController.addProduct);
// router.get("/products", productController.fetchAllProduct);
router.get("/productByCategoryId/:categoryId", productController.fetchProductsByCategoryId);
router.get("/productByName/:name", productController.fetchProductByName);
router.get("/search",productController.search);


module.exports = router