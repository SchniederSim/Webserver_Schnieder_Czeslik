export class Product extends HTMLElement {

    constructor(title, description, price, rating, shippingInfo){ 
        super();       
        this.innerHTML = `
            <div class="product">
            <div class="columns" style="display: flex; margin-bottom: 20px;">
                <div class="img-col" style="width: 220px; display: flex; flex-direction: column; justify-content: center;">
                    <img src="resources/placeholder-icon.png" width="200" height="200" style="display: block; margin: 10px; border: 1px solid grey">
                    <button style="margin: auto; margin-top: 0px; height: 40px; border-radius:30px; background: #275efe; color: white; font-size:20px; cursor: pointer;">Zum Produkt &#8594;</button>
                </div>
                <div class="description-col">
                    <div class="product-title" style="margin: 10px; font-size: 25px">${title}</div>
                    <hr>
                    <div class="product-description" style="margin: 10px;">${description}</div>
                    <div class="product-price" style="margin: 10px;">${price}</div>
                    <div class="product-shipping-info" style="margin: 10px;">${rating}</div>
                    <div class="product-rating" style="margin: 10px;">${shippingInfo}</div>
                </div>
            </div>
        </div>
        <hr>
        `
    }
}

window.customElements.define('sales-product', Product);