// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const passport = require('passport');
const session = require('express-session');  

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const hotelRoutes = require('./routes/hotelRoutes');
const chambreRoutes = require('./routes/chambreRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const paiementRoutes = require('./routes/paiementRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const demandeRoutes = require('./routes/demandeRoutes');
const favorieRoutes = require('./routes/favorieRoutes');
const voyageRoutes = require('./routes/voyageRoutes');
const messageRoutes = require('./routes/messageRoutes');
const promoRoutes = require('./routes/promoRoutes');




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

// Configuration des routes
app.use('/api', userRoutes);
app.use('/api', authMiddleware);
app.use('/api', hotelRoutes);
app.use('/api', chambreRoutes);
app.use('/api', serviceRoutes);
app.use('/api', paiementRoutes);
app.use('/api', reservationRoutes);
app.use('/api', demandeRoutes);
app.use('/api', favorieRoutes);
app.use('/api', voyageRoutes);
app.use('/api', messageRoutes);
app.use('/api', promoRoutes);



app.use(session({ secret: 'votre_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
