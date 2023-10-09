const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchUser = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.send({ error: "please authenticate using a valid token" });
  }
  try {
    const authedUser = jwt.verify(token, process.env.JWT_SIGN);
    req.user = authedUser.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

module.exports = fetchUser;