const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  number1: {
    type: Number,
    required: true,
  },
  number2: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Record', recordSchema);
