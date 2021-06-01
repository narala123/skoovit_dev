const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCatgories = new Schema({	
    category:{ type: Schema.Types.ObjectId,ref: 'catgories', required:true },    
    subCategory:{ type: String },
    active:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("subcatgories",SubCatgories);

