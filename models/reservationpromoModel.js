// models/reservationpromoModel.js
const mongoose = require('mongoose');

const reservationPromoSchema = new mongoose.Schema({
  numres_pr: { type: Number, required: true, unique: true },
  dateres: { type: Date, required: true },
  fraisdossier: { type: Number, required: true },
  prix: { type: Number, required: true},
  prixtotal:{ type: Number, required: true},
  codepromo: { type: mongoose.Schema.Types.ObjectId, ref: 'Promo', required: true }, // Référence à le promo
  nomhotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // Référence à l'hôtel
  num_ins: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
});

const ReservationPromo = mongoose.model('ReservationPromo', reservationPromoSchema); // Correction ici

module.exports = ReservationPromo; // Correction ici
