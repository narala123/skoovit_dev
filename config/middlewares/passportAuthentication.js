const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

class FaceBookAuthentication {
    constructor(){
        this.passport = passport
        this.passport.serializeUser(this.serializeUser)
        this.passport.deserializeUser(this.deserializeUser)
        this.configFaceBookStrategy()
    }

    async configFaceBookStrategy(){
         await this.passport.use(new FacebookStrategy(this.fbStrategyOptions(), this.fbCallBack));
    }
    fbStrategyOptions(){
        return {
            clientID: process.env.FACEBOOK_STRATEGY_APP_ID,
            clientSecret: process.env.FACEBOOK_STRATEGY_APP_SECRET,
            callbackURL: "https://localhost:3003/user/auth/facebook/callback",
            profileFields:['id','displayName','name','gender','picture.type(large)','email']
          }
    }
    fbCallBack(accessToken, refreshToken, profile, done) {
        console.log("profile",profile);
        done(null,profile);
      }
      serializeUser(user,done){
            done(null,user)
      }
      deserializeUser(id,done){
            done(null,id)
      }
}

module.exports = new FaceBookAuthentication().passport;