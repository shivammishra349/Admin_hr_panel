async function signup(event){
    event.preventDefault(); 
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let position = event.target.position.value;
    let number = event.target.number.value
    // console.log(name);
    // console.log(email);
    // console.log(password)
    // console.log(position)

    let obj={
        name,
        email,
        password,
        position,
        number
    }

    try{
        let res =await axios.post('http://localhost:3000/signUp',obj)
        if(res.status==200){
            alert('user registered successfully')
            window.location.href = '../Login/login.html'
        }
        console.log(res)
    }
    catch(err){
        console.log(err.response.data.message)
    }
}