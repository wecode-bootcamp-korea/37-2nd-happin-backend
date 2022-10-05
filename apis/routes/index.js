const express = require("express");
const router = express.Router();

const mainRouter = require("./mainRouter");

router.use("/main", mainRouter);

module.exports = router;
