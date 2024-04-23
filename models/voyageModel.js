
// models/voyageModel.js
const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema({
  codev: { type: Number, required: true, unique: true },
  ville: { type: String, maxlength: 250, required: true },
  pays: { type: String, maxlength: 250, required: true },
  nbrjours: { type: Number,  },
  nbrnuits: { type: Number,  },
  datebebut: { type: Date, },
  datefin: { type: Date,  },
  prix: { type: Number, },
  noteebien: { type: String, maxlength: 250 },
  nomhotel: { type: String, ref: 'Hotel',required: true,  },

});

const Voyage = mongoose.model('Voyage', voyageSchema);

module.exports = Voyage;
