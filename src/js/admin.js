"use strict";

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
});