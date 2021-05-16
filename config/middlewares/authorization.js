const jwt = require('jsonwebtoken');

module.exports.create_token = (userId,planId, userType)=> {
	try {		
		return jwt.sign({
      		userId: userId,
      		planId: planId,
      		userType: userType
    	}, process.env.SECRET_KEY, { algorithms: ['HS256'] });
	}catch(err){
		return generateError(500,err);
	}	
};

module.exports.verify_token = (token)=>{
	try{
		return token ? jwt.verify(token,process.env.SECRET_KEY,{ algorithms: ['HS256'] }) : {};
	}catch(err){
		return generateError(500,err);
	}
};

module.exports.isValidUser = (req,res,next)=>{
	try {
		
		let token = req.query.token || req.body.token || req.headers['x-access-token'] || req.headers['authorization'];
		let arr = ['user','admin']
	
		if(arr.includes(token)){
			next()
		}else{
			res.json({status:false,message:"not Authorized"});
		}
		/*
			if token has Bearer key
		*/	
		//token= token.split(' ')[1];
		//const existedUser = verify_token(token);
	}catch(err){
		return generateError(500,err);
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