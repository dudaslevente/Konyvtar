const AppTitle = "Fifty shades of chicken";
const Author = "13.a SZOFT | Dudás & Kővágó ";
const Company = "Bajai SZC Türr István Technikum";

const serverUrl = 'http://localhost:3000';
let loggedUser = { role: null }; // vagy "user" vagy "admin"

let footer = document.querySelector('footer');

footer.innerHTML = Company + ' | ' + Author + ' | 2024.';

async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text();

    switch(view){}
}

if (localStorage.getItem('konyvtar')){
    loggedUser = JSON.parse(localStorage.getItem('konyvtar'));
    render('books');
}else{
    render('books');
}