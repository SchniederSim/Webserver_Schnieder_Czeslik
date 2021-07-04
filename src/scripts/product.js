export class Product extends HTMLElement {
    constructor(ID, Name, Description, Price, Rating, ProducerName, inStorage){ 
        super();       
        this.innerHTML = `
            <div id="${ID}" class="product">
                <div class="columns" style="display: flex; margin-bottom: 20px;">
                    <div class="img-col" style="width: 220px; display: flex; flex-direction: column; justify-content: center; position: relative;">
                        <img src="imgs/${ID}.jpg" width="200" height="200" style="display: block; margin: 10px; border: 1px solid grey" alt="Produkt hat kein Bild">
                        <button onclick="navigateToProduct(this)" style="margin: auto; margin-top: 0px; height: 40px; border-radius: 30px; background: #275efe; color: white; font-size:20px; cursor: pointer;">Zum Produkt &#8594;</button>
                        <button class="delete-product-button" onclick="deleteProduct(this)" style="display: none; margin: auto; position: absolute; top: 0px; right: 0px; margin-top: 0px; height:30px; border-radius: 30px; background: lightgrey; color: black; font-size:15px; cursor: pointer;">X</button>
                        <button class="edit-product-button" onclick="editProduct(this)" style="display: none; margin: auto; position: absolute; top: 0px; right: 30px; margin-top: 0px; height:30px; border-radius: 30px; background: lightgrey; color: black; font-size:15px; cursor: pointer;">E</button>
                    </div>
                    <div class="description-col" style="margin-left:3%;margin-top: 2.5%;">
                        <div class="product-name" style="margin-bottom: 5px; font-size: 25px">${Name}</div>
                        <div class="rating">
                            <div class="grid-item">
                                <svg  id="${ID}star1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            </div>
                            <div class="grid-item">
                                <svg  id="${ID}star2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            </div>
                            <div class="grid-item">     
                                <svg  id="${ID}star3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            </div>
                            <div class="grid-item">    
                                <svg  id="${ID}star4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            </div>    
                            <div class="grid-item">        
                                <svg  id="${ID}star5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            </div>
                         </div>
                        <hr>
                        <!--<div class="product-description" style="margin-bottom: 10px;">${Description}</div>-->
                        <div class="product-price" style="margin-bottom: 10px;">${Price}€</div>
                        <div class="product-producer" style="margin-bottom: 10px;">Hersteller: ${ProducerName}</div>
                        <!--<div class="product-rating" style="margin-bottom: 10px;">${Rating} Sterne</div>-->
                        <div class="product-inStore" style="margin-bottom: 10px;">${inStorage} Exemplare auf Lager</div>
                    </div>
                </div>
                <div class="edit-product-container">
                    <div style="display: flex; flex-direction: column;">
                    <label for="edit-product-name">Title</label>
                    <input id="edit-product-name" class="edit-product-name" type="text" value="${Name}">
                    <label for="edit-product-description">Description</label>
                    <input id="edit-product-description" class="edit-product-description" type="text" value="${Description}">
                    <label for="edit-product-price">Price</label>
                    <input id="edit-product-price" class="edit-product-price" type="number" value="${Price}">
                    <label for="edit-product-producer-name">Producer</label>
                    <input id="edit-product-producer-name" class="edit-product-producer-name" type="text" value=""${ProducerName}>
                    <label for="edit-product-in-storage">In storage</label>
                    <input id="edit-product-in-storage" class="edit-product-in-storage" type="number" value="${inStorage}">
                    <button id="save-changes-button" onclick="saveChanges(this)">Save</button>
                    </div>
                </div>
                <hr>
            </div>
            `
    }
}

window.customElements.define('sales-product', Product);