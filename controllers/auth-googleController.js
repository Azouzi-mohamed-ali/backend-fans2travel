
const passport = require('passport');

// Démarrer le processus d'authentification Google
exports.startGoogleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback après l'authentification réussie ou échouée
exports.googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: '/home', // Redirection après l'authentification réussie
        failureRedirect: '/login' // Redirection en cas d'échec
    })(req, res, next);
};
