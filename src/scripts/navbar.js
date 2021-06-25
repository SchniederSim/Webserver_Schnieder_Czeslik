export class Navbar extends HTMLElement {

    constructor(){ 
        super();       
        this.innerHTML = `
            <div class="menu-bar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="product-list.php">Product List</a></li>
                    <li><a href="about.php">About</a></li>
                    <li><a href="impressum.html">Impressum</a></li>
                    <li><a href="user.php">User</a></li>
                    <li class="right-item"><a id="navbar-login" href="http://localhost:3000/login.php">Login</a></li>
                </ul>
            </div>
        `
    }

}

window.customElements.define('custom-navbar', Navbar);