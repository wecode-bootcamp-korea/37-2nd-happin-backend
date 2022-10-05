const { mainDao } = require("../models");

const getMainPage = async (
  id,
  search,
  age,
  gender,
  interests,
  limit,
  offset,
  regInterest
) => {
  const main = await mainDao.getMainPage(
    id,
    search,
    age,
    gender,
    interests,
    limit,
    offset,
    regInterest
  );

  const user = await mainDao.getUserById(id);
  const board = await mainDao.getUserBoardById(id);
  let result = { users: user, boards: board, pins: main };

  return result;
};

const createInterest = async (id, interests) => {
  return await mainDao.createInterest(id, interests);
};

module.exports = {
  getMainPage,
  createInterest,
};
