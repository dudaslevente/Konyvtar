const AppTitle = "Fifty shades of chicken";
const Author = "13.a SZOFT | Dudás & Kővágó";
const Company = "Bajai SZC Türr István Technikum";

const serverUrl = 'http://localhost:3000';
let loggedUser = { role: null }; // vagy "user" vagy "admin"

// Footer beállítása
let footer = document.querySelector('footer');
footer.innerHTML = Company + ' | ' + Author + ' | 2024.';

// Nézet renderelése
async function render(view) {
    let main = document.querySelector('main');
    try {
        const response = await fetch(`Views/${view}.html`);
        if (!response.ok) {
            throw new Error('Nézet betöltése sikertelen: ' + response.status);
        }
        main.innerHTML = await response.text();
    } catch (error) {
        console.error('Hiba történt a nézet betöltésekor:', error);
        main.innerHTML = `<p>Hiba történt a nézet betöltésekor. Próbálja meg később újra.</p>`;
    }

    // Nézethez kapcsolódó logika
    switch (view) {
        case 'books':
            // Könyvek betöltése, ha a "books" nézet jelenik meg
            LoadBooks();
            break;
        case 'users':
            // Szerzők betöltése vagy kezelése
            LoadAuthors();
            break;
        case 'bookupload':
            // Könyv feltöltési űrlap kezelése
            loadAuthorsToSelect();
            // Például: 
            // document.querySelector('form').addEventListener('submit', uploadBook);
            break;
        case 'bookupdate':
            // Szerző feltöltési űrlap kezelése
            // Például: 
            // document.querySelector('form').addEventListener('submit', uploadUser);
            break;
        case 'userupload':
            // Szerző feltöltési űrlap kezelése
            // Például: 
            // document.querySelector('form').addEventListener('submit', uploadUser);
            break;
        default:
            console.log(`Ismeretlen nézet: ${view}`);
            break;
    }
}


if (localStorage.getItem('konyvtar')){
    loggedUser = JSON.parse(localStorage.getItem('konyvtar'));
    render('books');
}else{
    render('books');
}