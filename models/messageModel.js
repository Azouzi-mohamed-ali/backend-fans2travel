
// models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  codemes: { type: Number, required: true, unique: true },
  cin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sujet:{type:String, required:true, maxlength:250 },
  description:{type:String, required:true, maxlength:250 }

});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
