const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { SECRET_KEY } = require('../config/constants');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      // Find the user based on the JWT token
      const user = await User.findById(payload.sub);

      if (!user) {
        return done(null, false);
      }

      // Pass the user object to the next middleware
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = { authenticate };
