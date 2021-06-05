<link rel="stylesheet" href="global-styles.css">
<script type="module" src="scripts/navbar.js"></script>

<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Product Details</h1>
            <?php
                $product_id = $_REQUEST['pid'];
                echo "<div>Füge hier das Produkt mit der ID " . $product_id . " ein </div>";
            ?>
        </div>
    </div>
</div>

<script>
    var id = <?php echo json_encode($product_id); ?>;
    console.log(id);
</script>