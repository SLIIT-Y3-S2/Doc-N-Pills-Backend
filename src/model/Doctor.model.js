const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  availableDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
 
  channelingFee: {
    type: String,
    required: true,
  },
  noofPatients: {
    type: String,
    required: true,
  },
  channelingCenterName: {
    type: String,
    required: true,
  },
  

});

const Doctor = mongoose.model("doctors", DoctorSchema);

module.exports = Doctor;