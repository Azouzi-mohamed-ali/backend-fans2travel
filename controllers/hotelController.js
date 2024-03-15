
// controllers/userController.js
const Hotel = require('../models/hotelModel');

// getAllHotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// getHotelById
exports.getHotelById = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel non trouvé' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createHotel
exports.createHotel = async (req, res) => {
  const hotel = new Hotel(req.body);
  try {
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateHotel
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, req.body, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel non trouvé' });
    }
    res.json(updatedHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteHotel
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const deletedHotel = await User.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel non trouvé' });
    }
    res.json({ message: 'Hotel supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
