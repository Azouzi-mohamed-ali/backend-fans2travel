
// routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const upload = require("../middleware/multer");
const { cloudinary } = require('../config/cloudinary');

// Route pour obtenir tous les hotels
router.get('/hotels', hotelController.getAllHotels);

// Route pour obtenir un hotel par son ID
router.get('/hotels/:id', hotelController.getHotelById);

// Route pour créer un nouvel hotel
router.post('/hotels', hotelController.createHotel);

// Route pour mettre à jour un hotel par son ID
router.put('/hotels/:id', hotelController.updateHotel);

// Route pour supprimer un hotel par son ID
router.delete('/hotels/:id', hotelController.deleteHotel);

// Route pour télécharger une image pour un hôtel
router.post('/hotels/:id/images', upload.single('image'), hotelController.uploadHotelImage);

// Route pour supprimer une image d'un hôtel
router.delete('/hotels/:id/images/:imageId', hotelController.deleteHotelImage);

module.exports = router;
