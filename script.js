/* =========================================================
 * TechHive SA — app logic
 * Persistence: localStorage (frontend-only, demo)
 * Auth: plaintext password hash via simple string fn (DEMO ONLY)
 * ========================================================= */

// ---------- Storage keys ----------
const LS = {
  USERS: 'th_users',
  SESSION: 'th_session',
  CART: 'th_cart',
  COMPARE: 'th_compare',
  PRODUCTS: 'th_products',
  ORDERS: 'th_orders',
  SUBSCRIBERS: 'th_subscribers',
  THEME: 'th_theme',
  DATA_VERSION: 'th_data_version'
};

// Bump this when DEFAULT_PRODUCTS changes so existing localStorage users
// get the new catalogue without losing their accounts/orders/cart.
const DATA_VERSION = 2;

// ---------- Default seed data ----------
const DEFAULT_PRODUCTS = [
  { id: 1, name: "iPhone 15", brand: "Apple", type: "premium", artType: "phone",
    description: "The Apple iPhone 15 with advanced features, stunning design, and powerful performance.",
    price: 26999, stock: 12,
    specs: "128GB Storage, A17 Bionic chip, 6GB RAM, Advanced Camera System",
    icon: "📱", images: ["iphone_1.jpg", "iphone_2.jpg", "iphone_3.jpg"],
    features: ["Face ID", "Wireless Charging", "Water Resistant", "Night Mode Camera"] },
  { id: 2, name: "MacBook Air", brand: "Apple", type: "premium", artType: "laptop",
    description: "Ultra-lightweight Apple MacBook Air with M2 chip for professional and creative work.",
    price: 24999, stock: 8,
    specs: "M2 Chip, 8GB Unified Memory, 256GB SSD, 13.6-inch Liquid Retina Display",
    icon: "💻", images: ["macbook_1.jpg", "macbook_2.jpeg", "macbook_3.jpeg"],
    features: ["M2 Chip Performance", "All-Day Battery", "Silent Operation", "MagSafe Charging"] },
  { id: 3, name: "Apple Watch Series 9", brand: "Apple", type: "wearable", artType: "watch",
    description: "Advanced health tracking and smart features in Apple's latest smartwatch.",
    price: 8999, stock: 3,
    specs: "GPS + Cellular, Heart Rate Monitor, 40mm Case, Always-On Retina Display",
    icon: "⌚", images: ["watch_1.jpeg", "watch_2.jpeg", "watch_3.jpeg"],
    features: ["Health Monitoring", "Fitness Tracking", "Water Resistant", "ECG Capability"] },
  { id: 4, name: "Samsung Galaxy S24", brand: "Samsung", type: "premium", artType: "phone",
    description: "Samsung's 2024 flagship smartphone with AI-powered features and exceptional camera quality.",
    price: 21999, stock: 15,
    specs: "512GB Storage, 12GB RAM, Snapdragon 8 Gen 3, 200MP Camera",
    icon: "📱", images: ["galaxy_1.jpeg", "galaxy_2.jpeg", "galaxy_3.jpg"],
    features: ["AI Photography", "S Pen Support", "120Hz Display", "Ultra-Fast Charging"] },
  { id: 5, name: "Samsung Buds Pro", brand: "Samsung", type: "wearable", artType: "earbuds",
    description: "Premium wireless earbuds with active noise cancellation and superior audio quality.",
    price: 2999, stock: 0,
    specs: "Active Noise Cancelling, Bluetooth 5.3, 28-hour Battery, IPX7 Rating",
    icon: "🎧", images: ["buds_1.jpeg", "buds_2.jpeg", "buds_3.jpeg"],
    features: ["ANC Technology", "360 Audio", "Touch Controls", "Voice Assistant"] },
  { id: 6, name: "Dell XPS 15", brand: "Dell", type: "premium", artType: "laptop",
    description: "Professional-grade Dell laptop with stunning 4K display and powerful performance.",
    price: 29999, stock: 6,
    specs: "Intel i9-12900HK, 16GB RAM, 1TB SSD, RTX 3050 Ti, 15.6\" 4K OLED",
    icon: "💻", images: ["dell_1.jpeg", "dell_2.jpeg", "dell_3.jpeg"],
    features: ["4K OLED Display", "Professional Graphics", "Premium Build", "Long Battery Life"] },
  { id: 7, name: "HP Pavilion Gaming", brand: "HP", type: "gaming", artType: "gaming",
    description: "Affordable gaming desktop with solid performance for modern games.",
    price: 18999, stock: 4,
    specs: "RTX 3060, Intel i5-12400F, 16GB DDR4 RAM, 512GB NVMe SSD",
    icon: "🎮", images: ["hp_1.jpeg", "hp_2.jpeg", "hp_3.jpg"],
    features: ["Gaming Ready", "RGB Lighting", "VR Compatible", "Upgrade Friendly"] },
  { id: 8, name: "ASUS ROG Zephyrus", brand: "ASUS", type: "gaming", artType: "gaming",
    description: "High-end gaming laptop with cutting-edge performance and premium design.",
    price: 34999, stock: 2,
    specs: "RTX 4070, AMD Ryzen 9, 32GB RAM, 1TB SSD, 15.6\" QHD 165Hz",
    icon: "🎮", images: ["asus_1.jpeg", "asus_2.jpeg", "asus_3.jpg"],
    features: ["High Refresh Display", "Advanced Cooling", "RGB Keyboard", "Premium Audio"] },
  { id: 9, name: "Lenovo ThinkPad X1", brand: "Lenovo", type: "premium", artType: "laptop",
    description: "Business-class laptop with enterprise-grade security and reliability.",
    price: 27999, stock: 10,
    specs: "Intel i7-12700U, 16GB RAM, 512GB SSD, 14\" 2.8K OLED, ThinkShield",
    icon: "💻", images: ["lenovo_1.jpeg", "lenovo_2.jpeg", "lenovo_3.jpeg"],
    features: ["Business Grade", "Enhanced Security", "Durable Design", "Excellent Keyboard"] },

  // === New 2025/2026 releases ===
  { id: 10, name: "iPhone 17", brand: "Apple", type: "premium", artType: "phone",
    description: "Apple's September 2025 flagship. Center Stage front camera, 6.3\" ProMotion display with 120Hz, and the A19 chip for faster everything.",
    price: 21999, stock: 18, badge: "NEW",
    specs: "256GB Storage, A19 chip, 8GB RAM, 48MP Dual Fusion Camera, 6.3\" ProMotion OLED",
    icon: "📱", images: ["iphone17_1.jpg", "iphone17_2.jpg", "iphone17_3.jpg"],
    features: ["Center Stage Camera", "ProMotion 120Hz", "Ceramic Shield 2", "Always-On Display"] },
  { id: 11, name: "Samsung Galaxy S26 Ultra", brand: "Samsung", type: "premium", artType: "phone",
    description: "Samsung's March 2026 flagship. Snapdragon 8 Elite Gen 5 on a 2nm process, Privacy Display, and the new ALoP 5x telephoto camera.",
    price: 28499, stock: 7, badge: "NEW",
    specs: "256GB Storage, 12GB RAM, Snapdragon 8 Elite Gen 5, 6.9\" AMOLED 2X, 5000mAh battery",
    icon: "📱", images: ["s26ultra_1.jpg", "s26ultra_2.jpg", "s26ultra_3.jpg"],
    features: ["Privacy Display", "Galaxy AI 2.0", "S Pen Included", "ALoP 5x Telephoto"] },
  { id: 12, name: "MacBook Pro M5", brand: "Apple", type: "premium", artType: "laptop",
    description: "Apple's October 2025 refresh of the 14-inch MacBook Pro. New M5 chip delivers up to 45% faster GPU and 4x faster AI performance vs M4.",
    price: 32999, stock: 5, badge: "NEW",
    specs: "M5 chip (10-core CPU / 10-core GPU), 16GB Unified Memory, 512GB SSD, 14.2\" Liquid Retina XDR",
    icon: "💻", images: ["mbp_m5_1.jpg", "mbp_m5_2.jpg", "mbp_m5_3.jpg"],
    features: ["45% Faster GPU", "Neural Accelerator per Core", "Up to 24hr Battery", "Space Black / Silver"] },
  { id: 13, name: "ASUS ZenBook 14 OLED", brand: "ASUS", type: "premium", artType: "laptop",
    description: "Sleek ultrabook with a 14\" 2.8K OLED touchscreen and all-day battery. Ideal for creators who want premium build in a lightweight chassis.",
    price: 23499, stock: 9,
    specs: "Intel Core Ultra 9, 32GB LPDDR5X, 1TB SSD, 14\" 2.8K OLED Touch, Wi-Fi 7",
    icon: "💻", images: ["zenbook_1.jpg", "zenbook_2.jpg", "zenbook_3.jpg"],
    features: ["2.8K OLED Touchscreen", "Under 1.3kg", "18hr Battery Life", "Military-Grade Durability"] },
  { id: 14, name: "Samsung Galaxy Book5 Pro", brand: "Samsung", type: "premium", artType: "laptop",
    description: "Samsung's premium Copilot+ laptop with Dynamic AMOLED 2X display and deep integration with Galaxy phones and tablets.",
    price: 26999, stock: 6,
    specs: "Intel Core Ultra 7 (Series 2), 16GB LPDDR5X, 512GB SSD, 16\" Dynamic AMOLED 2X, NPU",
    icon: "💻", images: ["gbookpro_1.jpg", "gbookpro_2.jpg", "gbookpro_3.jpg"],
    features: ["Copilot+ PC", "Galaxy Ecosystem Sync", "AMOLED 2X 120Hz", "Ultra-Thin Design"] }
];

