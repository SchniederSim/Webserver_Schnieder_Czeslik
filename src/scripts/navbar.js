export class Navbar extends HTMLElement {

    constructor(){ 
        super();       
        this.innerHTML = `
            <div class="menu-bar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="product-list.html">Product List</a></li>
                    <li><a href="about.php">About</a></li>
                    <li><a href="impressum.php">Impressum</a></li>
                    <li><a href="login.php">Login</a></li>
                    <li><a href="user.php">User</a></li>
                </ul>
            </div>
        `
    }
}

window.customElements.define('custom-navbar', Navbar);