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
<link rel="stylesheet" href="login.css">
<script type="module" src="scripts/navbar.js"></script>
<script type="module" src="scripts/login.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

<script src="/socket.io/socket.io.js"></script>


<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Login</h1>
            <div class="login-form-container">
                <h3>Login</h3>
                <form name="loginForm" action="index.html" onsubmit="return checkUserLogin(event)" method="post">
                    <label for="user">User Name</label>
                    <input type="text" id="user" name="username" placeholder="Username" required>

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" required>                
                    <input type="submit" value="Submit" name="submit-login">
                </form>
                <h3 style="text-align: center">New here? Then register for free!</h3>
                <form name="registrationForm" action="index.html" onsubmit="return checkForNewUser(event)" method="post">
                    <label for="firstname">First name</label>
                    <input type="text" id="firstname" name="firstname" placeholder="First name" required>

                    <label for="lastname">Last name</label>
                    <input type="text" id="lastname" name="lastname" placeholder="Last name" required>

                    <label for="username-register">User name</label>
                    <input type="text" id="username-register" name="username-register" placeholder="User name" required>

                    <label for="password_register">Password</label>
                    <input type="password" id="password-register" name="password-register" placeholder="Password" required>                
                    
                    <label for="password-register_confirm">Confirm Password</label>
                    <input type="password" id="password-register-confirm" name="password-register-confirm" placeholder="Confirm Password" required>                

                    <input type="submit" value="Submit" name="submit-register">
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    var socket = io();
    var salt = "!§$%&";

    socket.on('giveAllUsersForLogin', (users) => {
        console.log(users);
        var userFound = false;
        for(let i=0; i<users.length; i++){
            if(users[i].Username === document.getElementById("user").value 
                && users[i].Password === CryptoJS.RIPEMD160(salt + document.getElementById("password").value + salt).toString()){
                    console.log("Korrekte Anmeldedaten!");
                    userFound = true;
                    sessionStorage.setItem("user", users[i].Username);
                    sessionStorage.setItem("role", users[i].Groupname);  
                    window.location.replace("user.php");
         
                    // <?php
                    //     if(isset($_POST['submit-login'])){
                    //         $user = $_POST['username'];
                    //         $_SESSION['user'] = $user;
                    //     }
                    // ?>

                    
            }
        }
        if(!userFound){
            alert("Password or username are incorrect!");
            // var saltRounds = 10;
            // var plaintextPassword = "1234";
        }
    });
    
    socket.on('giveAllUsersForRegistration', (users) => {
        // alert("Hello!")
        console.log("Log users:");
        var isUserUnique = true;

        // Check for same user name 
        for(let i=0; i<users.length; i++){
            console.log(users[i]);
            console.log(document.getElementById('username-register').value);
            console.log(users[i].Username);
            if(users[i].Username === document.getElementById('username-register').value){
                alert("User name already exists! Please chose a different one");
                isUserUnique = false;
                i = users.length;
            }
            else{
                console.log("Username is ok");
            }
        }
        // Check for password matching
        if(document.getElementById('password-register').value !== document.getElementById('password-register-confirm').value){
            alert("Passwords do not match!");
        }
        else{                                           // Passwords match
            if(isUserUnique){                           // and unique username
                console.log("Registering successful");
                // Add user to the database
                // var saltRounds = 10;
                // var plainTextPassword = document.getElementById('password-register').value;
                // bcrypt.genSalt(saltRounds, function(err, salt) {
                //     bcrypt.hash(plainTextPassword, salt, function(err, hash) {

                        var plainTextPassword = document.getElementById('password-register').value;
                        var hashedPassword = CryptoJS.RIPEMD160(salt + plainTextPassword + salt).toString();
                        var user = {
                            Username: document.getElementById('username-register').value,
                            Password: hashedPassword,
                            PermissionId: 2
                        }
                        console.log(user);
                        socket.emit('addUser', user);                    
                //     });
                // });
            }
        }
    });

    function checkUserLogin(e){
        e.preventDefault();
        console.log(e);
        // console.log(document.forms['loginForm']['username'].value);
        // console.log(document.forms['loginForm']['password'].value);
        socket.emit('getAllUsersForLogin');
        return false;
    }

    function checkForNewUser(e){
        console.log(e);
        e.preventDefault();
        socket.emit('getAllUsersForRegistration');
        return false;
    }


    // function callDatabaseTest(){
    //     alert("Calling database");
    //     console.log("Calling database");
    // }
</script>