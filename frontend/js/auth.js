const API = "http://localhost:3000";

function signup(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

fetch(API + "/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

})
.then(res=>res.json())
.then(data=>{

alert(data.message);

window.location.href="login.html";

});

}


function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

fetch(API + "/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

})
.then(res=>res.json())
.then(data=>{

alert(data.message);

localStorage.setItem("user",JSON.stringify(data.user));

window.location.href="index.html";

});

}