require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    //Extract user information
    const { username, email, password, role } = req.body;

    //Check if user already exists
    const checkIfExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkIfExists) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with the same username/email! Try again with a different username/email.",
      });
    }
    //Hash user password - Using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create a new user and save in the database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      return res.status(201).json({
        success: true,
        message: "User created successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to create user! Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user with the given username exists! Please try again.",
      });
    }

    //Check if the password is correct or not

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    //Create User Token
    const accessToken = jwt.sign(
      //Bearer token
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User signed in successfully!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    //Extract old and new password
    const { oldPassword, newPassword } = req.body;

    //Find the current logged in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    //Check if the old password is correct
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect.",
      });
    }

    //Hash the new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    //Update and save the new password
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again.",
    });
  }
};

module.exports = { registerUser, loginUser, changePassword };
