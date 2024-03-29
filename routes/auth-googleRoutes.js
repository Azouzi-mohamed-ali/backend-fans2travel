// auth-googleRoutes.js
const express = require('express');
const router = express.Router();
const authGoogleController = require('../controllers/auth-googleController');
const passport = require('passport');

// Route pour démarrer le processus d'authentification Google (GET)
router.get('/auth/google', authGoogleController.startGoogleAuth);

// Route pour le callback après l'authentification réussie ou échouée (GET)
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authGoogleController.googleAuthCallback);

// Route pour gérer les requêtes POST (si nécessaire)
router.post('/auth/google', (req, res) => {
    // Votre logique de gestion des requêtes POST ici
});

module.exports = router;
