window.onload = init_page;

var socket = io();

function init_page(){
    if(sessionStorage.getItem('user')){
        document.getElementById('navbar-login').innerHTML = "Logout";
    }
    socket.emit("getAllProducts");
    socket.emit("getAllPurchases");
    socket.emit("getAllUsers");
    socket.emit("getAllProducers");

}

socket.on('giveAllProducts', (products) => {
    var totalProducts = 0;
    for(let i=0; i<products.length; i++){
        totalProducts += products[i]['InStorage'];
    }
    document.getElementById("total-storage").innerHTML = totalProducts;
});

socket.on('giveAllPurchases', (purchases) => {
    console.log("Purchases");
    var totalSelledProducts = 0;
    var totalMoney = 0;
    for(let i=0; i<purchases.length; i++){
        totalSelledProducts += purchases[i]['Amount'];
        totalMoney += purchases[i]['totalPrice'];
    }
    document.getElementById("total-purchases").innerHTML = totalSelledProducts;
    document.getElementById("total-money").innerHTML = totalMoney + " €";

});

socket.on('giveAllUsers', (users) => {
    var totalUsers = users.length;
    document.getElementById("total-users").innerHTML = totalUsers;
});

socket.on('giveAllProducers', (producers) => {
    var totalProducers = producers.length;
    document.getElementById("total-producers").innerHTML = totalProducers;
});