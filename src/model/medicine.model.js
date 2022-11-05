const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  medicalTerm: { type: String, required: true },
  price: { type: String, required: true },
  qty: { type: String, required: true },
  type: { type: String, required: true },
  dose : { type: String, required: true },
});

const Medicine = mongoose.model("medicine", MedicineSchema);
module.exports = Medicine;