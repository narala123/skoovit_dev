const jwt = require('jsonwebtoken');

module.exports.create_token = (userId,planId, userType)=> {
	try {		
		return jwt.sign({
      		userId: userId,
      		planId: planId,
      		userType: userType
    	}, process.env.SECRET_KEY);
	}catch(err){
		console.log(err);
		return this.generateError(500,err);
	}	
};



module.exports.isValidUser = async(req,res,next)=>{
	try {
		let token = req.query.token || req.body.token || req.headers['x-access-token'] || req.headers['authorization'];
		if(await verify_token(token)){
			next();
		}else{
			return res.json({status:false,message:"not Authorized"});
		}		
	}catch(err){
		console.log(err);
		return this.generateError(500,err);
	}
};

module.exports.generateError = (code, err) => {
  //console.error('Error Message', err);
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      responseid: 500,
      responsemessage: 'Oops something went wrong. Please try again.'
    })
  }
};

exports.verify_token = (token)=>{
	try{
		return token ? jwt.verify(token,process.env.SECRET_KEY) : {};
	}catch(err){
		return this.generateError(500,err);
	}
};

