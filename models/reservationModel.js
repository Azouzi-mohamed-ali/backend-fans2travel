
// models/reservationModel.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  numres: { type: Number, required: true, unique: true },
  dateres: { type: Date, required: true },
  fraisdossier: { type: Number, required: true },
  prix: { type: Number, required: true},
  cin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, maxlength: 50, enum: ['Hotel', 'Promo', 'Voyage'] }
});

  const Reservation = mongoose.model('Reservation', reservationSchema);


module.exports = Reservation;
