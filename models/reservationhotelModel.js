// models/reservationhotelModel.js
const mongoose = require('mongoose');

const reservationHotelSchema = new mongoose.Schema({
  numres_ht: { type: Number, required: true, unique: true },
  dateres: { type: Date, required: true },
  fraisdossier: { type: Number, required: true },
  prix: { type: Number, required: true},
  prixtotal:{ type: Number, required: true},
  nomhotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // Référence à l'hôtel
  num_ins: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
});

const ReservationHotel = mongoose.model('ReservationHotel', reservationHotelSchema);

module.exports = ReservationHotel;
