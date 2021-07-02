const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategories = new Schema({	
    category:{ type: Schema.Types.ObjectId,ref: 'Categories', required:true },    
    subCategory:{ type: String },
    active:{ type:Boolean, default:true },
    filename:{ type: String },
    originalName:{ type: String },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("subcategories",SubCategories);

