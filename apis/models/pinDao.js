const database = require('./dataSource');
const queryRunner = database.createQueryRunner();
const { s3 } = require('../../utils/awsS3');

const getAuthor = async (userId) => {
  const user = await database.query(
    `
    SELECT
        u.id userId,
        u.email,
        u.username userName,
        u.gender,
        u.age,
        u.profile_image profileImage
    FROM users u
    JOIN pins p
    ON p.user_id = u.id
    WHERE p.id = ?
    `,
    [userId]
  );
  return user;
};

const getInterests = async () => {
  const interests = await database.query(
    `
    SELECT
        i.id interestId,
        i.interest
    FROM interests i
    `
  );
  return interests;
};

const getBoards = async (userId) => {
  const boards = await database.query(
    `
    SELECT
        b.id boardId,
        b.name boardName
    FROM
        boards b
    WHERE b.user_id = ?
    `,
    [userId]
  );
  return boards;
};

const createPin = async (
  title,
  content,
  userId,
  pinImageUrl,
  interestsArray,
  boardId,
  forDelete
) => {
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const createPin = await queryRunner.query(
      `
      INSERT INTO pins (
          title,
          content,
          user_id,
          pin_image
      ) VALUES (
          ?, ?, ?, ?
      )
      `,
      [title, content, userId, pinImageUrl]
    );
    const pinId = createPin.insertId;

    const createCustomBoard = await queryRunner.query(
      `
      INSERT INTO custom_boards (
          board_id,
          pin_id
      ) VALUES (
          ?, ?
      )
      `,
      [boardId, pinId]
    );
    let values = '';
    for (let i = 0; i < interestsArray.length; i++) {
      if (i == 0) values += `(${pinId}, ${interestsArray[i]})`;
      else values += `, (${pinId}, ${interestsArray[i]})`;
    }
    const createPinInterests = await queryRunner.query(
      `INSERT INTO pin_interests(
          pin_id,
          interest_id
      ) VALUES 
      ${values}
      `
    );
    await queryRunner.commitTransaction();
  } catch (error) {
    const param = {
      Bucket: 'wecodeproject',
      Key: forDelete,
    };
    s3.deleteObject(param, (data) => {
      return data;
    });
    await queryRunner.rollbackTransaction();

    throw error;
  }
};

const getPin = async (pinId) => {
  const [result] = await database.query(
    `
    SELECT
        p.id pinId,
        p.title,
        p.content,
        p.user_id userId,
        p.pin_image pinImage
    FROM pins p
    WHERE p.id = ?
    `,
    [pinId]
  );
  return result;
};

const getPinInterests = async (pinId) => {
  const pinInterests = await database.query(
    `
    SELECT
        pi.interest_id interestId,
        i.interest
    FROM pin_interests pi
    JOIN interests i
    ON pi.interest_id = i.id
    WHERE pi.pin_id = ?
    `,
    [pinId]
  );
  return pinInterests;
};

const getToUpdatePin = async (userId, pinId) => {
  const [result] = await database.query(
    `
    SELECT
        p.id pinId,
        p.title,
        p.content,
        p.pin_image pinImage,
        GROUP_CONCAT(b.id) boardId,
        GROUP_CONCAT(b.name) boardName
    FROM pins p
    JOIN boards b
    ON b.user_id = p.user_id
    WHERE p.user_id = ?
    AND p.id = ?
    GROUP BY p.id
    `,
    [userId, pinId]
  );
  return result;
};

const updatePin = async (userId, pinId, boardId, title, content) => {
  const updatedPin = await database.query(
    `
    UPDATE pins 
      SET 
        title = ?,
        content = ?
      WHERE user_id = ?
      AND id = ?
    `,
    [title, content, userId, pinId]
  );
  if (boardId === null) {
    return updatedPin;
  }
  if (boardId !== null) {
    const customBoard = await database.query(
      `
    INSERT INTO custom_boards(
        board_id,
        pin_id
    ) VALUES (
        ?,?
    )
    `,
      [boardId, pinId]
    );
  }
};

const deletePin = async (userId, pinId) => {
  const result = await database.query(
    `
    DELETE FROM pins
    WHERE user_id = ?
    AND id = ?
    `,
    [userId, pinId]
  );
  if (result.affectedRows !== 1) {
    const error = new Error('NOT_DELETED');
    error.statusCode = 400;

    throw error;
  }
  return result.affectedRows;
};

module.exports = {
  getAuthor,
  getInterests,
  getBoards,
  createPin,
  getPin,
  getPinInterests,
  getToUpdatePin,
  updatePin,
  deletePin,
};
