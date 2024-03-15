
// controllers/userController.js
const Chambre = require('../models/chambreModel');

// getAllChambres
exports.getAllChambres = async (req, res) => {
  try {
    const chambres = await Chambre.find();
    res.json(chambre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getChambreById
exports.getChambreById = async (req, res) => {
  const chambreId = req.params.id;
  try {
    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre non trouvé' });
    }
    res.json(chambre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createChambre
exports.createChambre = async (req, res) => {
  const chambre = new Chambre(req.body);
  try {
    const newChambre = await chambre.save();
    res.status(201).json(newChambre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateChambre
exports.updateChambre = async (req, res) => {
  const chambreId = req.params.id;
  try {
    const updatedChambre = await Chambre.findByIdAndUpdate(chambreId, req.body, { new: true });
    if (!updatedChambre) {
      return res.status(404).json({ message: 'Chambre non trouvé' });
    }
    res.json(updatedChambre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteChambre
exports.deleteChambre = async (req, res) => {
  const chambreId = req.params.id;
  try {
    const deletedChambre = await Chambre.findByIdAndDelete(chambreId);
    if (!deletedChambre) {
      return res.status(404).json({ message: 'Chambre non trouvé' });
    }
    res.json({ message: 'Chambre supprimeé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
