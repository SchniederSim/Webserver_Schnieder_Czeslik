window.onload = init_page;

var socket = io();

function init_page(){
    if(sessionStorage.getItem('user')){
        document.getElementById('navbar-login').innerHTML = "Logout";
    }
    socket.emit("getAllProducts");
}

socket.on('giveAllProducts', (products) => {
    var totalAmount = 0;
    for(let i=0; i<products.length; i++){
        totalAmount += products[i]['InStorage'];
    }
    document.getElementById("total-storage").innerHTML = totalAmount;
});