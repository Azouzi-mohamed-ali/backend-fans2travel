
// controllers/reservationController.js
const Reservation = require('../models/reservationModel');

// getAllReservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservation = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getReservationById
exports.getReservationById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await Reservation .findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation non trouvé' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createReservation
exports.createReservation = async (req, res) => {
  const reservation = new Reservation (req.body);
  try {
    const newReservation  = await reservation.save();
    res.status(201).json(newReservation );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateReservation
exports.updateReservation  = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const updatedReservation  = await Reservation .findByIdAndUpdate(reservationId, req.body, { new: true });
    if (!updatedReservation ) {
      return res.status(404).json({ message: 'Reservation non trouvé' });
    }
    res.json(updatedReservation );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteReservation
exports.deleteReservation  = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const deletedReservation  = await Reservation .findByIdAndDelete(reservationId);
    if (!deletedReservation ) {
      return res.status(404).json({ message: 'Reservation  non trouvé' });
    }
    res.json({ message: 'Reservation  supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
