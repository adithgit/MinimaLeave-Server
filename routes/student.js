const express = require('express');
const router = express.Router();
const studentControl = require('../controllers/student');

// get student leave history
router.get('/history/:studentId', studentControl.getHistory);
// apply for leave
router.get('/apply/:studentId', studentControl.apply);

module.exports = router;