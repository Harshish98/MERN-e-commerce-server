const { default: mongoose } = require("mongoose");

const DBConnection = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to database...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DBConnection;
