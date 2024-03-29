// controllers/reservationhotelController.js
const ReservationHotel = require('../models/reservationhotelModel');

// getAllReservationsHotel
exports.getAllReservationsHotel = async (req, res) => {
  try {
    const reservations = await ReservationHotel.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getReservationHotelById
exports.getReservationHotelById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await ReservationHotel.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createReservationHotel
exports.createReservationHotel = async (req, res) => {
  const { nomhotel, cin, ...reservationData } = req.body; // Récupérer l'ID de l'hôtel et l'ID de l'utilisateur depuis le corps de la requête
  const reservation = new ReservationHotel({
    ...reservationData,
    nomhotel, // Assigner l'ID de l'hôtel à la réservation
    cin // Assigner l'ID de l'utilisateur à la réservation
  });
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateReservationHotel
exports.updateReservationHotel = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const updatedReservation = await ReservationHotel.findByIdAndUpdate(reservationId, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteReservationHotel
exports.deleteReservationHotel = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const deletedReservation = await ReservationHotel.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
