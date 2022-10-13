const database = require('./dataSource');
const queryRunner = database.createQueryRunner();

const createStoredPin = async (userId, pinId, boardId) => {
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const insertStoredPin = await queryRunner.query(
      `
      INSERT INTO stored_pins
      (user_id, pin_id)
      SELECT ?, ?
      FROM DUAL
      WHERE NOT EXISTS
      (SELECT user_id, id FROM pins
      WHERE user_id = ? AND id = ?)
      `,
      [userId, pinId, userId, pinId]
    );
    if (insertStoredPin.affectedRows !== 1) {
      const error = new Error('PIN_NOT_SELECTED');
      error.statusCode = 400;

      throw error;
    }
    const insertCustomBoard = await queryRunner.query(
      `
      INSERT INTO custom_boards
      (board_id, pin_id)
      SELECT ?, ?
      FROM DUAL
      WHERE EXISTS
      (SELECT id,user_id FROM boards
      WHERE user_id = ? AND id = ?)
      `,
      [boardId, pinId, userId, boardId]
    );
    if (insertCustomBoard.affectedRows !== 1) {
      const error = new Error('BOARD_NOT_SELECTED');
      error.statusCode = 400;

      throw error;
    }
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  }
};

const deleteStoredPin = async (userId, pinId) => {
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const result = await queryRunner.query(
      `DELETE FROM stored_pins
        WHERE user_id = ?
        AND pin_id = ?
      `,
      [userId, pinId]
    );
    if (result.affectedRows > 1 || result.affectedRows === 0) {
      const error = new Error('NOT_DELETED');
      error.statusCode = 400;
      throw error;
    }
    await queryRunner.commitTransaction();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  }
};

module.exports = {
  createStoredPin,
  deleteStoredPin,
};
