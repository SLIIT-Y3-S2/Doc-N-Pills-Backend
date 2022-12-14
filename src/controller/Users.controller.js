const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const User = require("../model/Users.model");
const Patient = require("../model/patient.model");

// Register
router.post("/register", async (req, res) => {
  try {
    let {
      name,
      email,
      telephone,
      location,
      openHours,
      legacyValidation,
      availabilityStatus,
      type,
      password,
      passwordCheck,
    } = req.body;
    console.log("sdf",req.body);
    const existingUser = await User.findOne({ email: email });
    // validate
    if (
      !name ||
      !email ||
      !telephone ||
      !location ||
      !openHours ||
      !legacyValidation ||
      !availabilityStatus ||
      !type ||
      !password ||
      !passwordCheck
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    } else if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    } else if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        telephone,
        location,
        openHours,
        legacyValidation,
        availabilityStatus,
        type,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    const user = await User.findOne({ email: email });
    if (!user){
      const patient = await Patient.findOne({ email: email });
      console.log("patient",patient);
      if(!patient){
        return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
      }else{
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch)
          return res
            .status(400)
            .json({ msg: "Invalid credentials." });
        const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET);
        res.json({
          token,
          user: {
            id: patient._id,
            name: patient.name,
            mobile: patient.mobile,
            address: patient.address,
            email: patient.email,
            type: patient.type,
          },
        });
      }      
    }else{
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        telephone: user.telephone,
        location: user.location,
        openHours: user.openHours,
        legacyValidation: user.legacyValidation,
        availabilityStatus: user.availabilityStatus,
        type: user.type,
      },
    });
  } }catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).send({status: "User deleted"});
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get Users
router.get("/", async (req, res) => {
  const user = await User.find()
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((error) => {
    res.send(error);
  });
  //console.log("user",user);
  // res.json({
  //   id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   telephone: user.telephone,
  //   location: user.location,
  //   openHours: user.openHours,
  //   legacyValidation: user.legacyValidation,
  //   availabilityStatus: user.availabilityStatus,
  //   type: user.type,
  // });
});

//getone
router.get("/:id", async (req, res) => {
  let uid = req.params.id;
  await User.findById(uid)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put("/:id", async (req, res) => {
  console.log("req",req.body);
  if(req.body){
    let uid = req.params.id;
    await User.findByIdAndUpdate(uid, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.send(error);
      });
  }
})

module.exports = router;
