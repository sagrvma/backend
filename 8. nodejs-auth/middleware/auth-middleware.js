require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // console.log("Auth middleware is called.");

    const authHeader = req.headers["authorization"];
    // console.log(authHeader); //Will contain "Bearer sdfnsdftokendfsdf", so to access token we need to
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access Denied! No token provided. Please login to continue.",
      });
    }
    const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedTokenData);
    req.userInfo = decodedTokenData;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Access Denied! No token provided. Please login to continue.",
    });
  }
};

module.exports = authMiddleware;
