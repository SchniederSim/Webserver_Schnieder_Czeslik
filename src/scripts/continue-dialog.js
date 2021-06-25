window.onload = init_page;

function init_page(){
    if(sessionStorage.getItem('user')){
        document.getElementById('navbar-login').innerHTML = "Logout";
    }
}