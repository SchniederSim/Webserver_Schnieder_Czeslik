<!-- <?php
    session_start();
    if (!isset($_SESSION['mySessionCheck'])) {
        $_SESSION['mySessionCheck'] = "This session (" . session_id() . ") started " . date("Y-m-d H:i:s");
    }
    echo '<pre>';
    var_dump($_SESSION);
    echo '</pre>';
?> -->

<link rel="stylesheet" href="css/global-styles.css">
<link rel="stylesheet" href="css/about.css">
<link rel="stylesheet" href="/node_modules/bootstrap-icons/font/bootstrap-icons.css">

<script type="module" src="scripts/navbar.js"></script>
<script type="module" src="scripts/about.js"></script>
<script src = "/socket.io/socket.io.js"></script> 

 
<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Shop Statistics</h1>
            <div class="stat-element-container">
                <i class="bi bi-inboxes"></i>
                <div class="stats-element">Total storage </div><div class="stats-value" id="total-storage"></div>
            </div>
            <div class="stat-element-container">
                <i class="bi bi-cart4"></i>
                <div class="stats-element">Total purchases </div><div class="stats-value" id="total-purchases"></div>
            </div>
            <div class="stat-element-container">
                <i class="bi bi-people-fill"></i>
                <div class="stats-element">Total users </div><div class="stats-value" id="total-users"></div>
            </div>
            <div class="stat-element-container">
                <i class="bi bi-building"></i>
                <div class="stats-element">Total producers </div><div class="stats-value" id="total-producers"></div>
            </div>
            <div class="stat-element-container">
                <i class="bi bi-cash"></i>
                <div class="stats-element">Total money </div><div class="stats-value" id="total-money"></div>
            </div>
            <div id="diagram-container" style="margin-top: 50px">
                <h2>Purchases sorted by money supply cohorts</h2>
                <!-- Eigentliche Maße für das Diagramm: 1000x600  -->
                <Canvas Id= "money-supply-per-product" Width="1100px" Height="700px" style="margin-bottom: 50px;"></Canvas>
                
                <h2>Products selled after time</h2>

                <Canvas Id= "selled-products-after-time" Width= "1100px" Height="700px"></Canvas>
            </div>
            <!-- <div class="stats-element">Total purchases: <p id="total-purchases" style="display: inline"></p></div>
            <div class="stats-element">Total money earned: <p id="total-money" style="display: inline"></p> €</div>
            <div class="stats-element">Registered users: <p id="total-users" style="display: inline"></p></div>
            <div class="stats-element">Amount of producers: <p id="total-producers" style="display: inline"></p></div> -->

            <!-- <div>Kleines Testbeispiel für die Implementierung einer einfachen PHP Berechnung</div>
            <form name="multiform">
                <input type="number" name="p1" value="1"><br>
                <input type="number" name="p2" value="1"><br>
                <input type="submit" value="Compute"><br>
            </form>
            <?php 
                $p1 = isset($_REQUEST['p1']) ? $_REQUEST['p1'] : 1;
                $p2 = isset($_REQUEST['p2']) ? $_REQUEST['p2'] : 1;
                function sum($a, $b){
                    return $a + $b;
                };
                echo "Summe von " . $p1 . " und " . $p2 . " ist gleich " . sum($p1, $p2)
            ?> -->
        </div>
    </div>
</div>