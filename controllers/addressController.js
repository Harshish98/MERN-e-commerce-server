const AddressModel = require("../models/addressModel");

const AddAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      streetName,
      apartment,
      city,
      pincode,
      state,
      phone,
    } = req.body;
    const existingUser = req.user;
    //     const authHeader = req.headers.authorization;
    //     if (!authHeader) {
    //       return res.status(404).json({
    //         message: "Authorization header missing",
    //       });
    //     }

    //     const token = authHeader.split(" ")[1];
    //     if (!token) {
    //       return res.status(401).json({
    //         message: "Token missing from header",
    //       });
    //     }

    //     let decoded;
    //     try {
    //       decoded = jwt.verify(token, process.env.JWT_SECRET);
    //       // console.log('Decoded Token:', decoded); // Add this line to print the decoded token
    // x``    } catch (err) {
    //       return res.status(401).json({
    //         message: "Invalid token",
    //       });
    //     }

    //     const existingUser = await UserModel.findById(decoded.userId);
    //     if (!existingUser) {
    //       return res.status(404).json({
    //         message: "User not found",
    //       });
    //     }

    const newAddress = new AddressModel({
      firstName,
      lastName,
      streetName,
      apartment,
      city,
      pincode,
      state,
      phone,
      user: existingUser._id,
    });
    await newAddress.save();
    res.status(201).json({
      message: "Address created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: `Error: ${error}`,
    });
  }
};

const GetAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await AddressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        message: "No address found for particular user",
      });
    }
    res.status(200).json({
      message: "Address found",
      address: address,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { AddAddress, GetAddressById };
