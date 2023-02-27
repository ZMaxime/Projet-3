// Récupération des projets et affichage sur la page de base

const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();


function genererProjets(projets){
    for (let i = 0; i < projets.length; i++) {
        const listeProjets = projets[i];

        const sectionProjet = document.querySelector(".gallery");

        const sectionFigure = document.createElement("figure");

        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");
        
        imageElement.src = listeProjets.imageUrl;

        sectionFigure.classList.add (listeProjets.id);
        titleElement.innerText = listeProjets.title;


        sectionProjet.appendChild(sectionFigure);
        sectionFigure.appendChild(imageElement);
        sectionFigure.appendChild(titleElement);
    }
}

genererProjets(projets);

// Même fonction, mais pour générer les projets à l'intérieur de la modale, ciblant ".gallery_modal" ainsi qu'une fontion "éditer" + supprimer via l'icône de trash dans le coin haut de chaque image// 

let projetId ='';

function genererProjetsModal(projets){
    for (let i = 0; i < projets.length; i++) {
        const listeProjets = projets[i];

        const sectionProjet = document.querySelector(".gallery_modal");

        const sectionFigure = document.createElement("figure");

        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('button_delete');
        sectionFigure.classList.add (listeProjets.id);          // Ajout d'une classe à chaque section figure correspondant à l'id de l'image récupérée // 
        titleElement.innerText = "éditer";
        
        imageElement.src = listeProjets.imageUrl;

        sectionFigure.appendChild(deleteButton);
        sectionProjet.appendChild(sectionFigure);
        sectionFigure.appendChild(imageElement);
        sectionFigure.appendChild(titleElement);

        deleteButton.addEventListener('click', (event) => {     // Récupération de l'id du parent du bouton sur lequel on a cliqué pour la suppression//
            projetId = event.target.closest('figure').classList[0];
            deleteProjet(projetId);
        });
    };
}

// Suppression de projet de la gallerie via requête API// 

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
        document.getElementById(id).innerHTML = "";
        })
    }
};

// Création du traitement des boutons de filtre de la page


const boutonTous = document.querySelector(".boutonTous");

boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);            // Retour à la liste de tous les projets existants
});


const boutonObjets = document.querySelector(".boutonObjet");

boutonObjets.addEventListener("click", function () {
    const catObjet = projets.filter(function (objet) {
        return objet.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(catObjet);
});

const boutonAppart = document.querySelector(".boutonAppart");

boutonAppart.addEventListener("click", function () {
    const catAppart = projets.filter(function (appartement) {
        return appartement.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(catAppart);
});

const boutonHotel = document.querySelector(".boutonHotelRestaurant");

boutonHotel.addEventListener("click", function () {
    const catHotel = projets.filter(function (hotel) {
        return hotel.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(catHotel);
});

// Gestion du token et de l'userID sur la page principale après connexion.

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');


if (token) {   //Vérification de présence ou non d'un token pour savoir quoi afficher

// Afficher les informations d'édition sur la pâge
    const modal = document.querySelectorAll('.hidden_edition');
        for (let i = 0; i < modal.length; i++) {
        modal[i].style.display = 'block';
    }
    document.querySelector(".logout").innerHTML = "logout";
    const filtres = document.querySelector('.filtres');
    filtres.style.display = 'none';

    } else {
     // Cacher les informations d'édition sur la page
    const modal = document.querySelectorAll('.hidden_edition');

        for (let i = 0; i < modal.length; i++) {
        modal[i].style.display = 'none';
    }
}

//Reset du token au clic sur "Déconnexion"//

if (token) {
const boutonDeco = document.querySelector(".logout");

boutonDeco.setAttribute('href', '#')

boutonDeco.addEventListener("click", function () {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    location.href = "index.html";
})};


// Gestion des fenêtres de modale // 

let modal = null

const modalOpen = document.querySelector(".bouton_modifier_projets");
const target = document.querySelector(".modal");

modalOpen.addEventListener("click", function()  {
    target.style.display= null
    target.removeAttribute("aria-hidden")

    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".close_modal").addEventListener("click", closeModal)
    modal.querySelector(".modal_wrapper").addEventListener("click", stopPropagation)
    genererProjetsModal(projets);
});

const closeModal = function () {        // Fonction qui permet de fermer la modale et de réinitialiser le contenu de celle-ci //
    if (modal === null) return
    modal.style.display="none"
    modal.setAttribute("aria-hidden", true)
    document.querySelector(".gallery_modal").innerHTML = "";
    modal = null
}

const stopPropagation = function(e) {   // Fonction qui empêche de fermer la modale en cliquant n'importe où sur celle-ci //
    e.stopPropagation()
}

// Code pour passer de la modale d'édition de gallerie à la modale d'ajout de photo et inversement //

const displayModalAdd = document.querySelector(".modal1_vers_add");
const targetModalAdd = document.querySelector(".modal_add");

displayModalAdd.addEventListener("click", function()  {
    closeModal();
    targetModalAdd.style.display= null
    targetModalAdd.removeAttribute("aria-hidden")

    modal = targetModalAdd
    modal.addEventListener("click", closeModal)
    modal.querySelector(".close_modal").addEventListener("click", closeModal)
    modal.querySelector(".modal_wrapper_ajout").addEventListener("click", stopPropagation)
});

const closeModalAdd = function() {
    targetModalAdd.style.display = "none";
    targetModalAdd.setAttribute("aria-hidden", true);
    modal = null;
  };
  
  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", function() {
    closeModalAdd();
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".close_modal").addEventListener("click", closeModal);
    modal.querySelector(".modal_wrapper").addEventListener("click", stopPropagation);
    genererProjetsModal(projets);
  });

// Désactivation du bouton valider tant qu'une image n'a pas été upload ainsi qu'un titre saisi et masquage de la partie img et spec //

const imageInput = document.querySelector("#photo");
const submitButton = document.querySelector("#ajout_photo");
const imgAndSpec = document.querySelector("#img_and_spec");

imageInput.addEventListener("change", function() {
  if (imageInput.files.length > 0) {
    submitButton.classList.add('active');
    imgAndSpec.classList.add('hidden_edition');
  } else {
    submitButton.classList.remove('active');
    imgAndSpec.classList.remove('hidden_edition');
  }
});

// Fonction pour afficher une preview de l'image uploadée //

const imgBackground = document.getElementById('img_background');
const previewImg = document.createElement('img');                   // Création de la balise img avec l'id "preview" //
previewImg.id = 'preview';

imgBackground.appendChild(previewImg);

const previewImage = document.querySelector("#preview");

imageInput.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();                // Lecture de l'image uploadée et affichage d'une miniature de celle ci //
    reader.addEventListener("load", function() {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});


// Envoi de l'image uploadée à l'API et mise à jour de la page du site + modale d'édition //

const addButton = document.querySelector("#ajout_photo");

addButton.addEventListener("click", function() {
    const imageInput = document.querySelector("#photo");
    const titleInput = document.querySelector("#title_input");
    const categorySelect = document.querySelector("#category_select");
    const formData = new FormData();

    if (!imageInput.files[0]) {
        alert("Veuillez sélectionner une photo.");
        return;
    }

    if (!titleInput.value) {
        alert("Veuillez saisir un titre.");
        return;
    }

    if (categorySelect.value == 0){
        alert("Veuillez saisir une catégorie.");
        return;
    }

    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);


    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
});