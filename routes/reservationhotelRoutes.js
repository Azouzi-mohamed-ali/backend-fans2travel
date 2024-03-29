// routes/reservationhotelRoutes.js
const express = require('express');
const router = express.Router();
const reservationHotelController = require('../controllers/reservationhotelController');

// Route pour obtenir toutes les réservations d'hôtel
router.get('/reservationshotels', reservationHotelController.getAllReservationsHotel);

// Route pour obtenir une réservation d'hôtel par son ID
router.get('/reservationshotels/:id', reservationHotelController.getReservationHotelById);

// Route pour créer une nouvelle réservation d'hôtel
router.post('/reservationshotels', reservationHotelController.createReservationHotel);

// Route pour mettre à jour une réservation d'hôtel par son ID
router.put('/reservationshotels/:id', reservationHotelController.updateReservationHotel);

// Route pour supprimer une réservation d'hôtel par son ID
router.delete('/reservationshotels/:id', reservationHotelController.deleteReservationHotel);

module.exports = router;
