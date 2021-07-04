export class RatingDisplay extends HTMLElement {
    constructor(ID, ProductTitle, ProductId, Comment, Stars,Timestamp){ 
        super();       
        this.innerHTML = `
            <div id="${ID}" class="product grid-item">
                <div class="columns" style="margin-bottom: 20px; max-width: 600px">
                    <div class="description-col">
                        <h2>Rating #${ID}</h2>
                        <div class="timestamp ${ID}">Rated on: ${Timestamp}</div>
                        <div class="rating">Rating: ${Stars}/5 </div>
                        <div class="product-title">Product: <a class="product-link" href="../product-detail.php?pid=${ProductId}&mode=1">${ProductTitle}</a></div>
                        <hr>
                        <textarea class="comment" id="comment" style="resize: none; font-size: 14px; width: 590px; height: 125px; border-color: transparent;" disabled>${Comment}</textarea>
                    </div>
                </div>
            </div>
            `
    }
}

window.customElements.define('user-rating', RatingDisplay);