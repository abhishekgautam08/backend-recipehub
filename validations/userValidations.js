const { body } = require("express-validator");

const loginUserValidation = [
  body("username", "Enter valid username").isLength({ min: 3 }),
  body("password", "Enter valid password").isLength({
    min: 3,
  }),
];

const signupUserValidation = [
  body("username", "Enter valid username").isLength({ min: 3 }),
  body("password", "Enter valid password").isLength({
    min: 3,
  }),
];



module.exports = { loginUserValidation, signupUserValidation };
