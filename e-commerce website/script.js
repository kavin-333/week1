// ✅ Hamburger Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// ✅ Cart Sidebar
const cartSidebar = document.getElementById('cartSidebar');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('closeCart');
const cartBtns = [document.getElementById('cartBtn')];
const cartItemsContainer = document.querySelector('.cart-items');

cartBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartSidebar.classList.add('active');
      overlay.classList.add('active');
    });
  }
});
closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});
overlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
  closeModal(loginModal);
  closeModal(checkoutModal);
});

// ✅ Add to Cart
const addToCartBtns = document.querySelectorAll('.add-to-cart');
let cart = [];

addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const product = btn.parentElement;
    const title = product.querySelector('h3').innerText;
    const price = product.querySelector('p').innerText;
    const imgSrc = product.querySelector('img').src;

    cart.push({ title, price, imgSrc });
    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>No items in cart</p>';
    return;
  }
  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.title}" style="width:50px; height:50px; object-fit:cover; margin-right:10px;">
      <div>
        <h4>${item.title}</h4>
        <p>${item.price}</p>
      </div>
    `;
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.marginBottom = '10px';
    cartItemsContainer.appendChild(div);
  });
}

/* ✅ Login Modal */
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeLogin = document.getElementById('closeLogin');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(loginModal);
});
closeLogin.addEventListener('click', () => closeModal(loginModal));

/* ✅ Login & Signup Toggle */
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

/* ✅ Checkout Modal */
const checkoutModal = document.getElementById('checkoutModal');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutSummary = document.getElementById('checkoutSummary');

checkoutBtn.addEventListener('click', () => {
  openModal(checkoutModal);
  renderCheckoutSummary();
});
closeCheckout.addEventListener('click', () => closeModal(checkoutModal));

function renderCheckoutSummary() {
  if (cart.length === 0) {
    checkoutSummary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  let html = "<h4>Order Summary</h4><ul>";
  cart.forEach(item => {
    html += `<li>${item.title} - ${item.price}</li>`;
  });
  html += "</ul>";
  checkoutSummary.innerHTML = html;
}

/* ✅ Modal Helpers */
function openModal(modal) {
  modal.style.display = "flex";
  overlay.classList.add('active');
}
function closeModal(modal) {
  modal.style.display = "none";
}
