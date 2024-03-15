
// models/promoModel.js
const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  codepromo: { type: String, required: true,maxlength: 250, unique: true },
  nomhotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  nomservice: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  numchambre: { type: mongoose.Schema.Types.ObjectId, ref: 'Chambre', required: true },
  description: { type: String, required: true, maxlength: 250 },
  debut: { type: Date, required: true},
  fin: { type: Date, required: true},
  prix: { type: Number, required: true},
  noteebien: { type: String, required: false, maxlength: 250},
  type: { type: String, maxlength: 50, enum: ['Ttpe promo', 'Gratuite enfants', 'Promos recommandés','Soiré'] }
});

  const Promo = mongoose.model('Promo', promoSchema);


module.exports = Promo;
