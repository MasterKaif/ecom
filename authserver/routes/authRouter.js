const express = require("express")
const { accessToken, fetchNewAccessToken, aurthorize } = require("../controller/auth.controller")
const router = express.Router()


router.post("/getAccessToken", accessToken)
router.post("/refresh", fetchNewAccessToken)
router.get("/authorize", aurthorize)
module.exports = router