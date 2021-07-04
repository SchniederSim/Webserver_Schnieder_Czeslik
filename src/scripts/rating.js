export class Rating extends HTMLElement {
    constructor(ID, Username, Comment, Stars,Timestamp){ 
        super();       
        this.innerHTML = `
            <div id="${ID}" class="product grid-item">
                <div class="columns" style="margin-bottom: 20px; max-width: 600px">
                    <div class="description-col" style="border: 1px solid grey; border-radius:25px">
                        <div class="rating" style="margin-top:20px">
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
                        <textarea class="comment" id="comment" style="resize: none; font-size: 14px; width: 590px; height: 125px; border-color: transparent;" disabled>${Comment}</textarea>
                        <div class="product-name" style="margin: 10px;">von ${Username}</div>
                        <div class="timestamp ${ID}" style="margin-left: 10px; margin-bottom: 10px;">${Timestamp}</div>
                    </div>
                </div>
            </div>
            `
    }
}

window.customElements.define('product-rating', Rating);