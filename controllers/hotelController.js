// controllers/hotelController.js
const Hotel = require('../models/hotelModel');
const Chambre = require('../models/chambreModel');
const Service = require('../models/serviceModel');

// Fonction pour récupérer les chambres avec leurs numéros associées à un hôtel
async function getChambresInHotel(nomHotel) {
  try {
    // Recherche de l'hôtel par son nom
    const hotel = await Hotel.findOne({ nomhotel: nomHotel });

    if (!hotel) {
      throw new Error("L'hôtel n'existe pas.");
    }
      // Recherche des chambres  associés à cet hôtel
      const chambres = await Chambre.find({ nomhotel: nomHotel }, 'numchambre');

      return chambres.map(chambre => {
        return { numChambre: chambre.numchambre}; // Retourner le nom du chambre
      });
    
  } catch (error) {
    console.error("Erreur lors de la récupération des chambres dans l'hôtel :", error.message);
    return null;
  }
}

// Fonction pour récupérer les services avec leurs noms associés à un hôtel
async function getServicesInHotel(nomHotel) {
  try {
    // Recherche de l'hôtel par son nom
    const hotel = await Hotel.findOne({ nomhotel: nomHotel });

    if (!hotel) {
      throw new Error("L'hôtel n'existe pas.");
    }

    // Recherche des services associés à cet hôtel
    const services = await Service.find({ nomhotel: nomHotel }, 'nomservice');

    return services.map(service => {
      return { nomService: service.nomservice}; // Retourner le nom du service 
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des services dans l'hôtel :", error.message);
    return null;
  }
}
//getAlls
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    const hotelsFormatted = [];
    for (const hotel of hotels) {
      // Récupérer les chambres associées à cet hôtel
      const chambres = await getChambresInHotel(hotel.nomhotel);
      // Récupérer les services associés à cet hôtel
      const services = await getServicesInHotel(hotel.nomhotel);

      const formattedHotel = {
        _id: hotel._id,
        nomhotel: hotel.nomhotel,
        nbretoile: hotel.nbretoile,
        nbrechambre: hotel.nbrechambre,
        description: hotel.description,
        adresse: hotel.adresse,
        ville: hotel.ville,
        pays: hotel.pays,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        noteebien: hotel.noteebien,
        // Convertir les numéros de chambre en une chaîne séparée par des virgules
        chambres: chambres.map(chambre => chambre.numChambre).join(', '),
        // Convertir les noms de service en une chaîne séparée par des virgules
        services: services.map(service => service.nomService).join(', ')
      };
      hotelsFormatted.push(formattedHotel);
    }

    res.json({ success: true, msg: "Liste des hôtels récupérée avec succès", status: 200, data: hotelsFormatted });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message, status: 500 });
  }
};


// getHotelById
exports.getHotelById = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ success: false, msg: 'Hôtel non trouvé', status: 404 });
    }

    // Récupérer les chambres associées à cet hôtel
    const chambres = await getChambresInHotel(hotel.nomhotel);
    
    // Récupérer les services associés à cet hôtel
    const services = await getServicesInHotel(hotel.nomhotel);

    res.json({ success: true, msg: "Hôtel récupéré avec succès", status: 200, data: { ...hotel.toObject(), chambres, services } });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message, status: 500 });
  }
};



// createHotel
exports.createHotel = async (req, res) => {
  const hotel = new Hotel(req.body);
  try {
    const newHotel = await hotel.save();
    res.status(201).json({ success: true, msg: "Hôtel créé avec succès", status: 201, data: newHotel });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message, status: 400 });
  }
};


// updateHotel
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  const newHotelName = req.body.nomhotel; // Nouveau nom de l'hôtel

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, req.body, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ success: false, msg: 'Hôtel non trouvé', status: 404 });
    }

    // Mettre à jour le nom de l'hôtel dans les chambres associées
    const updateResult = await Chambre.updateMany(
      { nomhotel: updatedHotel._id }, // Filtre pour les chambres associées à l'ancien ID de l'hôtel
      { nomhotel: newHotelName } // Mettre à jour le nom de l'hôtel dans ces chambres
    );

    // Mettre à jour les références de chambres dans l'hôtel lui-même
    updatedHotel.chambres = await Chambre.find({ nomhotel: updatedHotel._id }).select('_id');
    await updatedHotel.save();

    if (updateResult.ok) {
      // Mettre à jour le nom de l'hôtel dans l'objet Hotel retourné
      updatedHotel.nomhotel = newHotelName;
      res.json({ success: true, msg: "Hôtel mis à jour avec succès", status: 200, data: updatedHotel });
    } else {
      throw new Error("La mise à jour du nom de l'hôtel dans les chambres associées a échoué");
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message, status: 400 });
  }
};


// deleteHotel
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      return res.status(404).json({ success: false, msg: 'Hôtel non trouvé', status: 404 });
    }

    // Supprimer toutes les chambres associées à cet hôtel par son ID
    await Chambre.deleteMany({ nomhotel: hotelId });

    // Supprimer toutes les chambres associées à cet hôtel par son nom
    await Chambre.deleteMany({ nomhotel: deletedHotel.nomhotel });

    // Supprimer la référence de l'hôtel des services associés
    await Service.updateMany({ hotels: deletedHotel._id }, { $pull: { hotels: deletedHotel._id } });
    
    res.json({ success: true, msg: "Hôtel et chambres associées et services associés supprimés avec succès", status: 200 });

  } catch (error) {
    res.status(500).json({ success: false, msg: error.message, status: 500 });
  }
};




