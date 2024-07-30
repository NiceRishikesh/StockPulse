const express = require('express')
const router = express.Router()
const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");


router.use("/auth", authRouter);
router.use("/blog", blogRouter);






module.exports = router
