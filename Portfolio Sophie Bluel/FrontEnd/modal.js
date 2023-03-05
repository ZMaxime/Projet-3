import { genererProjetsModal } from "./index.js";
import { projets } from "./index.js";

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
