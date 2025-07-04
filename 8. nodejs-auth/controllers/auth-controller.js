const registerUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    req.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    req.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { registerUser, loginUser };
