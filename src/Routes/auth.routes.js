const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.status(201).json({
    message: "User Register successfully",
    user,
    token,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userExist = await userModel.findOne({
    username: username,
  });

  if (!userExist) {
    return res.status(201).json({
      message: "Invalid username",
    });
  }

  const isPasswordValid = password === userExist.password;
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  res.status(200).json({
    message: "user login successfully",
  });
});

router.get("/users", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access,invalid token",
    });
  }
  try {
    // checks token is correct or not
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findOne({
        _id:decoded.id
    }).select("-password -__v");

    res.status(200).json({
        message:"Data fetch successfully",
        user
    })
    
  } catch (error) {
    return res.status(401).json({
        message:"Invalid token"
    })
  }
});

module.exports = router;
