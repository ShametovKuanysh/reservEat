const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Company = mongoose.model("companies");
const keys = require("../config/keys");

//options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Company.findById(jwt_payload.id)
        .then((company) => {
          if (company) {
            return done(null, company);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
