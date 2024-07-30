const ContactModel = require("../models/contactmodel");

const SendMessage = async (req, res) => {
  try {
    const message = await ContactModel.create(req.body);
    console.log(message)
    res
      .status(201)
      .json({ message: "Message send successfully", data: message });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log("Error in sending message: ", error);
  }
};

const GetMessages = async (req, res) => {
  try {
    const messages = await ContactModel.find();
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log("Error in finding the messages: ", error);
  }
};

module.exports = { SendMessage, GetMessages };
