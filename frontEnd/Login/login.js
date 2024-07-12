async function login(event){
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;

    console.log(email);
    console.log(password)

    let obj={
        email,
        password
    }

    try{
        let res = await axios.post('http://localhost:3000/login',obj)
        alert('user logged successfully')
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('username',res.data.user.name)
        


        let position= res.data.position;
        console.log(position)

        if(position==='admin'){
            window.location.href='../Admin/admin_dashboard.html'
        }
        else if(position==='hr'){
            console.log('its hr page')
            window.location.href='../Hr/hr_dashboard.html'
        }
        else if(position==='employee'){
            window.location.href='../Employee/employee.html'
        }
    }
    catch(err){
         console.log(err)
        //  console.log(err.response.data.massage)
         if(err.response.status==400){
            message(err.response.data.message)
         }
    }
    
}

function message(message){
    let form = document.getElementById('form');
    let p = document.createElement('p')
    p.innerHTML = message
    p.style.color='red'
    form.appendChild(p)

}
