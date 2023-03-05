// Récupération des projets et affichage sur la page de base

const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();

export {projets};

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

export {genererProjets};

// Même fonction, mais pour générer les projets à l'intérieur de la modale, ciblant ".gallery_modal" ainsi qu'une fontion "éditer" + supprimer via l'icône de trash dans le coin haut de chaque image// 

let projetId ='';
import { deleteProjet } from "./delete.js";

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

export {genererProjetsModal};

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

// Gestion du token sur la page principale après connexion.

const token = localStorage.getItem('token');

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
