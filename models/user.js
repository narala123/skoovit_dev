const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    fullName:{ type:String, required:true },
    password:{ type:String, required:true },
    email:{ type:String, required:true, trim:true },
    mobile:{ type: String, required:true },
    active:{ type:Boolean, default:true },
    userType:{ type: Schema.Types.ObjectId, ref:'userroles' },    
    isDelete:{ type: Boolean, default:false },
    isLoggedIn:{ type: Boolean, default: true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("users",User);