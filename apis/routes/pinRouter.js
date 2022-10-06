const pinRouter = require('express').Router();
const { pinController } = require('../controllers');
const { upload } = require('../../utils/multer');
const { loginRequired } = require('../../utils/auth');

pinRouter.get('', loginRequired, pinController.getToCreatePin);
pinRouter.get('/:pinId', loginRequired, pinController.getPin);
pinRouter.post(
  '',
  loginRequired,
  upload.single('pinImage'),
  pinController.createPin
);
pinRouter.get('/update/:pinId', loginRequired, pinController.getToUpdatePin);
pinRouter.patch('/update/:pinId', loginRequired, pinController.updatePin);
pinRouter.delete('/:pinId', loginRequired, pinController.deletePin);

module.exports = pinRouter;
