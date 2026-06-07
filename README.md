# DT207G - Projektarbete - Elin Ronda
Detta repo berör min frontend-del av projektarbetet. Vänligen starta backendservern vars länk finns längst ner i README.

# Café Blåbär
Café Blåbär är ett fiktivt café i Stockholm som behövde en hemsida där besökare kan se ett menyutbud. Utbudet uppdateras och raderas av behörig personal med inloggning som är skyddad med en token.

## Funktionaliteter
- Startsida som alla kan se
- Informationssida om caféet
- Bonussida om kattcaféet som snart drar igång
- Inloggningssida för personal
- Adminsida för att se, lägga till, redigera eller radera rätter och detta speglas direkt på publika menyn
- JWT-token som sparas i sessionstorage efter man loggat in
- Responsiv design

## Tekniker
- HTML
- CSS
- JavaScript
- Vite
- Fetch API
- Netlify för publicering

## Struktur på webbplatsen
- index.html - startsida
- menu.html - menyn
- about.html - om-sidan
- cats.html - kattsidan
- login.html - sida med inloggningsformulär
- admin.html - adminsidan
- style.css - all styling
- menu.js - hämtar och skriver ut den publika menyn
- login.js - hanterar själva inloggningen
- admin.js - funktionalitetn för menyn (inte navigeringsmenyn)
- main.js - hanterar navigeringen och utloggning

### Mina sidor
- Backend/API: https://dt207g-projekt-backend-pw9d.onrender.com/
- Café Blåbärs webbplats: https://dt207g-projekt.netlify.app/

Smaklig måltid!
