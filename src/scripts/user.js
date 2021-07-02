import { Purchase } from "./purchase.js";

window.onload = init_page;

var socket = io();

function init_page(){

    var isUserLoggedIn = sessionStorage.getItem('user');
    var isAdmin = sessionStorage.getItem('role') === "ADMIN";

    if(isUserLoggedIn){
        document.getElementById('navbar-login').innerHTML = "Logout";
        console.log("User " + sessionStorage.getItem('user') +  " is logged in");
        document.getElementById("logged-in").style.display = "inline";
        document.getElementById("logged-in").innerHTML = "Hello user " + sessionStorage.getItem('user') + " [" + sessionStorage.getItem('role') + "]";
        document.getElementById("delete-account").style.display = "block";
        document.getElementById("user-stats-container").style.display = "block";

        if(isAdmin){
            document.querySelectorAll("#delete-user, #upgrade-user, #downgrade-self").forEach((element) => {
                element.style.display = "block";
            })
        }

        loadPurchases();
        loadComments();
    }
    else{
        console.log("User is not logged in");
        document.getElementById("not-logged-in").style.display = "inline";
    }
}

function loadPurchases(){
    socket.emit("getUserId", sessionStorage.getItem("user"));
}
socket.on("giveUserId", (userId) =>{
    console.log(userId);
    socket.emit("getAllPurchasesOfUser", userId);
});

socket.on("giveAllPurchasesOfUser", (purchases) => {
    for(var i = 0; i < purchases.length; i++){
        console.log(purchases[i]);
        var purchase = new Purchase(i+1, purchases[i].Name, purchases[i].ProducerName, purchases[i].Amount, purchases[i].totalPrice);
        document.getElementById("user-purchases").appendChild(purchase);
    }
})

function loadComments(){

}