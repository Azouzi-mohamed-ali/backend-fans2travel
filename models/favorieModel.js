
// models/favorieModel.js
const mongoose = require('mongoose');

const favorieSchema = new mongoose.Schema({
  num_ins:{ type: String , ref: 'User', required: true },
  nomhotel:{ type: String , ref: 'Hotel', required: true }

});

const Favorie = mongoose.model('Favorie', favorieSchema);

module.exports = Favorie;
