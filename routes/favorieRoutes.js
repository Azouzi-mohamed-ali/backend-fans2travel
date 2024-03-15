
// routes/favorieRoutes.js
const express = require('express');
const router = express.Router();
const favorieController = require('../controllers/favorieController');

// Route pour obtenir tous les favories
router.get('/favories', favorieController.getAllFavories);

// Route pour obtenir un favorie par son ID
router.get('/favories/:id', favorieController.getFavorieById);

// Route pour créer un nouvel favorie
router.post('/favories', favorieController.createFavorie);

// Route pour mettre à jour un favorie par son ID
router.put('/favories/:id', favorieController.updateFavorie);

// Route pour supprimer un favorie par son ID
router.delete('/favories/:id', favorieController.deleteFavorie);

module.exports = router;
