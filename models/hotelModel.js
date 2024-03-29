const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nomhotel: { type: String, required: true, maxlength: 250, unique: true },
  nbretoile: { type: Number, required: true },
  nbrechambre: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 250 },
  adresse: { type: String, maxlength: 250 },
  ville: { type: String, maxlength: 250 },
  pays: { type: String, maxlength: 250 },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  noteebien: { type: String, required: false, maxlength: 250 },
  pension: { type: String, maxlength: 50, enum: ['Tous Inclus', 'Pension Compléte', 'Demi-Pension', 'Petit-Déjeuner'] },
  chambres: [{ type: Number, ref: 'Chambre' }], // la référence aux chambres
  services: [{ type: Number,  ref: 'Service'}] ,// la référence aux services
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
