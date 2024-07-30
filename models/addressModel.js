const { default: mongoose } = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const AddressModel = mongoose.model("Address", addressSchema);

module.exports = AddressModel;
