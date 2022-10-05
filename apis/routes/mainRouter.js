const router = require("express").Router();

const { mainController } = require("../controllers");
const { loginRequired } = require("../../utils/auth");
const { countInterests } = require("../../utils/interestsChecker")

router.route("/").get(loginRequired,countInterests,mainController.getMainPage);
router.route("/interest").post(loginRequired,mainController.createInterest)


module.exports = router;
