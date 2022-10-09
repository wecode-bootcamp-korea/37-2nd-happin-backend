const { profileService } = require('../services');
const { catchAsync } = require('../../utils/error');

const getCreatedList = catchAsync(async (req, res) => {
  const userId = req.id;

  const result = await profileService.getCreatedList(userId);
  res.status(200).json(result);
});

const getStoredList = catchAsync(async (req, res) => {
  const userId = req.id;
  const result = await profileService.getStoredList(userId);

  res.status(200).json(result);
});

module.exports = {
  getCreatedList,
  getStoredList,
};
