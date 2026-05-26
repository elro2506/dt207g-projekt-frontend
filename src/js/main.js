"use strict";
//Hämtar navigeringslistan
const navigering = document.getElementById("navigering");
const API_URL = "https://dt207g-projekt-backend-pw9d.onrender.com";

document.addEventListener("DOMContentLoaded", init);

//Startar denna funktion när sidan laddats
function init() {
  changeNavigering();
}

//Funktion där navigeringsmenyn ändras beroende på om man är inloggad eller inte
function changeNavigering() {
  if (sessionStorage.getItem("website_token")) {
    navigering.innerHTML = `
    <li><a href="index.html">Startsida</a></li>
    <li><a href="admin.html">Admin</a></li>
    <li><a href="login.html" id="logout-button">Logga ut</a></li>
    `
  } else {
    navigering.innerHTML = `
    <li><a href="index.html">Startsida</a></li>
    <li><a href="menu.html">Meny</a></li>
    <li><a href="about.html">Om oss</a></li>
    `
  }

  //Om det finns en logga ut-knapp så tas token bort vid klicket, förhindrar att obehöriga kan vara inne på adminsidan
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("website_token");
      window.location.href = "login.html";
    });
  }
}