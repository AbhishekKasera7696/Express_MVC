const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"601366203999-l8dd22h37pgk9rja4dmmpundvqi43n18.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:9004/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            console.log("accessToken", accessToken)
            console.log("refreshToken", refreshToken)
            console.log("profileData", profile)
            return done(null, profile);
    }
));

module.exports = passport;