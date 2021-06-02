import "./product.js";
import { Product } from "./product.js";

window.onload = loadProducts;

function loadProducts(){
    let products = getRandomProducts();
    // console.log(products);
    // console.log("Loading " + products.length + " products");
    for(let i=0; i<products.length; i++){
        // let div = document.createElement('div');
        // div.id = "product" + i;
        // document.getElementById('product-container').appendChild(div);
        // let product = document.createElement('my-custom-product');
        // console.log(products[i]['title']);
        let product = new Product(products[i]['title'], products[i]['description'], products[i]['price'], products[i]['rating'], products[i]['shippingInfo']);
        // console.log(product);
        document.getElementById('product-container').appendChild(product);
        // $("#product" + i).load("product.html");
        // console.log(document.getElementById('product' + i));
        // console.log(document.getElementsByClassName('product-description')[i]);
        // console.log(document.getElementById('product' + i).getElementsByClassName('product-description')[0]);
        // let titleDiv = document.getElementById('product' + i).getElementsByClassName('product-title')[0];
        // titleDiv.innerHTML = products.title;

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
