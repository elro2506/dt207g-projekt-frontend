const form = document.getElementById("login");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(
            "http://localhost:3000/api/login",
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
        console.log(data);

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