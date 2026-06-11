document
.getElementById("loginForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const username =
document.getElementById(
"username"
).value;

const password =
document.getElementById(
"password"
).value;

const response =
await fetch(
"/api/auth/login",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
username,
password
})
}
);

const data =
await response.json();

if(data.token){

localStorage.setItem(
"token",
data.token
);

window.location =
"/dashboard.html";

}else{

alert(
"Invalid Credentials"
);

}

});