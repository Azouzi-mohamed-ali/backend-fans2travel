const passport = require('passport');

// Démarrer le processus d'authentification Google
exports.startGoogleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback après l'authentification réussie ou échouée
exports.googleAuthCallback = (req, res) => {
    // Redirection après l'authentification réussie
    res.redirect('/home');
};
