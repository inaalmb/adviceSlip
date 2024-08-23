const hash = (text) =>
{
    const hashObj = new jsSHA("SHA-512","TEXT",{numRounds: 1});
    hashObj.update(text);
    const hash = hashObj.getHash("HEX");
    return hash;
}
let hamburger = document.querySelector(".hamburger");

let quote = document.getElementById("quote");
let quoteGenerator = document.getElementById("quote-generator");

hamburger.addEventListener("click", () => {
  let nav = document.querySelector(".nav");
  nav.classList.toggle("active");
});

if (quoteGenerator) {
  quoteGenerator.addEventListener("click", (e) => {
    e.preventDefault();
    const base_url = "https://api.adviceslip.com/";

    fetch(base_url + "advice")
      .then((res) => res.json())
      .then((data) => {
        let newQuote = data.slip.advice;
        quote.textContent = newQuote;
      });
  });
}

function validateFormSrpskiPridruzi(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let nameMessage = document.querySelector("#name + .message");
  let surnameMessage = document.querySelector("#surname + .message");
  let emailMessage = document.querySelector("#email + .message");
  let passwordMessage = document.querySelector("#password + .message"); // Add a period before "message"

  let namePattern = /^[A-Z][a-z]{2,15}$/;
  let surnamePattern = /^[A-Z][a-z\-]{6,20}$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  // validate all of this
  if (!namePattern.test(name)) {
    nameMessage.innerHTML = "Ime nije validno.";
    nameMessage.style.display = "block";
    return false;
  } else {
    nameMessage.style.display = "none";
  }
  if (!surnamePattern.test(surname)) {
    surnameMessage.innerHTML = "Prezime nije validno.";
    surnameMessage.style.display = "block";
    return false;
  } else {
    surnameMessage.style.display = "none";
  }
  if (!emailPattern.test(email)) {
    emailMessage.innerHTML = "Email nije validan.";
    emailMessage.style.display = "block";
    return false;
  } else {
    emailMessage.style.display = "none";
  }

  if (!passwordPattern.test(password)) {
    passwordMessage.innerHTML = "Lozinka nije validna.";
    passwordMessage.style.display = "block";
    return false;
  } else {
    passwordMessage.style.display = "none";
  }

  window.location.href = "forma.html";
}

function validateFormSrpskiPrijava(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let emailMessage = document.querySelector("#email + .message");
  let passwordMessage = document.querySelector("#password + .message");

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  // Validacija adrese elektronske pošte
  if (!emailPattern.test(email)) {
    emailMessage.innerHTML = "Email nije validan.";
    emailMessage.style.display = "block";
    return false;
  } else {
    emailMessage.style.display = "none";
  }

  // Validacija lozinke
  if (!passwordPattern.test(password)) {
    passwordMessage.innerHTML = "Lozinka nije validna.";
    passwordMessage.style.display = "block";
    return false;
  } else {
    passwordMessage.style.display = "none";
  }
}

function loginIn() {
  let username = document.getElementById("email").value.toString();
  let password = document.getElementById("password").value.toString();
  fetch("./users.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const foundUser = data.find(
        (user) => user.email === username && user.password === hash(password)
      );

      if (foundUser) {

        alert("Uspesno ste se ulogovali");
        console.log(foundUser);
        localStorage.setItem("ulogovan", foundUser.email);
        window.location.href = "index.html";
      } 
      else {
        console.log(hash(password))
        alert("Neispravni podaci za logovanje");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
    const btnLoginIn = document.getElementById("btnLoginIn");
    if (btnLoginIn) {
      btnLoginIn.addEventListener("click", () => {
        loginIn();
      });
    }

document.addEventListener("DOMContentLoaded", function () {
  const ulogovanEmail = localStorage.getItem("ulogovan");

  if (ulogovanEmail) {
    const prijaviSeElement = document.getElementById("prijaviSe");
    const logoutElement = document.getElementById("logout");
    const prikaziSavet = document.getElementById("prikazsavet");
    const sakrijSavet = document.getElementById("loginsavet");

    if (prijaviSeElement) {
      prijaviSeElement.style.display = "none";
    }

    if (sakrijSavet) {
      sakrijSavet.style.display = "none";
    }

    if (prikaziSavet) {
      prikaziSavet.style.display = "flex";
    }

    if (logoutElement) {
      logoutElement.style.display = "block";
    }
  }
});

  function logout() {
    localStorage.removeItem("ulogovan");
    window.location.href = "index.html";
  }

  const btnLogout = document.getElementById("logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logout();
    });
  }
