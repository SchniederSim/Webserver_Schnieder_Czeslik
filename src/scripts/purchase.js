export class Purchase extends HTMLElement {
    constructor(Counter, Name, ProducerName, Amount, TotalPrice){ 
        super();       
        this.innerHTML = `
            <div class="purchase">
                <h3>Purchase #${Counter}</h3>
                <div>Name: ${Name}</div>
                <div>Producername: ${ProducerName}</div>
                <div>Amount: ${Amount}</div>
                <div>Total price: ${TotalPrice}</div>
                <hr>
            </div>
            `
    }
}

window.customElements.define('custom-purchase', Purchase);