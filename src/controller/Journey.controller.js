const Journey = require("../model/Journey.model");

const addJourney = async (req, res) => {
  if (req.body) {
    const journey = new Journey(req.body);
    await journey
      .save()
      .then((data) => res.status(200).send({ data: data }))
      .catch((err) => res.status(200).send(err));
  }
};

const getJourney = async (req, res) => {
  if (req.params.id) {
    console.log(req.params.id);
    await Journey.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

const getAllJourneys = async (req, res) => {
  await Journey.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.send(error);
    });
};

const updateJourney = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    let id = req.params.id;
    await Journey.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

const deleteJourney = async (req, res) => {
  await Journey.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addJourney,
  getJourney,
  getAllJourneys,
  updateJourney,
  deleteJourney,
};