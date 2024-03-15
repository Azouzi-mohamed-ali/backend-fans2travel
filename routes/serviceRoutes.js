
// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Route pour obtenir tous les Services
router.get('/services', serviceController.getAllServices);

// Route pour obtenir un Service par son ID
router.get('/services/:id', serviceController.getServiceById);

// Route pour créer un nouvel Service
router.post('/services', serviceController.createService);

// Route pour mettre à jour un Service par son ID
router.put('/services/:id', serviceController.updateService);

// Route pour supprimer un Service par son ID
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;
