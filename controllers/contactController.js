// controllers/contactController.js
const Contact = require('../models/contactModel');

// getAllContacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getContactById
exports.getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createContact
exports.createContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateContact
exports.updateContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteContact
exports.deleteContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json({ message: 'Contact supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
