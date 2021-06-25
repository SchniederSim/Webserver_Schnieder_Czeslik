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
<link rel="stylesheet" href="product-detail.css">

<script type="module" src="scripts/navbar.js"></script>
<script type="module" src="scripts/product-details.js"></script>


<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Product Details</h1>
            <div class="detail-container">
                <div class="info-col">
                    <div class="detail-header"></div>
                    <div class="details"></div>    
                </div>
                <div class="control-col">
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="99" value="1">
                    <button onclick="buyProduct()" class="buy-button">Buy</button>
                </div>
            </div>
            <?php
                $product_id = $_REQUEST['pid'];
                echo "<div>Füge hier das Produkt mit der ID " . $product_id . " ein </div>";
            ?>
        </div>
    </div>
</div>

<script>

    function buyProduct(){
        if(sessionStorage.getItem('user')){
            window.location.replace("continue-dialog.php");
        }
        else {
            alert("Please log in to make a purchase!");
            window.location.replace("login.php");

        }
    }
    // var id = <?php echo json_encode($product_id); ?>;
    // console.log(id);
</script>