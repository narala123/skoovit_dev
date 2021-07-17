const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Skills = new Schema({	
    subCategory:{ type: Schema.Types.ObjectId,ref: 'subcategories', required:true },    
    skill:{ type: String },
    active:{ type:Boolean, default:true },    
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("skills",Skills);

