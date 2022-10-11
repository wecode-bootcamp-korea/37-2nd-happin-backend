const storedPinRouter = require('express').Router();
const { storedPinController } = require('../controllers');
const { loginRequired } = require('../../utils/auth');

storedPinRouter.post('/:pinId', storedPinController.createStoredPin);
storedPinRouter.delete('/:pinId', storedPinController.deleteStoredPin);

module.exports = storedPinRouter;
