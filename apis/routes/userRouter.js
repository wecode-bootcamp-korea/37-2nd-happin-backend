const router = require("express").Router();

const { userController } = require("../controllers");

router.route("/kakao-signin").post(userController.makeTokenAsCode);
router.route("/interest").get(userController.getInterest)

module.exports = router;
