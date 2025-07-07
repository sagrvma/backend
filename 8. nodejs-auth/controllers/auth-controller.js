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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { registerUser, loginUser };
