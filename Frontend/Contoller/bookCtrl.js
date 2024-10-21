var xhr = new XMLHttpRequest();
let index = 1;


// Könyvek betöltése
document.addEventListener('DOMContentLoaded', function() {
    // 500 ms késleltetéssel hívjuk meg a LoadBooks függvényt
    setTimeout(function() {
        LoadBooks();
    }, 500); // 500 ms = fél másodperc
});



function LoadBooks() {
    index = 1; // nullázás
    let tbody = document.querySelector('tbody');
    
    // Ellenőrizd, hogy a tbody létezik-e
    if (!tbody) {
        console.error('tbody elem nem található!');
        return;
    }

    // Új XMLHttpRequest objektum létrehozása
    var xhr = new XMLHttpRequest();
    
    tbody.innerHTML = ''; // Tisztítás

    xhr.open('GET', 'http://localhost:3000/books', true); // Lekérés az adatbázisból
    xhr.send(); // Küldés

    // Adatok feldolgozása
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var items = JSON.parse(xhr.responseText);
            items.forEach(item => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');

                td1.innerHTML = (index++) + '.';
                td2.innerHTML = `<input type='text' value='${item.cim}' id='cim${item.ID}'>`;
                td3.innerHTML = `<input type='text' value='${item.kiadas_ev}' id='kiadas_ev${item.ID}'>`;
                td4.innerHTML = `<input type='text' value='${item.ISBM}' id='ISBM${item.ID}'>`;
                td5.innerHTML = `<input type='text' value='${item.author}' id='author${item.ID}'>`;

                // Módosítás gomb
                let updateBtn = document.createElement('button');
                updateBtn.classList.add('btn', 'btn-warning');
                updateBtn.textContent = 'Módosítás';
                updateBtn.addEventListener('click', function () {
                    saveChanges(item.ID, updateBtn);
                });
                td6.appendChild(updateBtn);

                // Törlés gomb
                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('btn', 'btn-danger');
                deleteBtn.textContent = 'Törlés';
                deleteBtn.addEventListener('click', function () {
                    deleteItem(item.ID);
                });
                td6.appendChild(deleteBtn);
                
                td6.classList.add('text-end');

                tbody.appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
            });
        } else if (xhr.readyState == 4) {
            // Hiba esetén értesítsük a felhasználót
            console.error('Hiba történt a könyvek lekérdezése során.');
        }
    };
}

function saveChanges(ID) {
    var xhr = new XMLHttpRequest();

    var updatedData = JSON.stringify({
        cim: document.querySelector(`#cim${ID}`).value,
        kiadas_ev: document.querySelector(`#kiadas_ev${ID}`).value,
        ISBM: document.querySelector(`#ISBM${ID}`).value,
        author: document.querySelector(`#author${ID}`).value
    });

    xhr.open('PATCH', `http://localhost:3000/books/${ID}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(updatedData);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) { 
            if (xhr.status == 200) { 
                alert('Sikeres frissítés'); 
                LoadBooks(); 
            } else {
                alert('Frissítés nem sikerült: ' + xhr.responseText); 
            }
        }
    };
}

function deleteItem(ID) {
    if (confirm('Biztosan törölni szeretnéd ezt a terméket?')) {
        xhr.open('DELETE', `http://localhost:3000/books/${ID}`, true);
        xhr.send();
 
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    LoadBooks();
                } else {
                    alert('Törlés nem sikerült: ' + xhr.responseText);
                }
            }
        };
    }
}

