const express = require("express");
const router = express.Router();
const patinetController = require("../controller/patient.controller");

module.exports = function () {
    router.post("/", patinetController.addNewPatient);
    router.put("/:id", patinetController.updatePatient);
    router.delete("/:id", patinetController.deletePatient);
    router.get("/:id", patinetController.getPatient);
    return router;
}
