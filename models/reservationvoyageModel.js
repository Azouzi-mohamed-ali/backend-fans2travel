// models/reservationvoyageModel.js
const mongoose = require('mongoose');

const reservationVoyageSchema = new mongoose.Schema({
  numres_vg: { type: Number, required: true, unique: true },
  dateres: { type: Date, required: true },
  fraisdossier: { type: Number, required: true },
  prix: { type: Number, required: true},
  prixtotal:{ type: Number, required: true},
  codevoyage: { type: mongoose.Schema.Types.ObjectId, ref: 'Voyage', required: true }, // Référence à le voyage
  nomhotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // Référence à l'hôtel
  num_ins: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  etat: { type: String, required: false, maxlength: 50, enum: ['en cours', 'hh'] },
});

const ReservationVoyage = mongoose.model('ReservationVoyage', reservationVoyageSchema);

module.exports = ReservationVoyage;
