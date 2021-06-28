<!-- <?php
    session_start();
    if (!isset($_SESSION['mySessionCheck'])) {
        $_SESSION['mySessionCheck'] = "This session (" . session_id() . ") started " . date("Y-m-d H:i:s");
    }
    echo '<pre>';
    var_dump($_SESSION);
    echo '</pre>';
?> -->

<link rel="stylesheet" href="global-styles.css">
<link rel="stylesheet" href="product-list.css">
<link rel="stylesheet" href="index.css">

<script src="scripts/jquery-3.6.0.min.js"></script>
<script type="module" src="./scripts/product-list.js"></script>
<script type="module" src="./scripts/product.js"></script>
<script type="module" src="./scripts/navbar.js"></script>
<script src = "/socket.io/socket.io.js"></script> 
<!-- <script src="../node_modules/socket.io/client-dist/socket.io.js"></script> -->
<script src="https://kit.fontawesome.com/b33741772b.js" crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

<script>

    var socket = io();

    function searchForProductTitle(){
        if(document.getElementById('search-input').value === ""){
            alert("Bitte geben Sie einen Suchbegriff ein");
        }
        else{
            let searchString = document.getElementById('search-input').value;
            console.log(searchString);

            var elements = document.getElementsByClassName('product');
            // console.log(elements);
            Array.prototype.forEach.call(elements, function(element) {
                // console.log(element);
                // console.log(element.getElementsByClassName('product-title').item(0).innerHTML);
                let productTitle = element.getElementsByClassName('product-name').item(0).innerHTML;
                if(productTitle.toUpperCase().includes(searchString.toUpperCase())){
                    element.style.display = "block";
                }
                else{
                    console.log("no Match");
                    element.style.display = "none";
                }
            });
        }
    }

    function navigateToProduct(buttonElement){
        console.log(buttonElement.closest('sales-product').id);
        window.location.replace("product-detail.php?pid=" + buttonElement.closest('.product').id);
    }

    function deleteProduct(buttonElement){
        if (confirm('Are you sure you want to delete this product permanently? You cannot undo this after confirmation!')) {
            // Save it!
            console.log(buttonElement.closest('.product').id);
            var productId = buttonElement.closest('.product').id;
            buttonElement.closest("sales-product").remove();
            socket.emit("deleteProduct", productId);
        } else {
            // Do nothing!
        }
    }

    function openAddProductDialog(){
        document.getElementById("add-product-form-container").style.display = "block";
    }

    function addProduct(){{
        if(document.getElementById("add-product-name").value !== "" 
        && document.getElementById("add-product-description").value !== ""
        && document.getElementById("add-product-price").value !== ""
        && document.getElementById("add-product-producer-name").value !== ""
        && document.getElementById("add-product-in-storage").value !== ""){
            console.log("Product addable");
            var product = {
                Name: document.getElementById("add-product-name").value,
                ProducerId: document.getElementById("add-product-producer-name").value,
                InStorage: document.getElementById("add-product-in-storage").value,
                Price: document.getElementById("add-product-price").value,
                Description: document.getElementById("add-product-description").value,
                Rating: 1
            }
            socket.emit("addProduct", product);
        }   
        else{
            console.log("Please fill all the fields");
        }
    }}

    function onSubmit(){
        console.log("Submitting");
        return false;
    }
</script>


<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Products</h1>
            <hr>
            <div class="search-bar-area">
                <div class="search-bar-container">
                    <input id="search-input" type="text" class="search-bar-input" aria-label="search" placeholder="Search product">
                    <button class="search-bar-button" aria-label="search button" onclick="searchForProductTitle()"><i class="fas fa-search search-bar-icon"></i></button>
                </div>
            </div>
            <div class="add-products-area">
                <button id="open-add-product-dialog-button" onclick="openAddProductDialog()" style="width: 150px; height: 32px; font-size: 24px">Add Product</button>
                <div id="add-product-form-container">   
                    <form onsubmit="return onSubmit()" id="add-product-form" style="display: flex; flex-direction: column">
                        <label for="add-product-name">Title</label>
                        <input id="add-product-name" type="text">
                        <label for="add-product-description">Description</label>
                        <input id="add-product-description" type="text">
                        <label for="add-product-price">Price</label>
                        <input id="add-product-price" type="number">
                        <label for="add-product-producer-name">Producer</label>
                        <input id="add-product-producer-name" type="text">
                        <label for="add-product-in-storage">In storage</label>
                        <input id="add-product-in-storage" type="number">
                        <button id="add-product-button" onclick="addProduct()" style="width: 150px; height: 32px; font-size: 24px">Add</button>
                    </form>
                </div>
            </div>
            <div id="product-container">
                
            </div>
        </div>
    </div>
</div>