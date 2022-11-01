const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JourneySchema = new Schema({
  UserID: { type: String, required: true },
  DriverID: { type: String, required: true },
  BusNo: { type: String, required: true },
  Route: { type: String, required: true },
  StartLocation: { type: String, required: true },
  EndLocation: { type: String, required: true },
  Fare: { type: Number, required: true },
  Date: { type: String, required: true },
  Time: { type: String, required: true },
});

const Journey = mongoose.model("journey", JourneySchema);
module.exports = Journey;