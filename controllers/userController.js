
// controllers/userController.js
const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors'); // Assurez-vous d'avoir ce module installé
const nodemailer = require('nodemailer');


// getAllUsers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getUserById
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createUser
exports.createUser = async (req, res) => {
  const { mail, mdp } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ mail });

    if (existingUser) {
      return res.status(400).json({ error: 'l"utilisateur existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(mdp, 10);
    const user = new User({ ...req.body, mdp: hashedPassword });

    // Générer et attribuer le token JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    user.token = token;

    const newUser = await user.save();
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateUser
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteUser
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login
exports.login = async (req, res) => {
  const { mail, mdp } = req.body;

  try {
    const user = await User.findOne({ mail });

    if (!user) {
      return res.status(401).json({ error: 'Adresse e-mail incorrecte' });
    }

    const passwordMatch = await bcrypt.compare(mdp, user.mdp);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Créer et attribuer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;

    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//logout
exports.logout = async (req, res) => {
  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Raccourcir le délai d'expiration à une minute (facultatif)
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Invalidité du token en le supprimant
    user.token = '';

    // Sauvegarde de l'utilisateur mis à jour dans la base de données
    await user.save();

    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//sendMail
//sendMail
exports.sendMail = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({ mail: data.mail });

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur introuvable !" });
    }

    const payload = {
      mail: user.mail
    };

    const expiryTime = 3000;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });

    const mailTransporter = nodemailer.createTransport({
      auth: {
        user: "mrazouzi01@gmail.com",
        pass: "pbgbksnbxgtvrftp"
      }
    });

    let mailDetails = {
      from: "mrazouzi01@gmail.com",
      to: user.mail,
      subject: "Réinitialisation du mot de passe",
      html: `<html>
              <head>
                <title>Demande de réinitialisation de mot de passe</title>
              </head>
              <body>
                <h1>Demande de réinitialisation de mot de passe</h1>
                <p>Cher ${user.nom},</p>
                <p>Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte chez nous.
                  Pour compléter le processus de réinitialisation du mot de passe, veuillez cliquer sur le bouton ci-dessous :</p>
                <a href=${process.env.LIVE_URL}/reset-password/>
                  <button style="background-color:#4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px;">
                    Réinitialiser le mot de passe
                  </button>
                </a>
                <p>Veuillez noter que ce lien n'est valable que pendant 5 minutes.
                  Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer ce message.</p>
                <p>Merci,</p>
                <p>Let's Azouzi Dev</p>
              </body>
            </html>`
    };

    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Une erreur s'est produite lors de l'envoi de l'e-mail" });
      } else {
        return res.status(200).json({ msg: "E-mail envoyé avec succès !" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Une erreur s'est produite lors de la demande de réinitialisation du mot de passe" });
  }
};
