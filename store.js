if(document.readyState = 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
 
function ready () {

    const addCart = document.getElementsByClassName('add-cart')
    for(var i = 0; i < addCart.length; i++){
        let addCartButton = addCart[i]
        addCartButton.addEventListener('click', addCartButtonsClicked)
    }
    const purchaseButton  = document.getElementById('purchase-button')
    purchaseButton.addEventListener('click', purchaseItems)

    const removeButtons = document.getElementsByClassName('btn btn-danger')
    for(var i = 0; i < removeButtons.length; i++){
        let removeButton = removeButtons[i]
        removeButton.addEventListener('click', removeCartItems)
    }
    const quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++){
        let quantityInput = quantityInputs[i]
        quantityInput.addEventListener('change', quantityChanged)
    }
 

        
    
}

const addCartButtonsClicked = (event) => {
    alert("Item was added to cart")
    let button = event.target
    let shopItem = button.parentElement.parentElement.parentElement
    let title = shopItem.getElementsByClassName('product-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText

    

    addItemsToCart(title, price)
    updateCartTotal()
}

const addItemsToCart = (title, price) => {
    let cartRow = document.createElement('div')
     cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('product-title')
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText === title){
            alert("This item was already added to cart")
            
        }
        return
    }
    let cartRowContents = ` 
    <div class="cart-item">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price ">${price}</span>
    <div class="cart-quantity">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger ml-5"  type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItems)
}

const removeCartItems = () => {
    const buttonClick = event.target
    buttonClick.parentElement.parentElement.remove();
    console.log(priceElement * quantityElement)
    updateCartTotal()
}

const quantityChanged = (event) => {
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    } 
    updateCartTotal()
}

const purchaseItems = () => {
    alert("Items were purchased")
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

const updateCartTotal = () => {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0; 
    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0];

        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total += price * quantity;

    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}



