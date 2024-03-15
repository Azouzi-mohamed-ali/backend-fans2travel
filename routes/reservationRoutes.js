
// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route pour obtenir tous les reservations
router.get('/reservations', reservationController.getAllReservations);

// Route pour obtenir un reservation par son ID
router.get('/reservations/:id', reservationController.getReservationById);

// Route pour créer un nouvel reservation
router.post('/reservations', reservationController.createReservation);

// Route pour mettre à jour un reservation par son ID
router.put('/reservations/:id', reservationController.updateReservation);

// Route pour supprimer un reservation par son ID
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;
