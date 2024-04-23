const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const googleController = require('../controllers/auth-googleController');
const upload = require("../middleware/multer");
const { cloudinary } = require('../config/cloudinary');


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

// Route pour demander la réinitialisation du mot de passe
router.post('/forgot-password', userController.sendMail);

// Route pour réinitialiser le mot de passe
router.post('/reset-password', userController.resetPassword);

// Route pour la connexion Google
router.get('/auth/google', googleController.startGoogleAuth);

// Callback après l'authentification réussie
router.get('/auth/google/callback', googleController.googleAuthCallback);

// Route pour télécharger l'image de profil de l'utilisateur
router.post('/upload-image/:id', upload.single('image'),  userController.uploadUserImage);
router.delete('/upload-image/:id', userController.deleteUserImage);


module.exports = router;
