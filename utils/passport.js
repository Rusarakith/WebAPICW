require('dotenv').config();
const User = require("../models/userModel");
const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET_KEY;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findOne({
            '_id': jwt_payload.id,
            'isActive': true
    });
    if (user) {
        return done(null, user)
    }
    else {
        return done(null, false)
    }
}));