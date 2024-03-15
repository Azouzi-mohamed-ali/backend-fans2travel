
// controllers/promoController.js
const Promo = require('../models/promoModel');

// getAllPromos
exports.getAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find();
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getPromoById
exports.getPromoById = async (req, res) => {
  const promoId = req.params.id;
  try {
    const promo = await Promo.findById(promoId);
    if (!promo) {
      return res.status(404).json({ message: 'Promo non trouvé' });
    }
    res.json(promo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createPromo
exports.createPromo = async (req, res) => {
  const promo = new Promo(req.body);
  try {
    const newPromo = await promo.save();
    res.status(201).json(newPromo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updatePromo
exports.updatePromo = async (req, res) => {
  const promoId = req.params.id;
  try {
    const updatedPromo = await Promo.findByIdAndUpdate(promoId, req.body, { new: true });
    if (!updatedPromo) {
      return res.status(404).json({ message: 'Promo non trouvé' });
    }
    res.json(updatedPromo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deletePromo
exports.deletePromo = async (req, res) => {
  const promoId = req.params.id;
  try {
    const deletedPromo = await Promo.findByIdAndDelete(promoId);
    if (!deletedPromo) {
      return res.status(404).json({ message: 'Promo non trouvé' });
    }
    res.json({ message: 'Promo supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
