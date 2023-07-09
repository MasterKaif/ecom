const express = require("express")
const router = express.Router();

const categoryController = require("../controller/categoryController");
const { valdateAddOrUpdateCategroyRequest } = require("../requestValidator/requestValidator");

router.post("/create", valdateAddOrUpdateCategroyRequest ,categoryController.addCategory);
router.get("/categories", categoryController.fetchAllCategories);
router.get("/:categoryId", categoryController.fetchCategoryById);
router.get("/categoryByName/:name", categoryController.fetchCategoryByName);
// router.get("/delete/:id", categoryController.deleteCategory);

module.exports = router