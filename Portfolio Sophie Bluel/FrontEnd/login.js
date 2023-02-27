let token ="";

const boutonLogIn = document.querySelector(".log_in");
const errorMessage = document.querySelector("#error-message");


boutonLogIn.addEventListener("click", async function () {
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;    
    
    const user = {
        email, password
    };

    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
  
      const data = await response.json();
    
    // Affiche le message d'erreur si la connexion échoue
    if (!response.ok) {
      errorMessage.classList.remove("hidden");
    
    } else {
      // Stocke le token dans le stockage local si la connexion est confirmée
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      location.href = "index.html";
    }

    } catch (error) {
      console.error(error);
    }
  });

 