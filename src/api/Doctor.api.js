const router = require("express").Router();
const doctorController = require("../controller/Doctor.controller");

module.exports = function () {
  router.post("/", doctorController.addDoctor);
  router.get("/", doctorController.getallDoctors);
  router.get("/:id", doctorController.getoneDoctor);
  router.put("/:id", doctorController.updateDoctor);
  router.delete("/:id", doctorController.deleteDoctor);

  return router;
};