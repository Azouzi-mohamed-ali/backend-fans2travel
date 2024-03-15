
// controllers/favorieController.js
const Favorie = require('../models/favorieModel');

// getAllFavories
exports.getAllFavories = async (req, res) => {
  try {
    const favories = await Favorie.find();
    res.json(favories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getFavorieById
exports.getFavorieById = async (req, res) => {
  const favorieId = req.params.id;
  try {
    const favorie = await Favorie .findById(favorieId);
    if (!favorie) {
      return res.status(404).json({ message: 'Favorie non trouvé' });
    }
    res.json(favorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createFavorie
exports.createFavorie = async (req, res) => {
  const favorie = new Favorie (req.body);
  try {
    const newFavorie  = await favorie .save();
    res.status(201).json(newFavorie );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateFavorie
exports.updateFavorie  = async (req, res) => {
  const favorieId = req.params.id;
  try {
    const updatedFavorie  = await Favorie .findByIdAndUpdate(favorieId, req.body, { new: true });
    if (!updatedFavorie ) {
      return res.status(404).json({ message: 'Favorie  non trouvé' });
    }
    res.json(updatedFavorie );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteFavorie
exports.deleteFavorie  = async (req, res) => {
  const favorieId = req.params.id;
  try {
    const deletedFavorie  = await Favorie .findByIdAndDelete(favorieId);
    if (!deletedFavorie ) {
      return res.status(404).json({ message: 'Favorie  non trouvé' });
    }
    res.json({ message: 'Favorie  supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
