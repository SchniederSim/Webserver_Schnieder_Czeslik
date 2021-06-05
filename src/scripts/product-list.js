import "./product.js";
import { Product } from "./product.js";

window.onload = loadProducts;

function loadProducts(){
    let products = getRandomProducts();
    for(let i=0; i<products.length; i++){
        let product = new Product(products[i]['title'], products[i]['description'], products[i]['price'], products[i]['rating'], products[i]['shippingInfo']);
        product.id = i;
        console.log(product);
        document.getElementById('product-container').appendChild(product);
    }
}

function getRandomProducts(){
    let min = 3;
    let max = 20;
    let amount = Math.floor(Math.random() * (max - min) + min);
    let objects = [];
    for(let i=0; i<amount; i++){
        objects.push({
            title: "Title",
            description: "test product description",
            price: "test product price",
            shippingInfo: "test shipping-info",
            rating: "test product rating"
        })
    }
    return objects;
}

