
<link rel="stylesheet" href="global-styles.css">
<link rel="stylesheet" href="login.css">
<script type="module" src="scripts/navbar.js"></script>

<script src="/socket.io/socket.io.js"></script>

<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Login</h1>
            <div class="login-form-container">
                <h3>Login</h3>
                <form name="loginForm" action="index.php" onsubmit="return checkUserLogin()" method="post">
                    <label for="user">User Name</label>
                    <input type="email" id="user" name="username" placeholder="Username">

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password">                
                    <input type="submit" value="Submit" name="submit-login">
                </form>
                <h3 style="text-align: center">New here? Then register for free!</h3>
                <form name="registrationForm" action="user.php" onsubmit="return checkForNewUser()" method="post">
                    <label for="firstname">First name</label>
                    <input type="text" id="firstname" name="firstname" placeholder="First name">

                    <label for="lastname">Last name</label>
                    <input type="text" id="lastname" name="lastname" placeholder="Last name">

                    <label for="username-register">User name</label>
                    <input type="text" id="username-register" name="username-register" placeholder="User name">

                    <label for="password_register">Password</label>
                    <input type="password" id="password-register" name="password-register" placeholder="Password">                
                    
                    <label for="password-register_confirm">Confirm Password</label>
                    <input type="password" id="password-register-confirm" name="password-register-confirm" placeholder="Confirm Password">                

                    <input type="submit" value="Submit" name="submit-register">
                </form>
            </div>
        </div>
    </div>
</div>
<script>

    // var socket = io();

    // socket.on("giveAllUsers", (users) =>{
    //     console.log("Geklappt!");
    // })

    function checkUserLogin(){
        // console.log(document.forms['loginForm']['username'].value);
        // console.log(document.forms['loginForm']['password'].value);

        if(document.forms['loginForm']['username'].value !== "test@test.de"
            || document.forms['loginForm']['password'].value !== "test"){
                alert('User name or password is wrong!')
                return false;
        }
    }

    function checkForNewUser(){
        alert("Calling database");
        console.log("Calling database");
        // socket.emit('getAllUsers');
        // getAllUsers();
    }


    // function callDatabaseTest(){
    //     alert("Calling database");
    //     console.log("Calling database");
    // }
</script>