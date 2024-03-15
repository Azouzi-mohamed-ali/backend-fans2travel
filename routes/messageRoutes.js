
// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route pour obtenir tous les messages
router.get('/messages', messageController.getAllMessages);

// Route pour obtenir un message par son ID
router.get('/messages/:id', messageController.getMessageById);

// Route pour créer un nouvel message
router.post('/messages', messageController.createMessage);

// Route pour mettre à jour un message par son ID
router.put('/messages/:id', messageController.updateMessage);

// Route pour supprimer un message par son ID
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
