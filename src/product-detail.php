

<link rel="stylesheet" href="css/global-styles.css">
<link rel="stylesheet" href="css/product-detail.css">

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
                            <div class="rating" style="margin-top:20px">
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
                            <button id="buyProduct" onclick="buyProduct()" style="margin: auto; margin-top: -30px; height: 80px; border-radius:30px; background: #275efe; color: white; font-size:50px; cursor: pointer;">Produkt kaufen</button>
                        </div>
                        <div id="snackbar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    window.onload = init_page;

function init_page(){
    if(sessionStorage.getItem('user')){
        document.getElementById('navbar-login').innerHTML = "Logout";
    }    
}
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pId = urlParams.get('pid');
    const mode = urlParams.get('mode');//1= purchase,2 = edit, 3 = new
    document.getElementById('image').src="imgs/"+pId+".jpg";
    var socket = io();
    if(mode != 3){
        socket.emit('getProduct',pId);
    }
    function saveProduct(){
        if(sessionStorage.getItem('role') !== "ADMIN"){
        return 0;
        }
        var product = { 
            Name: document.getElementById('name').value,
            Description: document.getElementById('description').value,
            ProducerId : document.getElementById('producerName').value,
            InStorage : document.getElementById('inStorage').value,
            Price: document.getElementById('price').value
        }
        if(!product.Name){
            appearSnackbar("Bitte Produkttitel angeben", "red");
            return 0;
        }
        if(!product.Description || product.Description == " "){
            appearSnackbar("Bitte Produktinfo angeben", "red");
            return 0;
        }
        if(!product.ProducerId){
            appearSnackbar("Bitte Hersteller angeben", "red");
            return 0;
        }
        if(!product.Price){
            appearSnackbar("Bitte Preis angeben", "red");
            return 0;
        }
        if(!product.InStorage){
            product.InStorage = 0;
        }
        if(mode == 2){
            product.ProductId = pId;
        }
        socket.emit('editProduct',product);
        
    }
    if(mode != 1){
        var toHide =  document.getElementsByClassName('userVis');
        [].forEach.call(toHide,function(el){el.style.visibility= 'hidden';});
        document.getElementById("buyProduct").innerHTML = "Produkt speichern";
        document.getElementById("buyProduct").onclick = saveProduct;
        var input = document.getElementById("imageInput");
        console.log(input);
    }
    if(mode==1){
        document.getElementById("imageInput").style.visibility ='hidden';
        document.getElementById("imgLabel").style.visibility ='hidden';
    }
    var product;
    var producers;
    socket.emit('getProducers');
    socket.on('giveProducers',(result)=>{
        producers = result;
        var producerBox = document.getElementById('producerName');
        for(index in producers) {
            producerBox.options[producerBox.options.length] = new Option(producers[index].ProducerName, producers[index].ProducerId);
        }
        
        if(!product || !product.ProducerId){
            producerBox.value = 1;
        }else{
        producerBox.value = product.ProducerId;
        }
        producerBox.disabled = mode == 1;
    })
    socket.on('giveProduct',(result)=>{

        document.getElementById('name').value=result[0].Name;
        document.getElementById('name').disabled = mode == 1;
        var textArea = document.getElementById('description');
        textArea.innerHTML = result[0].Description;
        textArea.disabled = mode == 1;
        document.getElementById('price').value = result[0].Price;
        document.getElementById('price').disabled = mode == 1;
        document.getElementById('inStorage').value = result[0].InStorage;
        document.getElementById('inStorage').disabled = mode == 1;
        document.getElementById('quantity').value = 1;
        document.getElementById('quantity').setAttribute("max",result[0].InStorage);
        generateRating(result[0].Rating);
        product = result[0];
    })
    socket.on('PurchaseRequest',(result)=>{
        if(result=='success'){
            appearSnackbar("Einkauf abgeschlossen","green");
            socket.emit('getProduct',pId);
        }else{
            appearSnackbar("Einkauf konnte nicht abgeschlossen werden.","red");
        }      
    })
    socket.on('ProductEdited',(result)=>{
        if(result.code=='success'){
            var img = document.getElementById('imgForm');
            document.getElementById('imgForm').submit();
            
            appearSnackbar("Produkt gespeichert","green");
        }else{
            appearSnackbar("Produkt konnte nicht abgeschlossen werden.","red");
        }
        socket.emit('getProduct',pId);
    })
    function appearSnackbar(text, color){
        var sb = document.getElementById("snackbar");
        sb.style.backgroundColor=color;
        sb.innerHTML = text;
        sb.className="show";
        setTimeout(function(){ sb.classList.remove("show");},3000);
    }
    for(var i = 5; i>0;i--){
        document.getElementById('star'+i).style.fill="grey";
    }
    function generateRating(rating){
        while(rating>0){
           document.getElementById('star'+rating).style.fill="gold"; 
           rating--;
        }
    }
    function buyProduct(){
        var amount = document.getElementById('quantity').value;
        var purchase = { ProductId: pId, UserId: 1, Amount: amount};
        socket.emit('addPurchase', purchase);

    }

</script>