// Seeded admin so you can log in immediately
const SEED_ADMIN = {
  id: 'u_admin',
  name: 'Admin',
  email: 'admin@techhive.co.za',
  // DEMO: this is a hashed form of "admin123" via our toy hash below.
  // Replaced at init time; see ensureSeedAdmin().
  passwordHash: '',
  role: 'admin',
  createdAt: Date.now()
};

// ---------- Tiny helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const read = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const money = n => 'R' + Math.round(n).toLocaleString();

// DEMO-ONLY password hash — NOT cryptographically secure.
// A real app must use server-side bcrypt/argon2. This just prevents
// storing passwords as obvious plaintext in localStorage.
function toyHash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return 'h_' + h.toString(16);
}

// ---------- State (all from localStorage) ----------
// Check data version — if stale, refresh products to new catalogue
// (but keep users, orders, cart intact)
const storedVersion = read(LS.DATA_VERSION, 0);
let products;
if (storedVersion < DATA_VERSION) {
  products = DEFAULT_PRODUCTS.slice();
  write(LS.PRODUCTS, products);
  write(LS.DATA_VERSION, DATA_VERSION);
} else {
  products = read(LS.PRODUCTS, null) || DEFAULT_PRODUCTS.slice();
}
let users = read(LS.USERS, []);
let session = read(LS.SESSION, null); // { userId, role, name, email }
let cart = read(LS.CART, []); // [{productId, qty}]
let compare = read(LS.COMPARE, []); // [productId]
let orders = read(LS.ORDERS, []);
let subscribers = read(LS.SUBSCRIBERS, []);
let currentImageIndex = 0;
let currentProduct = null;
let checkoutState = { step: 1, shipping: null, payment: null };

// DOM refs populated on DOMContentLoaded
let productGrid, brandFilter, typeFilter, searchInput;

// ---------- Init ----------
function ensureSeedAdmin() {
  if (!users.some(u => u.role === 'admin')) {
    users.push({ ...SEED_ADMIN, passwordHash: toyHash('admin123') });
    write(LS.USERS, users);
  }
}

function persistAll() {
  write(LS.PRODUCTS, products);
  write(LS.USERS, users);
  write(LS.SESSION, session);
  write(LS.CART, cart);
  write(LS.COMPARE, compare);
  write(LS.ORDERS, orders);
  write(LS.SUBSCRIBERS, subscribers);
}

// =========================================================
// AUTH
// =========================================================
function isLoggedIn() { return !!session; }
function isAdmin() { return session && session.role === 'admin'; }
function currentUser() { return session ? users.find(u => u.id === session.userId) : null; }

function login(email, password) {
  const u = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!u) return { ok: false, msg: 'No account found with that email.' };
  if (u.passwordHash !== toyHash(password)) return { ok: false, msg: 'Incorrect password.' };
  session = { userId: u.id, role: u.role, name: u.name, email: u.email };
  write(LS.SESSION, session);
  renderAuthUI();
  return { ok: true };
}

