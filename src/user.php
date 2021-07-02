<link rel="stylesheet" href="css/global-styles.css">
<link rel="stylesheet" href="css/user.css">

<script type="module" src="scripts/navbar.js"></script>
<script type="module" src="scripts/user.js"></script>
<script src = "/socket.io/socket.io.js"></script> 

<script>
    var socket = io();
    
    function deleteUser(){
        if (confirm('Are you sure you want to delete this account permanently? You cannot undo this after confirmation!')) {
            var username = document.getElementById("delete-user-input").value;
            socket.emit("getAllUsers");
        }
    }

    socket.on('giveAllUsers', (users) => {
        var doesUserExist = false;
        for(let i=0; i<users.length; i++){
            if(users[i].Username === document.getElementById('delete-user-input').value){
                doesUserExist = true;
                alert("User exists");
                socket.emit("deleteUser", users[i].UserId);
            }
        }
        if(!doesUserExist){
            alert("User not found");
        }
    });

    function deleteAccount(){
        if (confirm('Are you sure you want to delete your account permanently? You cannot undo this after confirmation!')) {
            console.log("Delete account");
            sessionStorage.clear();
            socket.emit("deleteUserByUsername", sessionStorage.getItem("user"));
        }
    }

    function upgradeUser(){
        if (confirm('Are you sure you want to make this user an admin? You cannot undo this after confirmation!')) {
            var username = document.getElementById("upgrade-user-input").value;
            socket.emit("editUserRole", username, 1);
        }
    }

    function downgradeYourself(){
        if (confirm('Are you sure you want to downgrade your own account permanently? You will lose your admin rights and cannot undo this after confirmation!')) {
            sessionStorage.setItem("role", "USER");
            socket.emit("editUserRole", sessionStorage.getItem("user"), 2);
            window.location.replace("index.html");
        }
    }
</script>



<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">User</h1>
            <div class="user-content">
                <p id="not-logged-in">Please make sure that you are logged in! You can login <a class="to-login-link" href="login.php" style="color: darkblue">here</a></p>
                <p id="logged-in"></p>

                <div id="user-stats-container">
                    <div class="user-stats">
                        <h2>Your purchases: </h2>
                        <div id="user-purchases"></div> 
                        <h2>Your comments: </h2>
                        <div id="user-comments"></div>
                    </div>

                    <h2>Account options: </h2>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                        <div id="delete-user">
                            <div class="form-container" style="display: flex; align-items: center; gap: 10px">
                                <label for="delete-user-input" style="font-size: 24px; width: 150px;">Delete user</label>
                                <input type="text" id="delete-user-input" style="height: 30px">
                                <button onclick="deleteUser()" style="height: 30px; font-size: 24px; width: 150px;">Delete User</button>
                            </div>
                        </div>
                        <div id="delete-account">
                            <button onclick="deleteAccount()" style="height: 30px; font-size: 24px; width: 200px;">Delete Account</button>
                        </div>
                    </div> 
                    <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
                        <div id="upgrade-user">
                            <div class="form-container" style="display: flex; align-items: center; gap: 10px;">
                                <label for="upgrade-user-input" style="font-size: 24px; width: 150px">Upgrade user</label>
                                <input type="text" id="upgrade-user-input" style="height: 30px">
                                <button onclick="upgradeUser()" style="height: 30px; font-size: 24px; width: 150px">Upgrade</button>
                            </div>
                        </div>
                        <div id="downgrade-self">
                            <button onclick="downgradeYourself()" style="height: 30px; font-size: 24px; width: 200px;">Downgrade</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>