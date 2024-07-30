const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token missing from header",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const existingUser = await UserModel.findById(decoded.userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.user = existingUser;
    next();
  } catch (error) {
    res.status(404).json({
      message: `Error: ${error}`,
    });
  }
};

module.exports = auth;
