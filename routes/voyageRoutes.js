
// routes/voyageRoutes.js
const express = require('express');
const router = express.Router();
const voyageController = require('../controllers/voyageController');

// Route pour obtenir tous les voyages
router.get('/voyages', voyageController.getAllVoyages);

// Route pour obtenir un voyage par son ID
router.get('/voyages/:id', voyageController.getVoyageById);

// Route pour créer un nouvel voyage
router.post('/voyages', voyageController.createVoyage);

// Route pour mettre à jour un voyage par son ID
router.put('/voyages/:id', voyageController.updateVoyage);

// Route pour supprimer un voyage par son ID
router.delete('/voyages/:id', voyageController.deleteVoyage);

module.exports = router;
