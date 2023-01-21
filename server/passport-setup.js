const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {

    //console.log(user);
    done(null, user);
});

passport.deserializeUser(function (user, done) {

    //User.findById(id, function(err, user) {
    done(null, user);
    //});
});

passport.use(new GoogleStrategy({

    clientID: "1015643954261-ns223pg8hhideeb6t2ls2v2jncsrg2cv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/google/callback" /*https://proyectoprocesos-fmd4gg64ea-no.a.run.app/google/callback*/
},
    function (accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(null, profile);
        //});
    }
));