
// controllers/voyageController.js
const Voyage = require('../models/voyageModel');
const Hotel = require('../models/hotelModel');

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
    const voyage = await Voyage.findById(voyageId).populate('nomhotel', 'nomhotel'); // Utiliser populate pour charger le nom de l'hôtel uniquement
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
  const voyageData = req.body;
  const nomHotel = voyageData.nomhotel; // Supposons que le nom de l'hôtel soit fourni dans le corps de la requête
  try {
    // Vérifier si l'hôtel existe
    const hotel = await Hotel.findOne({ nomhotel: nomHotel });
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé' });
    }

    // Créer le voyage en associant l'hôtel par son nom
    const voyage = new Voyage({
      ...voyageData,
      nomhotel: nomHotel // Utiliser le nom de l'hôtel pour l'associer au champ nomhotel du voyage
    });

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
