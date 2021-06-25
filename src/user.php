<!-- <?php
    // session_start();
    // if (!isset($_SESSION['mySessionCheck'])) {
    //     $_SESSION['mySessionCheck'] = "This session (" . session_id() . ") started " . date("Y-m-d H:i:s");
    // }
    // echo '<pre>';
    // var_dump($_SESSION);
    // echo '</pre>';
?> -->

<link rel="stylesheet" href="global-styles.css">
<link rel="stylesheet" href="user.css">
<script type="module" src="scripts/navbar.js"></script>
<script type="module" src="scripts/user.js"></script>




<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">User</h1>
            <div class="user-content">
                <p id="not-logged-in">Please make sure that you are logged in! You can login <a class="to-login-link" href="login.php" style="color: darkblue">here</a></p>
                <p id="logged-in"></p>
            </div>
        </div>
    </div>
</div>