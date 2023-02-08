const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

// const { validationResult } = require("express-validator");
const env = require("dotenv");
env.config();
const userController = () => {
  return {
    userDetails: asyncHandler(async (req, res) => {
      const user = await userModel.findById(req.user._id).populate({
        path: "permissionsArray",
        strictPopulate: false
      });
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
          permission: user.permissionArray
        });
      } else {
        console.log(error)
        res.status(404);
        return res.json({ message: "Internal Server Error" });
      }
    }),
    userLogin: asyncHandler(async (req, res) => {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user && (await user.matchPassword(password))) {

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
        });
      } else {
        return res.json({ message: "Please login with correct credentials" });
      }
    }),
    userSignup: asyncHandler(async (req, res) => {
      const { name, email, password } = req.body;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "Please register with another email" });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHashed= await bcrypt.hash(password, salt)
      const user = await userModel.create({
        name,
        email,
        password:passwordHashed,
      });
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        return res.status(400).json({ message: "Internal Server error." });
      }
    }),


  };
};

module.exports = userController;
