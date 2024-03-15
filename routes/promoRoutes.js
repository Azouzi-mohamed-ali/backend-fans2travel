
// routes/promoRoutes.js
const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

// Route pour obtenir tous les promos
router.get('/promos', promoController.getAllPromos);

// Route pour obtenir un promo par son ID
router.get('/promos/:id', promoController.getPromoById);

// Route pour créer un nouvel promo
router.post('/promos', promoController.createPromo);

// Route pour mettre à jour un promo par son ID
router.put('/promos/:id', promoController.updatePromo);

// Route pour supprimer un promo par son ID
router.delete('/promos/:id', promoController.deletePromo);

module.exports = router;
