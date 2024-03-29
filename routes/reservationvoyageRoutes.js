// routes/reservationvoyageRoutes.js
const express = require('express');
const router = express.Router();
const reservationVoyageController = require('../controllers/reservationvoyageController');

// Route pour obtenir toutes les réservations de voyage
router.get('/reservationsvoyage', reservationVoyageController.getAllReservationsVoyage);

// Route pour obtenir une réservation de voyage par son ID
router.get('/reservationsvoyage/:id', reservationVoyageController.getReservationVoyageById);

// Route pour créer une nouvelle réservation de voyage
router.post('/reservationsvoyage', reservationVoyageController.createReservationVoyage);

// Route pour mettre à jour une réservation de voyage par son ID
router.put('/reservationsvoyage/:id', reservationVoyageController.updateReservationVoyage);

// Route pour supprimer une réservation de voyage par son ID
router.delete('/reservationsvoyage/:id', reservationVoyageController.deleteReservationVoyage);

module.exports = router;
