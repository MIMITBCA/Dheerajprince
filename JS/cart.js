document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsElement = document.getElementById('cart-items');
  const totalAmountElement = document.getElementById('total-amount');
  const checkoutButton = document.getElementById('checkout-btn');

  // Load cart items from localStorage
  loadCart();

  // Clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  clearCartBtn.addEventListener('click', () => {
      localStorage.removeItem('cart');
      cartItems.length = 0;
      loadCart();
  });

  // Checkout button
  checkoutButton.addEventListener('click', () => {
      // Add your checkout functionality here
      const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

        // Redirect to checkout page with total amount as query parameter
        window.location.href = `checkout.html?total=${totalAmount}`;
  });

  // Load cart items into the page
  function loadCart() {
      cartItemsElement.innerHTML = '';
      let totalAmount = 0;

      cartItems.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('cart-item');
          itemElement.innerHTML = `
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>₹${item.price}</p>
              </div>
              <button class="remove-from-cart-btn">Remove</button>
          `;
          cartItemsElement.appendChild(itemElement);

          totalAmount += item.price;
      });

      totalAmountElement.textContent = totalAmount.toFixed(2);

      // Enable or disable checkout button based on cart items
      checkoutButton.disabled = cartItems.length === 0;

      // Add event listeners to remove buttons
      const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');
      removeFromCartButtons.forEach(button => {
          button.addEventListener('click', () => {
              const index = Array.from(button.parentNode.parentNode.children).indexOf(button.parentNode);
              cartItems.splice(index, 1);
              localStorage.setItem('cart', JSON.stringify(cartItems));
              loadCart();
          });
      });
  }
});
