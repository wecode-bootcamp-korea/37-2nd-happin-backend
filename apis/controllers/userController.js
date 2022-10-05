const { json } = require('body-parser');
const { userService } = require('../services');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const pong = (req, res) => {
  res.status(200).json('pong');
};

// const startKakaoLogin = (req, res) => {
//   const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
//   const config = {
//     client_id: '681d68167a8b6c9aca13866ac009abd5',
//     redirect_uri: 'http://localhost:8000/users/kakao/finish',
//     response_type: 'code',
//   };

//   const params = new URLSearchParams(config).toString();
//   console.log('33333333333333333');
//   console.log(params);
//   console.log('33333333333333333');

//   const finalUrl = `${baseUrl}?${params}`;
//   console.log(finalUrl);
//   return res.redirect(finalUrl);
// };

const getKakaoAuthorizationCode = async (req, res) => {
  const redirectUrl = `${process.env.KAKAO_BASEURL}authorize?client_id=${process.env.KAKAO_CLIENT}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&prompt=login&response_type=code`;

  try {
    res.redirect(redirectUrl);
  } catch (error) {
    if (String(res.location).includes('error = access_denied')) {
      const error = new Error('LOGIN_DENIED');
      error.statusCode = 400;

      throw error;
    }
  }
};

const finishKakaoLogin = async (req, res) => {
  console.log('eeeeeeeeeeeeeeeeeeeeeee');
  console.log(req.query);
  console.log('eeeeeeeeeeeeeeeeeeeeeee');

  const baseUrl = 'https://kauth.kakao.com/oauth/token';
  const config = {
    client_id: process.env.KAKAO_CLIENT,
    client_secret: process.env.KAKAO_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:8000/users/kakao/finish',
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    })
  ).json();
  console.log(kakaoTokenRequest);
  if ('access_token' in kakaoTokenRequest) {
    const { access_token } = kakaoTokenRequest;
    const userRequest = await (
      await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/json',
        },
      })
    ).json();
    console.log(userRequest);
  } else {
    return res.redirect('/login');
  }
};

module.exports = {
  pong,
  //   startKakaoLogin,
  //   finishKakaoLogin,

  getKakaoAuthorizationCode,
};
