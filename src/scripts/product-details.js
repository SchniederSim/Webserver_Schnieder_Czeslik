import "./rating.js";
import { Rating } from "./rating.js";
window.onload = init_page;

function init_page() {
    if (sessionStorage.getItem('user')) {
        document.getElementById('navbar-login').innerHTML = "Logout";
    }
}
//get Params of Mode and ProductId
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const pId = urlParams.get('pid');
var mode = urlParams.get('mode');//1= purchase,2 = edit, 3 = new

//only allow Mode 1 if not Admin
if (sessionStorage.getItem('role') !== "ADMIN") {
    mode = 1;
}

document.getElementById('image').src = "imgs/" + pId + ".jpg";
var socket = io();
var ratings;
var myRating = { Stars: undefined, Comment: undefined, ProductId: pId, UserId: sessionStorage.uId };
var product;
var producers;

//load Ratings if in purchaseMode
if (mode == 1) {
    socket.emit('getRatingsForProduct', pId);
}

socket.on('giveRatingsForProduct', (result) => {
    //create Ratings and add to html
    ratings = result;
    if (!ratings) {
        return 0;
    }
    for (let i = 0; i < ratings.length; i++) {

        if (ratings[i].Timestamp) {
            var date = new Date(ratings[i].Timestamp);
            date.setHours(date.getHours() + 4);
            ratings[i].Timestamp = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
        }
        if (ratings[i]['Username'] == sessionStorage.user) {
            document.getElementById('rateProduct').style.visibility = "hidden";
        }
        let rating = new Rating(ratings[i]['RatingId'], ratings[i]['Username'], ratings[i]['Comment'], ratings[i]['Stars'], ratings[i]['Timestamp']);
        rating.id = ratings[i]['RatingId'];
        console.log(rating);
        document.getElementById('rating-container').appendChild(rating);
        generateRating(ratings[i]['Stars'], rating.id);
    }
});

//load Product if not in NewProduct-Mode
if (mode != 3) {
    socket.emit('getProduct', pId);
}

function rateProduct() {
    if (!sessionStorage.getItem('user')) {
        appearSnackbar("Sie müssen angemeldet sein", "red");
    } else {
        var rating = new Rating(0, sessionStorage.user, " ", 0, "heute");
        var cont = document.getElementById('rating-container');
        cont.insertBefore(rating, cont.firstChild);
        var commentfield = document.getElementById('comment');
        commentfield.disabled = false;
        commentfield.focus();
        document.getElementById('rateProduct').innerHTML = "Bewertung speichern";
        document.getElementById('rateProduct').onclick = sendRating;
        for (var i = 1; i < 6; i++) {
            document.getElementById('0star' + i).onclick = generateStarfunction(i);
        }
    }
}

function generateStarfunction(i) {
    return function () {
        myRating.Stars = i;
        generateRating(i, 0);
    };
}

function sendRating() {
    myRating.Comment = document.getElementById('comment').value;
    if (!myRating.Comment) {
        appearSnackbar("Geben Sie einen Bewertungskommentar ein", "red");
        return 0;
    }
    if (!myRating.Stars) {
        appearSnackbar("Geben Sie eine Bewertung von 1-5 Sternen", "red");
        return 0;
    }
    socket.emit("saveRating", myRating);
}

function buyProduct() {
    if (!sessionStorage.getItem('user')) {
        appearSnackbar("Sie müssen angemeldet sein", "red");
    } else {
        var amount = parseInt(document.getElementById('quantity').value);
        var inStorage = parseInt(document.getElementById('inStorage').value);

        if (amount > inStorage) {
            alert('There are not enough products in the storage!');
        }
        else {
            var purchase = { ProductId: pId, UserId: sessionStorage.uId, Amount: amount };
            socket.emit('addPurchase', purchase);
        }
    }
}

