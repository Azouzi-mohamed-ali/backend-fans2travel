
// controllers/voyageController.js
const Voyage = require('../models/voyageModel');

// getAllVoyages
exports.getAllVoyages = async (req, res) => {
  try {
    const voyages = await Voyage.find();
    res.json(voyages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getVoyageById
exports.getVoyageById = async (req, res) => {
  const voyageId = req.params.id;
  try {
    const voyage = await Voyage.findById(voyageId);
    if (!voyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    res.json(voyage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createVoyage
exports.createVoyage = async (req, res) => {
  const voyage = new Voyage(req.body);
  try {
    const newVoyage = await voyage.save();
    res.status(201).json(newVoyage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateVoyage
exports.updateVoyage = async (req, res) => {
  const voyageId = req.params.id;
  try {
    const updatedVoyage = await Voyage.findByIdAndUpdate(voyageId, req.body, { new: true });
    if (!updatedVoyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    res.json(updatedVoyage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteVoyage
exports.deleteVoyage = async (req, res) => {
  const voyageId = req.params.id;
  try {
    const deletedVoyage = await Voyage.findByIdAndDelete(voyageId);
    if (!deletedVoyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    res.json({ message: 'Voyage supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
