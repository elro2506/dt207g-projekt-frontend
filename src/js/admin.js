"use strict";

//Här hämtar jag containers för respektive kategori: fika, frukost och lunch
const fikaContainer = document.getElementById("fika-container-admin");
const breakfastContainer = document.getElementById("breakfast-container-admin");
const lunchContainer = document.getElementById("lunch-container-admin");
const token = sessionStorage.getItem("website_token");
const API_URL = "https://dt207g-projekt-backend-pw9d.onrender.com";

if (!token) {
    window.location.href = "login.html";
}

async function getAdmin() {
    try {
        const response = await fetch(`${API_URL}/api/admin`,
            {
                method: "GET",
                headers: {
                    //Skickar med JWT-token för att verifiera inloggad användare
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.log(error);
    }

}

getAdmin();

//Funktion för att hämta menyn från mitt API
async function getMenu() {
    //Hämtar datan från mitt backend
    const response = await fetch(`${API_URL}/api/menu`);
    //Detta gör om JSON-datan till JavaScript-objekt
    const menu = await response.json();

    //Loopar igenom alla maträtter som läggs in
    menu.forEach(item => {
        //Om kategorin är frukost så skrivs innehållet ut i frukost-containern
        if (item.category === "Frukost") {
            breakfastContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title} - ${item.price} kr</p><div>
            <button class="delete-btn" onclick="deleteItem('${item._id}')">Radera</button>
            <button class="edit-btn" onclick="editItem('${item._id}')">Redigera</button></div>
            </div>
            `;

        } else if (item.category === "Lunch") {
            lunchContainer.innerHTML += `
            <div class="menu-item">
            <p>${item.title} - ${item.price} kr</p><div>
            <button class="delete-btn" onclick="deleteItem('${item._id}')">Radera</button>
            <button class="edit-btn" onclick="editItem('${item._id}')">Redigera</button></div>
            </div>
            `;
        } else if (item.category === "Fika") {
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

    if (currentEditId) {
        await fetch(`${API_URL}/api/menu/${currentEditId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                //Skickar med JWT-token för att verifiera inloggad användare
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(newItem)
        });

        currentEditId = null;
    } else {

        //Datan skickas till backend
        await fetch(`${API_URL}/api/menu`, {
            //Metoden för att lägga till ny data
            method: "POST",
            //Detta talar om så att datan skickas som JSON
            headers: {
                "Content-type": "application/json",
                //Skickar med JWT-token för att verifiera inloggad användare
                Authorization: `Bearer ${token}`
            },
            //Gör om Javascript-objetet till JSON
            body: JSON.stringify(newItem)
        });
    }
    location.reload();
});

async function deleteItem(id) {
    await fetch(`${API_URL}/api/menu/${id}`, {
        method: "DELETE",
        headers: {
            //Skickar med JWT-token för att verifiera inloggad användare
            Authorization: `Bearer ${token}`
        }
    });
    location.reload();
}

let currentEditId = null;

async function editItem(id) {
    //Hämtar hela menyn från mitt API
    const response = await fetch(`${API_URL}/api/menu`);

    //Gör om JSON till JavaScript
    const menu = await response.json();

    //Identifierar rätt maträtt utifrån deras id
    const itemToEdit = menu.find(item => item._id === id);

    //Fyller formuläret längre ner med nuvarande information
    document.getElementById("title").value = itemToEdit.title;
    document.getElementById("price").value = itemToEdit.price;
    document.getElementById("category").value = itemToEdit.category;

    //Sparar id på den rätten som man redigerar
    currentEditId = id;

    //Vill att man scrollar ner till formuläret
    form.scrollIntoView({
        behavior: "smooth"
    });

}

//Eftersom jag har type module på admin.js-länken så kopplar jag funktionen till window i stället
window.deleteItem = deleteItem;
window.editItem = editItem;
