const { storedPinDao } = require('../models');

const createStoredPin = async (userId, pinId, boardId) => {
  return (result = await storedPinDao.createStoredPin(userId, pinId, boardId));
};

const deleteStoredPin = async (userId, pinId) => {
  return (result = await storedPinDao.deleteStoredPin(userId, pinId));
};

module.exports = {
  createStoredPin,
  deleteStoredPin,
};
