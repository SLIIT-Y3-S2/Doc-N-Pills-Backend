const express = require("express");
const router = express.Router();
const JourneyController = require("../controller/Journey.controller");

module.exports = function () {
  router.post("/", JourneyController.addJourney);
  router.get("/:id", JourneyController.getJourney);
  router.put("/:id", JourneyController.updateJourney);
  router.delete("/:id", JourneyController.deleteJourney);
  router.get("/", JourneyController.getAllJourneys);
  return router;
};