function signup(name, email, password) {
  if (!name || !email || !password) return { ok: false, msg: 'All fields are required.' };
  if (password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
    return { ok: false, msg: 'An account with that email already exists.' };

  const newUser = {
    id: 'u_' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    passwordHash: toyHash(password),
    role: 'customer',
    createdAt: Date.now()
  };
  users.push(newUser);
  session = { userId: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email };
  write(LS.USERS, users);
  write(LS.SESSION, session);
  renderAuthUI();
  return { ok: true };
}

function logout() {
  session = null;
  write(LS.SESSION, null);
  // clear guest cart too? No — keep cart separate per session; we'll clear cart here
  // so the next user doesn't see previous cart. Simple & safe for a demo.
  cart = [];
  write(LS.CART, cart);
  updateCartCount();
  renderAuthUI();
  switchPage('home');
  showNotification('Logged out.', 'info');
}

function renderAuthUI() {
  const authBtns = $('#auth-buttons');
  const userMenu = $('#user-menu');
  const adminNav = $('#admin-nav');
  const ordersNav = $('#orders-nav');

  if (isLoggedIn()) {
    authBtns.style.display = 'none';
    userMenu.style.display = 'flex';
    $('#user-greeting').textContent = `Hi, ${session.name}`;
    ordersNav.style.display = '';
    adminNav.style.display = isAdmin() ? '' : 'none';
  } else {
    authBtns.style.display = 'flex';
    userMenu.style.display = 'none';
    ordersNav.style.display = 'none';
    adminNav.style.display = 'none';
  }
}

function openAuthModal(tab = 'login') {
  $('#authModal').classList.add('show');
  switchAuthTab(tab);
}
function closeAuthModal() { $('#authModal').classList.remove('show'); }
function switchAuthTab(tab) {
  $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.authTab === tab));
  $$('.auth-panel').forEach(p => p.classList.toggle('active', p.id === `auth-panel-${tab}`));
}

// =========================================================
// PRODUCTS
// =========================================================
function getStockBadge(product) {
  if (product.stock === 0) return '<span class="stock-badge out">Out of Stock</span>';
  if (product.stock <= 5) return `<span class="stock-badge low">Low Stock · ${product.stock} left</span>`;
  return '<span class="stock-badge ok">In Stock</span>';
}

