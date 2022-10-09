const database = require('./dataSource');

const getCreatedList = async (userId) => {
  const result = await database.query(
    `
    SELECT
        p.id pinId,
        p.pin_image pinImage,
        b.name boardName,
        b.id boardId
    FROM pins p
    LEFT JOIN custom_boards cb
    ON p.id = cb.pin_id
    LEFT JOIN boards b
    ON b.user_id = p.user_id
    AND b.id = cb.board_id
    WHERE p.user_id = ?
    GROUP BY p.id
        `,
    [userId]
  );
  return result;
};

const getStoredList = async (userId) => {
  const result = await database.query(
    `
    SELECT
        b.name boardName,
        b.id boardId,
        GROUP_concat(cb.pin_id) pinId,
        p.pin_image thumbnail
    FROM boards b
    LEFT JOIN custom_boards cb
    ON cb.board_id = b.id
    LEFT JOIN pins p
    ON p.id = cb.pin_id
    WHERE b.user_id = ?
    GROUP BY b.name
    `,
    [userId]
  );
  return result;
};

module.exports = {
  getCreatedList,
  getStoredList,
};
