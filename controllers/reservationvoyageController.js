// controllers/reservationvoyageController.js
const ReservationVoyage = require('../models/reservationvoyageModel');

// getAllReservationsVoyage
exports.getAllReservationsVoyage = async (req, res) => {
  try {
    const reservations = await ReservationVoyage.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getReservationVoyageById
exports.getReservationVoyageById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await ReservationVoyage.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation de voyage non trouvée' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createReservationVoyage
exports.createReservationVoyage = async (req, res) => {
  const reservation = new ReservationVoyage(req.body);
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateReservationVoyage
exports.updateReservationVoyage = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const updatedReservation = await ReservationVoyage.findByIdAndUpdate(reservationId, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Réservation de voyage non trouvée' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteReservationVoyage
exports.deleteReservationVoyage = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const deletedReservation = await ReservationVoyage.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Réservation de voyage non trouvée' });
    }
    res.json({ message: 'Réservation de voyage supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
