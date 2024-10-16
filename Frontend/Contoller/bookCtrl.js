var xhr = new XMLHttpRequest();
let index = 1;

// Könyvek betöltése
function LoadBooks() {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    xhr.open('GET', 'http://localhost:3000/books', true);
    xhr.send();
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
                td2.innerHTML = item.cim;  // Módosítva: "title"
                td3.innerHTML = item.kiadas_ev;  // Módosítva: "publication_year"
                td4.innerHTML = item.ISBM;  // Módosítva: "isbn"

                // Módosítás gomb
                let updateBtn = document.createElement('button');
                updateBtn.classList.add('btn', 'btn-warning');
                updateBtn.textContent = 'Módosítás';
                updateBtn.addEventListener('click', function () {
                    saveChanges(item.id, updateBtn);  // Módosítva: "id"
                });
                td6.appendChild(updateBtn);

                // Törlés gomb
                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('btn', 'btn-danger');
                deleteBtn.textContent = 'Törlés';
                deleteBtn.addEventListener('click', function () {
                    deleteItem(item.id);  // Módosítva: "id"
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
        }
    };
}

// Könyv feltöltése
function uploadBook() {
    // Adatok összegyűjtése az űrlapból
    let data = {
        title: document.querySelector('#name').value, // A könyv címe
        publication_year: document.querySelector('#kiad').value, // Kiadás éve
        isbn: document.querySelector('#isbn').value, // ISBN szám
        authorID: document.querySelector('#authorID').value // Kiválasztott szerző ID
    };

    // AJAX kérés az új könyv feltöltéséhez
    var xhrUpload = new XMLHttpRequest();
    xhrUpload.open('POST', 'http://localhost:3000/books', true);
    xhrUpload.setRequestHeader('Content-Type', 'application/json');

    xhrUpload.onreadystatechange = function () {
        if (xhrUpload.readyState === 4) {
            if (xhrUpload.status === 200) {
                alert('Könyv feltöltve!');
                LoadBooks(); // Könyvek frissítése
            } else {
                alert('Hiba történt a könyv feltöltésekor.');
            }
        }
    };
    
    xhrUpload.send(JSON.stringify(data));
}
function loadAuthors() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/authors', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var authors = JSON.parse(xhr.responseText);
            var authorSelect = document.getElementById('authorID');
            authors.forEach(function(author) {
                var option = document.createElement('option');
                option.value = author.ID; // Szerző ID-ja
                option.textContent = author.name; // Szerző neve
                authorSelect.appendChild(option);
            });
        }
    };
    xhr.send();
}

// Indítás
window.onload = function() {
    loadAuthors(); // Szerzők betöltése
};

// Szerző feltöltése
function uploadUser() {
    // Adatok összegyűjtése az űrlapból
    let data = {
        name: document.querySelector('#authorName').value, // Szerző neve
        szul_datum: document.querySelector('#birthDate').value // Születési dátum
    };

    // AJAX kérés az új szerző feltöltéséhez
    var xhrUpload = new XMLHttpRequest();
    xhrUpload.open('POST', 'http://localhost:3000/authors', true); // Az API URL-je
    xhrUpload.setRequestHeader('Content-Type', 'application/json');

    xhrUpload.onreadystatechange = function () {
        if (xhrUpload.readyState === 4) {
            if (xhrUpload.status === 200) {
                alert('Szerző feltöltve!');
                // További lépések, például a könyvek frissítése
                // LoadBooks(); // Ha szükséges
            } else {
                alert('Hiba történt a szerző feltöltésekor.');
            }
        }
    };
    
    xhrUpload.send(JSON.stringify(data));
}

// Indítás
setTimeout(() => {
    
    LoadBooks(); // Könyvek betöltése
}, 100);
