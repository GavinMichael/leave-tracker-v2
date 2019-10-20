const mongoose = require('mongoose');

const SlotsSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
});

const Slots = mongoose.model('Slots', SlotsSchema);

module.exports = Slots;
