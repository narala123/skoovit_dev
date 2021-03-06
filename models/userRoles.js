const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRole = new Schema({
    role:{ type:String, required:true },
    description:{ type:String, required:true },
    active:{ type:Boolean, default:false },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("userroles",UserRole);