
// controllers/demandeController.js
const Demande = require('../models/demandeModel');

// getAllDemandes
exports.getAllDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getDemandeById
exports.getDemandeById = async (req, res) => {
  const demandeId = req.params.id;
  try {
    const demande = await Demande .findById(demandeId);
    if (!demande) {
      return res.status(404).json({ message: 'Demande non trouvé' });
    }
    res.json(demande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createDemande
exports.createDemande = async (req, res) => {
  const demande = new Demande (req.body);
  try {
    const newDemande  = await demande.save();
    res.status(201).json(newDemande );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateDemande
exports.updateDemande  = async (req, res) => {
  const demandeId = req.params.id;
  try {
    const updatedDemande  = await Demande .findByIdAndUpdate(demandeId, req.body, { new: true });
    if (!updatedDemande ) {
      return res.status(404).json({ message: 'Demande  non trouvé' });
    }
    res.json(updatedDemande );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteDemande
exports.deleteDemande  = async (req, res) => {
  const demandeId = req.params.id;
  try {
    const deletedDemande  = await Demande .findByIdAndDelete(demandeId);
    if (!deletedDemande ) {
      return res.status(404).json({ message: 'Demande  non trouvé' });
    }
    res.json({ message: 'Demande  supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
