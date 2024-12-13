const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const vipRouter = require('./routes/router.js'); // Assurez-vous du chemin correct

// Connexion à la base de données
mongoose.connection.once('open', () => {
    console.log('Connecté à la base de données');
});

mongoose.connection.on('error', () => {
    console.log('Erreur de connexion à la base de données');
});

mongoose.connect("mongodb://localhost:27017/db_vip");

const app = express();
app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use(vipRouter);

// Lancement du serveur
app.listen(3000, () => {
    console.log('Serveur ON');
});
