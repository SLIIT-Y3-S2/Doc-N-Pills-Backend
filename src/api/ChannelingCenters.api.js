const router = require("express").Router();
const channelingCenterController = require("../controller/ChannelingCenters.controller");

module.exports = function () {
  router.post("/", channelingCenterController.addChannelingCenter);
  router.get("/", channelingCenterController.getallChannelingCenters);
  router.get("/:id", channelingCenterController.getoneChannelingCenter);
  router.put("/:id", channelingCenterController.updateChannelingCenter);
  router.delete("/:id", channelingCenterController.deleteChannelingCenter);

  return router;
};