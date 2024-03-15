
// routes/demandeRoutes.js
const express = require('express');
const router = express.Router();
const demandeController = require('../controllers/demandeController');

// Route pour obtenir tous les demandes
router.get('/demandes', demandeController.getAllDemandes);

// Route pour obtenir un demande par son ID
router.get('/demandes/:id', demandeController.getDemandeById);

// Route pour créer un nouvel demande
router.post('/demandes', demandeController.createDemande);

// Route pour mettre à jour un demande par son ID
router.put('/demandes/:id', demandeController.updateDemande);

// Route pour supprimer un demande par son ID
router.delete('/demandes/:id', demandeController.deleteDemande);

module.exports = router;
