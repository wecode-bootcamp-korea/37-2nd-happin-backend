const profileRouter = require('express').Router();
const { profileController } = require('../controllers');
const { loginRequired } = require('../../utils/auth');

profileRouter.get('/created', loginRequired, profileController.getCreatedList);
profileRouter.get('/stored', loginRequired, profileController.getStoredList);

module.exports = profileRouter;