function renderProducts(brand = 'all', type = 'all', search = '') {
  if (!productGrid) return;
  productGrid.style.opacity = '0';

  setTimeout(() => {
    productGrid.innerHTML = '';
    const filtered = products.filter(p => {
      const s = search.toLowerCase();
      return (brand === 'all' || p.brand === brand)
          && (type === 'all' || p.type === type)
          && (s === '' || p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    });

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
          <h3>No products found</h3>
          <p style="color: var(--text-secondary);">Try adjusting your filters or search terms.</p>
        </div>`;
    } else {
      filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        const outOfStock = product.stock === 0;
        const newBadge = product.badge === 'NEW' ? '<span class="new-badge">NEW</span>' : '';
        card.innerHTML = `
          ${newBadge}
          <div class="product-art">${getProductSVG(product)}</div>
          <div class="product-icon-small">${product.icon}</div>
          ${getStockBadge(product)}
          <h3 class="product-title">${product.name}</h3>
          <p class="product-brand">${product.brand} | ${product.type}</p>
          <p class="product-price">${money(product.price)}</p>
          <div class="product-actions">
            <button class="btn-cart" onclick="addToCart(${product.id})" title="Add to Cart" ${outOfStock ? 'disabled' : ''}>
              🛒 ${outOfStock ? 'Unavailable' : 'Add to Cart'}
            </button>
            <button class="btn-quick" onclick="quickView(${product.id})" title="Quick View">
              👁️ Quick View
            </button>
            <button class="btn-compare" onclick="addToCompare(${product.id})" title="Compare">
              ⚖️ Compare
            </button>
          </div>`;
        productGrid.appendChild(card);
      });
    }
    productGrid.style.opacity = '1';
  }, 150);
}

// =========================================================
// CART (guest-blocked)
// =========================================================
function addToCart(productId) {
  if (!isLoggedIn()) {
    showNotification('Please login to start shopping! 🔒', 'warning');
    openAuthModal('login');
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;
  if (product.stock === 0) {
    showNotification('Sorry, this item is out of stock.', 'warning');
    return;
  }
  const existing = cart.find(ci => ci.productId === productId);
  const alreadyInCart = existing ? existing.qty : 0;
  if (alreadyInCart + 1 > product.stock) {
    showNotification(`Only ${product.stock} left in stock.`, 'warning');
    return;
  }
  if (existing) existing.qty += 1;
  else cart.push({ productId, qty: 1 });
  write(LS.CART, cart);
  updateCartCount();
  showNotification('Added to cart!', 'success');
  animateCartBadge();
  updateAdminStats();
}

function removeFromCart(productId) {
  cart = cart.filter(ci => ci.productId !== productId);
  write(LS.CART, cart);
  updateCartCount();
  renderCartPage();
  showNotification('Removed from cart!', 'info');
  updateAdminStats();
}

function updateCartQty(productId, qty) {
  const item = cart.find(ci => ci.productId === productId);
  if (!item) return;
  const product = products.find(p => p.id === productId);
  const newQty = Math.max(1, Math.min(qty, product.stock));
  item.qty = newQty;
  write(LS.CART, cart);
  updateCartCount();
  renderCartPage();
}

function cartTotal() {
  return cart.reduce((sum, ci) => {
    const p = products.find(p => p.id === ci.productId);
    return sum + (p ? p.price * ci.qty : 0);
  }, 0);
}
function cartItemCount() { return cart.reduce((n, ci) => n + ci.qty, 0); }

function updateCartCount() { $('#cart-count').innerText = cartItemCount(); }

function animateCartBadge() {
  const badge = $('#cart-count');
  badge.style.transform = 'scale(1.5)';
  badge.style.background = '#10b981';
  setTimeout(() => {
    badge.style.transform = 'scale(1)';
    badge.style.background = '';
  }, 300);
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    write(LS.CART, cart);
    updateCartCount();
    renderCartPage();
    showNotification('Cart cleared!', 'info');
    updateAdminStats();
  }
}

function renderCartPage() {
  const container = $('#cart-container');
  if (!container) return;

  if (!isLoggedIn()) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem;">
        <div style="font-size:4rem; margin-bottom:1rem;">🔒</div>
        <h3>Please login to view your cart</h3>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Your cart is saved to your account.</p>
        <button class="btn btn-primary" onclick="openAuthModal('login')">Login</button>
        <button class="btn btn-secondary" onclick="openAuthModal('signup')" style="margin-left:0.5rem;">Sign Up</button>
      </div>`;
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem;">
        <div style="font-size:4rem; margin-bottom:1rem;">🛒</div>
        <h3>Your cart is empty</h3>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Add some amazing products to get started!</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Continue Shopping</button>
      </div>`;
    return;
  }

  const total = cartTotal();
  const vat = total * 0.15 / 1.15; // VAT-inclusive price
  const subtotal = total - vat;

  container.innerHTML = `
    <div class="cart-items">
      ${cart.map(ci => {
        const p = products.find(p => p.id === ci.productId);
        if (!p) return '';
        return `
          <div class="cart-item">
            <div class="cart-item-icon">${p.icon}</div>
            <div class="cart-item-details">
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-brand">${p.brand} | ${p.type}</div>
              <div class="cart-item-price">${money(p.price)} each</div>
              <div class="qty-control">
                <button onclick="updateCartQty(${p.id}, ${ci.qty - 1})" ${ci.qty <= 1 ? 'disabled' : ''}>−</button>
                <span>${ci.qty}</span>
                <button onclick="updateCartQty(${p.id}, ${ci.qty + 1})" ${ci.qty >= p.stock ? 'disabled' : ''}>+</button>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:600; margin-bottom:0.5rem;">${money(p.price * ci.qty)}</div>
              <button class="remove-btn" onclick="removeFromCart(${p.id})">Remove</button>
            </div>
          </div>`;
      }).join('')}
    </div>
    <div style="border-top:1px solid var(--border-color); padding-top:2rem; margin-top:2rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
        <span>Subtotal (excl. VAT):</span>
        <span>${money(subtotal)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
        <span>VAT (15%):</span>
        <span>${money(vat)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:1.2rem; font-weight:700; border-top:1px solid var(--border-color); padding-top:1rem;">
        <span>Total:</span>
        <span style="color:var(--primary-color);">${money(total)}</span>
      </div>
      <div style="margin-top:2rem; display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn btn-primary" style="flex:1; min-width:200px;" onclick="startCheckout()">Proceed to Checkout</button>
        <button class="btn btn-secondary" onclick="clearCart()">Clear Cart</button>
      </div>
    </div>`;
}

// =========================================================
// COMPARE (guest-blocked for adding, open to view)
// =========================================================
function addToCompare(productId) {
  if (!isLoggedIn()) {
    showNotification('Please login to compare products.', 'warning');
    openAuthModal('login');
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;
  if (compare.includes(productId)) {
    showNotification('Product already in comparison!', 'warning');
    return;
  }
  if (compare.length >= 3) {
    showNotification('Maximum 3 products can be compared!', 'warning');
    return;
  }
  compare.push(productId);
  write(LS.COMPARE, compare);
  showNotification('Added to comparison!', 'success');
  updateCompareCount();
  updateAdminStats();
}

function removeFromCompare(productId) {
  compare = compare.filter(id => id !== productId);
  write(LS.COMPARE, compare);
  renderComparePage();
  showNotification('Removed from comparison!', 'info');
  updateCompareCount();
  updateAdminStats();
}

function updateCompareCount() {
  const link = $('[data-page="compare"]');
  if (!link) return;
  const base = 'Compare';
  link.innerHTML = `${base} ${compare.length > 0 ? `<span class="cart-badge">${compare.length}</span>` : ''}`;
}

function renderComparePage() {
  const container = $('#compare-container');
  if (!container) return;

  if (compare.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem;">
        <div style="font-size:4rem; margin-bottom:1rem;">⚖️</div>
        <h3>No products to compare</h3>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Add products to compare their features side by side!</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Browse Products</button>
      </div>`;
    return;
  }

  const compareProducts = compare.map(id => products.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <div style="margin-bottom:2rem;">
      <h3>Comparing ${compareProducts.length} Product${compareProducts.length > 1 ? 's' : ''}</h3>
    </div>
    <div style="overflow-x:auto;">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Product</th>
            ${compareProducts.map(p => `
              <th style="text-align:center; min-width:200px;">
                <div style="font-size:2rem;">${p.icon}</div>
                <div style="margin-top:0.5rem;">${p.name}</div>
                <button class="remove-btn" style="margin-top:1rem; font-size:0.7rem;" onclick="removeFromCompare(${p.id})">Remove</button>
              </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Brand</strong></td>${compareProducts.map(p => `<td>${p.brand}</td>`).join('')}</tr>
          <tr><td><strong>Type</strong></td>${compareProducts.map(p => `<td style="text-transform:capitalize;">${p.type}</td>`).join('')}</tr>
          <tr><td><strong>Price</strong></td>${compareProducts.map(p => `<td style="color:var(--primary-color); font-weight:600;">${money(p.price)}</td>`).join('')}</tr>
          <tr><td><strong>Stock</strong></td>${compareProducts.map(p => `<td>${getStockBadge(p)}</td>`).join('')}</tr>
          <tr><td><strong>Description</strong></td>${compareProducts.map(p => `<td>${p.description}</td>`).join('')}</tr>
          <tr><td><strong>Specifications</strong></td>${compareProducts.map(p => `<td>${p.specs}</td>`).join('')}</tr>
          <tr><td><strong>Key Features</strong></td>
            ${compareProducts.map(p => `
              <td><ul style="list-style:none; padding:0;">
                ${p.features.map(f => `<li style="margin-bottom:0.5rem;">✓ ${f}</li>`).join('')}
              </ul></td>`).join('')}
          </tr>
          <tr><td><strong>Actions</strong></td>
            ${compareProducts.map(p => `
              <td>
                <button class="btn-cart" style="width:100%; margin-bottom:0.5rem;" onclick="addToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
                  ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="btn-quick" style="width:100%;" onclick="quickView(${p.id})">Quick View</button>
              </td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>`;
}

// =========================================================
// QUICK VIEW
// =========================================================
function quickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  currentProduct = product;
  currentImageIndex = 0;
  const content = $('#quickViewContent');
  content.innerHTML = `
    <div class="quick-view-content">
      <div class="quick-view-images">
        <div class="qv-art">${getProductSVG(product)}</div>
      </div>
      <div class="quick-view-info">
        <h2>${product.name}</h2>
        <p class="quick-view-brand">${product.brand}</p>
        <p class="quick-view-price">${money(product.price)}</p>
        ${getStockBadge(product)}
        <p class="quick-view-description" style="margin-top:1rem;">${product.description}</p>
        <div class="quick-view-specs">
          <h4>Specifications:</h4>
          <p>${product.specs}</p>
        </div>
        <div class="quick-view-features">
          <h4>Key Features:</h4>
          <ul style="list-style:none; padding-left:0;">
            ${product.features.map(f => `<li style="margin-bottom:0.5rem; color:var(--text-secondary);">✓ ${f}</li>`).join('')}
          </ul>
        </div>
        <div class="quick-view-actions">
          <button class="btn-cart" onclick="addToCart(${product.id}); closeModal();" ${product.stock === 0 ? 'disabled' : ''}>
            🛒 ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button class="btn-compare" onclick="addToCompare(${product.id}); closeModal();">⚖️ Add to Compare</button>
        </div>
      </div>
    </div>`;
  $('#quickViewModal').classList.add('show');
}

function changeQuickImage(direction) {
  // SVG art is single-view now; function kept for backward compat
  return;
}

function closeModal() {
  $('#quickViewModal').classList.remove('show');
  currentProduct = null;
}

// =========================================================
// CHECKOUT (multi-step, mock)
// =========================================================
function startCheckout() {
  if (!isLoggedIn()) {
    showNotification('Please login to checkout.', 'warning');
    openAuthModal('login');
    return;
  }
  if (cart.length === 0) {
    showNotification('Your cart is empty.', 'warning');
    return;
  }
  checkoutState = { step: 1, shipping: null, payment: null };
  switchPage('checkout');
}

function renderCheckout() {
  const content = $('#checkout-content');
  if (!content) return;

  // Update step indicators
  $$('.checkout-step').forEach(el => {
    const s = parseInt(el.dataset.step, 10);
    el.classList.toggle('active', s === checkoutState.step);
    el.classList.toggle('complete', s < checkoutState.step);
  });

  if (checkoutState.step === 1) {
    // Shipping
    const u = currentUser();
    content.innerHTML = `
      <div class="checkout-card">
        <h3>Shipping Address</h3>
        <form id="shippingForm" class="checkout-form">
          <input type="text" name="fullName" placeholder="Full name" required value="${u ? u.name : ''}">
          <input type="text" name="address1" placeholder="Street address" required>
          <input type="text" name="address2" placeholder="Apartment / unit (optional)">
          <div class="two-col">
            <input type="text" name="city" placeholder="City" required value="Cape Town">
            <input type="text" name="province" placeholder="Province" required value="Western Cape">
          </div>
          <div class="two-col">
            <input type="text" name="postal" placeholder="Postal code" required pattern="[0-9]{4}" maxlength="4">
            <input type="tel" name="phone" placeholder="Phone (e.g. 021 123 4567)" required>
          </div>
          <div class="checkout-nav">
            <button type="button" class="btn btn-secondary" onclick="switchPage('cart')">← Back to Cart</button>
            <button type="submit" class="btn btn-primary">Continue to Payment →</button>
          </div>
        </form>
      </div>
      ${renderOrderSummary()}`;
    $('#shippingForm').addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(e.target);
      checkoutState.shipping = Object.fromEntries(f);
      checkoutState.step = 2;
      renderCheckout();
    });
  } else if (checkoutState.step === 2) {
    // Payment (mock)
    content.innerHTML = `
      <div class="checkout-card">
        <h3>Payment Details</h3>
        <div class="demo-note">🧪 This is a simulated payment. Any 16-digit card number will work. No real charges.</div>
        <form id="paymentForm" class="checkout-form">
          <input type="text" name="cardName" placeholder="Name on card" required>
          <input type="text" name="cardNumber" placeholder="Card number (16 digits)" required
                 pattern="[0-9\\s]{13,19}" inputmode="numeric" maxlength="19" oninput="formatCardNumber(this)">
          <div class="two-col">
            <input type="text" name="expiry" placeholder="MM/YY" required pattern="[0-9]{2}/[0-9]{2}" maxlength="5" oninput="formatExpiry(this)">
            <input type="text" name="cvv" placeholder="CVV" required pattern="[0-9]{3,4}" maxlength="4" inputmode="numeric">
          </div>
          <div class="checkout-nav">
            <button type="button" class="btn btn-secondary" onclick="checkoutState.step=1; renderCheckout();">← Back</button>
            <button type="submit" class="btn btn-primary">Review Order →</button>
          </div>
        </form>
      </div>
      ${renderOrderSummary()}`;
    $('#paymentForm').addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(e.target);
      const data = Object.fromEntries(f);
      const digits = data.cardNumber.replace(/\s/g, '');
      if (digits.length !== 16) {
        showNotification('Card number must be 16 digits.', 'warning');
        return;
      }
      // Only keep last 4 for display — never store full card, even in a demo
      checkoutState.payment = {
        cardName: data.cardName,
        last4: digits.slice(-4),
        expiry: data.expiry
      };
      checkoutState.step = 3;
      renderCheckout();
    });
  } else if (checkoutState.step === 3) {
    // Review & confirm
    const s = checkoutState.shipping;
    const p = checkoutState.payment;
    content.innerHTML = `
      <div class="checkout-card">
        <h3>Review Your Order</h3>
        <div class="review-section">
          <h4>Shipping to</h4>
          <p>${s.fullName}<br>${s.address1}${s.address2 ? ', ' + s.address2 : ''}<br>
             ${s.city}, ${s.province} ${s.postal}<br>${s.phone}</p>
        </div>
        <div class="review-section">
          <h4>Payment</h4>
          <p>${p.cardName} · Card ending in ${p.last4} · Exp ${p.expiry}</p>
          <p class="demo-note-inline">🧪 Simulated — no real transaction</p>
        </div>
        <div class="checkout-nav">
          <button type="button" class="btn btn-secondary" onclick="checkoutState.step=2; renderCheckout();">← Back</button>
          <button type="button" class="btn btn-primary" id="placeOrderBtn" onclick="placeOrder()">Place Order</button>
        </div>
      </div>
      ${renderOrderSummary()}`;
  } else if (checkoutState.step === 4) {
    // Success
    const order = checkoutState.placedOrder;
    content.innerHTML = `
      <div class="checkout-card success-card">
        <div class="success-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you, ${order.customerName}! Your order has been placed successfully.</p>
        <div class="order-confirm-details">
          <div><strong>Order #:</strong> ${order.id}</div>
          <div><strong>Total:</strong> ${money(order.total)}</div>
          <div><strong>Status:</strong> ${order.status}</div>
        </div>
        <p class="email-mock">📧 A confirmation email would be sent to <strong>${order.customerEmail}</strong> in a real deployment.</p>
        <div style="display:flex; gap:1rem; justify-content:center; margin-top:2rem; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="switchPage('orders')">View My Orders</button>
          <button class="btn btn-secondary" onclick="switchPage('home')">Continue Shopping</button>
        </div>
      </div>`;
  }
}

function renderOrderSummary() {
  const total = cartTotal();
  return `
    <div class="order-summary">
      <h3>Order Summary</h3>
      ${cart.map(ci => {
        const p = products.find(p => p.id === ci.productId);
        if (!p) return '';
        return `<div class="os-row">
          <span>${p.icon} ${p.name} × ${ci.qty}</span>
          <span>${money(p.price * ci.qty)}</span>
        </div>`;
      }).join('')}
      <div class="os-row os-total">
        <span>Total</span>
        <span>${money(total)}</span>
      </div>
    </div>`;
}

function formatCardNumber(input) {
  const digits = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = digits.replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
  input.value = v;
}

function placeOrder() {
  const btn = $('#placeOrderBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Processing…'; }

  // Show processing state
  showLoading('Processing your payment…');

  setTimeout(() => {
    hideLoading();
    // 95% success rate in demo; tiny chance of "failure" so the UI can show both states
    const fail = Math.random() < 0.05;
    if (fail) {
      showNotification('⚠️ Payment failed (simulated). Please try again.', 'warning');
      if (btn) { btn.disabled = false; btn.textContent = 'Place Order'; }
      return;
    }

    // Create order
    const total = cartTotal();
    const orderItems = cart.map(ci => {
      const p = products.find(p => p.id === ci.productId);
      return {
        productId: p.id, name: p.name, icon: p.icon,
        price: p.price, qty: ci.qty
      };
    });

    // Decrement stock
    cart.forEach(ci => {
      const p = products.find(p => p.id === ci.productId);
      if (p) p.stock = Math.max(0, p.stock - ci.qty);
    });
    write(LS.PRODUCTS, products);

    const order = {
      id: 'TH-' + Date.now().toString(36).toUpperCase(),
      userId: session.userId,
      customerName: session.name,
      customerEmail: session.email,
      shipping: checkoutState.shipping,
      payment: checkoutState.payment, // last4 only
      items: orderItems,
      total,
      status: 'Pending',
      createdAt: Date.now()
    };
    orders.push(order);
    write(LS.ORDERS, orders);

    // Clear cart
    cart = [];
    write(LS.CART, cart);
    updateCartCount();

    checkoutState.placedOrder = order;
    checkoutState.step = 4;
    renderCheckout();
    updateAdminStats();
    renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
  }, 2000);
}

// =========================================================
// ORDERS (user view)
// =========================================================
function renderOrdersPage() {
  const container = $('#orders-container');
  if (!container) return;
  if (!isLoggedIn()) {
    container.innerHTML = `<p>Please login to view your orders.</p>`;
    return;
  }
  const myOrders = orders.filter(o => o.userId === session.userId).sort((a, b) => b.createdAt - a.createdAt);
  if (myOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem;">
        <div style="font-size:4rem; margin-bottom:1rem;">📦</div>
        <h3>No orders yet</h3>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">When you place an order it'll show up here.</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Start Shopping</button>
      </div>`;
    return;
  }
  container.innerHTML = myOrders.map(o => `
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <div class="order-id">Order ${o.id}</div>
          <div class="order-date">${new Date(o.createdAt).toLocaleString('en-ZA')}</div>
        </div>
        <div>
          <span class="status-badge status-${o.status.toLowerCase()}">${o.status}</span>
        </div>
      </div>
      <div class="order-items">
        ${o.items.map(it => `
          <div class="order-item-row">
            <span>${it.icon} ${it.name} × ${it.qty}</span>
            <span>${money(it.price * it.qty)}</span>
          </div>`).join('')}
      </div>
      <div class="order-footer">
        <span>Total: <strong>${money(o.total)}</strong></span>
        <span>Payment: Card ending ${o.payment.last4}</span>
      </div>
    </div>`).join('');
}

// =========================================================
// ADMIN
// =========================================================
function renderAdminProducts() {
  const list = $('#admin-product-list');
  if (!list) return;
  if (products.length === 0) {
    list.innerHTML = `<p style="color:var(--text-secondary);">No products yet.</p>`;
    return;
  }
  list.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Product</th><th>Brand</th><th>Type</th><th>Price</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td>${p.icon} ${p.name}</td>
              <td>${p.brand}</td>
              <td style="text-transform:capitalize;">${p.type}</td>
              <td>${money(p.price)}</td>
              <td>
                <input type="number" min="0" class="stock-input" value="${p.stock}" onchange="adminUpdateStock(${p.id}, this.value)">
                ${getStockBadge(p)}
              </td>
              <td>
                <button class="btn-small" onclick="adminEditProduct(${p.id})">✏️ Edit</button>
                <button class="btn-small btn-danger" onclick="adminDeleteProduct(${p.id})">🗑️ Delete</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function adminUpdateStock(id, value) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  p.stock = Math.max(0, parseInt(value, 10) || 0);
  write(LS.PRODUCTS, products);
  renderAdminProducts();
  renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
  updateAdminStats();
  showNotification(`Stock for ${p.name} updated to ${p.stock}.`, 'success');
}

function adminEditProduct(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  $('#editId').value = p.id;
  $('#admin-name').value = p.name;
  $('#admin-brand').value = p.brand;
  $('#admin-type').value = p.type;
  $('#admin-description').value = p.description;
  $('#admin-price').value = p.price;
  $('#admin-stock').value = p.stock;
  $('#admin-specs').value = p.specs;
  $('#admin-icon').value = p.icon;
  $('#admin-form-title').textContent = `Edit: ${p.name}`;
  $('#admin-submit-btn').textContent = 'Save Changes';
  $('#admin-cancel-btn').style.display = '';
  $('#admin-form').scrollIntoView({ behavior: 'smooth' });
}

function adminCancelEdit() {
  $('#admin-form').reset();
  $('#editId').value = '';
  $('#admin-form-title').textContent = 'Add New Product';
  $('#admin-submit-btn').textContent = 'Add Product';
  $('#admin-cancel-btn').style.display = 'none';
  $('#admin-stock').value = 10;
}

function adminDeleteProduct(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
  products = products.filter(pp => pp.id !== id);
  cart = cart.filter(ci => ci.productId !== id);
  compare = compare.filter(cid => cid !== id);
  write(LS.PRODUCTS, products);
  write(LS.CART, cart);
  write(LS.COMPARE, compare);
  updateCartCount();
  updateCompareCount();
  renderAdminProducts();
  renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
  updateAdminStats();
  showNotification(`Deleted ${p.name}.`, 'info');
}

function renderAdminOrders() {
  const list = $('#admin-orders-list');
  if (!list) return;
  if (orders.length === 0) {
    list.innerHTML = `<p style="color:var(--text-secondary);">No orders yet.</p>`;
    return;
  }
  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt);
  list.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map(o => `
            <tr>
              <td><code>${o.id}</code></td>
              <td>${o.customerName}<br><small>${o.customerEmail}</small></td>
              <td>${new Date(o.createdAt).toLocaleDateString('en-ZA')}</td>
              <td>${o.items.reduce((n, it) => n + it.qty, 0)} items</td>
              <td>${money(o.total)}</td>
              <td>
                <select class="status-select status-${o.status.toLowerCase()}" onchange="adminUpdateOrderStatus('${o.id}', this.value)">
                  ${['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(s =>
                    `<option value="${s}" ${o.status === s ? 'selected' : ''}>${s}</option>`
                  ).join('')}
                </select>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function adminUpdateOrderStatus(orderId, newStatus) {
  const o = orders.find(o => o.id === orderId);
  if (!o) return;
  o.status = newStatus;
  write(LS.ORDERS, orders);
  renderAdminOrders();
  showNotification(`Order ${o.id} marked as ${newStatus}.`, 'success');
}

function switchAdminTab(tab) {
  $$('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $$('.admin-tab-content').forEach(c => c.classList.toggle('active', c.id === `admin-tab-${tab}`));
  if (tab === 'products') renderAdminProducts();
  if (tab === 'orders') renderAdminOrders();
  if (tab === 'analytics') { updateAdminStats(); renderTopSellers(); }
}

function renderTopSellers() {
  const el = $('#top-sellers');
  if (!el) return;
  // Tally qty across all orders
  const tally = {};
  orders.forEach(o => o.items.forEach(it => {
    tally[it.productId] = (tally[it.productId] || 0) + it.qty;
  }));
  const entries = Object.entries(tally)
    .map(([pid, qty]) => ({ product: products.find(p => p.id === parseInt(pid, 10)), qty }))
    .filter(e => e.product)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  if (entries.length === 0) {
    el.innerHTML = `<p style="color:var(--text-secondary);">No sales data yet. Place a demo order to see analytics.</p>`;
    return;
  }
  el.innerHTML = entries.map((e, i) => `
    <div class="top-seller-row">
      <div class="rank">#${i + 1}</div>
      <div class="ts-icon">${e.product.icon}</div>
      <div class="ts-name">${e.product.name}<br><small>${e.product.brand}</small></div>
      <div class="ts-qty"><strong>${e.qty}</strong> sold</div>
      <div class="ts-revenue">${money(e.product.price * e.qty)}</div>
    </div>`).join('');
}

function updateAdminStats() {
  const totalProductsEl = $('#total-products');
  const totalStockEl = $('#total-stock');
  const totalOrdersEl = $('#total-orders');
  const totalRevenueEl = $('#total-revenue');
  const totalUsersEl = $('#total-users');
  const subCountEl = $('#subscribers-count');

  if (totalProductsEl) totalProductsEl.textContent = products.length;
  if (totalStockEl) totalStockEl.textContent = products.reduce((n, p) => n + p.stock, 0);
  if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
  if (totalRevenueEl) totalRevenueEl.textContent = money(orders.reduce((n, o) => n + o.total, 0));
  if (totalUsersEl) totalUsersEl.textContent = users.filter(u => u.role !== 'admin').length;
  if (subCountEl) subCountEl.textContent = subscribers.length;
}

// =========================================================
// ABOUT
// =========================================================
function renderAboutPage() {
  const el = $('#about-page');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';
  el.innerHTML = `
    <div class="about-hero">
      <h1>About TechHive SA</h1>
      <p>South Africa's premier destination for cutting-edge technology and exceptional service</p>
    </div>
    <div class="about-content">
      <div class="about-section">
        <h2>Our Story</h2>
        <p style="font-size:1.1rem; line-height:1.8; color:var(--text-secondary); margin-bottom:2rem;">
          Founded in 2020 in the heart of Cape Town, TechHive SA emerged from a simple vision: to make premium technology accessible to every South African. What started as a small startup has grown into one of the country's most trusted electronics retailers, serving thousands of satisfied customers across all nine provinces.
        </p>
        <p style="font-size:1.1rem; line-height:1.8; color:var(--text-secondary);">
          We believe that technology should empower, inspire, and connect people. That's why we carefully curate our selection of products, ensuring that every item meets our high standards for quality, innovation, and value.
        </p>
      </div>
      <div class="about-section">
        <h2>Why Choose TechHive SA?</h2>
        <div class="about-grid">
          <div class="feature-card"><span class="feature-icon">🚚</span><h3>Fast & Free Delivery</h3><p>Free delivery on orders over R1,000. Express delivery available to major cities within 24-48 hours.</p></div>
          <div class="feature-card"><span class="feature-icon">🛡️</span><h3>Extended Warranties</h3><p>Comprehensive warranty coverage with local support. We stand behind every product we sell.</p></div>
          <div class="feature-card"><span class="feature-icon">💎</span><h3>Premium Quality</h3><p>Only authentic, brand-new products from authorized distributors. No grey imports or refurbished items.</p></div>
          <div class="feature-card"><span class="feature-icon">🎯</span><h3>Expert Advice</h3><p>Our tech specialists are here to help you find the perfect device for your needs and budget.</p></div>
          <div class="feature-card"><span class="feature-icon">💳</span><h3>Flexible Payment</h3><p>Multiple payment options including interest-free installments and corporate accounts.</p></div>
          <div class="feature-card"><span class="feature-icon">🔄</span><h3>Easy Returns</h3><p>30-day hassle-free returns and exchanges. Changed your mind? No problem!</p></div>
        </div>
      </div>
      <div class="about-section">
        <h2>Our Impact</h2>
        <div class="stats-grid">
          <div class="stat-card"><span class="stat-number">50,000+</span><span class="stat-label">Happy Customers</span></div>
          <div class="stat-card"><span class="stat-number">5,000+</span><span class="stat-label">Products Delivered</span></div>
          <div class="stat-card"><span class="stat-number">98.5%</span><span class="stat-label">Customer Satisfaction</span></div>
          <div class="stat-card"><span class="stat-number">24/7</span><span class="stat-label">Customer Support</span></div>
        </div>
      </div>
      <div class="about-section" style="text-align:center; background:linear-gradient(135deg, var(--primary-color), var(--accent-color)); color:white; padding:3rem; border-radius:16px;">
        <h2 style="color:white; margin-bottom:1rem;">Ready to Experience the Difference?</h2>
        <p style="font-size:1.1rem; margin-bottom:2rem; opacity:0.9;">Join thousands of satisfied customers who trust TechHive SA.</p>
        <button class="btn" style="background:white; color:var(--primary-color); font-weight:600;" onclick="switchPage('home')">Start Shopping Today</button>
      </div>
    </div>`;
}

// =========================================================
// UI plumbing
// =========================================================
function showNotification(message, type = 'info') {
  const n = document.createElement('div');
  n.className = 'toast';
  n.style.background = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6';
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(() => n.classList.add('toast-out'), 2700);
  setTimeout(() => n.remove(), 3000);
}

function showLoading(msg = 'Loading…') {
  $('#loading-text').textContent = msg;
  $('#loading-indicator').style.display = 'block';
}
function hideLoading() {
  $('#loading-indicator').style.display = 'none';
}

function switchPage(pageName) {
  // Gate admin
  if (pageName === 'admin' && !isAdmin()) {
    showNotification('Admin access required.', 'warning');
    return;
  }
  if (pageName === 'orders' && !isLoggedIn()) {
    showNotification('Please login to view your orders.', 'warning');
    openAuthModal('login');
    return;
  }

  $$('.page').forEach(p => p.classList.remove('current-page'));
  const target = $('#' + pageName + '-page');
  if (target) target.classList.add('current-page');
  $$('.nav-link').forEach(l => l.classList.remove('active'));
  const navLink = $(`.nav-link[data-page="${pageName}"]`);
  if (navLink) navLink.classList.add('active');

  if (pageName === 'cart') renderCartPage();
  if (pageName === 'compare') renderComparePage();
  if (pageName === 'about') renderAboutPage();
  if (pageName === 'checkout') renderCheckout();
  if (pageName === 'orders') renderOrdersPage();
  if (pageName === 'admin') {
    renderAdminProducts();
    renderAdminOrders();
    updateAdminStats();
    renderTopSellers();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function subscribeNewsletter(email) {
  if (subscribers.includes(email)) {
    showNotification('Already subscribed!', 'warning');
    return;
  }
  subscribers.push(email);
  write(LS.SUBSCRIBERS, subscribers);
  showNotification('Successfully subscribed to our newsletter!', 'success');
  updateAdminStats();
}

function scrollToProducts() {
  $('#products-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =========================================================
// BOOT
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
  // DOM refs
  productGrid = $('#productGrid');
  brandFilter = $('#brandFilter');
  typeFilter = $('#typeFilter');
  searchInput = $('#search');

  // Seed admin user if none exists
  ensureSeedAdmin();

  // Restore theme
  const savedTheme = read(LS.THEME, 'light');
  document.documentElement.dataset.theme = savedTheme;

  // Initial render
  renderProducts();
  updateCartCount();
  updateCompareCount();
  renderAuthUI();
  updateAdminStats();

  // Filters & search
  brandFilter.addEventListener('change', () => renderProducts(brandFilter.value, typeFilter.value, searchInput.value));
  typeFilter.addEventListener('change', () => renderProducts(brandFilter.value, typeFilter.value, searchInput.value));
  searchInput.addEventListener('input', () => renderProducts(brandFilter.value, typeFilter.value, searchInput.value));

  // Newsletter
  $('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    subscribeNewsletter(e.target[0].value);
    e.target.reset();
  });

  // Nav links
  document.querySelectorAll('.nav-link, .back-link, footer a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      if (link.dataset.page) switchPage(link.dataset.page);
    });
  });
  $('.logo').addEventListener('click', e => { e.preventDefault(); switchPage('home'); });

  // Theme toggle
  $('#themeToggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    write(LS.THEME, next);
  });

  // Mobile menu
  $('#mobileMenuToggle').addEventListener('click', () => $('#nav-links').classList.toggle('mobile-open'));
  document.addEventListener('click', e => {
    const menu = $('#nav-links'), tgl = $('#mobileMenuToggle');
    if (menu && tgl && !menu.contains(e.target) && !tgl.contains(e.target)) menu.classList.remove('mobile-open');
  });

  // Hero slider
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  }, 5000);

  // Admin tabs
  $$('.admin-tab').forEach(t => t.addEventListener('click', () => switchAdminTab(t.dataset.tab)));

  // Admin product form (handles both add and edit)
  $('#admin-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!isAdmin()) return;
    const f = new FormData(e.target);
    const editId = parseInt(f.get('editId'), 10);
    const data = {
      name: f.get('name').trim(),
      brand: f.get('brand').trim(),
      type: f.get('type'),
      description: f.get('description').trim(),
      price: parseInt(f.get('price'), 10),
      stock: parseInt(f.get('stock'), 10),
      specs: f.get('specs').trim(),
      icon: (f.get('icon') || '📦').trim()
    };

    if (editId) {
      const p = products.find(p => p.id === editId);
      if (p) Object.assign(p, data);
      showNotification('Product updated!', 'success');
    } else {
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      // Infer artType from category + name for new products
      const inferArtType = () => {
        const n = data.name.toLowerCase();
        if (/phone|galaxy s|iphone/.test(n)) return 'phone';
        if (/watch/.test(n)) return 'watch';
        if (/buds|earbud|airpod/.test(n)) return 'earbuds';
        if (data.type === 'gaming') return 'gaming';
        return 'laptop';
      };
      products.push({
        id: newId, ...data,
        artType: inferArtType(),
        images: [`${data.name.toLowerCase().replace(/\s/g, '')}_1.jpg`],
        features: ['Premium Quality', 'Latest Technology', 'Warranty Included']
      });
      showNotification('Product added successfully!', 'success');
    }
    write(LS.PRODUCTS, products);
    adminCancelEdit();
    renderAdminProducts();
    renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
    updateAdminStats();
  });
  $('#admin-cancel-btn').addEventListener('click', adminCancelEdit);

  // Auth buttons
  $('#loginBtn').addEventListener('click', () => openAuthModal('login'));
  $('#signupBtn').addEventListener('click', () => openAuthModal('signup'));
  $('#logoutBtn').addEventListener('click', logout);
  $$('.auth-tab').forEach(t => t.addEventListener('click', () => switchAuthTab(t.dataset.authTab)));

  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const res = login(f.get('email'), f.get('password'));
    if (res.ok) {
      showNotification(`Welcome back, ${session.name}!`, 'success');
      closeAuthModal();
      e.target.reset();
    } else {
      showNotification(res.msg, 'warning');
    }
  });

  $('#signupForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const res = signup(f.get('name'), f.get('email'), f.get('password'));
    if (res.ok) {
      showNotification(`Account created! Welcome, ${session.name}.`, 'success');
      closeAuthModal();
      e.target.reset();
    } else {
      showNotification(res.msg, 'warning');
    }
  });

  // Modal close on backdrop click
  $('#quickViewModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  $('#authModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeAuthModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeAuthModal();
      $('#nav-links').classList.remove('mobile-open');
    }
  });
});