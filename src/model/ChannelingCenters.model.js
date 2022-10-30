const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ChannelingCentersSchema = new Schema({
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
  availableTime: {
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
  

});

const ChannelingCenter = mongoose.model("channeling_centers", ChannelingCentersSchema);

module.exports = ChannelingCenter;