function saveProduct() {
    if (sessionStorage.getItem('role') !== "ADMIN") {
        return 0;
    }
    var product = {
        Name: document.getElementById('name').value,
        Description: document.getElementById('description').value,
        ProducerId: document.getElementById('producerName').value,
        InStorage: document.getElementById('inStorage').value,
        Price: document.getElementById('price').value
    }
    if (!product.Name) {
        appearSnackbar("Bitte Produkttitel angeben", "red");
        return 0;
    }
    if (!product.Description || product.Description == " ") {
        appearSnackbar("Bitte Produktinfo angeben", "red");
        return 0;
    }
    if (!product.ProducerId) {
        appearSnackbar("Bitte Hersteller angeben", "red");
        return 0;
    }
    if (!product.Price) {
        appearSnackbar("Bitte Preis angeben", "red");
        return 0;
    }
    if (!product.InStorage) {
        product.InStorage = 0;
    }
    if (mode == 2) {
        product.ProductId = pId;
    }
    socket.emit('editProduct', product);

}
//hide Elements that are only For PurchaseMode, if in edit/new-mode
if (mode != 1) {
    var toHide = document.getElementsByClassName('userVis');
    [].forEach.call(toHide, function (el) { el.style.visibility = 'hidden'; });
    document.getElementById("buyProduct").innerHTML = "Produkt speichern";
    document.getElementById("buyProduct").onclick = saveProduct;
    var input = document.getElementById("imageInput");
    console.log(input);
}

if (mode == 1) {
    document.getElementById("imageInput").style.visibility = 'hidden';
    document.getElementById("imgLabel").style.visibility = 'hidden';
    document.getElementById("buyProduct").onclick = buyProduct;
    document.getElementById("rateProduct").onclick = rateProduct;
}

socket.emit('getProducers');
socket.on('giveProducers', (result) => {
    producers = result;
    var producerBox = document.getElementById('producerName');
    producers.forEach(element => producerBox.options[producerBox.options.length] = new Option(element.ProducerName, element.ProducerId));
    if (!product || !product.ProducerId) {
        producerBox.value = 1;
    } else {
        producerBox.value = product.ProducerId;
    }
    producerBox.disabled = mode == 1;
})
socket.on('RatingSaved', (result) => {
    window.location.replace("product-detail.html?pid=" + pId + "&mode=" + mode);
})
socket.on('giveProduct', (result) => {

    document.getElementById('name').value = result[0].Name;
    document.getElementById('name').disabled = mode == 1;
    var textArea = document.getElementById('description');
    textArea.innerHTML = result[0].Description;
    textArea.disabled = mode == 1;
    document.getElementById('price').value = result[0].Price;
    document.getElementById('price').disabled = mode == 1;
    document.getElementById('inStorage').value = result[0].InStorage;
    document.getElementById('inStorage').disabled = mode == 1;
    document.getElementById('quantity').value = 1;
    document.getElementById('quantity').setAttribute("max", result[0].InStorage);
    generateRating(result[0].Rating, undefined);
    product = result[0];
})
socket.on('PurchaseRequest', (result) => {
    if (result.code == 'success') {
        appearSnackbar("Einkauf abgeschlossen", "green");
        socket.emit('getProduct', pId);
    } else {
        appearSnackbar("Einkauf konnte nicht abgeschlossen werden.", "red");
    }
})
socket.on('ProductEdited', (result) => {
    if (result.code == 'success') {
        var img = document.getElementById('imgForm');
        document.getElementById('imgForm').submit();

        appearSnackbar("Produkt gespeichert", "green");
    } else {
        appearSnackbar("Produkt konnte nicht abgeschlossen werden.", "red");
    }
    socket.emit('getProduct', pId);
})
function appearSnackbar(text, color) {
    var sb = document.getElementById("snackbar");
    sb.style.backgroundColor = color;
    sb.innerHTML = text;
    sb.className = "show";
    setTimeout(function () { sb.classList.remove("show"); }, 3000);
}
//fill the Stars grey as default
for (var i = 5; i > 0; i--) {
    document.getElementById('star' + i).style.fill = "grey";
}

function generateRating(rating, ratingId) {
    if (!ratingId && ratingId != 0) {
        ratingId = "";
    }
    var diff = 5 - rating;
    while (diff > 0) {
        var star = 6 - diff;
        document.getElementById(ratingId + 'star' + star).style.fill = "black";
        diff--;
    }
    while (rating > 0) {
        document.getElementById(ratingId + 'star' + rating).style.fill = "gold";
        rating--;
    }
}
