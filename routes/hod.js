const express = require('express');
const router = express.Router();
const hodControl = require('../controllers/hod');
const authenticate = require('../middleware/authenticate');

// Public Route
router.post('/login', hodControl.login);

// Authentication middleware here
router.use(authenticate.checkHod);

// Private Routes

// get students of a semester
router.get('/semster/:semester/:department', hodControl.getStudents);
// get student leave history
router.get('/history/:studentId', hodControl.getHistory);
// grant student leave
router.get('/approve/:leaveId', hodControl.approve);

module.exports = router;