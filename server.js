// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');  
const multer = require('multer'); // Importer multer
const { cloudinary } = require('./config/cloudinary'); // Importer la configuration Cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const hotelRoutes = require('./routes/hotelRoutes');
const chambreRoutes = require('./routes/chambreRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const paiementRoutes = require('./routes/paiementRoutes');
const favorieRoutes = require('./routes/favorieRoutes');
const voyageRoutes = require('./routes/voyageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const promoRoutes = require('./routes/promoRoutes');
const authGoogleRoutes = require('./routes/auth-googleRoutes');
const reservationHotelRoutes = require('./routes/reservationhotelRoutes'); // Importer les routes de réservation d'hôtel
const reservationPromoRoutes = require('./routes/reservationpromoRoutes'); // Importer les routes de réservation promo
const reservationVoyageRoutes = require('./routes/reservationvoyageRoutes'); // Importer les routes de réservation de voyage

// Charger les variables d'environnement à partir de .env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données en utilisant le fichier de configuration
connectDB();

// Middleware pour parser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

// Middleware pour les sessions
app.use(session({ secret: 'votre_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware pour gérer les erreurs d'upload avec multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: "Une erreur s'est produite lors de l'upload de l'image." });
  } else {
    next(err);
  }
});

// Définir la route pour l'authentification avec Google
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
 
// Configuration des routes
app.use('/api', userRoutes);

app.use('/api', hotelRoutes);
app.use('/api', chambreRoutes);
app.use('/api', serviceRoutes);
app.use('/api', paiementRoutes);
app.use('/api', favorieRoutes);
app.use('/api', voyageRoutes);
app.use('/api', contactRoutes);
app.use('/api', promoRoutes);
app.use('/api', authGoogleRoutes);
app.use('/api', reservationHotelRoutes); // Utiliser les routes de réservation d'hôtel
app.use('/api', reservationPromoRoutes); // Utiliser les routes de réservation promo
app.use('/api', reservationVoyageRoutes); // Utiliser les routes de réservation de voyage
app.use('/api', authMiddleware);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
