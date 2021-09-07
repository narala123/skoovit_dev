const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    email:{ type: String },   
    password:{ type: String },
    isActive:{ type: Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("admin",Admin);

