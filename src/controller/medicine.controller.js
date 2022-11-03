const Medicine = require("../model/medicine.model");

const addMedicine = async (req, res) => {
  if (req.body) {
    const medicine = new Medicine(req.body);
    await medicine
      .save()
      .then((data) => res.status(200).send({ data: data }))
      .catch((err) => res.status(200).send(err));
  }
};

const getAllMedicines = async (req, res) => {
  await Medicine.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.send(error);
    });
};

const getoneMedicine = async (req, res) => {
    let mid = req.params.id;
    await Medicine.findById(mid)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

const updateMedicine = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    let id = req.params.id;
    await Medicine.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

const deleteMedicine = async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addMedicine,
  getAllMedicines,
  getoneMedicine,
  updateMedicine,
  deleteMedicine,
};