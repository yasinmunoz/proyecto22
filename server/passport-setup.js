const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(new TwitterStrategy({

    consumerKey: "YkY58HOdedMYakSJqpB8j9HG7",
    consumerSecret: "D9IEX1WzQeQa0v05vB629OfqmR0WGWyMz4i3S9qaRLPDKy0rvS",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new FacebookStrategy({
    clientID: "5657769044342131",
    clientSecret:"885eec5f5ffbcc20b57a4925b6fb00bb",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));