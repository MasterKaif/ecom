const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/registerUser", userController.registerUser);
router.post("/login", userController.loginUser);


module.exports = router