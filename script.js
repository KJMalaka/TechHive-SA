// ==================== STATE MANAGEMENT ====================
let cart = [];
let wishlist = [];
let compare = [];
let subscribers = [];
let currentImageIndex = 0;
let currentProduct = null;
let currentUser = null;
let recentlyViewed = [];
let orders = [];
let addresses = [];
let promoCodes = {
  'TECH10': { discount: 0.10, description: '10% off' },
  'SAVE20': { discount: 0.20, description: '20% off' },
  'FREESHIP': { discount: 0, freeShipping: true, description: 'Free shipping' }
};
let appliedPromo = null;

// ==================== PRODUCT DATA ====================
const products = [
  {
    id: 1,
    name: "iPhone 15",
    brand: "Apple",
    type: "premium",
    description: "The latest Apple iPhone 15 with advanced features, stunning design, and powerful performance.",
    price: 26999,
    specs: "128GB Storage, A17 Bionic chip, 6GB RAM, Advanced Camera System",
    icon: "📱",
    images: ["iphone_1.jpg", "iphone15_2.jpg", "iphone15_3.jpg"],
    features: ["Face ID", "Wireless Charging", "Water Resistant", "Night Mode Camera"],
    stock: 25,
    rating: 4.8,
    reviews: [],
    viewCount: 0,
    purchaseCount: 150,
    dateAdded: new Date('2024-01-15'),
    estimatedDelivery: "1-2 business days"
  },
  {
    id: 2,
    name: "MacBook Air",
    brand: "Apple",
    type: "premium",
    description: "Ultra-lightweight Apple MacBook Air with M2 chip for professional and creative work.",
    price: 24999,
    specs: "M2 Chip, 8GB Unified Memory, 256GB SSD, 13.6-inch Liquid Retina Display",
    icon: "💻",
    images: ["macbook_1.jpeg", "macbook_2.jpeg", "macbook_3.jpeg"],
    features: ["M2 Chip Performance", "All-Day Battery", "Silent Operation", "MagSafe Charging"],
    stock: 15,
    rating: 4.9,
    reviews: [],
    viewCount: 0,
    purchaseCount: 200,
    dateAdded: new Date('2024-02-01'),
    estimatedDelivery: "2-3 business days"
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    brand: "Apple",
    type: "wearable",
    description: "Advanced health tracking and smart features in Apple's latest smartwatch.",
    price: 8999,
    specs: "GPS + Cellular, Heart Rate Monitor, 40mm Case, Always-On Retina Display",
    icon: "⌚",
    images: ["watch_1.jpeg", "watch_2.jpeg", "watch_3.jpeg"],
    features: ["Health Monitoring", "Fitness Tracking", "Water Resistant", "ECG Capability"],
    stock: 40,
    rating: 4.7,
    reviews: [],
    viewCount: 0,
    purchaseCount: 180,
    dateAdded: new Date('2024-01-20'),
    estimatedDelivery: "1-2 business days"
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    type: "premium",
    description: "Samsung's flagship smartphone with AI-powered features and exceptional camera quality.",
    price: 21999,
    specs: "512GB Storage, 12GB RAM, Snapdragon 8 Gen 3, 200MP Camera",
    icon: "📱",
    images: ["galaxy_1.jpeg", "galaxy_2.jpeg", "galaxy_3.jpeg"],
    features: ["AI Photography", "S Pen Support", "120Hz Display", "Ultra-Fast Charging"],
    stock: 30,
    rating: 4.6,
    reviews: [],
    viewCount: 0,
    purchaseCount: 120,
    dateAdded: new Date('2024-02-10'),
    estimatedDelivery: "1-2 business days"
  },
  {
    id: 5,
    name: "Samsung Buds Pro",
    brand: "Samsung",
    type: "wearable",
    description: "Premium wireless earbuds with active noise cancellation and superior audio quality.",
    price: 2999,
    specs: "Active Noise Cancelling, Bluetooth 5.3, 28-hour Battery, IPX7 Rating",
    icon: "🎧",
    images: ["buds_1.jpeg", "buds_2.jpeg", "buds_3.jpeg"],
    features: ["ANC Technology", "360 Audio", "Touch Controls", "Voice Assistant"],
    stock: 60,
    rating: 4.5,
    reviews: [],
    viewCount: 0,
    purchaseCount: 90,
    dateAdded: new Date('2024-01-25'),
    estimatedDelivery: "1-2 business days"
  },
  {
    id: 6,
    name: "Dell XPS 15",
    brand: "Dell",
    type: "premium",
    description: "Professional-grade Dell laptop with stunning 4K display and powerful performance.",
    price: 29999,
    specs: "Intel i9-12900HK, 16GB RAM, 1TB SSD, RTX 3050 Ti, 15.6\" 4K OLED",
    icon: "💻",
    images: ["dell_1.jpeg", "dell_2.jpeg", "dell_3.jpeg"],
    features: ["4K OLED Display", "Professional Graphics", "Premium Build", "Long Battery Life"],
    stock: 12,
    rating: 4.8,
    reviews: [],
    viewCount: 0,
    purchaseCount: 75,
    dateAdded: new Date('2024-02-05'),
    estimatedDelivery: "2-3 business days"
  },
  {
    id: 7,
    name: "HP Pavilion Gaming",
    brand: "HP",
    type: "gaming",
    description: "Affordable gaming desktop with solid performance for modern games.",
    price: 18999,
    specs: "RTX 3060, Intel i5-12400F, 16GB DDR4 RAM, 512GB NVMe SSD",
    icon: "🎮",
    images: ["hp_1.jpg", "hp_2.jpeg", "hp_3.jpeg"],
    features: ["Gaming Ready", "RGB Lighting", "VR Compatible", "Upgrade Friendly"],
    stock: 8,
    rating: 4.4,
    reviews: [],
    viewCount: 0,
    purchaseCount: 60,
    dateAdded: new Date('2024-01-30'),
    estimatedDelivery: "3-5 business days"
  },
  {
    id: 8,
    name: "ASUS ROG Zephyrus",
    brand: "ASUS",
    type: "gaming",
    description: "High-end gaming laptop with cutting-edge performance and premium design.",
    price: 34999,
    specs: "RTX 4070, AMD Ryzen 9, 32GB RAM, 1TB SSD, 15.6\" QHD 165Hz",
    icon: "🎮",
    images: ["asus_1.jpeg", "asus_2.jpeg", "asus_3.jpg"],
    features: ["High Refresh Display", "Advanced Cooling", "RGB Keyboard", "Premium Audio"],
    stock: 5,
    rating: 4.9,
    reviews: [],
    viewCount: 0,
    purchaseCount: 45,
    dateAdded: new Date('2024-02-15'),
    estimatedDelivery: "2-3 business days"
  },
  {
    id: 9,
    name: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    type: "premium",
    description: "Business-class laptop with enterprise-grade security and reliability.",
    price: 27999,
    specs: "Intel i7-12700U, 16GB RAM, 512GB SSD, 14\" 2.8K OLED, ThinkShield",
    icon: "💻",
    images: ["lenovo_1.jpeg", "lenovo_2.jpeg", "lenovo_3.jpeg"],
    features: ["Business Grade", "Enhanced Security", "Durable Design", "Excellent Keyboard"],
    stock: 18,
    rating: 4.7,
    reviews: [],
    viewCount: 0,
    purchaseCount: 85,
    dateAdded: new Date('2024-01-18'),
    estimatedDelivery: "2-3 business days"
  }
];

