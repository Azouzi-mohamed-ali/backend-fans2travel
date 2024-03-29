// models/contactModel.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  codecon: { type: Number, required: true, unique: true },
  cin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sujet: { type: String, required: true, maxlength: 250 },
  description: { type: String, required: true, maxlength: 250 }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
