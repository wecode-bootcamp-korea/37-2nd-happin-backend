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

  return main;
};

const createInterest = async (id,interests) => {
  return await mainDao.createInterest(id,interests);
};

module.exports = {
  getMainPage,
  createInterest,
};
