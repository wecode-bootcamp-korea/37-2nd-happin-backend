const database = require("./dataSource");

const getUserBySocialId = async (social_id) => {
  const [user] = await database.query(
    `SELECT
      id
      FROM users
      WHERE social_id = ? `,
    [social_id]
  );
  return user;
};

const createUser = async (
  social_id,
  username,
  profile_image,
  age,
  gender,
  email
) => {
  return await database.query(
    `INSERT INTO users(
      social_id,
      username,
      profile_image,
      age,
      gender,
      social_type_id,
      email
    ) VALUES (?,?,?,?,?,"1",?)
    `,
    [social_id, username, profile_image, age, gender, email]
  );
};

const getInterest = async () => {
  return await database.query(
    `SELECT
        *
        FROM interests`
  );
};

module.exports = {
  getUserBySocialId,
  createUser,
  getInterest,
};
