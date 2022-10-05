const axios = require("axios");

const { userService } = require("../services");
const { catchAsync } = require("../../utils/error");


const makeTokenAsCode = catchAsync(async (req, res, next) => {
  let { code } = req.body;
  let getToken = await axios({
    method: "post",
    url: "https://kauth.kakao.com/oauth/token",
    params: {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECERET,
      redirect_uri: process.env.REDIRECT_URL,
      code: code,
    },
    withCredentials: true,
  });

  if (!getToken) {
    const error = new Error("CHEACK YOUR TOKEN OR URL");
    error.statusCode = 400;
    console.error(error);
    next(error);
  }

  let access_token = await getToken.data.access_token;

  let getProfile = await axios({
    method: "post",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    withCredentials: true,
  });

  if (!getProfile) {
    const error = new Error("CHEACK YOUR TOKEN OR URL");
    error.statusCode = 400;
    console.error(error);
    next(error);
  }

  let { id: social_id, kakao_account } = getProfile.data;
  let { profile } = kakao_account;
  let { nickname: username, profile_image_url: profile_image } = profile;
  let { has_email, has_age_range, has_gender } = kakao_account;

  if (has_gender == true) {
    gender = kakao_account.gender;
  } else {
    gender = "NULL";
  }
  if (has_email == true) {
    email = kakao_account.email;
  } else {
    email = "NULL";
  }
  if (has_age_range == true) {
    age_range = kakao_account.age_range;
    age = age_range.charAt(0);
  } else {
    age = "NULL";
  }

  let jwt_token = await userService.signIn(
    social_id,
    username,
    profile_image,
    age,
    gender,
    email
  );

  return await res.status(200).json({ accessToken: jwt_token });
});

const getInterest = catchAsync(async (req, res, next) => {
  let result = await userService.getInterest();
  return await res.status(200).json(result);
});
module.exports = {
  makeTokenAsCode,
  getInterest,
};
