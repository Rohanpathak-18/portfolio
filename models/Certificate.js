const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  issuer: {
    type: String,
    required: true
  },

  image: String,

  date: String
});

module.exports =
mongoose.model(
"Certificate",
certificateSchema
);