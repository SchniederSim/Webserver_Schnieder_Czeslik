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
<script type="module" src="scripts/about.js"></script>


<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">About</h1>
            <div>Kleines Testbeispiel für die Implementierung einer einfachen PHP Berechnung</div>
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
            ?>
        </div>
    </div>
</div>