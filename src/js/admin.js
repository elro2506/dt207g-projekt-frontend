"use strict";

//Här hämtar jag containers för respektive kategori: fika, frukost och lunch
const fikaContainer = document.getElementById("fika-container-admin");
const breakfastContainer = document.getElementById("breakfast-container-admin");
const lunchContainer = document.getElementById("lunch-container-admin");

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
            <p>${item.title} - ${item.price} kr</p><div>
            <button class="delete-btn" onclick="deleteItem('${item._id}')">Radera</button>
            <button class="edit-btn" onclick="editItem('${item._id}')">Redigera</button></div>
            </div>
            `;

        }else if(item.category === "Lunch") {
            lunchContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title} - ${item.price} kr</p><div>
            <button class="delete-btn" onclick="deleteItem('${item._id}')">Radera</button>
            <button class="edit-btn" onclick="editItem('${item._id}')">Redigera</button></div>
            </div>
            `;
        } else if(item.category === "Fika") {
            fikaContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title} - ${item.price} kr</p><div>
            <button class="delete-btn" onclick="deleteItem('${item._id}')">Radera</button>
            <button class="edit-btn" onclick="editItem('${item._id}')">Redigera</button></div>
            </div>
            `;
        }
    });
}
//Kör funktionen direkt när sidan laddas
getMenu();

//Formuläret på admin-sidan
const form = document.getElementById("menu-form");
//Eventlyssnare för när man trycker på knappen
form.addEventListener("submit", async (e) => {
    //Förhindrar att sidan laddas om då
    e.preventDefault();

    //Här skapar jag ett objekt med hjälp av informationen som hämtas från det ifyllda formuyläret, dvs titel, pris och kategori
    const newItem = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        category: document.getElementById("category").value
    };
//Datan skickas till backend
    await fetch("http://localhost:3000/api/menu", {
        //Metoden för att lägga till ny data
        method: "POST",
//Detta talar om så att datan skickas som JSON
        headers: {
            "Content-type": "application/json"
        },
//Gör om Javascript-objetet till JSON
        body: JSON.stringify(newItem)
    });
    location.reload();
});

async function deleteItem(id) {
    await fetch(`http://localhost:3000/api/menu/${id}`, {
        method: "DELETE"
    });
    location.reload();
}