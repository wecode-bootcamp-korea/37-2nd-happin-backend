const { mainService } = require("../services");
const { catchAsync } = require("../../utils/error");

const getMainPage = catchAsync(async (req, res, next) => {
  const { id, query, regInterest } = req;
  let search = (age = gender = interests = limit = offset = "");

  if (query.search) {
    search = query.search;
  }
  if (query.age) {
    age = query.age;
  }
  if (query.gender && typeof query.gender != "object") {
    gender = `"${query.gender}"`;
  }
  if (query.interests && typeof query.interests == "object") {
    interests = [];
    let interestsArray = query.interests;
    for (i in interestsArray) {
      interests.push(`"${interestsArray[i]}"`);
    }
  } else if (query.interests && typeof query.interests != "object") {
    interests = `"${query.interests}"`;
  }
  if (query.limit) {
    limit = query.limit;
  }
  if (query.offset) {
    offset = query.offset;
  }

  const result = await mainService.getMainPage(
    id,
    search,
    age,
    gender,
    interests,
    limit,
    offset,
    regInterest
  );

  return res.status(200).json(result);
});

const createInterest = catchAsync(async (req, res, next) => {
  const { id, body } = req;
  const { interests } = body;
  console.log(id, interests);
  let result = await mainService.createInterest(id, interests);
  return res.status(201).json(result);
});

module.exports = {
  getMainPage,
  createInterest,
};
