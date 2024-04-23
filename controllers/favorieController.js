// controllers/favorieController.js
const Favorie = require('../models/favorieModel');
const Hotel = require('../models/hotelModel'); // Importer le modèle d'hôtel si ce n'est pas déjà fait

// getAllFavories
exports.getAllFavories = async (req, res) => {
  try {
    // Récupérer tous les favoris et les populer avec les données utilisateur
    const favories = await Favorie.find().populate('num_ins').exec();
    res.json(favories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getFavorieById
exports.getFavorieById = async (req, res) => {
  const favorieId = req.params.id;
  try {
    const favorie = await Favorie.findById(favorieId);
    if (!favorie) {
      return res.status(404).json({ message: 'Favorie non trouvée' });
    }
    res.json(favorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// createFavorie
exports.createFavorie = async (req, res) => {
  const favorieData = req.body;
  try {
    // Vérifier si l'hôtel existe
    const hotel = await Hotel.findOne({ nomhotel: favorieData.nomhotel });
    if (!hotel) {
      return res.status(404).json({ message: "L'hôtel sélectionné n'existe pas." });
    }
    
    // Créer un nouveau favori avec les données fournies
    const favorie = new Favorie({
      num_ins: favorieData.num_ins,
      nomhotel: favorieData.nomhotel
    });

    // Enregistrer le favori dans la base de données
    const newFavorie = await favorie.save();

    res.status(201).json(newFavorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateFavorie
exports.updateFavorie = async (req, res) => {
  const favorieId = req.params.id;
  try {
    // Vérifier si l'hôtel existe avant de mettre à jour la favorie
    const favorieToUpdate = await Favorie.findById(favorieId);
    if (!favorieToUpdate) {
      return res.status(404).json({ message: 'Favorie non trouvée' });
    }

    const updatedFavorie = await Favorie.findByIdAndUpdate(favorieId, req.body, { new: true });
    res.json(updatedFavorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteFavorie
exports.deleteFavorie = async (req, res) => {
  const favorieId = req.params.id;
  try {
    const deletedFavorie = await Favorie.findByIdAndDelete(favorieId);
    if (!deletedFavorie) {
      return res.status(404).json({ message: 'Favorie non trouvée' });
    }
    res.json({ message: 'Favorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
