const { profileDao } = require('../models');
const { userDao } = require('../models');

const getCreatedList = async (userId) => {
  const userInfo = await userDao.getUserInfo(userId);
  const createdList = await profileDao.getCreatedList(userId);

  return (result = { userInfo, createdList });
};

const getStoredList = async (userId) => {
  const userInfo = await userDao.getUserInfo(userId);
  const boards = await profileDao.getStoredList(userId);

  return (result = { userInfo, boards });
};

module.exports = {
  getCreatedList,
  getStoredList,
};
