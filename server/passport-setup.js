const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (user, done) {

    done(null, user);
});

passport.use(new GoogleStrategy({

    clientID: "300583667470-spo18tqjetr7km2aetlujmvd85ju3th1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
},
    function (accessToken, refreshToken, profile, done) {

        return done(null, profile);
    }
));