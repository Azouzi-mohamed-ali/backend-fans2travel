// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const nodemailer = require('nodemailer');
// Importer le module "crypto" pour la génération de nombres aléatoires
const crypto = require('crypto');
const fs = require('fs');
const { cloudinary } = require('../config/cloudinary');
// Importer multer pour gérer les fichiers
const multer = require('multer');



// getAllUsers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, msg: 'Utilisateurs récupérés avec succès', status: 200, data: users });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Une erreur s\'est produite lors de la récupération des utilisateurs', status: 500, error: error.message });
  }
};

// getUserById
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'Utilisateur non trouvé', status: 404 });
    }
    res.json({ success: true, msg: 'Utilisateur récupéré avec succès', status: 200, data: user });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Une erreur s\'est produite lors de la récupération de l\'utilisateur', status: 500, error: error.message });
  }
};

// createUser
exports.createUser = async (req, res) => {
  const { mail, mdp } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ mail });

    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'L\'utilisateur existe déjà', status: 400 });
    }

    const hashedPassword = await bcrypt.hash(mdp, 10);
    const user = new User({ ...req.body, mdp: hashedPassword });

    // Générer et attribuer le token JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    user.token = token;

    const newUser = await user.save();
    res.status(201).json({ success: true, msg: 'Utilisateur créé avec succès', status: 201, data: newUser, token });
  } catch (error) {
    res.status(400).json({ success: false, msg: 'Une erreur s\'est produite lors de la création de l\'utilisateur', status: 400, error: error.message });
  }
};

// updateUser
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: 'Utilisateur non trouvé', status: 404 });
    }
    res.json({ success: true, msg: 'Utilisateur mis à jour avec succès', status: 200, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, msg: 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur', status: 400, error: error.message });
  }
};

// deleteUser
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: 'Utilisateur non trouvé', status: 404 });
    }
    res.json({ success: true, msg: 'Utilisateur supprimé avec succès', status: 200 });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur', status: 500, error: error.message });
  }
};

//login
exports.login = async (req, res) => {
  const { mail, mdp } = req.body;

  try {
    const user = await User.findOne({ mail });

    if (!user) {
      return res.status(401).json({ success: false, msg: 'Adresse e-mail incorrecte', status: 401 });
    }

    const passwordMatch = await bcrypt.compare(mdp, user.mdp);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, msg: 'Mot de passe incorrect', status: 401 });
    }

    // Créer et attribuer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;

    await user.save();

    // Envoyer le token dans la réponse JSON
    res.status(200).json({ success: true, msg: 'Connexion réussie', status: 200, token }); // Vous pouvez également choisir d'envoyer le token comme cookie si vous préférez
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Une erreur s\'est produite lors de la connexion', status: 500, error: error.message });
  }
};

//logout
exports.logout = async (req, res) => {
  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, msg: 'Utilisateur non trouvé', status: 404 });
    }

    // Raccourcir le délai d'expiration à une minute (facultatif)
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Invalidité du token en le supprimant
    user.token = '';

    // Sauvegarde de l'utilisateur mis à jour dans la base de données
    await user.save();

    res.json({ success: true, msg: 'Déconnexion réussie', status: 200 });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Une erreur s\'est produite lors de la déconnexion', status: 500, error: error.message });
  }
};

// Fonction pour générer un code de vérification aléatoire à 6 chiffres
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000); // Génère un nombre aléatoire entre 100000 et 999999
}

//sendMail
exports.sendMail = async (req, res) => {
  const { mail } = req.body; // Récupérer l'adresse e-mail du corps de la requête
  try {
    const user = await User.findOne({ mail }); // Recherche de l'utilisateur par son adresse e-mail

    if (!user) {
      return res.status(404).json({ success: false, msg: "Utilisateur introuvable !", status: 404 });
    }

    // Générer un code de vérification aléatoire à 6 chiffres
    const verificationCode = generateVerificationCode();

    // Mettre à jour le code de vérification de l'utilisateur dans la base de données
    user.verificationCode = verificationCode;
    await user.save();

    // Configuration du transporteur de messagerie
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });

    // Configuration des détails de l'e-mail
    const mailDetails = {
      from: process.env.MAIL_USER,
      to: user.mail,
      subject: "Réinitialisation du mot de passe",
      html: `<html>
              <head>
                <title>Réinitialisation du mot de passe</title>
              </head>
              <body>
                <h1>Réinitialisation du mot de passe</h1> 
                <p>Cher ${user.nom} ${user.prenom},</p>
                <p>Vous avez demandé une réinitialisation de votre mot de passe. Utilisez le code ci-dessous pour procéder à la réinitialisation :</p>
                <h2>Code de vérification : <strong>${verificationCode}</strong></h2>
                <p>Veuillez utiliser ce code pour réinitialiser votre mot de passe. Ce code est valable uniquement pour une seule utilisation et expirera dans un certain délai.</p>
                <a href="${process.env.LIVE_URL}/reset-password">
                  <button style="background-color:#4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px;">
                    Réinitialiser le mot de passe
                  </button>
                </a>
                <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail en toute sécurité.</p>
                <p>Merci,</p>
                <p>Votre équipe de support</p>
              </body>
            </html>`
    };

    // Envoyer l'e-mail
    await mailTransporter.sendMail(mailDetails);

    return res.status(200).json({ success: true, msg: "E-mail envoyé avec succès !", status: 200, verificationCode });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Une erreur s'est produite lors de l'envoi de l'e-mail", status: 500, error: error.message });
  }
};

// resetPassword
exports.resetPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    let user;
    
    if (email) {
      user = await User.findOne({ mail: email });
    } else if (verificationCode) {
      user = await User.findOne({ verificationCode: verificationCode });
    }

    if (!user) {
      return res.status(404).json({ success: false, msg: "Utilisateur introuvable.", status: 404 });
    }

    // Réinitialisation du mot de passe si la vérification est réussie
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.mdp = hashedPassword;
    user.verificationCode = ''; // Effacer le code de vérification une fois utilisé
    await user.save();

    return res.status(200).json({ success: true, msg: "Le mot de passe a été réinitialisé avec succès.", status: 200 });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Une erreur s'est produite lors de la réinitialisation du mot de passe.", status: 500, error: error.message });
  }
};





// Upload User Image
exports.uploadUserImage = async (req, res) => {
  try {
    // Upload Image to Cloudinary
    const data = await uploadToCloudinary(req.file.path, "f2t");

    // Save Image Url and publicId to the database
    const savedImg = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          image: data.url,
          publicId: data.public_id,
        }
      }
    );

    res.status(200).send("User image uploaded successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Une erreur s'est produite lors de la réinitialisation du mot de passe.", status: 500, error: error.message });

  }
};
  