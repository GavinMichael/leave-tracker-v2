const mongoose = require('mongoose');

const LeaveSlotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  agentOne: Schema.Types.Mixed,
  agentTwo: Schema.Types.Mixed
});

const Leaves = mongoose.model('Leaves', LeaveSlotSchema);

module.exports = Leaves;
