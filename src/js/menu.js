"use strict";

//Här hämtar jag containers för respektive kategori: fika, frukost och lunch
const fikaContainer = document.getElementById("fika-container");
const breakfastContainer = document.getElementById("breakfast-container");
const lunchContainer = document.getElementById("lunch-container");

//Funktion för att hämta menyn från mitt API
async function getMenu() {
    //Hämtar datan från mitt backend
    const response = await fetch("http://localhost:3000/api/menu");
//Detta gör om JSON-datan till JavaScript-objekt
    const menu = await response.json();

    //Loopar igenom alla maträtter som läggs in
    menu.forEach(item => {
        //Om kategorin är frukost så skrivs innehållet ut i frukost-containern
        if(item.category === "Frukost") {
            breakfastContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title}</p>
            <p>${item.price} kr</p>
            </div>
            `;

        }else if(item.category === "Lunch") {
            lunchContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title}</p>
            <p>${item.price} kr</p>
            </div>
            `;
        } else if(item.category === "Fika") {
            fikaContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title}</p>
            <p>${item.price} kr</p>
            </div>
            `;
        }
    });
}
//Kör funktionen direkt när sidan laddas
getMenu();