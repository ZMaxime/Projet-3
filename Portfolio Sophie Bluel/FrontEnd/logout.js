//Reset du token au clic sur "Déconnexion"//
const token = localStorage.getItem('token');

if (token) {
    const boutonDeco = document.querySelector(".logout");
    
    boutonDeco.setAttribute('href', '#')
    
    boutonDeco.addEventListener("click", function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        location.href = "index.html";
    })};
    