
// models/voyageModel.js
const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema({
  codev: { type: Number, required: true, unique: true },
  nomhotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  ville: { type: String, required: true, maxlength: 250 },
  pays: { type: String, required: true, maxlength: 250 },
  ville: { type: String, maxlength: 250, required: true },
  pays: { type: String, maxlength: 250, required: true },
  nbrjours: { type: Number, required: true },
  nbrnuits: { type: Number, required: true },
  datebebut: { type: Date, required: true},
  datefin: { type: Date, required: true },
  prix: { type: Number, required: true },
  noteebien: { type: String, maxlength: 250 },
  type: { type: String, required: true, maxlength: 50, enum: ['voyage en groupe'] }
});

const Voyage = mongoose.model('Voyage', voyageSchema);

module.exports = Voyage;
