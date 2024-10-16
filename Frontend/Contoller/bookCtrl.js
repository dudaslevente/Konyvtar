var xhr = new XMLHttpRequest();
let index = 1;

function LoadBooks(){
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    xhr.open('GET', 'http://localhost:3000/books', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var items = JSON.parse(xhr.responseText);
        
            items.forEach(item => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                td3.classList.add('text-end');
                let td4 = document.createElement('td');
                td4.classList.add('text-end');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');

                td1.innerHTML = (index ++) + '.';
                td2.innerHTML = item.cim;
                td3.innerHTML = item.kiadas_ev;
                td4.innerHTML = item.ISBM;
                td5.innerHTML = item.szerzo;

                let updateBtn = document.createElement('button');
                updateBtn.classList.add('btn', 'btn-warning');
                updateBtn.textContent = 'Módosítás';
                updateBtn.addEventListener('click', function() {
                    saveChanges(item.ID, updateBtn);
                });
                td6.appendChild(updateBtn);
 
                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('btn', 'btn-danger');
                deleteBtn.textContent = 'Törlés';
                deleteBtn.addEventListener('click', function() {
                    deleteItem(item.ID);
                });
                td6.appendChild(deleteBtn);
               
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


function updateUser(id){
    let data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#kiad').value,
        phone: document.querySelector('#isbn').value,
        role: document.querySelector('#szerzok').value
    }

    /*axios.patch(`${serverUrl}/users/${id}`, data, authorize()).then(res => {
        alert(res.data);
        if (res.status == 200){
            render('users');
        }
    });*/
}

function editUser(id){
    render('edituser').then(()=>{
        axios.get(`${serverUrl}/users/${id}`, authorize()).then(res => {
            document.querySelector('#name').value = res.data[0].name;
            document.querySelector('#kiad').value = res.data[0].email;
            document.querySelector('#isbn').value = res.data[0].phone;
            document.querySelector('#szerzok').value = res.data[0].role;
            //document.querySelector('#updBtn').onclick = function() {updateUser(id)};
        });
    });
}
/*
function renderUsers(users){
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        
        td1.innerHTML = '#';
        td2.innerHTML = user.name;
        td3.innerHTML = user.kiad;
        td4.innerHTML = user.isbn;
        td5.innerHTML = user.role;
        
        
        if (user.ID != loggedUser[0].ID){
            let btn1 = document.createElement('button');
            let btn2 = document.createElement('button');
            btn1.innerHTML = 'Edit';
            btn1.classList.add('btn','btn-warning', 'btn-sm', 'me-2');
            btn2.innerHTML = 'Delete';
            btn2.classList.add('btn','btn-danger', 'btn-sm');
            td6.classList.add('text-end');
            btn1.onclick = function() {editUser(user.ID)};
            btn2.onclick = function() {deleteUser(user.ID)};
            td6.appendChild(btn1);
            td6.appendChild(btn2);   
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        tbody.appendChild(tr);
    });

    let total = document.querySelector('strong');
    total.innerHTML = users.length;
}
}*/

setTimeout(()=>{LoadBooks()}, 1000);