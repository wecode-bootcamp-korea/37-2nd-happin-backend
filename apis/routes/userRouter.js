const userRouter = require('express').Router();
const { userController } = require('../controllers');

// userRouter.get('/kakao/start', userController.startKakaoLogin);
// userRouter.get('/kakao/finish', userController.finishKakaoLogin);
userRouter.get('/kakao/code', userController.getKakaoAuthorizationCode);
userRouter.get('/ping', userController.pong);

module.exports = userRouter;
