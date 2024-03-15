
// models/favorieModel.js
const mongoose = require('mongoose');

const favorieSchema = new mongoose.Schema({
  codefav: { type: Number, required: true, unique: true },
  cin:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, maxlength: 50, enum: ['Hotel', 'Promo', 'Voyage'] }



});

const Favorie = mongoose.model('Favorie', favorieSchema);

module.exports = Favorie;
