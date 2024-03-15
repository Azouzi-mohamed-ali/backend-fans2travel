// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour obtenir tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Route pour obtenir un utilisateur par son ID
router.get('/users/:id', userController.getUserById);

// Route pour créer un nouvel utilisateur (inscription)
router.post('/register', userController.createUser);

// Route pour mettre à jour un utilisateur par son ID
router.put('/users/:id', userController.updateUser);

// Route pour supprimer un utilisateur par son ID
router.delete('/users/:id', userController.deleteUser);

// Route pour se connecter
router.post('/login', userController.login);

// Route pour se déconnecter
router.post('/logout', authMiddleware, userController.logout);
//Route pour send-sendMail
router.post('/send-mail', userController.sendMail)
// Route pour demander la réinitialisation du mot de passe
//router.post('/forgot-password', userController.forgotPassword);

// Route pour réinitialiser le mot de passe
//router.post('/reset-password/:id/:token', userController.resetPassword);


module.exports = router;
