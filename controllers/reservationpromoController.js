// controllers/reservationpromoController.js
const ReservationPromo = require('../models/reservationpromoModel');

// getAllReservationsPromo
exports.getAllReservationsPromo = async (req, res) => {
  try {
    const reservations = await ReservationPromo.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getReservationPromoById
exports.getReservationPromoById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await ReservationPromo.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation promo non trouvée' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createReservationPromo
exports.createReservationPromo = async (req, res) => {
  const { codepromo, nomhotel, cin, ...reservationData } = req.body;
  const reservation = new ReservationPromo({
    ...reservationData,
    codepromo,
    nomhotel,
    cin
  });
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateReservationPromo
exports.updateReservationPromo = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const updatedReservation = await ReservationPromo.findByIdAndUpdate(reservationId, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Réservation promo non trouvée' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteReservationPromo
exports.deleteReservationPromo = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const deletedReservation = await ReservationPromo.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Réservation promo non trouvée' });
    }
    res.json({ message: 'Réservation promo supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
