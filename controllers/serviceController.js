
// controllers/serviceController.js
const Service = require('../models/serviceModel');

// getAllServices
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getServiceById
exports.getServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service .findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createService
exports.createService = async (req, res) => {
  const service = new Service (req.body);
  try {
    const newService  = await service.save();
    res.status(201).json(newService );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateService
exports.updateService  = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const updatedService  = await Service .findByIdAndUpdate(serviceId, req.body, { new: true });
    if (!updatedService ) {
      return res.status(404).json({ message: 'Service  non trouvé' });
    }
    res.json(updatedService );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteService
exports.deleteService  = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const deletedService  = await Service .findByIdAndDelete(serviceId);
    if (!deletedService ) {
      return res.status(404).json({ message: 'Service  non trouvé' });
    }
    res.json({ message: 'Service  supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
