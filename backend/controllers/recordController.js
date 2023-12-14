const Record = require('../models/recordModel');
const mongoose = require('mongoose');

const winston = require('winston');
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: '/app/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/app/logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: '/app/logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: '/app/logs/combined.log' }),
  ],
});

logger.info('Hello, ELK Stack!');

// Get all records
const getRecords = async (req, res) => {
  const user_id = req.user._id;

  try {
    const records = await Record.find({ user_id }).sort({ timestamp: -1 });
    logger.info('Successfully retrieved the records!');
    res.status(200).json(records);
  } catch (error) {
    logger.error('Error retrieving records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single record
const getRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }

  try {
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ error: 'No such record' });
    }

    res.status(200).json(record);
  } catch (error) {
    logger.error('Error retrieving record:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new record
const createRecord = async (req, res) => {
  const { description, number1, number2 } = req.body;

  try {
    const user_id = req.user._id;
    const record = await Record.create({ description, number1, number2, user_id });
    logger.info('Record successfully added!');
    res.status(200).json(record);
  } catch (error) {
    logger.error('Server Error, Cannot Add Record:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }

  try {
    const record = await Record.findOneAndDelete({ _id: id });
    if (!record) {
      return res.status(400).json({ error: 'No such record' });
    }

    res.status(200).json(record);
  } catch (error) {
    logger.error('Error deleting record:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a record
const updateRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }

  try {
    const record = await Record.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true });
    if (!record) {
      return res.status(400).json({ error: 'No such record' });
    }

    logger.info('Record successfully updated!');
    res.status(200).json(record);
  } catch (error) {
    logger.error('Server Error, Cannot Update Record:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecords,
  getRecord,
  createRecord,
  deleteRecord,
  updateRecord,
};
