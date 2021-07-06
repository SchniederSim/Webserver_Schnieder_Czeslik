window.onload = init_page;

var socket = io();

var canvas1 = document.getElementById("money-supply-per-product");
var ctx1 = canvas1.getContext("2d");

var canvas2 = document.getElementById("selled-products-after-time");
var ctx2 = canvas2.getContext('2d');

function init_page(){
    if(sessionStorage.getItem('user')){
        document.getElementById('navbar-login').innerHTML = "Logout";
    }

    ctx1.fillStyle = "lightgray";
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
    ctx1.beginPath();
    ctx1.lineWidth = "5";
    ctx1.strokeStyle = "black";
    ctx1.moveTo(50,50);
    ctx1.lineTo(50, 650);
    ctx1.lineTo(1050, 650);
    ctx1.stroke();

    addAxisLabeling(ctx1);
    drawHorizontalGridLines(ctx1);

    ctx2.fillStyle = "lightgray";
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    ctx2.beginPath();
    ctx2.lineWidth = "5";
    ctx2.strokeStyle = "black";
    ctx2.moveTo(50,50);
    ctx2.lineTo(50, 650);
    ctx2.lineTo(1050, 650);
    ctx2.stroke();

    drawHorizontalGridLines(ctx2);

    socket.emit("getAllProducts");
    socket.emit("getAllPurchases");
    socket.emit("getAllUsers");
    socket.emit("getAllProducers");
}

socket.on('giveAllProducts', (products) => {
    var totalProducts = 0;
    for(let i=0; i<products.length; i++){
        totalProducts += products[i]['InStorage'];
    }
    document.getElementById("total-storage").innerHTML = totalProducts;
});

socket.on('giveAllUsers', (users) => {
    var totalUsers = users.length;
    document.getElementById("total-users").innerHTML = totalUsers;
});

socket.on('giveAllProducers', (producers) => {
    var totalProducers = producers.length;
    document.getElementById("total-producers").innerHTML = totalProducers;
});

socket.on('giveAllPurchases', (purchases) => {
    // Compute total selled products and total earned money as key data about the shop
    var totalSelledProducts = 0;
    var totalMoney = 0;
    for(let i=0; i<purchases.length; i++){
        totalSelledProducts += purchases[i]['Amount'];
        totalMoney += purchases[i]['totalPrice'];
    }
    document.getElementById("total-purchases").innerHTML = totalSelledProducts;
    document.getElementById("total-money").innerHTML = totalMoney + " €";

    // Draw the diagrams based on all the purchases made
    drawMoneySupplyPerProductDiagram(ctx1, purchases);
    drawSelledProductsAfterTimeDiagram(ctx2, purchases);
});


function drawMoneySupplyPerProductDiagram(ctx, purchases){
    var cohort1counter = 0;
    var cohort2counter = 0;
    var cohort3counter = 0;
    var cohort4counter = 0;
    var cohort5counter = 0;

    purchases.forEach((purchase) => {
        if(purchase['totalPrice'] < 100){
            cohort1counter++;
        }
        else if(purchase['totalPrice'] >= 100 && purchase['totalPrice'] < 250 ){
            cohort2counter++;
        }
        else if(purchase['totalPrice'] >= 250 && purchase['totalPrice'] < 1000 ){
            cohort3counter++;
        }
        else if(purchase['totalPrice'] >= 1000 && purchase['totalPrice'] <= 10000 ){
            cohort4counter++;
        }
        else if(purchase['totalPrice'] > 1000){
            cohort5counter++;
        }
    })

    // Find out the length of the bars by computing the proportion of each cohort and then multiply this with the diagram height
    var barLength1 = cohort1counter / purchases.length * 600;
    var barLength2 = cohort2counter / purchases.length * 600;
    var barLength3 = cohort3counter / purchases.length * 600;
    var barLength4 = cohort4counter / purchases.length * 600;
    var barLength5 = cohort5counter / purchases.length * 600;

    ctx.beginPath();
    ctx.lineWidth = "20";
    ctx.strokeStyle = "red";
    ctx.moveTo(110,650);
    ctx.lineTo(110,650-barLength1);
    ctx.moveTo(330,650);
    ctx.lineTo(330,650-barLength2);
    ctx.moveTo(550,650);
    ctx.lineTo(550,650-barLength3);
    ctx.moveTo(770,650);
    ctx.lineTo(770,650-barLength4);
    ctx.moveTo(990,650);
    ctx.lineTo(990,650-barLength5);

    ctx.stroke();
}

