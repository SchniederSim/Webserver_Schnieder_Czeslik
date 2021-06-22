export class Product extends HTMLElement {
    constructor(ID, Name, Description, Price, Rating, ProducerName, inStorage){ 
        super();       
        this.innerHTML = `
            <div class="product">
                <div class="columns" style="display: flex; margin-bottom: 20px;">
                    <div class="img-col" style="width: 220px; display: flex; flex-direction: column; justify-content: center; position: relative;">
                        <img src="imgs/${ID}.jpg" width="200" height="200" style="display: block; margin: 10px; border: 1px solid grey">
                        <button onclick="navigateToProduct(this)" style="margin: auto; margin-top: 0px; height: 40px; border-radius: 30px; background: #275efe; color: white; font-size:20px; cursor: pointer;">Zum Produkt &#8594;</button>
                        <button class="delete-product-button" onclick="deleteProduct(this)" style="margin: auto; position: absolute; top: 0px; right: 0px; margin-top: 0px; height:30px; border-radius: 30px; background: lightgrey; color: black; font-size:15px; cursor: pointer;">X</button>
                    </div>
                    <div class="description-col">
                        <div class="product-name" style="margin: 10px; font-size: 25px">${Name}</div>
                        <hr>
                        <div class="product-description" style="margin: 10px;">${Description}</div>
                        <div class="product-price" style="margin: 10px;">${Price}</div>
                        <div class="product-rating" style="margin: 10px;">${Rating}</div>
                        <div class="product-producer" style="margin: 10px;">${ProducerName}</div>
                        <div class="product-inStore" style="margin: 10px;">${inStorage}</div>
                    </div>
                </div>
                <hr>
            </div>
            `
    }
}

window.customElements.define('sales-product', Product);