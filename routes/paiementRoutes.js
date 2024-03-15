
// routes/paiementRoutes.js
const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');

// Route pour obtenir tous les Paiements
router.get('/paiements', paiementController.getAllPaiements);

// Route pour obtenir un paiement par son ID
router.get('/paiements/:id', paiementController.getPaiementById);

// Route pour créer un nouvel paiement
router.post('/paiements', paiementController.createPaiement);

// Route pour mettre à jour un paiement par son ID
router.put('/paiements/:id', paiementController.updatePaiement);

// Route pour supprimer un paiement par son ID
router.delete('/paiements/:id', paiementController.deletePaiement);

module.exports = router;
