const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Plans = new Schema({
    name:{ type: String, required:true },
    price:{ type: Number },
    duration:{ type: Number },    
    active:{ type: Boolean, default:true },      
    features:[
    	{ 	gallery:{ 
    			images:{ type: Number,default:2 },
    			videos:{ type: Number,default: 1 },
    			audio:{ type: Number, default: 1 },
    			doc:{ type: Number, default: 1 }
    		},
    		chat:{ type: Boolean, default:false },
    		audioCall:{ type: Boolean, default: false },
    		videoCall:{ type: Boolean, default: false }
    	}
    ],
    createDate:{ type: Date, default: Date.now },
    modifiedDate:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("plans",Plans);