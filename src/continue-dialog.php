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
<script type="module" src="scripts/navbar.js"></script>
<script type="module" src="scripts/continue-dialog.js"></script>


<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Thanks for the purchase!<h1>
            <a style="color: blue; text-decoration: underline; font-size: 40px;" href="product-list.php">You wanna keep shopping?</a>
        </div>
    </div>
</div>