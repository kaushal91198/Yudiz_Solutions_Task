const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

//Route 1-> User Login
Router.post(
  "/login",
  // [
  //   body("email", "Enter a valid name").isEmail(),
  //   body("password", "Password can not be blank").exists(),
  // ],
  userController().userLogin
);
//Route 2-> User Signup
Router.post("/signup", userController().userSignup);

//Route 3-> Get user data
Router.get("/profile", authMiddleware, userController().userDetails);




module.exports = Router;
