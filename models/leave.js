var mongoose = require("mongoose");
var leaveSchema = new mongoose.Schema(
  {
    subject: { type: String, required: "subject cant be blank" },
    from: Date,
    to: Date,
    days: Number,
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
    approved: {
      type: Boolean,
      default: false
    },
    denied: {
      type: Boolean,
      default: false
    },
    stud: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      },
      username: String
    }
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Leave", leaveSchema);
