var mongoose = require("mongoose");
var leaveSchema = new mongoose.Schema(
  {
    subject: { type: String, required: "subject cant be blank" },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    days: {
      type: Number,
      required: true
    },
    hodstatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    parentstatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    finalstatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  }
);

module.exports = mongoose.model("Leave", leaveSchema);
