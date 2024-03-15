// auth-googleController.js
const passport = require('passport');

// Démarrer le processus d'authentification Google
exports.startGoogleAuth = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

// Callback après l'authentification réussie ou échouée
exports.googleAuthCallback = (req, res) => {
    // Redirection après l'authentification réussie
    res.redirect('/dashboard');
};
