
// controllers/messageController.js
const Message = require('../models/messageModel');

// getAllMessages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getMessageById
exports.getMessageById = async (req, res) => {
  const messageId = req.params.id;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createMessage
exports.createMessage = async (req, res) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateMessage
exports.updateMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(messageId, req.body, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteMessage
exports.deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
