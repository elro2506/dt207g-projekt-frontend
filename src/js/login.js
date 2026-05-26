"use strict";
//Hämtar loginformuläret och url till backend
const form = document.getElementById("login");
const API_URL = "https://dt207g-projekt-backend-pw9d.onrender.com";

//Lyssnar efter när man klickat på logga in (submit)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Hämtar användarnamnet och lösenordet från formuläret
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        //Här skickar man inloggningsuppgifterna till backend
        const response = await fetch(
            `${API_URL}/api/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        //Om inloggningen går bra så sparas JWT-token i sessionstorage
        if (response.ok) {
            sessionStorage.setItem(
                "website_token", data.response.token
            );
            alert("Inloggningen lyckades!");
            window.location.href = "admin.html";

        } else {
            alert(data.error);
        }
    } catch (error) {
        console.log(error);
    }
});