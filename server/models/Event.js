// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  time: String,
  lat: Number,
  lng: Number,
  hostedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  maxPlayers: {
    type: Number,
    default: 1,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
