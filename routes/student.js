const express = require('express');
const router = express.Router();
const studentControl = require('../controllers/student');
const authenticate = require('../middleware/authenticate');

// Public Route
router.post('/login', studentControl.login);

// Authentication middleware here 
// router.use(authenticate.checkStudent);

// get student leave history
router.get('/history/:studentId', studentControl.getHistory);
// apply for leave
router.post('/apply', studentControl.apply);

module.exports = router;