const express = require("express");
require("dotenv").config();
const router = express.Router();
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/studentModel");
const fetchUser = require("../middleware/authMiddleware.js");

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //check whether there are any errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //using bcryptjs to generate salt and hash the password to prevent hackers from accesing the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //using try and catch to avoid any unesscary errors
    try {
      //check whether the user with the email already exsists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(500)
          .json({ success, error: "email already exsists" });
      }
      user = await User.create({
        name: req.body.name,
        roll: req.body.roll,
        email: req.body.email,
        password: secPass,
      });
      console.log(user);
      const data = {
        user: {
          id: user.id,
        },
      };

      //creating an token for user
      success = true;
      const authtoken = jwt.sign(data, process.env.JWT_SIGN);
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.msg);
    }
  }
);
//ROUTE2 : authenticating a user
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password cant be blank").exists(),
  ],
  async (req, res) => {
    //check whether there are any errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //checking if the user is an already exisiting user
      if (!user) {
        return res.status(500).json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      //matching the passwords
      if (!passwordCompare) {
        return res.status(500).json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      //creating an token for user
      const authtoken = jwt.sign(data, process.env.JWT_SIGN);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.msg);
    }
  }
);

//ROUTE3 : get the details of logged in user using /getuser
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.send(user);
  } catch (error) {
    console.log(error.msg);
  }
});

// ROUTE4: Logout
router.post("/logout", async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is in the blacklist
    if (tokenBlacklist.includes(token)) {
      return res
        .status(401)
        .json({ success: false, error: "Token is already invalidated" });
    }

    // Add the token to the blacklist
    tokenBlacklist.push(token);

    // Respond with a success message
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Logout failed" });
  }
});

module.exports = router;