const express = require("express");
const router = express.Router();
const zod = require("zod");
const User = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

//auth and input validation

//signup input validation schema
const userSignupSchema = zod.object({
  username: zod.string().min(8).max(15),
  password: zod.string().min(8).max(15),
  firstName: zod.string().min(3).max(20),
  lastName: zod.string().min(3).max(20),
});

//ROUTES

//signup route
router.post("/signup", async (req, res) => {
  //input validation of data recieved
  const success = userSignupSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }
  const userCheck = await User.findOne({
    username: req.body.username,
  });
  //   res.json()

  //checking if user exists in db
  if (userCheck) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs failed at usercheck",
      userCheck: `${userCheck}`,
    });
  }

  //creating user
  const createdUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  //creating token
  const token = jwt.sign({ createdUser }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

module.exports = router;
