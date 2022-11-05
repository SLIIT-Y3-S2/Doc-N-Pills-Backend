const Doctor = require("../model/Doctor.model");
const express = require("express");
const mongoose = require("mongoose");

//Add New Doctor
const addDoctor = async (req, res) => {
  if (req.body) {
    await Doctor(req.body)
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

//View All Doctors
const getallDoctors = async (req, res) => {
  await Doctor.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//View particular Doctor
const getoneDoctor = async (req, res) => {
  let DoctorID = req.params.id;
  await Doctor.findById(DoctorID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//Update Doctor
const updateDoctor = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    let id = req.params.id;
    await Doctor.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

//Delete Doctor
const deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addDoctor,
  getallDoctors,
  getoneDoctor,
  updateDoctor,
  deleteDoctor,
};