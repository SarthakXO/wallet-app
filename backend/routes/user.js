const express = require("express");
const router = express.Router();
const zod = require("zod");

//auth and input validation
const userSignupSchema = zod.object({
  username: zod.string().min(8).max(15),
  password: zod.string().min(8).max(15),
  firstName: zod.string().min(3).max(20),
  lastName: zod.string().min(3).max(20),
});

router.post("/signup", (req, res) => {});

module.exports = router;
