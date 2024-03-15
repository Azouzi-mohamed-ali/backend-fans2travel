
// models/chambreModel.js
const mongoose = require('mongoose');

const chambreSchema = new mongoose.Schema({
  numchambre: { type: Number, required: true, unique: true },
  // Référence à l'Hotel
  nomhotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  description: { type: String, required: true, maxlength: 250 },
  prixnuite: { type: Number, required: true },
  nbrenfant: { type: Number, required: true },
  nbradulte: { type: Number, required: true },
  litbebe: { type: Number, required: true },
  dispo: { type: String, maxlength: 50, enum: ['Oui', 'Non'] },
  type: { type: String, maxlength: 50, enum: ['Single', 'Double', 'Familier', 'Enfant'] }
});

const Chambre = mongoose.model('Chambre', chambreSchema);

module.exports = Chambre;
