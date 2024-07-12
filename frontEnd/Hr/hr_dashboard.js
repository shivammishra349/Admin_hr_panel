document.addEventListener('DOMContentLoaded', (event) => {
    let userName = localStorage.getItem('username');

    let h2 = document.getElementById('welcomeMessage');
    h2.innerHTML = `Welcome ${userName}`;
});



let token = localStorage.getItem('token')

async function hr_update(event){
    event.preventDefault();
    let name= event.target.name.value;
    let email= event.target.email.value;
    let password = event.target.password.value;
    let number = event.target.number.value;
    let position = event.target.position.value;
    
    console.log(name,email,number,position)

    if (number === '') {
        number = null; 
    }

    let obj={
        name,
        email,
        password,
        number,
        position
    }

    try{
        

        let res = await axios.post('http://localhost:3000/addUser',obj,{headers:{'Authorization':token}})
        console.log(res)
        console.log(res.data.user)
        let newUser = res.data.user;
        // console.log(newUser)
        appendUserToTable(newUser);
      
    }
    catch(err){
        alert(err.response.data.message)
    }
}


function appendUserToTable(user) {
    let userTableBody = document.querySelector('#userTable tbody');

    let row = document.createElement('tr');
    row.innerHTML = `<td>${user.name}</td>
                     <td>${user.email}</td>
                     <td>${user.position}</td>
                     <td>${user.number}</td>
                     <td class="actions">
                         <button class="deleteBut" data-user-id="${user.id}">Delete</button>
                     </td>`;

    userTableBody.appendChild(row);
    

    let deleteButton = row.querySelector('.deleteBut');
    deleteButton.addEventListener('click', async (event) => {
        let userId = event.target.getAttribute('data-user-id');
        try {
            let token = localStorage.getItem('token');
            let res = await axios.delete(`http://localhost:3000/deleteUser/${userId}`, { headers: { 'Authorization': token } });
            console.log(res);
            if (res.status === 200) {
                event.target.closest('tr').remove();
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    });
}


async function getUser(){
    try{
        let res = await axios.get('http://localhost:3000/getUser',{headers:{'Authorization':token}})
        console.log(res)
        let userTableBody = document.querySelector('#userTable tbody');
        userTableBody.innerHTML = '';

        // Append new rows
        res.data.user.forEach(user => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${user.name}</td>
                             <td>${user.email}</td>
    
                             <td>${user.position}</td>
                             <td>${user.number}</td>
                             <td class="actions">
                                 <button class="deleteBut" data-user-id="${user.id}">Delete</button>
                             </td>`;
            userTableBody.appendChild(row);
        })
    }
    catch(err){
        console.log(err)
    }



    document.querySelectorAll('.deleteBut').forEach(button => {
        button.addEventListener('click', async (event) => {
            let userId = event.target.getAttribute('data-user-id');
            try {
                let token = localStorage.getItem('token');
                let res = await axios.delete(`http://localhost:3000/deleteUser/${userId}`, { headers: { 'Authorization': token } });
                console.log(res)
                if (res.status === 200) {
                    
                    event.target.closest('tr').remove();
                } 
            } catch (err) {
                alert(err.response.data.message);
            }
        });
    });
}
getUser()


