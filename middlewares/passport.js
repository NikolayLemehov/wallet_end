const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const { Model: User } = require('../models/user');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  try {
    const { email, given_name: name } = profile;
    const user = await User.findOne({ email });
    const hashPassword = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    });
    done(null, newUser);
    if (user) {
      done(null, user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
