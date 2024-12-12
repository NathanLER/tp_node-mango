let template = document.getElementById('templateTr')
const url = 'http://127.0.0.1:3000/';
const url_getPersonnes = `${url}get_personnes`
const url_addPersonne = `${url}add_personne`
const url_modifVip = `${url}modif_vip`
const url_deletePersonne = `${url}delete_personne`


async function create_element(id, nom, prenom, vip){
    const clone = template.content.cloneNode(true)
    clone.querySelectorAll('td')[0].textContent = prenom
    clone.querySelectorAll('td')[1].textContent = nom

    if (vip){ // ajouter la calss en fonction de si il est vip ou non 
        clone.querySelector('tr').classList.remove('table-danger')
        clone.querySelector('tr').classList.add('table-success')
    } else {
        clone.querySelector('tr').classList.remove('table-success')
        clone.querySelector('tr').classList.add('table-danger')
    }

    clone.querySelectorAll('button')[0].onclick = async(event) => { // boutton supprimer
        event.target.closest('tr').remove()
        await axios.delete(`${url_deletePersonne}/${id}`)
    }

    clone.querySelectorAll('button')[1].onclick = async(event) => {   // button pour changer le sataus du vip

        if (event.target.closest('tr').classList.contains('table-danger')){
            event.target.closest('tr').classList.remove('table-danger');
            event.target.closest('tr').classList.add('table-success')
            await axios.patch(url_modifVip , {"id" : id, "vip": true} )
        } else {
            event.target.closest('tr').classList.remove('table-success');
            event.target.closest('tr').classList.add('table-danger')
            await axios.patch(url_modifVip , {"id" : id, "vip": false} )
        }
    }
    
    document.getElementById('myTbody').appendChild(clone)
}

async function get_personnes() {

        const response = await axios.get(url_getPersonnes);
        for (let i in response.data){
            const id = response.data[i]['_id']
            const prenom = response.data[i]['prenom']
            const nom = response.data[i]['nom']
            const vip = response.data[i]['vip']

            create_element(id, nom, prenom, vip)
        }
}
get_personnes();

document.getElementById('btnAjouter').onclick = async() => {
    const prenom = document.getElementById('prenom').value;
    document.getElementById('prenom').value='';
    const nom = document.getElementById('nom').value;
    document.getElementById('nom').value='';
    
    const response = await axios.post(url_addPersonne, {
        "nom": nom,
        "prenom": prenom,
        "vip": false
    })
    const id = response.data['_id']
    create_element(id, nom, prenom, false)
}

