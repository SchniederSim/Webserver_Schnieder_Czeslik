import "./product.js";
import { Product } from "./product.js";

window.onload = init_page;

function init_page(){
    if(sessionStorage.getItem('user')){
        document.getElementById('navbar-login').innerHTML = "Logout";
        if(sessionStorage.getItem('role') === "ADMIN"){
            document.getElementById("open-add-product-dialog-button").style.display = "block";
        }
    }
    requestProducts();
}

var socket = io();

socket.on('giveAllProducts', (products) => {
    for(let i=0; i<products.length; i++){
        let product = new Product(products[i]['ProductId'],products[i]['Name'], products[i]['Description'], products[i]['Price'], products[i]['Rating'], products[i]['ProducerName'], products[i]['InStorage']);
        product.id = products[i]['ProductId'];
        console.log(product);
        document.getElementById('product-container').appendChild(product);
        generateRating(products[i]['Rating'], product.id);
    }
    checkForRole();
});
function generateRating(rating,productId){
    if(!productId && productId != 0){
        productId = "";
    }
    var diff = 5-rating;
    while(diff>0){
        var star = 6-diff;
        document.getElementById(productId+'star'+star).style.fill="black";
        diff--;
    }
    while(rating>0){
       document.getElementById(productId+'star'+rating).style.fill="gold"; 
       rating--;
    }
}
function requestProducts(){
    console.log("Try to request proudcts");
    socket.emit('getAllProducts');
}
// function getRandomProducts(){
//     let min = 3;
//     let max = 20;
//     let amount = Math.floor(Math.random() * (max - min) + min);
//     let objects = [];
//     for(let i=0; i<amount; i++){
//         objects.push({
//             title: "Title",
//             description: "test product description",
//             price: "test product price",
//             shippingInfo: "test shipping-info",
//             rating: "test product rating"
//         })
//     }
//     return objects;
// }

function checkForRole() {
    // TODO: Ergänze Bedingung (if kein Admin)
    if(sessionStorage.getItem('role') === "ADMIN"){
        console.log("Hello Admin");
        document.querySelectorAll('.delete-product-button, .edit-product-button').forEach(button => {
            button.style.display = "block";
        })
}
    // if(false){
    //     console.log("Checking role");
    //     document.querySelectorAll('.delete-product-button').forEach(button => {
    //         button.style.display = "none";
    //     })
    // }
}
