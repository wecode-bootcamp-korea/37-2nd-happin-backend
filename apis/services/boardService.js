const { boardDao } = require('../models');

const getBoards = async (userId) => {
  const result = await boardDao.getBoards(userId);
  return result;
};

const getImagesOnBoard = async (userId, boardId) => {
  const result = await boardDao.getImagesOnBoard(userId, boardId);
  return result;
};

const createBoard = async (userId, boardName) => {
  if (!boardName) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  await boardDao.createBoard(userId, boardName);
};

const deleteBoard = async (userId, boardId) => {
  await boardDao.deleteBoard(userId, boardId);
};

const deletePinOnBoard = async (userId, boardId, pinId) => {
  await boardDao.deletePinOnBoard(userId, boardId, pinId);
};

module.exports = {
  getBoards,
  getImagesOnBoard,
  createBoard,
  deleteBoard,
  deletePinOnBoard,
};
