// routes/reservationpromoRoutes.js
const express = require('express');
const router = express.Router();
const reservationPromoController = require('../controllers/reservationpromoController');

// Route pour obtenir toutes les réservations promo
router.get('/reservationspromos', reservationPromoController.getAllReservationsPromo);

// Route pour obtenir une réservation promo par son ID
router.get('/reservationspromos/:id', reservationPromoController.getReservationPromoById);

// Route pour créer une nouvelle réservation promo
router.post('/reservationspromos', reservationPromoController.createReservationPromo);

// Route pour mettre à jour une réservation promo par son ID
router.put('/reservationspromos/:id', reservationPromoController.updateReservationPromo);

// Route pour supprimer une réservation promo par son ID
router.delete('/reservationspromos/:id', reservationPromoController.deleteReservationPromo);

module.exports = router;
