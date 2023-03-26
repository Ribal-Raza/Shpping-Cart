//the following if else statement is for checking wether page is loaded or not.
//if page is loading, then hold JS code until it's ready
//if it's loaded, ready to run JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}

const ready = () => {
  // Making 'Remove' in cart buttons interactive
  var cartRemoveBtns = document.getElementsByClassName("btn-danger");
  // instead of adding eventListners one by one, we can loop through buttons and add event listners
  // on them.
  for (var i = 0; i < cartRemoveBtns.length; i++) {
    var button = cartRemoveBtns[i];
    button.addEventListener("click", (event) => {
      var buttonClicked = event.target;
      //in our html, the remove button is located in a 2 divs deep in tree, so we will repeat
      //parentElement two times
      buttonClicked.parentElement.parentElement.remove();
      updateCartTotal();
    });
  }
  //following code will loop over quantity inputs and get their value, then it will check
  //if there is a negative or zero value in inputs then set it to minimum 1, other wise update
  // the cart
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", (event) => {
      var inputChange = event.target;
      if (isNaN(inputChange.value) || inputChange.value <= 0) {
        inputChange.value = 1;
      }
      updateCartTotal();
    });
  }
};

//now we will update the cart total value when we add or remove an item from cart, we will call it
//inside the eventListner of remove and add button. We will need to get the cart item(in which all
// cart rows and total price is present)
const updateCartTotal = () => {
  var cartItem = document.getElementsByClassName("cart-item")[0];
  var cartRows = cartItem.getElementsByClassName("cart-row");
  var total = 0;
  //we will loop over all cart-rows and get price and quantity of items
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    //now we have price and quantity elements, so we need to get the information out of them
    //price has $ sign with it, so we will use replace methode to replace $ sign with empty string
    //as both price and quantity will be strings, we will parse them into float/integer
    var price = parseFloat(priceElement.innerHTML.replace("$", ""));
    var quantity = parseFloat(quantityElement.innerHTML);
    total = total + price * quantity;
  }
  //we will round off the total value upto 2 decimal point, e.g. 100.92, 12.99
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price").innerHTML = "$" + total;
};
