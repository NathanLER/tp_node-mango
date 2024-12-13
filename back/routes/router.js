const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Définition du modèle Mongoose
const Personne = mongoose.model('Vip', {
    prenom: String,
    nom: String,
    vip: Boolean
}, 'vip');

// Route pour récupérer toutes les personnes
router.get('/get_personnes', async (request, response) => {
    try {
        const personne = await Personne.find({}, { __v: 0 });

        if (personne.length === 0) {
            return response.json({ code: "000" });
        }
        return response.json(personne);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Route pour ajouter une personne
router.post('/add_personne', async (request, response) => {
    try {
        const personneJson = request.body;
        const personne = new Personne(personneJson);
        await personne.save();
        return response.json(personne);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Route pour modifier l'état VIP d'une personne
router.patch('/modif_vip', async (request, response) => {
    try {
        const id = request.body["id"];
        const vip = request.body["vip"];
        const PersonneUpdate = await Personne.findByIdAndUpdate(id, { "vip": vip }, { new: true });
        return response.json(PersonneUpdate);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Route pour supprimer une personne
router.delete('/delete_personne/:id', async (request, response) => {
    try {
        const idPersonne = request.params.id;
        await Personne.findByIdAndDelete(idPersonne);
        return response.json({ code: 200 });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

module.exports = router;
