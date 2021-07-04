

<link rel="stylesheet" href="css/global-styles.css">
<link rel="stylesheet" href="css/product-detail.css">
<script type="module" src="./scripts/rating.js"></script>
<script type="module" src="./scripts/product-details.js"></script>
<script type="module" src="scripts/navbar.js"></script>
<script src = "/socket.io/socket.io.js"></script> 


<div class="navbar-page-container">
    <custom-navbar></custom-navbar>
    <div class="page">
        <div class="page-container">
            <h1 class="header">Product Details</h1>
            <div class="detail-container" flex>
                <div class="info-col">
                    <div class="detail-header"></div>
                    <div class="details"></div>    
                </div>
                <div class="product-details">
                    <div class="imgBox">
                        <img id="image" src="imgs" width="300" height="300" style="display: block; margin: 10px; border: 1px solid grey">
                        <label id ="imgLabel">Anderes Bild auswählen:</label>
                        <form id="imgForm" action="/upload" method="post" enctype="multipart/form-data">
                            <input id="imageInput" type="file" name="avatar" multiple/>
                            <button style="visibility:hidden">Submit</button>
                        </form>
                        <label style="font-size: 54px; margin-left: 100px;">€</label>
                        <input id="price" type="number" min="0" style="font-size: 50px; width:120px">
                    </div>
                    
                    <div class="product-info">
                        <div class="title">
                            <input type="text" id="name" style="font-size: 40px" minlength="1">                      
                            <div class="rating userVis" style="margin-top:20px">
                                <svg  id="star1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                <svg  id="star2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                <svg  id="star3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                <svg  id="star4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                <svg  id="star5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            </div>
                        </div>  
                        <div class="producerInfo"> 
                            <label>von </label> 
                            <select id="producerName"></select>
                        </div>
                        <label>Produktinfo: </label>    
                        <textarea id="description" style="resize: none; max-height: 150px"> </textarea>
                        <div class="priceBox">
                            <label>Auf Lager:</label>
                            <input type="number" id="inStorage" min="0" step="1" style="max-height: 20px; width: 100px">
                        </div>
                        
                        <div class="purchase" id="purchase">
                            <label class="userVis">Anzahl:</label>
                            <input class="userVis" type="number" id="quantity" min="1" step="1" style="max-height: 20px; max-width:100px">
                            <button id="buyProduct" onclick="buyProduct()" style="height: 80px; border-radius:30px; background: #275efe; color: white; font-size:40px; cursor: pointer; width: 400px;">Produkt kaufen</button>
                        </div>
                        
                        <div id="snackbar"></div>
                        
                    </div>
                </div>
                <div style="margin-top:20px; display: flex; justify-content: center; align-items: center;">
                    <button id="rateProduct" class="userVis grid-item" onclick="rateProduct()" style="height: 50px; border-radius:30px; background: #275efe; color: white; font-size:20px; cursor: pointer; width:200px">Bewertung abgeben</button>
                </div>
                <div id="rating-container" style="margin-top:20px"></div>
            </div>
        </div>
    </div>
</div>

<script>

    
</script>