const getTokenFromCookie = (req) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return {
      status: "failed",
      message: "There is no token attached to the cookie",
    };
  }
  return token;
};

module.exports = getTokenFromCookie;
