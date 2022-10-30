const ChannelingCenter = require("../model/ChannelingCenters.model");
const express = require("express");
const mongoose = require("mongoose");

//Add New ChannelingCenter
const addChannelingCenter = async (req, res) => {
  if (req.body) {
    await ChannelingCenter(req.body)
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

//View All ChannelingCenters
const getallChannelingCenters = async (req, res) => {
  await ChannelingCenter.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//View particular ChannelingCenter
const getoneChannelingCenter = async (req, res) => {
  let ChannelingCenterID = req.params.id;
  await ChannelingCenter.findById(ChannelingCenterID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//Update ChannelingCenter
const updateChannelingCenter = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    let id = req.params.id;
    await ChannelingCenter.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

//Delete ChannelingCenter
const deleteChannelingCenter = async (req, res) => {
  await ChannelingCenter.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Deleted" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addChannelingCenter,
  getallChannelingCenters,
  getoneChannelingCenter,
  updateChannelingCenter,
  deleteChannelingCenter,
};