const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/userModel'); // Chemin vers le modèle utilisateur

require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, async function(request, profile, done) {
    try {
        const userEmail = profile.email;
        const userFirstName = profile.given_name; 
        const userLastName = profile.family_name; 
        const userProfilePic = profile.picture;
        const userGoogleId = profile.id; 
        
        if (!userEmail) {
            return done(new Error('Impossible de récupérer l\'adresse e-mail à partir du profil Google'), null);
        }

        let existingUser = await User.findOne({ mail: profile.email });
        if (existingUser) {
            existingUser.googleId = userGoogleId;
            existingUser.image = userProfilePic;
            await existingUser.save();
            return done(null, existingUser);
        } else {
            const newUser = new User({
                googleId: userGoogleId,
                mail: userEmail,
                prenom: userFirstName, 
                nom: userLastName,
                image: userProfilePic,
                mdp: "" // Champ de mot de passe vide car l'utilisateur Google ne fournit pas de mot de passe
            });
            await newUser.save();
            return done(null, newUser);
        }
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;