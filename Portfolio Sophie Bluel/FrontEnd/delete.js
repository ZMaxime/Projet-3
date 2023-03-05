// Suppression de projet de la gallerie via requête API// 

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

function deleteProjet(id) {
    if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {            //Sécurité de confirmation de suppression de projet//
        fetch(`http://localhost:5678/api/works/${id}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
        }
        })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur de suppression: ${response.status}`);
        }
        const elements = document.getElementsByClassName(id);
        for (let i = 0; i < elements.length; i++) {
          elements[i].innerHTML = "";
          elements[i].style.display = 'none';
        }
        })
    }
};

export {deleteProjet};