// ==================== LOCAL STORAGE FUNCTIONS ====================
function saveToLocalStorage() {
  localStorage.setItem('techhive_cart', JSON.stringify(cart));
  localStorage.setItem('techhive_wishlist', JSON.stringify(wishlist));
  localStorage.setItem('techhive_compare', JSON.stringify(compare));
  localStorage.setItem('techhive_user', JSON.stringify(currentUser));
  localStorage.setItem('techhive_recentlyViewed', JSON.stringify(recentlyViewed));
  localStorage.setItem('techhive_orders', JSON.stringify(orders));
  localStorage.setItem('techhive_addresses', JSON.stringify(addresses));
  localStorage.setItem('techhive_products', JSON.stringify(products));
  localStorage.setItem('techhive_subscribers', JSON.stringify(subscribers));
}

function loadFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem('techhive_cart')) || [];
  wishlist = JSON.parse(localStorage.getItem('techhive_wishlist')) || [];
  compare = JSON.parse(localStorage.getItem('techhive_compare')) || [];
  currentUser = JSON.parse(localStorage.getItem('techhive_user')) || null;
  recentlyViewed = JSON.parse(localStorage.getItem('techhive_recentlyViewed')) || [];
  orders = JSON.parse(localStorage.getItem('techhive_orders')) || [];
  addresses = JSON.parse(localStorage.getItem('techhive_addresses')) || [];
  subscribers = JSON.parse(localStorage.getItem('techhive_subscribers')) || [];
  
  const savedProducts = JSON.parse(localStorage.getItem('techhive_products'));
  if (savedProducts && savedProducts.length > 0) {
    // Merge saved products with default products
    savedProducts.forEach(savedProduct => {
      const existingIndex = products.findIndex(p => p.id === savedProduct.id);
      if (existingIndex !== -1) {
        products[existingIndex] = savedProduct;
      } else {
        products.push(savedProduct);
      }
    });
  }
}

// ==================== PRODUCT RENDERING ====================
function renderProducts(filteredProducts = null) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  productGrid.style.opacity = '0';
  
  setTimeout(() => {
    productGrid.innerHTML = '';
    
    let displayProducts = filteredProducts || products;
    
    // Apply sorting
    const sortValue = document.getElementById('sortFilter')?.value || 'featured';
    displayProducts = applySorting([...displayProducts], sortValue);
    
    if (displayProducts.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
          <h3>No products found</h3>
          <p style="color: var(--text-secondary);">Try adjusting your filters or search terms.</p>
        </div>
      `;
    } else {
      displayProducts.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        
        const stockStatus = getStockStatus(product.stock);
        const averageRating = calculateAverageRating(product);
        const isInWishlist = wishlist.some(id => id === product.id);
        
        card.innerHTML = `
          <div class="product-icon">${product.icon}</div>
          <div class="stock-badge ${stockStatus.class}">${stockStatus.text}</div>
          <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
            ${isInWishlist ? '❤️' : '🤍'}
          </button>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-brand">${product.brand} | ${product.type}</p>
          <div class="product-rating">
            ${renderStars(averageRating)}
            <span class="rating-text">(${product.reviews.length} reviews)</span>
          </div>
          <p class="product-price">R${parseFloat(product.price).toLocaleString()}</p>
          <p class="delivery-info">📦 ${product.estimatedDelivery}</p>
          <div class="product-actions">
            <button class="btn-cart" onclick="addToCart(${product.id})" title="Add to Cart" ${product.stock === 0 ? 'disabled' : ''}>
              🛒 Add to Cart
            </button>
            <button class="btn-quick" onclick="quickView(${product.id})" title="Quick View">
              👁️ Quick View
            </button>
            <button class="btn-compare" onclick="addToCompare(${product.id})" title="Compare">
              ⚖️ Compare
            </button>
          </div>
        `;
        productGrid.appendChild(card);
      });
    }
    
    productGrid.style.opacity = '1';
  }, 200);
}

function applySorting(products, sortValue) {
  switch(sortValue) {
    case 'price-low':
      return products.sort((a, b) => a.price - b.price);
    case 'price-high':
      return products.sort((a, b) => b.price - a.price);
    case 'rating':
      return products.sort((a, b) => calculateAverageRating(b) - calculateAverageRating(a));
    case 'newest':
      return products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case 'popularity':
      return products.sort((a, b) => b.purchaseCount - a.purchaseCount);
    default:
      return products;
  }
}

function getStockStatus(stock) {
  if (stock === 0) {
    return { text: 'Out of Stock', class: 'out-of-stock' };
  } else if (stock < 10) {
    return { text: 'Low Stock', class: 'low-stock' };
  } else {
    return { text: 'In Stock', class: 'in-stock' };
  }
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }
  if (hasHalfStar) {
    stars += '⭐';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '☆';
  }
  
  return `<span class="stars">${stars}</span> <span class="rating-value">${rating.toFixed(1)}</span>`;
}

function calculateAverageRating(product) {
  if (!product.reviews || product.reviews.length === 0) {
    return product.rating || 0;
  }
  const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / product.reviews.length;
}

// ==================== WISHLIST FUNCTIONS ====================
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showNotification('Removed from wishlist!', 'info');
  } else {
    wishlist.push(productId);
    showNotification('Added to wishlist!', 'success');
  }
  
  updateWishlistCount();
  saveToLocalStorage();
  
  // Update the button if we're on the home page
  if (document.getElementById('home-page').classList.contains('current-page')) {
    renderProducts();
  }
  
  // Update wishlist page if we're on it
  if (document.getElementById('wishlist-page').classList.contains('current-page')) {
    renderWishlistPage();
  }
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById('wishlist-count');
  if (wishlistCount) {
    wishlistCount.innerText = wishlist.length;
  }
}

function renderWishlistPage() {
  const container = document.getElementById('wishlist-container');
  if (!container) return;
  
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🤍</div>
        <h3>Your wishlist is empty</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Save your favorite products for later!</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Browse Products</button>
      </div>
    `;
    return;
  }

  container.innerHTML = '<div class="wishlist-grid"></div>';
  const wishlistGrid = container.querySelector('.wishlist-grid');
  
  wishlist.forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const averageRating = calculateAverageRating(product);
    const stockStatus = getStockStatus(product.stock);
    
    const card = document.createElement('div');
    card.className = 'wishlist-card';
    card.innerHTML = `
      <div class="product-icon-large">${product.icon}</div>
      <div class="stock-badge ${stockStatus.class}">${stockStatus.text}</div>
      <h3>${product.name}</h3>
      <p class="product-brand">${product.brand}</p>
      <div class="product-rating">
        ${renderStars(averageRating)}
      </div>
      <p class="product-price">R${parseFloat(product.price).toLocaleString()}</p>
      <div class="wishlist-actions">
        <button class="btn btn-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
          Add to Cart
        </button>
        <button class="btn btn-secondary" onclick="toggleWishlist(${product.id})">
          Remove
        </button>
      </div>
    `;
    wishlistGrid.appendChild(card);
  });
}

