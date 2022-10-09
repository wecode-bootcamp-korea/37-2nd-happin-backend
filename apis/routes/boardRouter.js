const boardRouter = require('express').Router();
const { boardController } = require('../controllers');
const { loginRequired } = require('../../utils/auth');

boardRouter.get('', loginRequired, boardController.getBoards);
boardRouter.get('/:boardId', loginRequired, boardController.getImagesOnBoard);
boardRouter.post('', loginRequired, boardController.createBoard);
boardRouter.delete(
  '/:boardId/:pinId',
  loginRequired,
  boardController.deletePinOnBoard
);
boardRouter.delete('/:boardId', loginRequired, boardController.deleteBoard);

module.exports = boardRouter;
