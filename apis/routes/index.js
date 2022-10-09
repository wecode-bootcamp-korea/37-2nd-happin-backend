const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const storedPinRouter = require('./storedPinRouter');
const boardRouter = require('./boardRouter');

router.use('/user', userRouter);
router.use('/storing', storedPinRouter);
router.use('/boards', boardRouter);

module.exports = router;
