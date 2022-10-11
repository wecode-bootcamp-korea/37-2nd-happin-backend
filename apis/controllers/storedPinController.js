const { storedPinService } = require('../services');
const { catchAsync } = require('../../utils/error');

const createStoredPin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinId = req.params.pinId;
  const { boardId } = req.body;

  await storedPinService.createStoredPin(userId, pinId, boardId);

  res.status(201).send({ message: 'PIN_STORED_SUCCESSFULLY' });
});

const deleteStoredPin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinId = req.params.pinId;

  await storedPinService.deleteStoredPin(userId, pinId);

  res.status(200).send({ message: 'PIN_DELETED_SUCCESSFULLY' });
});

module.exports = {
  createStoredPin,
  deleteStoredPin,
};
