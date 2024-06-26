// controllers/chambreController.js
const Chambre = require('../models/chambreModel');
const Hotel = require('../models/hotelModel');
const { cloudinary } = require('../config/cloudinary');
// Importer multer pour gérer les fichiers
const multer = require('multer');


 
// getAllChambres
exports.getAllChambres = async (req, res) => {
  try {
    const chambres = await Chambre.find();
    res.json(chambres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer les chambres avec leurs numéros associés à un hôtel
async function getChambresInHotel(nomHotel) {
  try {
    // Recherche de l'hôtel par son nom
    const hotel = await Hotel.findOne({ nomhotel: nomHotel });

    if (!hotel) {
      throw new Error("L'hôtel n'existe pas.");
    }

    // Recherche des chambres associées à cet hôtel
    const chambres = await Chambre.find({ nomhotel: hotel._id }, 'numchambre');

    return chambres.map(chambre => chambre.numchambre); // Retourner seulement les numéros de chambre
  } catch (error) {
    console.error("Erreur lors de la récupération des chambres dans l'hôtel :", error.message);
    return null;
  }
}

// getChambreById
exports.getChambreById = async (req, res) => {
  const chambreId = req.params.id; 
  try {
    const chambre = await Chambre.findById(chambreId);
    if (!chambre) {
      return res.status(404).json({ message: 'Chambre non trouvée' });
    }

    // Récupérer l'hôtel par son nom
    const hotel = await Hotel.findOne({ nomhotel: chambre.nomhotel });

    // Remplacer le nom de l'hôtel par son nom dans les détails de la chambre
    const chambreWithHotelName = {
      ...chambre.toObject(),
      nomhotel: hotel ? hotel.nomhotel : 'Hôtel non trouvé' // Si l'hôtel n'est pas trouvé, afficher un message approprié
    };

    res.json(chambreWithHotelName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createChambre
exports.createChambre = async (req, res) => {
  const { numchambre, nomhotel, ...chambreData } = req.body; // Récupérer le numéro de la chambre et le nom de l'hôtel
  try {
    // Vérifier si l'hôtel avec le nom fourni existe
    const hotel = await Hotel.findOne({ nomhotel });
    if (!hotel) {
      return res.status(404).json({ message: "L'hôtel n'existe pas" });
    }

    // Créer une nouvelle chambre en utilisant le numéro de chambre fourni
    const newChambre = await Chambre.create({
      ...chambreData,
      numchambre, // Utiliser le numéro de chambre fourni pour la référence
      nomhotel: hotel.nomhotel, // Utiliser le nom de l'hôtel pour afficher dans le résultat
      // Associer la chambre à l'hôtel en utilisant nomhotel
      nomhotel
    });

    // Associer la chambre à l'hôtel en utilisant son nom
    newChambre.nomhotel = nomhotel;
    await newChambre.save();

    res.status(201).json(newChambre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// updateChambre

exports.updateChambre = async (req, res) => {
  const chambreId = req.params.id;
  try {
    const updates = req.body; // Récupérer les mises à jour du corps de la requête

    // Vérifier si une image est téléchargée
    if (req.file) {
      const data = await uploadToCloudinary(req.file.path, "f2t"); // Upload de la nouvelle image
      updates.images = data.url; // Ajouter l'URL de la nouvelle image aux mises à jour
    }

    const updatedChambre = await Chambre.findByIdAndUpdate(chambreId, updates, { new: true });
    if (!updatedChambre) {
      return res.status(404).json({ message: 'Chambre non trouvée' });
    }

    // Mettre à jour le numéro de chambre dans l'hôtel correspondant
    const hotel = await Hotel.findOne({ nomhotel: updatedChambre.nomhotel });
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel associé non trouvé' });
    }

    // Mettre à jour le numéro de chambre dans la liste des chambres de l'hôtel
    const chambreIndex = hotel.chambres.indexOf(updatedChambre.numchambre);
    if (chambreIndex !== -1) {
      hotel.chambres.splice(chambreIndex, 1, updatedChambre.numchambre);
    }
    await hotel.save();

    res.json(updatedChambre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// deleteChambre
exports.deleteChambre = async (req, res) => {
  const chambreId = req.params.id;
  try {
    // Trouver la chambre à supprimer
    const deletedChambre = await Chambre.findByIdAndDelete(chambreId);
    if (!deletedChambre) {
      return res.status(404).json({ message: 'Chambre non trouvée' });
    }

    // Trouver l'hôtel associé à cette chambre
    const hotel = await Hotel.findOne({ nomhotel: deletedChambre.nomhotel });
    
    if (hotel) {
      // Si l'hôtel associé est trouvé, supprimer la chambre de la liste des chambres de l'hôtel
      hotel.chambres = hotel.chambres.filter(chambre => chambre !== deletedChambre.numchambre);
      await hotel.save();
    }

    res.json({ message: 'Chambre supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Upload d'une image pour une chambre
exports.uploadChambreImage = async (req, res) => {
  try {
    // Upload Image to Cloudinary
    const data = await uploadToCloudinary(req.file.path, "f2t");

    // Save Image Url to the database
    const savedImg = await Chambre.updateOne(
      { _id: req.params.id },
      { $set: { images: data.url } }
    );
    return res.status(404).json({ success: true, msg: ' image uploaded successfully!', status: 200});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: " image uploaded failed!", status: 500, error: error.message });

  }
};

// Supprimer une image des images d'une chambre
exports.deleteChambreImage = async (req, res) => {
  try {
    const chambreId = req.params.id;
    const imageId = req.params.imageId;

    // Trouver la chambre par son ID
    const chambre = await Chambre.findById(chambreId);

    if (!chambre) {
      return res.status(404).json({ success: false, msg: 'Chambre non trouvée' });
    }

    // Vérifier si l'image existe dans les images de la chambre
    const imageIndex = chambre.images.indexOf(imageId);

    if (imageIndex === -1) {
      return res.status(404).json({ success: false, msg: 'L\'image spécifiée n\'existe pas dans les images de la chambre' });
    }

    // Supprimer l'image du tableau d'images de la chambre
    chambre.images.splice(imageIndex, 1);
    await chambre.save();

    // Ajoutez ici le code pour supprimer l'image de votre service de stockage (par exemple, Cloudinary)

    res.status(200).json({ success: true, msg: 'Image de chambre supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Une erreur s\'est produite lors de la suppression de l\'image de chambre', error: error.message });
  }
};
