const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    // When a user tries to sign in this code runs
    db.User.findOne({
      username:username
    }, (err, dbUser) => {
      // If there's no user with the given email
      if(err) {
        console.log(err)
      }
      if (!dbUser) {
        console.log('no user');
        return done(null, false, {
          message: "No user with that username"
        });
      }
      // If there is a user with the given password, but the password the user gives us is incorrect
      else if (!bcrypt.compareSync(password, dbUser.password)) {
        console.log('bad password');
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