// ==================== CART FUNCTIONS ====================
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  if (product.stock === 0) {
    showNotification('Sorry, this product is out of stock!', 'error');
    return;
  }
  
  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    if (existingItem.quantity >= product.stock) {
      showNotification('Cannot add more items. Stock limit reached!', 'warning');
      return;
    }
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  
  updateCartCount();
  showNotification('Added to cart!', 'success');
  animateCartBadge();
  updateAdminStats();
  saveToLocalStorage();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  updateCartCount();
  renderCartPage();
  showNotification('Removed from cart!', 'info');
  updateAdminStats();
  saveToLocalStorage();
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find(i => i.productId === productId);
  const product = products.find(p => p.id === productId);
  
  if (item && product) {
    const newQuantity = parseInt(quantity);
    if (newQuantity > product.stock) {
      showNotification(`Only ${product.stock} items available!`, 'warning');
      item.quantity = product.stock;
    } else if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    } else {
      item.quantity = newQuantity;
    }
    renderCartPage();
    updateCartCount();
    saveToLocalStorage();
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
  }
}

function animateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.style.transform = 'scale(1.5)';
  badge.style.background = '#10b981';
  setTimeout(() => {
    badge.style.transform = 'scale(1)';
    badge.style.background = '';
  }, 300);
}

function renderCartPage() {
  const container = document.getElementById('cart-container');
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
        <h3>Your cart is empty</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Add some amazing products to get started!</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Continue Shopping</button>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return '';
    
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    
    return `
      <div class="cart-item">
        <div class="cart-item-icon">${product.icon}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-brand">${product.brand} | ${product.type}</div>
          <div class="cart-item-price">R${parseFloat(product.price).toLocaleString()} each</div>
          <div class="cart-item-stock">Stock: ${product.stock} available</div>
        </div>
        <div class="cart-item-quantity">
          <label>Qty:</label>
          <input type="number" value="${item.quantity}" min="1" max="${product.stock}" onchange="updateCartQuantity(${product.id}, this.value)">
        </div>
        <div class="cart-item-total">
          <div class="item-total-price">R${itemTotal.toLocaleString()}</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;
  }).join('');

  const vat = subtotal * 0.15;
  let discount = 0;
  let shipping = subtotal >= 1000 ? 0 : 150;
  
  if (appliedPromo) {
    discount = subtotal * appliedPromo.discount;
    if (appliedPromo.freeShipping) {
      shipping = 0;
    }
  }
  
  const total = subtotal + vat - discount + shipping;

  container.innerHTML = `
    <div class="cart-items">
      ${cartItems}
    </div>
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-line">
        <span>Subtotal (excl. VAT):</span>
        <span>R${subtotal.toLocaleString()}</span>
      </div>
      <div class="summary-line">
        <span>VAT (15%):</span>
        <span>R${vat.toLocaleString()}</span>
      </div>
      ${discount > 0 ? `
        <div class="summary-line discount-line">
          <span>Discount (${appliedPromo.description}):</span>
          <span>-R${discount.toLocaleString()}</span>
        </div>
      ` : ''}
      <div class="summary-line">
        <span>Shipping:</span>
        <span>${shipping === 0 ? 'FREE' : 'R' + shipping.toLocaleString()}</span>
      </div>
      ${subtotal < 1000 && !appliedPromo?.freeShipping ? `
        <div class="shipping-notice">
          💡 Add R${(1000 - subtotal).toLocaleString()} more for free shipping!
        </div>
      ` : ''}
      <div class="promo-section">
        <button class="btn btn-secondary btn-block" onclick="openPromoModal()">
          🎟️ Apply Promo Code
        </button>
        ${appliedPromo ? `
          <div class="applied-promo">
            ✓ Code "${Object.keys(promoCodes).find(key => promoCodes[key] === appliedPromo)}" applied
            <button onclick="removePromo()" class="remove-promo">Remove</button>
          </div>
        ` : ''}
      </div>
      <div class="summary-line summary-total">
        <span>Total:</span>
        <span style="color: var(--primary-color);">R${total.toLocaleString()}</span>
      </div>
      <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-direction: column;">
        <button class="btn btn-primary btn-block" onclick="checkout()">Proceed to Checkout</button>
        <button class="btn btn-secondary btn-block" onclick="switchPage('home')">Continue Shopping</button>
        <button class="btn btn-secondary" onclick="clearCart()">Clear Cart</button>
      </div>
    </div>
  `;
}

function openPromoModal() {
  document.getElementById('promoModal').classList.add('show');
}

function closePromoModal() {
  document.getElementById('promoModal').classList.remove('show');
  document.getElementById('promoForm').reset();
  document.getElementById('promoMessage').innerHTML = '';
}

function removePromo() {
  appliedPromo = null;
  showNotification('Promo code removed', 'info');
  renderCartPage();
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    appliedPromo = null;
    updateCartCount();
    renderCartPage();
    showNotification('Cart cleared!', 'info');
    updateAdminStats();
    saveToLocalStorage();
  }
}

function checkout() {
  if (cart.length === 0) return;
  
  if (!currentUser) {
    showNotification('Please sign in to complete your purchase', 'warning');
    switchPage('account');
    return;
  }
  
  // Calculate order details
  let subtotal = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
      // Update stock
      product.stock -= item.quantity;
      // Update purchase count
      product.purchaseCount += item.quantity;
    }
  });
  
  const vat = subtotal * 0.15;
  let discount = 0;
  let shipping = subtotal >= 1000 ? 0 : 150;
  
  if (appliedPromo) {
    discount = subtotal * appliedPromo.discount;
    if (appliedPromo.freeShipping) {
      shipping = 0;
    }
  }
  
  const total = subtotal + vat - discount + shipping;
  
  // Create order
  const order = {
    id: orders.length + 1,
    date: new Date().toISOString(),
    items: [...cart],
    subtotal,
    vat,
    discount,
    shipping,
    total,
    status: 'Processing',
    promoCode: appliedPromo ? Object.keys(promoCodes).find(key => promoCodes[key] === appliedPromo) : null
  };
  
  orders.push(order);
  
  showNotification(`Thank you for your order! Order #${order.id} - Total: R${total.toLocaleString()}`, 'success');
  
  // Clear cart
  cart = [];
  appliedPromo = null;
  updateCartCount();
  updateAdminStats();
  saveToLocalStorage();
  
  // Go to account page to show order
  switchPage('account');
  renderAccountPage();
}

