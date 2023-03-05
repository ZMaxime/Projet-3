// Envoi de l'image uploadée à l'API et mise à jour de la page du site + modale d'édition //

const token = localStorage.getItem('token');
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
    const sectionProjet = document.querySelector(".gallery");

        const sectionFigure = document.createElement("figure");

        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");      // Création de la vigntte sur la page principale sans avoir à la recharger.
        
        imageElement.src = data.imageUrl;

        sectionFigure.classList.add (data.id);
        titleElement.innerText = data.title;


        sectionProjet.appendChild(sectionFigure);
        sectionFigure.appendChild(imageElement);
        sectionFigure.appendChild(titleElement);


        const sectionProjetModal = document.querySelector(".gallery_modal");

        const sectionFigureModal = document.createElement("figure");

        const imageElementModal = document.createElement("img");
        const titleElementModal = document.createElement("figcaption");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('button_delete');
        sectionFigureModal.classList.add (data.id);          // Ajout d'une classe à chaque section figure correspondant à l'id de l'image récupérée // 
        titleElementModal.innerText = "éditer";
        
        imageElementModal.src = data.imageUrl;

        sectionFigureModal.appendChild(deleteButton);
        sectionProjetModal.appendChild(sectionFigureModal);
        sectionFigureModal.appendChild(imageElementModal);
        sectionFigureModal.appendChild(titleElementModal);

        deleteButton.addEventListener('click', (event) => {     // Récupération de l'id du parent du bouton sur lequel on a cliqué pour la suppression//
            projetId = event.target.closest('figure').classList[0];
            deleteProjet(projetId);
  })
  });
});

