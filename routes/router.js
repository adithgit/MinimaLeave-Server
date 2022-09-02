const express = require("express");
const router = express.Router();
const hodRouter = require("./hod");
const parentRouter = require('./parent');
const studentRouter = require('./student');

router.use('/hod', hodRouter);
router.use('/parent', parentRouter);
router.use('/student', studentRouter);

module.exports = router;
