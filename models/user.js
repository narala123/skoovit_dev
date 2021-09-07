const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;
var emailValidator = [
  validate({
    validator: "isEmail",
    message: "invalid Email",
  }),
];
var nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should have minimum 3 charaters",
  }),
];
var passValidator = [
  validate({
    validator: "matches",
    arguments: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    message:
      "Please enter a password that contain At least one uppercase.At least one lower case.At least one special character.",
  }),
];

const User = new Schema({
  fullName: { type: String, required: true, validate: nameValidator },
  /*password: {
    type: String,
    required: true,
    minlength: 8,
    validate: passValidator,
  },*/
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: emailValidator,
  },
  mobile: {
    type: String, 
    minlength: 10,
    maxlenth: 10,
  },
  userType: {
    type: Schema.Types.ObjectId,
    ref: "userroles",
  },
  otp:{ type: Number },
  facebookId:{ type: String },
  googleId:{ type: String },
  profileUrl: { type: String },
  isMobileVerified:{ type: Boolean, default: false },
  active: { type: Boolean, default: true },
  isBlocked:{ type: Boolean, default:false },
  isDelete: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: true },
  createDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", User);
