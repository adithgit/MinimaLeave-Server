const express = require("express");
const router = express.Router();
const hodRouter = require("./hod");
const parentRouter = require('./parent');
const studentRouter = require('./student');
const adminRouter = require('./admin');

router.use('/hod', hodRouter);
router.use('/parent', parentRouter);
router.use('/student', studentRouter);
router.use('/admin', adminRouter);

module.exports = router;
