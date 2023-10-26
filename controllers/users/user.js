const User = require("../../models/users/users");
const bcrypt = require("bcrypt");
const AppErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");
const { validationResult } = require("express-validator");

const userSignUpCtrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // update the password
    req.body.password = hashedPassword;

    // create user
    const user = await User.create(req.body);

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(AppErr(error.message, 500));
  }
};

const userLoginctrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    // check if user exists by searching via email
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(AppErr("Invalid Login Credentials", 400));
    }
    // check for passsword validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(AppErr("Invalid Login Credentials", 400));
    }

    if (req.body.deviceToken) {
      if (!userFound.deviceToken.includes(req.body.deviceToken)) {
        userFound.deviceToken.push(req.body.deviceToken);
        await userFound.save();
      }
    }

    // generate access_token
    const token = generateToken(userFound._id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .json({
        status: "success",
        user: userFound,
        token,
      });
  } catch (error) {
    return next(AppErr(error.message, 500));
  }
};

module.exports = {
  userSignUpCtrl,
  userLoginctrl,
};
