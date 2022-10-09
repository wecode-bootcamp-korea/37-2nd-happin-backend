const database = require('../models/dataSource');

const getBoards = async (userId) => {
  const result = await database.query(
    `
        SELECT
            b.id boardId,
            b.name boardName
        FROM boards b
        WHERE user_id = ?
        `,
    [userId]
  );
  return result;
};

const getImagesOnBoard = async (userId, boardId) => {
  const result = await database.query(
    `
    SELECT
      cb.pin_id pinId,
      p.pin_image pinImage
    FROM boards b
    JOIN custom_boards cb
    ON b.id = cb.board_id
    JOIN pins p
    ON p.id = cb.pin_id
    WHERE b.user_id = ?
    AND b.id = ?
    `,
    [userId, boardId]
  );
  return result;
};

const createBoard = async (userId, boardName) => {
  const result = await database.query(
    `
    INSERT INTO boards(
        name,
        user_id
    ) VALUES (
        ?, ?
    )
    `,
    [boardName, userId]
  );
  return result.affectedRows;
};

const deleteBoard = async (userId, boardId) => {
  const result = await database.query(
    `
    DELETE FROM boards
    WHERE id = ?
    AND user_id = ?
    `,
    [boardId, userId]
  );
  if (result.affectedRows === 0 || result.affectedRows > 1) {
    const error = new Error('WRONG_DATA_INPUT');
    error.statusCode = 400;

    throw error;
  }
  return result.affectedRows;
};

const deletePinOnBoard = async (userId, boardId, pinId) => {
  const result = await database.query(
    `
    DELETE FROM custom_boards
    WHERE pin_id = ?
    AND EXISTS (SELECT ? FROM boards WHERE user_id = ?)
    `,
    [pinId, boardId, userId]
  );
  if (result.affectedRows === 0 || result.affectedRows > 1) {
    const error = new Error('WRONG_DATA_INPUT');
    error.statusCode = 400;

    throw error;
  }
  return result.affectedRows;
};

module.exports = {
  getBoards,
  getImagesOnBoard,
  createBoard,
  deleteBoard,
  deletePinOnBoard,
};
