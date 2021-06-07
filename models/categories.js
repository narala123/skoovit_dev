const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = new Schema({	
    category:{ type: String, required:true },    
    active:{ type:Boolean, default:true },
    filename:{ type: String },
    originalName:{ type: String },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("Categories",Categories);