const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  r: Number,
  w: Number,
  o: Number,
  inning: String,
});

const matchSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Unique identifier for matches
  name: String,
  // matchType: String,
  status: String,
  venue: String,
  date: String,
  dateTimeGMT: String,
  teams: [String],
  score: [scoreSchema], // Embedded document for scores
  series_id: String,
  fantasyEnabled: Boolean,
  bbbEnabled: Boolean,
  hasSquad: Boolean,
  matchStarted: Boolean,
  matchEnded: Boolean,
});

// module.exports = Match;


module.exports = mongoose.model('Match', matchSchema);