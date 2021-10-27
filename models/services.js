const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Services = new Schema({	
    serviceName:{ type: String },
    active:{ type:Boolean, default:true },    
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("services",Services);

