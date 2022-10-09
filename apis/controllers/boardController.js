const { boardService } = require('../services');
const { catchAsync } = require('../../utils/error');

const getBoards = catchAsync(async (req, res) => {
  const userId = req.id;
  const result = await boardService.getBoards(userId);

  res.status(200).json(result);
});

const getImagesOnBoard = catchAsync(async (req, res) => {
  const userId = req.id;
  const boardId = req.params.boardId;
  const pins = await boardService.getImagesOnBoard(userId, boardId);

  res.status(200).send({ boardId: boardId, pins });
});

const createBoard = catchAsync(async (req, res) => {
  const userId = req.id;
  const { boardName } = req.body;

  await boardService.createBoard(userId, boardName);

  res.status(201).send({ message: 'BOARD_CREATED_SUCCESSFULLY' });
});

const deleteBoard = catchAsync(async (req, res) => {
  const userId = req.id;
  const boardId = req.params.boardId;

  await boardService.deleteBoard(userId, boardId);

  res.status(200).send({ message: 'BOARD_DELETED_SUCCESSFULLY' });
});

const deletePinOnBoard = catchAsync(async (req, res) => {
  const userId = req.id;
  const boardId = req.params.boardId;
  const pinId = req.params.pinId;

  await boardService.deletePinOnBoard(userId, boardId, pinId);

  res.status(200).send({ message: 'PIN_ON_BOARD_DELETED_SUCESSFULLY' });
});

module.exports = {
  getBoards,
  getImagesOnBoard,
  createBoard,
  deleteBoard,
  deletePinOnBoard,
};
