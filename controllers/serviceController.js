
// controllers/serviceController.js
const Service = require('../models/serviceModel');
const Hotel = require('../models/hotelModel');


// getAllServices
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getServicesInHotel(nomHotel) {
  try {
    // Recherche de l'hôtel par son nom
    const hotel = await Hotel.findOne({ nomhotel: nomHotel });

    if (!hotel) {
      throw new Error("L'hôtel n'existe pas.");
    }

    // Recherche des services associés à cet hôtel
    const services = await Service.find({ nomhotel: hotel._id }, 'nomservice');

    return services.map(service => service.nomservice); // Retourner seulement les noms de service
  } catch (error) {
    console.error("Erreur lors de la récupération des services dans l'hôtel :", error.message);
    return null;
  }
}


// getServiceById
exports.getServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }

    // Récupérer l'hôtel par son nom
    const hotel = await Hotel.findOne({ nomhotel: service.nomhotel });

    // Remplacer le nom de l'hôtel par son nom dans les détails du service
    const serviceWithHotelName = {
      ...service.toObject(),
      nomhotel: hotel ? hotel.nomhotel : 'Hôtel non trouvé' // Si l'hôtel n'est pas trouvé, afficher un message approprié
    };

    res.json(serviceWithHotelName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createService
exports.createService = async (req, res) => {
  const { nomservice, nomhotel, ...serviceData } = req.body; // Récupérer le nom du service et le nom de l'hôtel
  try {
    // Vérifier si l'hôtel avec le nom fourni existe
    const hotel = await Hotel.findOne({ nomhotel });
    if (!hotel) {
      return res.status(404).json({ message: "L'hôtel n'existe pas" });
    }

    // Vérifier si un service avec le même nom existe déjà dans cet hôtel
    const existingService = await Service.findOne({ nomservice, nomhotel });
    if (existingService) {
      return res.status(400).json({ message: 'Un service avec ce nom existe déjà dans cet hôtel' });
    }

    // Créer un nouveau service en utilisant le nom du service fourni
    const newService = await Service.create({
      ...serviceData,
      nomservice, // Utiliser le nom du service fourni pour la référence
      nomhotel // Utiliser le nom de l'hôtel pour associer le service
    });

    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// updateService
exports.updateService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }

    // Mettre à jour le nom du service dans l'hôtel correspondant
    const hotel = await Hotel.findOne({ nomhotel: updatedService.nomhotel });
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel associé non trouvé' });
    }

    // Mettre à jour le nom du service dans la liste des services de l'hôtel
    const serviceIndex = hotel.services.indexOf(updatedService.nomservice);
    if (serviceIndex !== -1) {
      hotel.services.splice(serviceIndex, 1, updatedService.nomservice);
    }
    await hotel.save();

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// deleteService
exports.deleteService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    // Trouver le service à supprimer
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }

    // Trouver l'hôtel associé à ce service
    const hotel = await Hotel.findOne({ nomhotel: deletedService.nomhotel });
    
    if (hotel) {
      // Si l'hôtel associé est trouvé, supprimer le service de la liste des services de l'hôtel
      hotel.services = hotel.services.filter(service => service !== deletedService.nomservice);
      await hotel.save();
    }

    res.json({ message: 'Service supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