function drawSelledProductsAfterTimeDiagram(ctx, purchases){
    if(purchases.length > 0){

        var productsSelledPerDays = [];
        var totalProductsSelled = 0;

        var min = purchases[0]['Timestamp'];
        var max = purchases[0]['Timestamp'];

        // Iterate through all the purchases
        purchases.forEach((purchase) => {
            totalProductsSelled += purchase['Amount'];

            // Gradually find out the minimum and maximum timestamp (for x-axis labeling)
            if(min > purchase['Timestamp']){
                min = purchase['Timestamp'];
            }
            if(max < purchase['Timestamp']){
                max = purchase['Timestamp'];
            }            

            // Create an object to save the purchase amount for each day
            var isDuplicate = false;
            productsSelledPerDays.forEach((element) => {
                if(element.date === purchase['Timestamp'].split('T')[0]){
                    element.amount += purchase['Amount'];
                    isDuplicate = true;
                }
            })
            if(!isDuplicate){
                productsSelledPerDays.push({date: purchase['Timestamp'].split('T')[0], amount: purchase['Amount']});
            }
        })
        // console.log(min.split('T')[0]);
        // console.log(max.split('T')[0]);

        // console.log(calculateDaysBetween(min, max));
        // console.log(productsSelledPerDays);
        // console.log(totalProductsSelled);

        // Label the diagram
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(totalProductsSelled, 0, 50);
        ctx.fillText(0, 0, 650);
        ctx.fillText(min.split('T')[0], 50, 680);
        ctx.fillText(max.split('T')[0], 950, 680);

        // Go to the diagram origin (50, 650)
        var currentX = 50;
        var currentY = 650;
        var lastDate = min;
        ctx.strokeStyle = "red";
        ctx.lineWidth = "3";

        // Iterate through the days, when products were selled
        productsSelledPerDays.forEach((day) =>{
            // Compute the vertical line proportion
            var percentageVertical = day.amount / totalProductsSelled;
            var pixelsUp = percentageVertical * 600;

            // Compute the horizontal line proportion
            var diff = calculateDaysBetween(lastDate, day.date);
            lastDate = day.date;
            var totalDiff = calculateDaysBetween(min, max);
            var percentageHorizontal = diff / totalDiff;
            var pixelsRight = percentageHorizontal*1000;

            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(currentX + pixelsRight, currentY);
            currentX += pixelsRight;
            ctx.lineTo(currentX, currentY - pixelsUp);
            currentY -= pixelsUp;

            ctx.stroke();
        })   
    }
}

function drawHorizontalGridLines(ctx){
    ctx.lineWidth = "1";
    ctx.moveTo(50,590);
    ctx.lineTo(1050, 590);
    ctx.moveTo(50,530);
    ctx.lineTo(1050, 530);
    ctx.moveTo(50,470);
    ctx.lineTo(1050, 470);
    ctx.moveTo(50,410);
    ctx.lineTo(1050, 410);
    ctx.moveTo(50,350);
    ctx.lineTo(1050, 350);
    ctx.moveTo(50,290);
    ctx.lineTo(1050, 290);
    ctx.moveTo(50,230);
    ctx.lineTo(1050, 230);
    ctx.moveTo(50,170);
    ctx.lineTo(1050, 170);
    ctx.moveTo(50,110);
    ctx.lineTo(1050, 110);
    ctx.moveTo(50,50);
    ctx.lineTo(1050,50);
    ctx.stroke();
}

function addAxisLabeling(ctx){
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("100%", 0, 50);
    ctx.fillText("90%", 0, 110);
    ctx.fillText("80%", 0, 170);
    ctx.fillText("70%", 0, 230);
    ctx.fillText("60%", 0, 290);
    ctx.fillText("50%", 0, 350);
    ctx.fillText("40%", 0, 410);
    ctx.fillText("30%", 0, 470);
    ctx.fillText("20%", 0, 530);
    ctx.fillText("10%", 0, 590);
    ctx.fillText("0%", 0, 650);
    ctx.fillText("<100€", 80, 680);
    ctx.fillText("100-250€",290, 680);
    ctx.fillText("250-1000€", 500, 680);
    ctx.fillText("1000-10000€", 710, 680);
    ctx.fillText(">10000€", 950, 680);
}

function calculateDaysBetween(min, max){
    var minDate = new Date(min.split('T')[0]);
    var maxDate = new Date(max.split('T')[0]);
    
    var daysBetween = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysBetween;
}