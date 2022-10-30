const express = require("express");
const router = express.Router();
const MedicineController = require("../controller/medicine.controller");

module.exports = function () {
  router.post("/", MedicineController.addMedicine);
  router.put("/:id", MedicineController.updateMedicine);
  router.delete("/:id", MedicineController.deleteMedicine);
  router.get("/", MedicineController.getAllMedicines);
  router.get("/:id", MedicineController.getoneMedicine);
  return router;
};