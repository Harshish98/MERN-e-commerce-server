const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserSignUp = async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    if (![name, email, password].every((field) => field?.trim())) {
      res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "Email is already in use",
      });
    }
    const encPassword = await bcrypt.hash(password, 2);
    const newUser = new UserModel({
      name,
      email,
      password: encPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "New user created successfully",
      data: newUser,
      // token: await newUser.generateToken(),
    });
  } catch (error) {
    res.status(400).json({
      message: "User not created",
    });
    console.log(error);
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(404).json({
        message: "No such user found",
      });
    }
    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (!passMatch) {
      res.status(404).json({
        message: "Invaild Credentials",
      });
    }
    const token = await existingUser.generateToken();
    res.status(200).json({
      message: "User login successfully",
      token: token,
      role: existingUser.role,
    });
  } catch (error) {
    console.log(error);
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not existed",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: user.email,
      subject: "Reset Password Link",
      text: `http://localhost:3040/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send({ status: "Failed to send mail" });
      } else {
        res.send({ status: "success", token: token, message: info });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded._id !== id) {
      return res.json({ status: "Error with token" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await UserModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      res.send({ status: "Success" });
    } else {
      res.send({ status: "User not found" });
    }
  } catch (error) {
    res.json({ status: "Error with token", error: error.message });
  }
};

const GetUserDetails = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send("Access denied");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  UserSignUp,
  UserLogin,
  ForgotPassword,
  ResetPassword,
  GetUserDetails,
};
