const AppErr = require("../utils/AppErr");
const getTokenFromCookie = require("../utils/getTokenFromCookie");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/users/users");

const isLogin = async (req, res, next) => {
  const token = getTokenFromCookie(req);
  const decodedUser = verifyToken(token);
  req.user = decodedUser.id;
  if (!decodedUser) {
    return next(AppErr("Invalid/Expired Token, Please Login Again", 401));
  }
  const userExist = await User.findById(req.user);
  if (!userExist) {
    return next(AppErr("User does not exist, Please Login Again", 401));
  }
  next();
};

module.exports = isLogin;
