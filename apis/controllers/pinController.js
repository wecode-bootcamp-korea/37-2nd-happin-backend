const { pinService } = require('../services');
const { catchAsync } = require('../../utils/error');

const getToCreatePin = catchAsync(async (req, res) => {
  const userId = req.id;
  const data = await pinService.getToCreatePin(userId);

  res.status(200).json(data);
});

const createPin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinImage = req.file;
  const { title, content, interests, boardId } = req.body;
  await pinService.createPin(
    title,
    content,
    userId,
    pinImage,
    interests,
    boardId
  );

  res.status(201).send({ message: 'PIN_CREATED_SUCCESSFULLY' });
});

const getPin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinId = req.params.pinId;

  const result = await pinService.getPin(userId, pinId);
  res.status(200).json(result);
});

const getToUpdatePin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinId = req.params.pinId;

  const result = await pinService.getToUpdatePin(userId, pinId);

  res.status(200).json(result);
});

const updatePin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinId = req.params.pinId;
  const { boardId, title, content } = req.body;

  await pinService.updatePin(userId, pinId, boardId, title, content);

  res.status(201).send({ message: 'PIN_UPDATED_SUCCESSFULLY' });
});

const deletePin = catchAsync(async (req, res) => {
  const userId = req.id;
  const pinId = req.params.pinId;

  await pinService.deletePin(userId, pinId);

  res.status(200).send({ message: 'PIN_DELETED_SUCCESSFULLY' });
});

module.exports = {
  getToCreatePin,
  createPin,
  getPin,
  getToUpdatePin,
  updatePin,
  deletePin,
};
