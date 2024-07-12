// const e = require("cors");

document.addEventListener('DOMContentLoaded', (event) => {
    let userName = localStorage.getItem('username');

    let h2 = document.getElementById('welcomeMessage');
    h2.innerHTML = `Welcome ${userName}`;
});

async function getuser() {
    try {
        let token = localStorage.getItem('token');
        let res = await axios.get('http://localhost:3000/getUser', { headers: { 'Authorization': token } });
        
        let userTableBody = document.querySelector('#userTable tbody');
        userTableBody.innerHTML = '';

        
        res.data.user.forEach(user => {
            console.log(user.password)
            let row = document.createElement('tr');
            row.innerHTML = `<td>${user.name}</td>
                             <td>${user.email}</td>
                             <td>${user.position}</td>
                             <td>${user.number}</td>
                             <td class="actions">
                                 <button class="deleteBut" data-user-id="${user.id}">Delete</button>
                                 ||
                                 <button class="editBut" data-user-id="${user.id}">Edit</button>
                             </td>`
            userTableBody.appendChild(row);
        });

        // Add event listeners to the newly created buttons
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
        

        document.querySelectorAll('.editBut').forEach(button => {
            button.addEventListener('click', (event) => {
                let userId = event.target.getAttribute('data-user-id');
                let row = event.target.closest('tr');
                let cells = row.querySelectorAll('td');
        
                
                let originalValues = Array.from(cells).map(cell => cell.textContent.trim());
        
                
                cells.forEach((cell, index) => {
                    if (index !== cells.length - 1) { 
                        let input = document.createElement('input');
                        input.type = 'text';
                        input.value = originalValues[index]; 
                        cell.innerHTML = '';
                        cell.appendChild(input);
                    }
                });
        
                
                let editButton = row.querySelector('.editBut');
                editButton.style.display = 'none';
        
                let saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.classList.add('saveBut');
                row.querySelector('.actions').appendChild(saveButton);
        
                
                saveButton.addEventListener('click', async () => {
                    try {
                        let updatedUser = {
                            name: cells[0].querySelector('input').value,
                            email: cells[1].querySelector('input').value,
                            position: cells[2].querySelector('input').value,
                            number: cells[3].querySelector('input').value,
                        };
        
                        let token = localStorage.getItem('token');
                        let res = await axios.put(`http://localhost:3000/updateUser/${userId}`, updatedUser, { headers: { 'Authorization': token } });
                        
                        if (res.status === 200) {
                            
                            cells.forEach((cell, index) => {
                                if (index !== cells.length - 1) { 
                                    cell.innerHTML = updatedUser[Object.keys(updatedUser)[index]];
                                }
                            });
        
                            
                            saveButton.remove();
                            editButton.style.display = 'inline-block';
                        } 
                    } catch (err) {
                        alert(err.response.data.message);
                    }
                });
            });
        });

    } catch (err) {
        console.log(err);
    }
}

getuser();
