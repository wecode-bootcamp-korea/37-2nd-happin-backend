const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const storedPinRouter = require('./storedPinRouter');

router.use('/user', userRouter);
router.use('/storing', storedPinRouter);

module.exports = router;
