const express = require('express');
const router = express.Router();
const adminControl = require('../controllers/admin');
const authenticate = require('../middleware/authenticate');

// Public Routes
router.post('/register', adminControl.register);
router.post('/login', adminControl.login);

// Authentication middleware here
router.use(authenticate.checkAdmin)

// Private Routes

router.post('/add/hod', adminControl.addHod);
router.post('/add/student', adminControl.addStudent);
router.post('/add/parent', adminControl.addParent);
router.post('/remove/hod', adminControl.removeHod);
router.post('/remove/student', adminControl.removeStudent);
router.post('/remove/parent', adminControl.removeParent);


module.exports = router;