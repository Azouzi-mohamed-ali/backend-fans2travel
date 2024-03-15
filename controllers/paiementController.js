
// controllers/paiementController.js
const Paiement = require('../models/paiementModel');

// getAllPaiements
exports.getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find();
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getPaiementById
exports.getPaiementById = async (req, res) => {
  const paiementId = req.params.id;
  try {
    const paiement = await Paiement .findById(paiementId);
    if (!paiement) {
      return res.status(404).json({ message: 'Paiement  non trouvé' });
    }
    res.json(paiement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createPaiement
exports.createPaiement = async (req, res) => {
  const paiement = new Paiement (req.body);
  try {
    const newPaiement  = await paiement.save();
    res.status(201).json(newPaiement );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updatePaiement
exports.updatePaiement  = async (req, res) => {
  const paiementId = req.params.id;
  try {
    const updatedPaiement  = await Paiement .findByIdAndUpdate(paiementId, req.body, { new: true });
    if (!updatedPaiement ) {
      return res.status(404).json({ message: 'Paiement  non trouvé' });
    }
    res.json(updatedPaiement );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deletePaiement
exports.deletePaiement  = async (req, res) => {
  const paiementId = req.params.id;
  try {
    const deletedPaiement  = await Paiement .findByIdAndDelete(paiementId);
    if (!deletedPaiement ) {
      return res.status(404).json({ message: 'Paiement  non trouvé' });
    }
    res.json({ message: 'Paiement  supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
