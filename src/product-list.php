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

<script>
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
        window.location.replace("product-detail.php?pid=" + buttonElement.closest('sales-product').id);
    }

    function deleteProduct(buttonElement){
        console.log("TODO: Delete product with ID: ");
        console.log(buttonElement.closest('sales-product').id);

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
            <div id="product-container">
                
            </div>
        </div>
    </div>
</div>