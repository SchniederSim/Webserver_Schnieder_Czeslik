import "./product.js";
import { Product } from "./product.js";

window.onload = requestProducts;

var socket = io();

socket.on('giveAllProducts', (products) => {
    for(let i=0; i<products.length; i++){
        let product = new Product(products[i]['ProductId'],products[i]['Name'], products[i]['Description'], products[i]['Price'], products[i]['Rating'], products[i]['ProducerName'], products[i]['InStorage']);
        product.id = i;
        console.log(product);
        document.getElementById('product-container').appendChild(product);
    }
    checkForRole();
});
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
    if(false){
        console.log("Checking role");
        document.querySelectorAll('.delete-product-button').forEach(button => {
            button.style.display = "none";
        })
    }
}
