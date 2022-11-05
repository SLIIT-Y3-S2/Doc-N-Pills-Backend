const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Patient = mongoose.model("patient", PatientSchema);
module.exports = Patient;