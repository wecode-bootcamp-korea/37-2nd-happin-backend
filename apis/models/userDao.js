const database = require('./dataSource');

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
        id,
        interest
        FROM interests`
  );
};

const getUserInfo = async (userId) => {
  const [result] = await database.query(
    `
    SELECT 
        id AS userId,
        username,
        email,
        profile_image AS profileImage
    FROM users
    WHERE id = ?
    `,
    [userId]
  );
  return result;
};

module.exports = {
  getUserBySocialId,
  createUser,
  getInterest,
  getUserInfo,
};