// ==================== COMPARE FUNCTIONS ====================
function addToCompare(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  if (compare.find(id => id === productId)) {
    showNotification('Product already in comparison!', 'warning');
    return;
  }
  
  if (compare.length >= 3) {
    showNotification('Maximum 3 products can be compared!', 'warning');
    return;
  }
  
  compare.push(productId);
  showNotification('Added to comparison!', 'success');
  updateCompareCount();
  updateAdminStats();
  saveToLocalStorage();
}

function removeFromCompare(productId) {
  compare = compare.filter(id => id !== productId);
  renderComparePage();
  showNotification('Removed from comparison!', 'info');
  updateCompareCount();
  updateAdminStats();
  saveToLocalStorage();
}

function updateCompareCount() {
  const compareLink = document.querySelector('[data-page="compare"]');
  if (!compareLink) return;
  const currentText = compareLink.textContent.split(' ')[0];
  compareLink.innerHTML = `${currentText} ${compare.length > 0 ? `<span class="cart-badge">${compare.length}</span>` : ''}`;
}

function renderComparePage() {
  const container = document.getElementById('compare-container');
  if (!container) return;
  
  if (compare.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">⚖️</div>
        <h3>No products to compare</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Add products to compare their features side by side!</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Browse Products</button>
      </div>
    `;
    return;
  }

  const compareProducts = compare.map(id => products.find(p => p.id === id)).filter(p => p);

  container.innerHTML = `
    <div style="margin-bottom: 2rem;">
      <h3>Comparing ${compareProducts.length} Product${compareProducts.length > 1 ? 's' : ''}</h3>
    </div>
    <div style="overflow-x: auto;">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${compareProducts.map(product => `
              <th style="text-align: center; min-width: 200px;">
                <div style="font-size: 2rem;">${product.icon}</div>
                <div style="margin-top: 0.5rem;">${product.name}</div>
                <div class="stock-badge ${getStockStatus(product.stock).class}" style="margin: 0.5rem auto;">
                  ${getStockStatus(product.stock).text}
                </div>
                <button class="remove-btn" style="margin-top: 1rem; font-size: 0.7rem;" onclick="removeFromCompare(${product.id})">Remove</button>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Rating</strong></td>
            ${compareProducts.map(product => `
              <td>${renderStars(calculateAverageRating(product))}</td>
            `).join('')}
          </tr>
          <tr>
            <td><strong>Brand</strong></td>
            ${compareProducts.map(product => `<td>${product.brand}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Category</strong></td>
            ${compareProducts.map(product => `<td style="text-transform: capitalize;">${product.type}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Price</strong></td>
            ${compareProducts.map(product => `<td style="color: var(--primary-color); font-weight: 600;">R${parseFloat(product.price).toLocaleString()}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Stock</strong></td>
            ${compareProducts.map(product => `<td>${product.stock} units</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Delivery</strong></td>
            ${compareProducts.map(product => `<td>📦 ${product.estimatedDelivery}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Description</strong></td>
            ${compareProducts.map(product => `<td>${product.description}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Specifications</strong></td>
            ${compareProducts.map(product => `<td>${product.specs}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Key Features</strong></td>
            ${compareProducts.map(product => `
              <td>
                <ul style="list-style: none; padding: 0;">
                  ${product.features.map(feature => `<li style="margin-bottom: 0.5rem;">✓ ${feature}</li>`).join('')}
                </ul>
              </td>
            `).join('')}
          </tr>
          <tr>
            <td><strong>Reviews</strong></td>
            ${compareProducts.map(product => `<td>${product.reviews.length} customer reviews</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Actions</strong></td>
            ${compareProducts.map(product => `
              <td>
                <button class="btn-cart" style="width: 100%; margin-bottom: 0.5rem;" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
                <button class="btn-quick" style="width: 100%;" onclick="quickView(${product.id})">Quick View</button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ==================== QUICK VIEW & REVIEWS ====================
function quickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Track view
  trackProductView(productId);
  
  currentProduct = product;
  currentImageIndex = 0;
  
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  
  const averageRating = calculateAverageRating(product);
  const stockStatus = getStockStatus(product.stock);
  const recommendations = getRecommendations(productId);

  content.innerHTML = `
    <div class="quick-view-content">
      <div class="quick-view-images">
        <img class="quick-view-image" id="quickImage" 
             src="images/${product.images[0]}" 
             alt="${product.name}"
             onerror="this.style.background='var(--bg-secondary)'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='${product.icon}'; this.style.fontSize='4rem'; this.style.color='var(--primary-color)';"
             onclick="zoomImage(this)">
        <div class="image-controls">
          <button class="image-nav" onclick="changeQuickImage(-1)">‹</button>
          <button class="image-nav" onclick="changeQuickImage(1)">›</button>
        </div>
        <div class="image-thumbnails">
          ${product.images.map((img, idx) => `
            <img src="images/${img}" alt="${product.name}" class="thumbnail ${idx === 0 ? 'active' : ''}" 
                 onclick="selectImage(${idx})"
                 onerror="this.style.background='var(--bg-secondary)'; this.innerHTML='${product.icon}'; this.style.fontSize='2rem';">
          `).join('')}
        </div>
      </div>
      <div class="quick-view-info">
        <div class="stock-badge ${stockStatus.class}">${stockStatus.text}</div>
        <h2>${product.name}</h2>
        <p class="quick-view-brand">${product.brand}</p>
        <div class="product-rating">
          ${renderStars(averageRating)}
          <button class="review-link" onclick="openReviewModal(${product.id})">Write a Review</button>
        </div>
        <p class="quick-view-price">R${parseFloat(product.price).toLocaleString()}</p>
        <p class="delivery-info">📦 Estimated Delivery: ${product.estimatedDelivery}</p>
        <p class="quick-view-description">${product.description}</p>
        <div class="quick-view-specs">
          <h4>Specifications:</h4>
          <p>${product.specs}</p>
        </div>
        <div class="quick-view-features">
          <h4>Key Features:</h4>
          <ul style="list-style: none; padding-left: 0;">
            ${product.features.map(feature => `<li style="margin-bottom: 0.5rem; color: var(--text-secondary);">✓ ${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="quick-view-actions">
          <button class="btn-cart" onclick="addToCart(${product.id}); closeModal();" ${product.stock === 0 ? 'disabled' : ''}>🛒 Add to Cart</button>
          <button class="btn-compare" onclick="addToCompare(${product.id}); closeModal();">⚖️ Add to Compare</button>
          <button class="btn-wishlist" onclick="toggleWishlist(${product.id});">
            ${wishlist.includes(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
          </button>
        </div>
        
        <!-- Reviews Section -->
        <div class="reviews-section">
          <h4>Customer Reviews (${product.reviews.length})</h4>
          ${product.reviews.length > 0 ? `
            <div class="reviews-list">
              ${product.reviews.slice(0, 3).map(review => `
                <div class="review-item">
                  <div class="review-header">
                    <span class="review-author">${review.name}</span>
                    <span class="review-rating">${renderStars(review.rating)}</span>
                  </div>
                  <h5 class="review-title">${review.title}</h5>
                  <p class="review-comment">${review.comment}</p>
                  <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
              `).join('')}
              ${product.reviews.length > 3 ? `<p class="more-reviews">And ${product.reviews.length - 3} more reviews...</p>` : ''}
            </div>
          ` : '<p>No reviews yet. Be the first to review this product!</p>'}
        </div>

        <!-- Recommendations -->
        ${recommendations.length > 0 ? `
          <div class="recommendations-section">
            <h4>You May Also Like</h4>
            <div class="recommendations-grid">
              ${recommendations.map(rec => `
                <div class="recommendation-card" onclick="quickView(${rec.id})">
                  <div class="rec-icon">${rec.icon}</div>
                  <div class="rec-name">${rec.name}</div>
                  <div class="rec-price">R${rec.price.toLocaleString()}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add('show');
}

function zoomImage(img) {
  img.classList.toggle('zoomed');
}

function selectImage(index) {
  currentImageIndex = index;
  const quickImg = document.getElementById('quickImage');
  if (quickImg && currentProduct) {
    quickImg.src = `images/${currentProduct.images[index]}`;
    
    // Update thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === index);
    });
  }
}

function changeQuickImage(direction) {
  if (!currentProduct) return;
  currentImageIndex = (currentImageIndex + direction + currentProduct.images.length) % currentProduct.images.length;
  selectImage(currentImageIndex);
}

function closeModal() {
  document.getElementById('quickViewModal').classList.remove('show');
  currentProduct = null;
}

function openReviewModal(productId) {
  if (!currentUser) {
    showNotification('Please sign in to write a review', 'warning');
    switchPage('account');
    return;
  }
  
  document.getElementById('reviewProductId').value = productId;
  document.getElementById('reviewModal').classList.add('show');
}

function closeReviewModal() {
  document.getElementById('reviewModal').classList.remove('show');
  document.getElementById('reviewForm').reset();
  document.getElementById('reviewRating').value = '';
  document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
}

// ==================== SEARCH FUNCTIONS ====================
function handleSearch(searchTerm) {
  const brandValue = document.getElementById('brandFilter')?.value || 'all';
  const typeValue = document.getElementById('typeFilter')?.value || 'all';
  const minPrice = parseInt(document.getElementById('minPriceRange')?.value || 0);
  const maxPrice = parseInt(document.getElementById('maxPriceRange')?.value || 50000);
  
  let filtered = products.filter(product => {
    const matchesBrand = brandValue === 'all' || product.brand === brandValue;
    const matchesType = typeValue === 'all' || product.type === typeValue;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch = searchTerm === '' || 
                         product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesType && matchesPrice && matchesSearch;
  });
  
  renderProducts(filtered);
  
  // Save to recent searches
  if (searchTerm && !recentSearches.includes(searchTerm)) {
    recentSearches.unshift(searchTerm);
    if (recentSearches.length > 5) recentSearches.pop();
  }
}

let recentSearches = [];

function showSearchSuggestions(searchTerm) {
  const suggestionsDiv = document.getElementById('searchSuggestions');
  if (!suggestionsDiv) return;
  
  if (!searchTerm) {
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'none';
    return;
  }
  
  // Get matching products
  const matches = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);
  
  if (matches.length === 0 && recentSearches.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }
  
  let html = '';
  
  if (recentSearches.length > 0 && searchTerm.length < 2) {
    html += '<div class="suggestion-section"><strong>Recent Searches</strong></div>';
    recentSearches.forEach(search => {
      html += `<div class="suggestion-item" onclick="document.getElementById('search').value='${search}'; handleSearch('${search}');">🔍 ${search}</div>`;
    });
  }
  
  if (matches.length > 0) {
    html += '<div class="suggestion-section"><strong>Products</strong></div>';
    matches.forEach(product => {
      html += `
        <div class="suggestion-item" onclick="quickView(${product.id}); document.getElementById('searchSuggestions').style.display='none';">
          <span>${product.icon}</span>
          <span>${product.name}</span>
          <span class="suggestion-price">R${product.price.toLocaleString()}</span>
        </div>
      `;
    });
  }
  
  suggestionsDiv.innerHTML = html;
  suggestionsDiv.style.display = 'block';
}

// ==================== USER ACCOUNT FUNCTIONS ====================
function renderAccountPage() {
  const loginContainer = document.getElementById('login-form-container');
  const signupContainer = document.getElementById('signup-form-container');
  const dashboard = document.getElementById('account-dashboard');
  const accountLink = document.getElementById('account-text');
  
  if (!currentUser) {
    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
    dashboard.style.display = 'none';
    if (accountLink) accountLink.textContent = 'Sign In';
  } else {
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'none';
    dashboard.style.display = 'block';
    if (accountLink) accountLink.textContent = currentUser.name.split(' ')[0];
    
    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    
    // Render order history
    renderOrderHistory();
    
    // Render saved addresses
    renderSavedAddresses();
    
    // Render account details
    renderAccountDetails();
  }
}

function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Simple authentication (in real app, this would be server-side)
  const savedUsers = JSON.parse(localStorage.getItem('techhive_users')) || [];
  const user = savedUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = { ...user };
    delete currentUser.password; // Don't store password in current session
    showNotification('Welcome back, ' + currentUser.name + '!', 'success');
    saveToLocalStorage();
    renderAccountPage();
  } else {
    showNotification('Invalid email or password', 'error');
  }
}

function handleSignup(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match!', 'error');
    return;
  }
  
  const savedUsers = JSON.parse(localStorage.getItem('techhive_users')) || [];
  
  if (savedUsers.find(u => u.email === email)) {
    showNotification('Email already registered!', 'error');
    return;
  }
  
  const newUser = {
    id: savedUsers.length + 1,
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString()
  };
  
  savedUsers.push(newUser);
  localStorage.setItem('techhive_users', JSON.stringify(savedUsers));
  
  currentUser = { ...newUser };
  delete currentUser.password;
  
  showNotification('Account created successfully!', 'success');
  saveToLocalStorage();
  renderAccountPage();
}

function logout() {
  if (confirm('Are you sure you want to sign out?')) {
    currentUser = null;
    saveToLocalStorage();
    showNotification('Signed out successfully', 'info');
    switchPage('home');
    document.getElementById('account-text').textContent = 'Sign In';
  }
}

function renderOrderHistory() {
  const container = document.getElementById('orderHistory');
  if (!container) return;
  
  const userOrders = orders.filter(order => true); // In real app, filter by user
  
  if (userOrders.length === 0) {
    container.innerHTML = '<p class="empty-state-text">No orders yet. Start shopping to see your orders here!</p>';
    return;
  }
  
  container.innerHTML = userOrders.map(order => `
    <div class="order-item">
      <div class="order-header">
        <div>
          <strong>Order #${order.id}</strong>
          <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
        </div>
        <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
      </div>
      <div class="order-items">
        ${order.items.map(item => {
          const product = products.find(p => p.id === item.productId);
          return product ? `<div>${product.icon} ${product.name} x${item.quantity}</div>` : '';
        }).join('')}
      </div>
      <div class="order-total">Total: R${order.total.toLocaleString()}</div>
    </div>
  `).join('');
}

function renderSavedAddresses() {
  const container = document.getElementById('savedAddresses');
  if (!container) return;
  
  if (addresses.length === 0) {
    container.innerHTML = '<button class="btn btn-primary" id="addAddressBtn">+ Add New Address</button>';
    document.getElementById('addAddressBtn')?.addEventListener('click', openAddressModal);
    return;
  }
  
  container.innerHTML = `
    ${addresses.map((addr, idx) => `
      <div class="address-item">
        <div class="address-label">${addr.label}</div>
        <div class="address-details">
          ${addr.street}<br>
          ${addr.city}, ${addr.province}<br>
          ${addr.postalCode}
        </div>
        <button class="remove-btn" onclick="removeAddress(${idx})">Remove</button>
      </div>
    `).join('')}
    <button class="btn btn-primary" onclick="openAddressModal()">+ Add New Address</button>
  `;
}

function renderAccountDetails() {
  const container = document.getElementById('accountDetails');
  if (!container || !currentUser) return;
  
  container.innerHTML = `
    <div class="account-info">
      <div class="info-row">
        <strong>Name:</strong>
        <span>${currentUser.name}</span>
      </div>
      <div class="info-row">
        <strong>Email:</strong>
        <span>${currentUser.email}</span>
      </div>
      <div class="info-row">
        <strong>Phone:</strong>
        <span>${currentUser.phone || 'Not provided'}</span>
      </div>
      <div class="info-row">
        <strong>Member Since:</strong>
        <span>${new Date(currentUser.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  `;
}

function openAddressModal() {
  document.getElementById('addressModal').classList.add('show');
}

function closeAddressModal() {
  document.getElementById('addressModal').classList.remove('show');
  document.getElementById('addressForm').reset();
}

function handleAddAddress(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const address = {
    label: formData.get('label'),
    street: formData.get('street'),
    city: formData.get('city'),
    province: formData.get('province'),
    postalCode: formData.get('postalCode')
  };
  
  addresses.push(address);
  saveToLocalStorage();
  showNotification('Address added successfully!', 'success');
  closeAddressModal();
  renderSavedAddresses();
}

function removeAddress(index) {
  if (confirm('Remove this address?')) {
    addresses.splice(index, 1);
    saveToLocalStorage();
    showNotification('Address removed', 'info');
    renderSavedAddresses();
  }
}

// ==================== PRODUCT RECOMMENDATIONS ====================
function getRecommendations(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  // Get similar products (same category or brand)
  return products
    .filter(p => p.id !== productId && (p.type === product.type || p.brand === product.brand))
    .sort((a, b) => calculateAverageRating(b) - calculateAverageRating(a))
    .slice(0, 3);
}

function trackProductView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Increment view count
  product.viewCount = (product.viewCount || 0) + 1;
  
  // Add to recently viewed
  recentlyViewed = recentlyViewed.filter(id => id !== productId);
  recentlyViewed.unshift(productId);
  if (recentlyViewed.length > 6) recentlyViewed.pop();
  
  saveToLocalStorage();
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  const section = document.getElementById('recentlyViewedSection');
  const grid = document.getElementById('recentlyViewedGrid');
  
  if (!section || !grid || recentlyViewed.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  grid.innerHTML = '';
  
  recentlyViewed.slice(0, 4).forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-icon">${product.icon}</div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-brand">${product.brand}</p>
      <p class="product-price">R${product.price.toLocaleString()}</p>
      <button class="btn btn-primary" onclick="quickView(${product.id})">View Again</button>
    `;
    grid.appendChild(card);
  });
}

// ==================== ABOUT PAGE ====================
function renderAboutPage() {
  const aboutPage = document.getElementById('about-page');
  aboutPage.innerHTML = `
    <div class="about-hero">
      <h1>About TechHive SA</h1>
      <p>South Africa's premier destination for cutting-edge technology and exceptional service</p>
    </div>
    
    <div class="about-content">
      <div class="about-section">
        <h2>Our Story</h2>
        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem;">
          Founded in 2020 in the heart of Cape Town, TechHive SA emerged from a simple vision: to make premium technology accessible to every South African. What started as a small startup has grown into one of the country's most trusted electronics retailers, serving thousands of satisfied customers across all nine provinces.
        </p>
        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary);">
          We believe that technology should empower, inspire, and connect people. That's why we carefully curate our selection of products, ensuring that every item meets our high standards for quality, innovation, and value.
        </p>
      </div>

      <div class="about-section">
        <h2>Why Choose TechHive SA?</h2>
        <div class="about-grid">
          <div class="feature-card">
            <span class="feature-icon">🚚</span>
            <h3>Fast & Free Delivery</h3>
            <p>Free delivery on orders over R1,000. Express delivery available to major cities within 24-48 hours.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🛡️</span>
            <h3>Extended Warranties</h3>
            <p>Comprehensive warranty coverage with local support. We stand behind every product we sell.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">💎</span>
            <h3>Premium Quality</h3>
            <p>Only authentic, brand-new products from authorized distributors. No grey imports or refurbished items.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🎯</span>
            <h3>Expert Advice</h3>
            <p>Our tech specialists are here to help you find the perfect device for your needs and budget.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">💳</span>
            <h3>Flexible Payment</h3>
            <p>Multiple payment options including interest-free installments and corporate accounts.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🔄</span>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free returns and exchanges. Changed your mind? No problem!</p>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h2>Our Impact</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-number">50,000+</span>
            <span class="stat-label">Happy Customers</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">5,000+</span>
            <span class="stat-label">Products Delivered</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">98.5%</span>
            <span class="stat-label">Customer Satisfaction</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Customer Support</span>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h2>Our Team</h2>
        <p style="text-align: center; font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2rem;">
          Meet the passionate individuals who make TechHive SA possible
        </p>
        <div class="team-grid">
          <div class="team-member">
            <div class="member-avatar">👨‍💼</div>
            <div class="member-name">Thabo Mthembu</div>
            <div class="member-role">Founder & CEO</div>
          </div>
          <div class="team-member">
            <div class="member-avatar">👩‍💻</div>
            <div class="member-name">Sarah Johnson</div>
            <div class="member-role">Head of Technology</div>
          </div>
          <div class="team-member">
            <div class="member-avatar">👨‍🔧</div>
            <div class="member-name">Ahmed Hassan</div>
            <div class="member-role">Technical Support Lead</div>
          </div>
          <div class="team-member">
            <div class="member-avatar">👩‍📊</div>
            <div class="member-name">Nomsa Dlamini</div>
            <div class="member-role">Customer Success Manager</div>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h2>Our Commitment</h2>
        <div style="background: var(--bg-secondary); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--primary-color);">
          <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 1rem;">
            <strong>Environmental Responsibility:</strong> We're committed to sustainable practices, including eco-friendly packaging and electronic waste recycling programs.
          </p>
          <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 1rem;">
            <strong>Community Impact:</strong> Through our TechHive Cares program, we donate refurbished devices to schools and community centers across South Africa.
          </p>
          <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary);">
            <strong>Innovation:</strong> We continuously invest in new technologies and services to enhance your shopping experience and stay ahead of global trends.
          </p>
        </div>
      </div>

      <div class="about-section" style="text-align: center; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; padding: 3rem; border-radius: 16px;">
        <h2 style="color: white; margin-bottom: 1rem;">Ready to Experience the Difference?</h2>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9;">Join thousands of satisfied customers who trust TechHive SA for their technology needs.</p>
        <button class="btn" style="background: white; color: var(--primary-color); font-weight: 600;" onclick="switchPage('home')">
          Start Shopping Today
        </button>
      </div>
    </div>
  `;
}

// ==================== UTILITY FUNCTIONS ====================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    max-width: 300px;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function switchPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('current-page'));
  document.getElementById(pageName + '-page').classList.add('current-page');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`[data-page="${pageName}"]`);
  if (activeLink) activeLink.classList.add('active');
  
  // Close mobile menu
  document.getElementById('nav-links')?.classList.remove('mobile-open');
  
  // Hide search suggestions
  const suggestionsDiv = document.getElementById('searchSuggestions');
  if (suggestionsDiv) suggestionsDiv.style.display = 'none';
  
  // Render page content
  if (pageName === 'cart') renderCartPage();
  if (pageName === 'compare') renderComparePage();
  if (pageName === 'about') renderAboutPage();
  if (pageName === 'wishlist') renderWishlistPage();
  if (pageName === 'account') renderAccountPage();
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToProducts() {
  document.getElementById('products-section')?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

function updateAdminStats() {
  const totalProductsEl = document.getElementById('total-products');
  const cartItemsEl = document.getElementById('cart-items');
  const compareItemsEl = document.getElementById('compare-items');
  const subscribersCountEl = document.getElementById('subscribers-count');
  
  if (totalProductsEl) totalProductsEl.textContent = products.length;
  if (cartItemsEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsEl.textContent = totalItems;
  }
  if (compareItemsEl) compareItemsEl.textContent = compare.length;
  if (subscribersCountEl) subscribersCountEl.textContent = subscribers.length;
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
  // Load data from localStorage
  loadFromLocalStorage();
  
  // Initial render
  renderProducts();
  updateCartCount();
  updateWishlistCount();
  updateCompareCount();
  updateAdminStats();
  renderRecentlyViewed();
  
  // Update account link
  if (currentUser) {
    document.getElementById('account-text').textContent = currentUser.name.split(' ')[0];
  }
  
  // Filters
  const brandFilter = document.getElementById('brandFilter');
  const typeFilter = document.getElementById('typeFilter');
  const sortFilter = document.getElementById('sortFilter');
  const searchInput = document.getElementById('search');
  const minPriceRange = document.getElementById('minPriceRange');
  const maxPriceRange = document.getElementById('maxPriceRange');
  
  if (brandFilter) brandFilter.addEventListener('change', () => handleSearch(searchInput.value));
  if (typeFilter) typeFilter.addEventListener('change', () => handleSearch(searchInput.value));
  if (sortFilter) sortFilter.addEventListener('change', () => handleSearch(searchInput.value));
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const value = e.target.value;
      handleSearch(value);
      showSearchSuggestions(value);
    });
  }
  
  // Price range filters
  if (minPriceRange) {
    minPriceRange.addEventListener('input', (e) => {
      document.getElementById('minPrice').textContent = parseInt(e.target.value).toLocaleString();
      handleSearch(searchInput.value);
    });
  }
  
  if (maxPriceRange) {
    maxPriceRange.addEventListener('input', (e) => {
      document.getElementById('maxPrice').textContent = parseInt(e.target.value).toLocaleString();
      handleSearch(searchInput.value);
    });
  }
  
  // Clear filters
  const clearFiltersBtn = document.getElementById('clearFilters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      brandFilter.value = 'all';
      typeFilter.value = 'all';
      sortFilter.value = 'featured';
      searchInput.value = '';
      minPriceRange.value = 0;
      maxPriceRange.value = 50000;
      document.getElementById('minPrice').textContent = '0';
      document.getElementById('maxPrice').textContent = '50000';
      renderProducts();
    });
  }

  // Newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      if (email && !subscribers.includes(email)) {
        subscribers.push(email);
        showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
        updateAdminStats();
        saveToLocalStorage();
      } else if (subscribers.includes(email)) {
        showNotification('You are already subscribed.', 'info');
      }
    });
  }

  // Navigation
  document.querySelectorAll('.nav-link, .back-link, .logo').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pageId = e.target.dataset.page || e.target.closest('[data-page]')?.dataset.page;
      if (pageId) {
        switchPage(pageId);
      }
    });
  });

  document.querySelectorAll('footer a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      switchPage(link.dataset.page);
    });
  });

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('techhive_theme', currentTheme === 'light' ? 'dark' : 'light');
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('techhive_theme');
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  }

  // Mobile menu
  document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.toggle('mobile-open');
  });

  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('nav-links');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchContainer = document.querySelector('.search-container');
    
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      mobileMenu.classList.remove('mobile-open');
    }
    
    if (searchSuggestions && !searchContainer.contains(e.target)) {
      searchSuggestions.style.display = 'none';
    }
  });

  // Hero slider
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // Admin form
  const adminForm = document.getElementById('admin-form');
  if (adminForm) {
    adminForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newProduct = {
        id: products.length + 1,
        name: formData.get('name'),
        brand: formData.get('brand'),
        type: formData.get('type'),
        description: formData.get('description'),
        price: parseInt(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        specs: formData.get('specs'),
        icon: formData.get('icon') || '📦',
        images: [`${formData.get('name').toLowerCase().replace(/\s/g, '')}_1.jpg`],
        features: ['Premium Quality', 'Latest Technology', 'Warranty Included'],
        rating: 4.5,
        reviews: [],
        viewCount: 0,
        purchaseCount: 0,
        dateAdded: new Date(),
        estimatedDelivery: "2-3 business days"
      };
      
      products.push(newProduct);
      showNotification('Product added successfully!', 'success');
      e.target.reset();
      updateAdminStats();
      renderProducts();
      saveToLocalStorage();
    });
  }

  // Review form
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const productId = parseInt(formData.get('productId'));
      const product = products.find(p => p.id === productId);
      
      if (product) {
        const review = {
          rating: parseInt(formData.get('rating')),
          title: formData.get('title'),
          comment: formData.get('comment'),
          name: formData.get('name'),
          date: new Date().toISOString()
        };
        
        product.reviews.push(review);
        showNotification('Review submitted successfully!', 'success');
        closeReviewModal();
        saveToLocalStorage();
        
        // Refresh quick view if open
        if (currentProduct && currentProduct.id === productId) {
          quickView(productId);
        }
      }
    });
  }
  
  // Star rating input
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
      const rating = this.dataset.rating;
      document.getElementById('reviewRating').value = rating;
      document.querySelectorAll('.star').forEach((s, idx) => {
        s.textContent = idx < rating ? '★' : '☆';
        s.classList.toggle('selected', idx < rating);
      });
    });
  });

  // Login/Signup forms
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  document.getElementById('showSignup')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('signup-form-container').style.display = 'block';
  });

  document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
  });

  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  // Address form
  const addressForm = document.getElementById('addressForm');
  if (addressForm) {
    addressForm.addEventListener('submit', handleAddAddress);
  }

  // Promo form
  const promoForm = document.getElementById('promoForm');
  if (promoForm) {
    promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const code = formData.get('promoCode').toUpperCase();
      
      if (promoCodes[code]) {
        appliedPromo = promoCodes[code];
        showNotification(`Promo code applied: ${appliedPromo.description}`, 'success');
        closePromoModal();
        renderCartPage();
      } else {
        document.getElementById('promoMessage').innerHTML = '<p style="color: #ef4444;">Invalid promo code</p>';
      }
    });
  }

  // Modal close on click outside
  document.getElementById('quickViewModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.getElementById('reviewModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeReviewModal();
  });

  document.getElementById('addressModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddressModal();
  });

  document.getElementById('promoModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePromoModal();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeReviewModal();
      closeAddressModal();
      closePromoModal();
      document.getElementById('nav-links')?.classList.remove('mobile-open');
      const suggestionsDiv = document.getElementById('searchSuggestions');
      if (suggestionsDiv) suggestionsDiv.style.display = 'none';
    }
  });

  // Touch gestures for mobile (swipe on images)
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.getElementById('quickImage')?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.getElementById('quickImage')?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      changeQuickImage(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
      changeQuickImage(-1); // Swipe right
    }
  }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  .fade-in {
    animation: fadeIn 0.5s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);