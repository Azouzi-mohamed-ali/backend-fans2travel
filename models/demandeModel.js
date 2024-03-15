
// models/demandeModel.js
const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
  codedem: { type: Number, required: true, unique: true },
  codevoyage:{ type: mongoose.Schema.Types.ObjectId, ref: 'Voyage', required: true },
  cin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agence:{type:String, required:true, maxlength:250 },

});

const Demande = mongoose.model('Demande', demandeSchema);

module.exports = Demande;
