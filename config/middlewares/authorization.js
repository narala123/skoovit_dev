const jwt = require('jsonwebtoken');
module.exports.create_token = (userId,planId)=> {
	try {		
		return jwt.sign({
      		userId: userId,
      		planId: planId,
    	}, process.env.SECRET_KEY);
	}catch(err){
		console.log(err);
		return  err.message;
	}	
};



module.exports.isValidUser = async function (req,res,next){
	const userService = require("../../services/UserService");
	try {
		let token = req.query.token || req.body.token || req.headers['x-access-token'] || req.headers['authorization']  || req.headers['Authorization'];
		//console.log(token,"token");
		const data = await verify_token(token)		
		if(data){
			const isUserExisted = await userService.getUser(data.userId);
			if(isUserExisted){
				req.user = data;
				next();
			}else{
				return res.json({status:false,statusCode:401, message:"Not Authorized"});
			}
		}else{
			return res.json({status:false,statusCode:401, message:"Not Authorized"});
		}		
	}catch(err){
		console.log(err);
		return  err.message;
	}
};



// for admin 
module.exports.admin_create_token = (adminId)=> {
	try {		
		return jwt.sign({
      		adminId: adminId,
      		type: "Admin",
    	}, process.env.SECRET_KEY);
	}catch(err){
		console.log(err);
		return  err.message;
	}	
};


module.exports.isAdmin = async function (req,res,next){
	const adminService = require("../../services/AdminService");
	try {
		let token = req.query.token || req.body.token || req.headers['x-access-token'] || req.headers['authorization']  || req.headers['Authorization'];
		//console.log(token,"token");
		const data = await verify_token(token)		
		if(data){
			const isAdminExisted = await adminService.getAdmin(data.adminId);
			if(isAdminExisted){
				req.admin = data;
				next();
			}else{
				return res.json({status:false,statusCode:401, message:"Not Authorized"});
			}
		}else{
			return res.json({status:false,statusCode:401, message:"Not Authorized"});
		}		
	}catch(err){
		console.log(err);
		return  err.message;
	}
};

function verify_token(token){
	try{
		return token ? jwt.verify(token,process.env.SECRET_KEY) : null;
	}catch(err){
		return err.message;
	}
};

