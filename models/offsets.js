const mongoose = require('mongoose');

const OffsetSchema = new mongoose.Schema({
  empID: {
    type: String,
    required: true
  },
  twentyEighteenbalance: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const Offset = mongoose.model('Offset', OffsetSchema);

module.exports = Offset;
