const express = require('express');
const router = express.Router();
const parentControl = require('../controllers/parent');
const authenticate = require('../middleware/authenticate');

// Public Route
router.post('/login', parentControl.login);

// Authentication middleware here
// router.use(authenticate.checkParent);

router.post('/add', parentControl.addChild);
// get students under parent's name 
router.get('/children/:parentId', parentControl.getStudents);
// get student leave history
router.get('/history/:studentId', parentControl.getHistory);
// grant student leave
router.get('/approve/:leaveId', parentControl.approve);


// router.get('/reject/:leaveId',)

module.exports = router;