"use strict";
const navigering = document.getElementById("navigering");
const API_URL = "https://dt207-labb4-backend.onrender.com";

document.addEventListener("DOMContentLoaded", init);

function init() {
  changeNavigering();
}


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

  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("website_token");
      window.location.href = "login.html";
    });
  }
}