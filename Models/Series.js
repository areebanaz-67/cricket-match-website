const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model('Series', seriesSchema);