// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route pour obtenir tous les contacts
router.get('/contacts', contactController.getAllContacts);

// Route pour obtenir un contact par son ID
router.get('/contacts/:id', contactController.getContactById);

// Route pour créer un nouveau contact
router.post('/contacts', contactController.createContact);

// Route pour mettre à jour un contact par son ID
router.put('/contacts/:id', contactController.updateContact);

// Route pour supprimer un contact par son ID
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
