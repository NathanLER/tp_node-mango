// Importer les modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// quand je suis connecter a la bdd
mongoose.connection.once('open', () => {
    console.log('Connecter à la bdd')
});

mongoose.connection.on('error' , () => {
    console.log('Erreur dans la bdd')
});

//se connecter a la base
mongoose.connect("mongodb://localhost:27017/db_vip");

const Personne = mongoose.model('Vip' , {
    prenom : String,
    nom : String,
    vip : Boolean
}, 'vip');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/get_personnes', async (request, response) => {
    const personne = await Personne.find({},{ __v: 0 });

    if (personne.lenth == 0) {
        return response.json({code : "000"})
    };
    return response.json(personne);
});


app.post('/add_personne', async (request, response) => {
    const personneJson = request.body
    const personne = Personne(personneJson)
    await personne.save()
    return response.json(personne)
})

app.patch('/modif_vip', async (request, response) => {
    const id = request.body["id"]
    const vip = request.body["vip"]
    const PersonneUpdate = await Personne.findByIdAndUpdate(id,{"vip": vip},{ new: true });
    return response.json(PersonneUpdate)
})

app.delete('/delete_personne/:id', async (request, response) => {
    const idPersonne = request.params.id
    await Personne.findByIdAndDelete(idPersonne)
    return response.json({code : 200})
})

// lancer le sevreur
app.listen(3000,() => {
    console.log('server on');
});