function uploadBook() {
    const data = {
        title: document.querySelector('#name').value,
        publication_year: document.querySelector('#kiad').value,
        isbn: document.querySelector('#isbn').value,
        authorID: document.querySelector('#authorID').value // A kiválasztott szerző azonosítója
    };

    const xhrUpload = new XMLHttpRequest();
    xhrUpload.open('POST', `${serverUrl}/books`, true);
    xhrUpload.setRequestHeader('Content-Type', 'application/json');

    xhrUpload.onreadystatechange = function () {
        if (xhrUpload.readyState === 4) {
            if (xhrUpload.status === 201) {
                const newBook = JSON.parse(xhrUpload.responseText);
                // Keresd meg a kiválasztott szerző nevét a legördülő menüből
                const authorSelect = document.querySelector('#authorID');
                const selectedAuthorName = authorSelect.options[authorSelect.selectedIndex].text;

                alert(`Könyv feltöltve! Szerző: ${selectedAuthorName}`);
                LoadBooks(); // Könyvek frissítése
            } else {
                alert('Hiba történt a könyv feltöltésekor.');
            }
        }
    };

    xhrUpload.send(JSON.stringify(data));
}
// Szerző feltöltése
function uploadUser() {
    // Adatok összegyűjtése az űrlapból
    let data = {
        author: document.querySelector('#authorName').value, // Szerző neve
        szul_datum: document.querySelector('#birthDate').value // Születési dátum
    };

    // AJAX kérés az új szerző feltöltéséhez
    var xhrUpload = new XMLHttpRequest();
    xhrUpload.open('POST', 'http://localhost:3000/authors', true); // Az API URL-je
    xhrUpload.setRequestHeader('Content-Type', 'application/json');
    
    xhrUpload.onreadystatechange = function () {
        if (xhrUpload.readyState === 4) {
            if (xhrUpload.status === 201) {
                alert('Szerző feltöltve!');
                
          } else {
                alert('Hiba történt a szerző feltöltésekor.');
               
            }
        }
    };
    
    xhrUpload.send(JSON.stringify(data));
}


let authorIndex = 1; // Globális index a szerzők nyilvántartásához

// Szerzők betöltése
function LoadAuthors() {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${serverUrl}/authors`, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var authors = JSON.parse(xhr.responseText);
            authors.forEach(author => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');

                td1.innerHTML = (authorIndex++) + '.';
                td2.innerHTML = `<input type='text' value='${author.author}' id='author${author.ID}'>`;
                td3.innerHTML = `<p id='szul_datum${author.ID}'>${formatDate(author.szul_datum)}</p>`;
                //td3.innerHTML = formatDate(author.szul_datum); 

                // Módosítás gomb
                let updateBtn = document.createElement('button');
                updateBtn.classList.add('btn', 'btn-warning');
                updateBtn.textContent = 'Módosítás';
                updateBtn.addEventListener('click', function () {
                    saveChanges(author.ID, updateBtn);
                });
                td4.appendChild(updateBtn);

                // Törlés gomb
                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('btn', 'btn-danger');
                deleteBtn.textContent = 'Törlés';
                deleteBtn.addEventListener('click', function () {
                    deleteAuthor(author.ID);
                });
                td4.appendChild(deleteBtn);
                
                td4.classList.add('text-end');

                tbody.appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
            });
        }
    };
}

function saveChanges(ID) {
    var xhr = new XMLHttpRequest();

    var updatedData = JSON.stringify({
        author: document.querySelector(`#author${ID}`).value
    });

    xhr.open('PATCH', `http://localhost:3000/authors/${ID}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(updatedData);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) { 
            if (xhr.status == 200) { 
                alert('Sikeres frissítés'); 
                LoadAuthors(); 
            } else {
                alert('Frissítés nem sikerült: ' + xhr.responseText); 
            }
        }
    };
}


function deleteAuthor(ID) {
    if (confirm('Biztosan törölni szeretnéd ezt a terméket?')) {
        xhr.open('DELETE', `http://localhost:3000/authors/${ID}`, true);
        xhr.send();
 
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    LoadAuthors();
                } else {
                    alert('Törlés nem sikerült: ' + xhr.responseText);
                }
            }
        };
    }
}

function formatDate(isoString) {
    const date = new Date(isoString); // ISO stringből Date objektum
    return date.toLocaleDateString('hu-HU'); // Magyar nyelvi beállítások
}

// Indítás
setTimeout(() => {
    LoadAuthors(); // Szerzők betöltése
},100);




function loadAuthorsToSelect() {
    const authorSelect = document.getElementById('authorID');
    authorSelect.innerHTML = '<option value="">Szerzők...</option>'; // Kezdeti opció

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/authors', true); // Az API URL-je
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var authors = JSON.parse(xhr.responseText);
                authors.forEach(author => {
                    var option = document.createElement('option');
                    option.value = author.author; // Szerző ID-ja
                    option.textContent = author.author; // Szerző neve
                    authorSelect.appendChild(option);
                });
            } else {
                console.error('Hiba történt a szerzők lekérdezése során:', xhr.statusText);
            }
        }
    };
}






// Indítás
setTimeout(() => {
    
    LoadBooks(); // Könyvek betöltése
}, 100);
