
// models/paiementModel.js
const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  codepai: { type: Number, required: true, unique: true },
  numres: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  cin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prixtotal: { type: Number, required: true },
  numcarte: { type: Number, required: true },
  mois: { type: Number, required: true },
  anee: { type: Number, required: true },
  codesrt: { type: Number, required: true },
  nomdent:{type: String,require:true, maxlength:250},
  datepai: { type: Date, required: true },

});

const Paiement = mongoose.model('Paiement', paiementSchema);

module.exports = Paiement;
