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

const createUserBySocialId = async (
  social_id,
  username,
  profile_image,
  age,
  gender,
  email
) => {
  const queryRunner = database.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    let createUser = await queryRunner.query(
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
    let userId = createUser.insertId;
    let createBoard = await queryRunner.query(
      `INSERT INTO boards(
          name,
          user_id
          ) VALUES(?,?)
      `,
      ["기본", userId]
    );
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return userId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
};

const getInterest = async () => {
  return await database.query(
    `SELECT
        id,
        interest
        FROM interests`
  );
};

module.exports = {
  getUserBySocialId,
  createUserBySocialId,
  getInterest,
};
