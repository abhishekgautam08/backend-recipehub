const { Router } = require("express");
const {
  signupUserValidation,
  loginUserValidation,
} = require("../../validations/userValidations");
const {
  loginUserController,
  whoAmIController,
  
  signupUserController,
} = require("../../controllers/userController");
const { authorizeUser } = require("../../middlewares/authorize");

const router = Router();

router.route("/signup").post(signupUserValidation, signupUserController);
router.route("/login").post(loginUserValidation, loginUserController);
router.route("/me").get(authorizeUser, whoAmIController);

module.exports = router;
