const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./src/config/config");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.json("Hello Node!");
});

app.use("/users", require("./src/controller/Users.controller"));
const medicineApi = require("./src/api/medicine.api");
app.use("/medicine", medicineApi());

const patientApi = require("./src/api/patient.api");
app.use("/patient", patientApi());

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
