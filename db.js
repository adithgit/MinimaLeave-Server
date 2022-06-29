const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leave').then(()=>{
    console.log('db connected');
})



