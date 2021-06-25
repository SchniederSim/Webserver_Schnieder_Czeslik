window.onload = init_page;
function init_page(){

    var isUserLoggedIn = sessionStorage.getItem('user');
    if(isUserLoggedIn){                 // Check if user is logged in
        document.getElementById('navbar-login').innerHTML = "Logout";

        console.log("User " + sessionStorage.getItem('user') +  " is logged in");
        document.getElementById("logged-in").style.display = "inline";
        document.getElementById("logged-in").innerHTML = "Hello user " + sessionStorage.getItem('user') + " [" + sessionStorage.getItem('role') + "]";

    }
    else{
        console.log("User is not logged in");
        document.getElementById("not-logged-in").style.display = "inline";
        

    }
}