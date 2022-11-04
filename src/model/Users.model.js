const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  openHours: {
    type: String,
    required: true,
  },
  legacyValidation: {
    type: String,
    required: true,
  },
  availabilityStatus: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
