const express = require('express');
const router = express.Router();
const adminControl = require('../controllers/admin');

// Public Routes
router.post('/register', adminControl.register);
router.post('/login', adminControl.login);

// Authentication middleware here


// Private Routes

// router.post('/add/hod', adminControl.createHod);
// router.post('/add/student', adminControl.createStudent);
// router.post('/add/parent', adminControl.addParent);
// router.post('/remove/hod', adminControl.removeHod);
// router.post('/remove/student', adminControl.removeStudent);
// router.post('/remove/parent', adminControl.removeParent);


module.exports = router;