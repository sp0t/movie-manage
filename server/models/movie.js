const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  poster: { type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
