"use strict";

//Här hämtar jag containers för respektive kategori: fika, frukost och lunch
const fikaContainer = document.getElementById("fika-container");
const breakfastContainer = document.getElementById("breakfast-container");
const lunchContainer = document.getElementById("lunch-container");
const API_URL = "https://dt207-labb4-backend.onrender.com";

//Funktion för att hämta menyn från mitt API
async function getMenu() {
    //tömmer mina containers innan menyn skrivs ut, minskar risk för dubbletter
    breakfastContainer.innerHTML = "";
    lunchContainer.innerHTML = "";
    fikaContainer.innerHTML = "";
    try {
        //Hämtar datan från mitt backend
        const response = await fetch(`${API_URL}/api/menu`);
        if (!response.ok) {
            throw new Error("Kunde inte hämta menyn!");
        }
        //Detta gör om JSON-datan till JavaScript-objekt
        const menu = await response.json();

        //Loopar igenom alla maträtter som läggs in
        menu.forEach(item => {
            //Om kategorin är frukost så skrivs innehållet ut i frukost-containern
            if (item.category === "Frukost") {
                breakfastContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title}</p>
            <p>${item.price} kr</p>
            </div>
            `;

            } else if (item.category === "Lunch") {
                lunchContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title}</p>
            <p>${item.price} kr</p>
            </div>
            `;
            } else if (item.category === "Fika") {
                fikaContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title}</p>
            <p>${item.price} kr</p>
            </div>
            `;
            }
        });
    } catch (error) {
        console.log(error);
        //Testar att lägga till en text som visas om API inte fungerar för tillfället, i stället för att det blir tomt
        fikaContainer.innerHTML = "<p>Menyn kunde inte hämtas just nu. Testa igen om en stund</p>";
    }
}
//Kör funktionen direkt när sidan laddas
getMenu();