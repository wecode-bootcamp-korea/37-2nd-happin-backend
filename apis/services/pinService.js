const { pinDao, userDao } = require('../models');
const { s3, param } = require('../../utils/awsS3');

const getToCreatePin = async (userId) => {
  const user = await userDao.getUserInfo(userId);
  const interests = await pinDao.getInterests();
  const boards = await pinDao.getBoards(userId);

  return (result = { user, interests, boards });
};

const createPin = async (
  title,
  content,
  userId,
  pinImage,
  interests,
  boardId
) => {
  if (!pinImage || !title || !content || !userId || !interests || !boardId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }
  const interestsArray = interests.split(',');
  const forDelete = (param.Key = Date.now().toString() + pinImage.originalname);
  param.Body = pinImage.buffer;
  param.contentType = pinImage.mimetype;

  const getPinImageUrl = await s3
    .upload(param, (error, data) => {
      if (error) {
        error = new Error('IMAGE_WAS_NOT_UPLOADED');
        error.statusCode = 400;
        throw error;
      }
      return data;
    })
    .promise();

  const pinImageUrl = getPinImageUrl.Location;

  await pinDao.createPin(
    title,
    content,
    userId,
    pinImageUrl,
    interestsArray,
    boardId,
    forDelete
  );
};

const getPin = async (userId, pinId) => {
  if (!userId) {
    const error = new Error('LOGIN_REQUIRED');
    error.statusCode = 400;

    throw error;
  }

  if (!pinId) {
    const error = new Error('WRONG_REQUEST');
    error.statusCode = 400;

    throw error;
  }

  const pin = await pinDao.getPin(pinId);
  const pinInterests = await pinDao.getPinInterests(pinId);
  const boards = await pinDao.getBoards(userId);
  const author = await pinDao.getAuthor(pinId);

  return (result = { pin, author, pinInterests, boards });
};

const getToUpdatePin = async (userId, pinId) => {
  return (result = await pinDao.getToUpdatePin(userId, pinId));
};

const updatePin = async (userId, pinId, boardId, title, content) => {
  if (!title || !content) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }
  await pinDao.updatePin(userId, pinId, boardId, title, content);
};

const deletePin = async (userId, pinId) => {
  await pinDao.deletePin(userId, pinId);
};

module.exports = {
  getToCreatePin,
  createPin,
  getPin,
  getToUpdatePin,
  updatePin,
  deletePin,
};
