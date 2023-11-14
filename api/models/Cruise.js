import mongoose from "mongoose";

const CruiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cruiseLine: {
    type: String,
    required: true,
  },
  departurePort: {
    type: String,
    required: true,
  },
  arrivalPort: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date, 
    required: true,
  },
  arrivalDate: {
    type: Date, 
    required: true,
  },
  deckClass: {
    type: String,
    required: true,
  },
  cabinClass: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  cabins: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Cruise", CruiseSchema)