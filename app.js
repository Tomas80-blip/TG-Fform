/* Naudojant ES6 klases sukurkite objekto User kūrimo konstruktorių, kuris turės savybes pagal formos input'us,
 visa informacija saugoma localStorage:
- name;
- email;
- isLoggedIn, kurios pradinė reikšmė yra false.

- Taip pat sukurkite 3 metodus:
- toggleLoginStatus(); // metodas turi pakeisti savybės isLoggedIn reikšmę į priešingą.
  T.y. jei buvo false, tai iškvietus metodą pasidaro true ir atvirkščiai.
- login(); // metodas turi grąžinti stringą – Welcome, NAME
- logout(); // metodas turi grąžinti stringą – See ya next time!

-------------------------------------------

- Įprastu būdu apsirašykite submit event, sustabdykite default naršyklės persikrovimą.
- Išsisaugokite duomenis iš formos kintamuosiuose.
- Sukurkite naują User objektą.
- iškvieskite metodą toggleLoginStatus, kad pasikeistų isLoggedIn vertė.
- consolėje pasitikrinkite ar vertė pasikeitė. 

-------------------------------------------

- Apsirašykite tokią logiką:

Jeigu isLoggedIn yra tiesa, sukurkite du naujus elementus: h1 ir button.

h1 suteikite metodo login() grąžinamą tekstą. 
Mygtukui suteikite pavadinimą - logout.

Atvaizduokite po forma esančiame div elemente su .message klase. 

-------------------------------------------

Ant logout mygtuko uždėkite click event. Paspaudimo metu isLoggedIn statusas vėl turi pasikeisti,
ir jei iki šiol buvo true, tai turi būti false.
Jeigu isLoggedIn statusas yra false, tuomet h1 tekstas turi būti logout metodo rezultatu.

-------------------------------------------

Kiekvieną kartą paspaudus formos submit mygtuką visas papildomas tekstas turi išsivalyti.
*/


const form = document.querySelector('form');

// User klasė
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.isLoggedIn = false;
    }

    toggleLoginStatus() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    login() {
        return `Welcome, ${this.name}`;
    }

    logout() {
        return `See ya next time!`;
    }
}

// Funkcija atvaizduoti pranešimą HTML'e
function renderMessage(user, message) {
    message.innerHTML = ''; // Išvalome prieš tai buvusius elementus

    // jei juseris prisijunges
    if (user.isLoggedIn) {
        const h1 = document.createElement('h1');
        h1.textContent = user.login();

        const button = document.createElement('button');
        button.textContent = 'Logout';
        button.addEventListener('click', () => {
            user.toggleLoginStatus();
            renderMessage(user, message); // Atnaujinti pranešimą
        });
        
        message.append(h1, button);
        // Pasitikriname konsolėje
         console.log(user);
    } else {
        // jei juseris neprisijunges
        const h1 = document.createElement('h1');
        h1.textContent = user.logout();
        message.appendChild(h1);
       // Pasitikriname konsolėje
        console.log(user);
    }
}

// Formos įvykio apdorojimas, event liseneris formos submitui
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Sustabdyti naršyklės persikrovimą

    //trim kad nutrinti tarpelius iš priekio ir galo
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();

    // Sukuriame naują vartotojo objektą
    const user = new User(name, email);

    // Išsaugome vartotojo duomenis į localStorage string formatu
     localStorage.setItem('user', JSON.stringify(user));

    // Pakeičiame isLoggedIn statusą
    user.toggleLoginStatus();

     // Atvaizduojame informaciją
    const message = document.querySelector('.message');
    renderMessage(user, message);
});
