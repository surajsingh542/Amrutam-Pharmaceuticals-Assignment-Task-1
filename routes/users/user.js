const express = require("express");
const {
  signUpValidation,
  loginInValidation,
} = require("../../utils/validationSchemas");
const {
  userSignUpCtrl,
  userLoginctrl,
} = require("../../controllers/users/user");

const userRoutes = express.Router();

userRoutes.post("/signup", signUpValidation, userSignUpCtrl);
userRoutes.post("/login", loginInValidation, userLoginctrl);

module.exports = userRoutes;
