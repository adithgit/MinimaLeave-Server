const express = require('express');
const router = express.Router();
const hodControl = require('../controllers/hod');

// get students of a semester
router.get('/semster/:semester/:department', hodControl.getStudents);
// get student leave history
router.get('/history/:studentId', hodControl.getHistory);
// grant student leave
router.get('/approve/:leaveId', hodControl.approve);

module.exports = router;