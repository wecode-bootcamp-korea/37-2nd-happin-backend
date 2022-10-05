const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const signIn = async (
  social_id,
  username,
  profile_image,
  age,
  gender,
  email
) => {
  let isRegistered = await userDao.getUserBySocialId(social_id);

  if (!isRegistered) {
    await userDao.createUserBySocialId(
      social_id,
      username,
      profile_image,
      age,
      gender,
      email
    );
    isRegistered = await userDao.getUserBySocialId(social_id);
  }

  const jwtToken = jwt.sign({ id: isRegistered.id }, process.env.KEY);

  return jwtToken;
};

const getInterest = async () => {
  return await userDao.getInterest();
};

module.exports = {
  signIn,
  getInterest,
};
