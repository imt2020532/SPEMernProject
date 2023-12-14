const express = require('express');
const {
  createRecord,
  getRecords,
  getRecord,
  deleteRecord,
  updateRecord,
} = require('../controllers/recordController'); // Make sure to replace with the correct path to your recordController
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all record routes
router.use(requireAuth);

// GET all records
router.get('/', getRecords);

// GET a single record
router.get('/:id', getRecord);

// POST a new record
router.post('/', createRecord);

// DELETE a record
router.delete('/:id', deleteRecord);

// UPDATE a record
router.patch('/:id', updateRecord);

module.exports = router;
