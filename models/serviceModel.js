
// models/serviceModel.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nomservice: { type: String, required: true,maxlength:250, unique: true },
  description:{type: String,require:true, maxlength:250},
  nomhotel: { type: String, ref: 'Hotel', required: true,  },


});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
