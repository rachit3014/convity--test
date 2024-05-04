const User=require('../models/user');
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const   ExtractJwt = require('passport-jwt').ExtractJwt;


let opts=
{
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'Test'

}
passport.use(new JwtStrategy(opts,  async function(jwt_payload, done) {
   const user= await  User.findOne({id: jwt_payload.sub})
   
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        
        }
    }));
module.exports=passport
