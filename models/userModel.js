
// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  cin: { type: Number, required: false, unique: true },
  nom: { type: String, required: false, maxlength: 250 },
  prenom: { type: String, required: false, maxlength: 250 },
  mail: { type: String, required: true, maxlength: 250 },
  mdp: { type: String, required: true, maxlength: 250 },
  adresse: { type: String, maxlength: 250 },
  ville: { type: String, maxlength: 250 },
  pays: { type: String, maxlength: 250 },
  tel: { type: Number },
  datenais: { type: Date },
  sexe: { type: String, required: false, maxlength: 50, enum: ['Mr', 'Mm', 'Mle', 'Autre'] },
  image: { type: String   },
  publicId:{ 
    type : String
  },

  role: { type: String, maxlength: 50, enum: ['user', 'super admin', 'admin'], default: 'user' }, // Ajout de la valeur par défaut
  token: { type: String },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
