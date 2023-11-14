import Cabin from "../models/Cabin.js";
import Cruise from "../models/Cruise.js";
import { createError } from "../utils/error.js";

//CREATE CABIN
export const createCabin = async (req, res, next) => {
  const cruiseId = req.params.cruiseid;
  const newCabin = new Cabin(req.body);

  try {
    const savedCabin= await newCabin.save();
    try {
      await Cruise.findByIdAndUpdate(cruiseId, {
        $push: { cabins: savedCabin._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedCabin);
  } catch (err) {
    next(err);
  }
};

//UPDATE CABIN
export const updateCabin = async (req, res, next) => {
  try {
    const updatedCabin = await Cabin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCabin);
  } catch (err) {
    next(err);
  }
};

//UPDATE CABIN AVAIALABILITY
export const updateCabinAvailability = async (req, res, next) => {
  try {
    await Cabin.updateOne(
      { "cabinNumbers._id": req.params.id },
      {
        $push: {
          "cabinNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Cabin status has been updated.");
  } catch (err) {
    next(err);
  }
};

//DELETE CABIN
export const deleteCabin = async (req, res, next) => {
  const cruiseId = req.params.cruiseid;
  try {
    await Cabin.findByIdAndDelete(req.params.id);
    try {
      await Cruise.findByIdAndUpdate(cruiseId, {
        $pull: { cabins: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Cabin has been deleted.");
  } catch (err) {
    next(err);
  }
};

//GET CABIN
export const getCabin = async (req, res, next) => {
  try {
    const cabin = await Cabin.findById(req.params.id);
    res.status(200).json(cabin);
  } catch (err) {
    next(err);
  }
};

//GET ALL CABINS
export const getCabins = async (req, res, next) => {
  try {
    const cabins = await Cabin.find();
    res.status(200).json(cabins);
  } catch (err) {
    next(err);
  }
};