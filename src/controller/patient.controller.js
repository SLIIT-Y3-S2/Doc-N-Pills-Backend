const Patient = require("../model/patient.model");
const bcrypt = require("bcrypt");

// Create and Save a new Patient
const addNewPatient = async (req, res) => {
    try {
        let { name, mobile, address, email, password, confirmPassword } = req.body;
        const existingPatient = await Patient.findOne({ email: email });

        //validate
        if (!name || !mobile || !address || !email || !password || !confirmPassword) {
            return res.status(400).json({ msg: "Please enter all fields" });
        } else if (password.length < 8) {
            return res.status(400).json({ msg: "Password must be at least 8 characters" });
        } else if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        } else if (existingPatient) {
            return res.status(400).json({ msg: "Account already exists" });
        } else {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newPatient = new Patient({
                name,
                mobile,
                address,
                email,
                password: passwordHash,
            });

            const savedPatient = await newPatient.save();
            res.json(savedPatient); // return the saved patient
        }
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

//delete patient
const deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        res.json(deletedPatient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update patient
const updatePatient = async (req, res) => {
  if (req.body) {
    let id = req.params.id;
    await Patient.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
};

//get patient
const getPatient = async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    res.json({
        id: patient._id,
        name: patient.name,
        email: patient.email,
        mobile: patient.mobile,
        address: patient.address
    })
};

module.exports = {addNewPatient,deletePatient,getPatient,updatePatient}

