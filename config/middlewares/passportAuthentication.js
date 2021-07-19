const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
//const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");
const userService = require("../../services/UserService");
const userRoleService = require('../../services/userRoleService');

class PassportAuthentication {
    constructor() {
        
        this.passport = passport;
        this.passport.serializeUser(this.serializeUser);
        this.passport.deserializeUser(this.deserializeUser);
        this.configFaceBookStrategy();
        this.configGoogleStrategy();  
        //this.configJWTStrategy();   
    }

    async configFaceBookStrategy() {
        await this.passport.use(new FacebookStrategy(this.fbStrategyOptions(), this.fbCallBack));
    }
    fbStrategyOptions() {
        return {
            clientID: process.env.FACEBOOK_STRATEGY_APP_ID,
            clientSecret: process.env.FACEBOOK_STRATEGY_APP_SECRET,
            fbGraphVersion: 'v3.0'
            //callbackURL: `https://localhost:${process.env.PORT}/user/auth/facebook/callback`,
           // profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
        }
    }
    async fbCallBack(accessToken, refreshToken, profile, done) {
        console.log(profile,"profile");
        try {
            const userInfo = await userService.isSocialMediaIdExisted(profile.id, 'facebook');
            if(userInfo){
                return done(null, userInfo);
            }else {
                const isUserRoleExisted = await userRoleService.isUserRoleExisted("user");
                if (!isUserRoleExisted.status) {
                    return done("error", null);
                }
                let data = {};
                data['userType'] = isUserRoleExisted._id;                
                data["fullName"] =  profile.displayName || '';
                data["email"] = profile.emails[0].value || '';
                data["facebookId"] = profile.id || '';
                data["profileUrl"] = profile.photos[0].value || '';                
                let user = await userService.signup(data,"social Media");
                return done(null, user);
            }
        } catch(e) {
            console.log(e,"errr")
            return done(e, null);
        }
    };
    async facebookTokenAuthentication(){
       await this.passport(new FacebookTokenStrategy(this.fbStrategyOptions(),this.fbCallBack))
    }
    serializeUser(user, done) {
        done(null, user)
    };

    deserializeUser(id, done) {
        done(null, id)
    };

    async configGoogleStrategy() {
        await this.passport.use(new GoogleTokenStrategy(this.GoogleStrategyOptions(),this.googleCallBack));
    } 
    GoogleStrategyOptions(){
        return {            
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            //callbackURL: `https://localhost:${process.env.PORT}/user/auth/google/callback`          
        }
    };
    async googleCallBack(accessToken, refreshToken, profile, done) {        
        try {
            const userInfo = await userService.isSocialMediaIdExisted(profile.id, 'google');
            if(userInfo){
                return done(null, userInfo);
            }else {
                const isUserRoleExisted = await userRoleService.isUserRoleExisted("user");
                if (!isUserRoleExisted) {
                    return done(null, 'error');
                }
                let data = {};
                data['userType'] = isUserRoleExisted._id;                
                data["fullName"] =  profile.displayName || '';
                data["email"] = profile.emails[0].value || '';
                data["googleId"] = profile.id || '';
                data["profileUrl"] = profile.photos[0].value || '';
                const user = await userService.signup(data, "social Media");
                return done(null, user);
            }
        } catch(e) {
            return done(e, e);
        }        
    };   

    async configJWTStrategy() {
       await this.passport.use(new JwtStrategy(this.jwtConfigOptions(), this.jwtValidateToken));
    };

    jwtConfigOptions(){
        return {
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.SECRET_KEY,
            issuer : process.env.ISSUER,
            audience : process.env.AUDIENCE
        }
    };

    jwtValidateToken(jwt_payload, done){
        // business logic
        console.log("jwt_payload", jwt_payload);
        return done(null, jwt_payload);
    };

    async authenticate(req, res, next) {
        return await this.passport.authenticate(
          "jwt",
          {
            session: false,
          },
          (err, user, info) => {
            if (user) {
              req.user = user;
              next(null, user);
            } else if (info) {
              res.json({ status: false, message: "you are not authorized" });
            } else {
              console.log(err);
              res.json({ status: false, message: "something went wrong" });
            }
          }
        )(req, res, next);
    };
    generateJwtToken(user) {
        let obj = {
          mobile: user.mobile         
        };           
        return jwt.sign( obj, process.env.SECRET_KEY );
    };


}

module.exports = new PassportAuthentication().passport;