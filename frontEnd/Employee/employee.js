document.addEventListener('DOMContentLoaded', (event) => {
    let userName = localStorage.getItem('username');

    let h2 = document.getElementById('welcomeMessage');
    h2.innerHTML = `Welcome ${userName}`;
});

async function getuser() {
    try {
        let token = localStorage.getItem('token');
        let res = await axios.get('http://localhost:3000/getUser', { headers: { 'Authorization': token } });
        
        // Clear the table body before appending new rows
        let userTableBody = document.querySelector('#userTable tbody');
        userTableBody.innerHTML = '';

        // Append new rows
        res.data.user.forEach(user => {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${user.name}</td>
                             <td>${user.email}</td>
                             <td>${user.number}</td>
                             <td>${user.position}</td>`;
            userTableBody.appendChild(row);
        });
    }
    catch(err){
        console.log(err)
    }
}


getuser()


