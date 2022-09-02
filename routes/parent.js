const express = require('express');
const router = express.Router();
const parentControl = require('../controllers/parent');

// get students under parent's name 
router.get('/children/:parentId', parentControl.getStudents);
// get student leave history
router.get('/history/:studentId', parentControl.getHistory);
// grant student leave
router.get('/approve/:studentId', parentControl.approve);

module.exports = router;