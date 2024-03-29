
// routes/chambreRoutes.js
const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambreController');

// Route pour obtenir tous les chambres
router.get('/chambres',  chambreController.getAllChambres);

// Route pour obtenir une chambre par son ID
router.get('/chambres/:id', chambreController.getChambreById);

// Route pour créer une chambre 
router.post('/chambres', chambreController.createChambre);

// Route pour mettre à jour une chambre par son ID
router.put('/chambres/:id', chambreController.updateChambre);

// Route pour supprimer une chambre par son ID
router.delete('/chambres/:id', chambreController.deleteChambre);

module.exports = router;
