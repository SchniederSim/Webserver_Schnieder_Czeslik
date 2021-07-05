export class Navbar extends HTMLElement {

    constructor(){ 
        super();       
        this.innerHTML = `
            <div class="menu-bar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="product-list.html">Product List</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="user.html">User</a></li>
                    <li><a id="navbar-login" href="http://localhost:3000/login.html">Login</a></li>
                </ul>
            </div>
        `
    }

}

window.customElements.define('custom-navbar', Navbar);