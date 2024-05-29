document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const product = button.closest('.product');
          const productId = product.getAttribute('data-id');
          const productName = product.querySelector('h3').textContent;
          const productPrice = parseFloat(product.querySelector('p').textContent.replace('₹', ''));

          const cartItem = {
              id: productId,
              name: productName,
              price: productPrice
          };

          // Retrieve existing cart items from localStorage
          const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
          existingCartItems.push(cartItem);

          // Save updated cart items back to localStorage
          localStorage.setItem('cart', JSON.stringify(existingCartItems));

          // Optionally, provide visual feedback to the user (e.g., confirmation message)
          alert('Product added to cart!');
      });
  });
});
