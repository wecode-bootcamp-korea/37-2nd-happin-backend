const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const storedPinRouter = require('./storedPinRouter');
const boardRouter = require('./boardRouter');
const profileRouter = require('./profileRouter');
const mainRouter = require('./mainRouter');
const pinRouter = require('./pinRouter');

router.use('/user', userRouter);
router.use('/storing', storedPinRouter);
router.use('/boards', boardRouter);
router.use('/profile', profileRouter);
router.use('/main', mainRouter);
router.use('/pin', pinRouter);

module.exports = router;
