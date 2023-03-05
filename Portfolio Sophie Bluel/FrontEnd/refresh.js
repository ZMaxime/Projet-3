import { genererProjetsModal } from "./index.js";
import { genererProjets } from "./index.js";

    const reponse = await fetch('http://localhost:5678/api/works');
    const projets = await reponse.json();

function refresh () {
    document.querySelector(".gallery").innerHTML = "";
    document.querySelector(".gallery_modal").innerHTML = "";
    genererProjets(projets);
    genererProjetsModal(projets);
}

export {refresh};