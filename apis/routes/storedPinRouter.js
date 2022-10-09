const storedPinRouter = require('express').Router();
const { storedPinController } = require('../controllers');
const { loginRequired } = require('../../utils/auth');

storedPinRouter.post(
  '/:pinId',
  loginRequired,
  storedPinController.createStoredPin
);
storedPinRouter.delete(
  '/:pinId',
  loginRequired,
  storedPinController.deleteStoredPin
);

module.exports = storedPinRouter;
