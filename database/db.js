var mongoose = require("mongoose");

exports.connect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/leave",(err)=>{
      if(err) console.log(err);
      console.log("mongoose connected");
    }); 
}