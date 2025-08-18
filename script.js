let cart = [];
let compare = [];
let subscribers = [];
let currentImageIndex = 0;

const productGrid = document.getElementById('productGrid');
const brandFilter = document.getElementById('brandFilter');
const typeFilter = document.getElementById('typeFilter');
const searchInput = document.getElementById('search');

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
    images: ["iphone_1.jpg", "iPhone_2.jpg", "iPhone_3.jpg"],
    features: ["Face ID", "Wireless Charging", "Water Resistant", "Night Mode Camera"]
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
    images: ["MacBook_1.jpg", "MacBook_2.jpg", "MacBook_3.jpg"],
    features: ["Fanless Design", "Thunderbolt Ports", "Long Battery Life", "Backlit Magic Keyboard"]
  },
  {
    id: 3,
    name: "Samsung S24 Ultra",
    brand: "Samsung",
    type: "premium",
    description: "Samsung's flagship smartphone with an S Pen, pro-grade camera, and powerful processing.",
    price: 32999,
    specs: "256GB Storage, Snapdragon 8 Gen 3, 12GB RAM, 200MP Main Camera",
    icon: "📱",
    images: ["Samsung_1.jpg", "Samsung_2.jpg"],
    features: ["S Pen Included", "AI-powered Photo Editing", "Water Resistant", "Dynamic AMOLED Display"]
  },
  {
    id: 4,
    name: "Dell XPS 15",
    brand: "Dell",
    type: "premium",
    description: "A high-performance laptop for creators and professionals, combining powerful specs with a stunning display.",
    price: 29999,
    specs: "Intel Core i7, 16GB RAM, 512GB SSD, 15.6-inch InfinityEdge Display",
    icon: "💻",
    images: ["Dell_1.jpg", "Dell_2.jpg"],
    features: ["High-Res Display", "Powerful Graphics", "Premium Build Quality", "Fast Charging"]
  },
  {
    id: 5,
    name: "ASUS ROG Zephyrus",
    brand: "ASUS",
    type: "gaming",
    description: "A compact and powerful gaming laptop with a focus on portability and high performance.",
    price: 35999,
    specs: "Ryzen 9, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 4080",
    icon: "🎮",
    images: ["Asus_1.jpg", "Asus_2.jpg"],
    features: ["High Refresh Rate Display", "Advanced Cooling System", "RGB Keyboard", "Lightweight Design"]
  },
  {
    id: 6,
    name: "HP Envy x360",
    brand: "HP",
    type: "budget",
    description: "A versatile 2-in-1 laptop that can be used as a tablet, perfect for students and creative users.",
    price: 13999,
    specs: "Intel Core i5, 8GB RAM, 512GB SSD, 14-inch Full HD Touch Display",
    icon: "💻",
    images: ["HP_1.jpg", "HP_2.jpg"],
    features: ["360-Degree Hinge", "Touchscreen", "Active Pen Support", "Long Battery Life"]
  },
  {
    id: 7,
    name: "Lenovo IdeaPad",
    brand: "Lenovo",
    type: "budget",
    description: "An affordable and reliable laptop for everyday use, perfect for work, study, and entertainment.",
    price: 8999,
    specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD, 15.6-inch Full HD Display",
    icon: "💻",
    images: ["Lenovo_1.jpg", "Lenovo_2.jpg"],
    features: ["Lightweight", "Numeric Keypad", "Webcam Privacy Shutter", "Fast Performance"]
  },
  {
    id: 8,
    name: "Samsung Galaxy Watch 6",
    brand: "Samsung",
    type: "wearable",
    description: "The latest Samsung smartwatch with advanced health tracking and a sleek design.",
    price: 7999,
    specs: "44mm, BioActive Sensor, 16GB Storage, Wear OS",
    icon: "⌚",
    images: ["Samsung_Watch_1.jpg", "Samsung_Watch_2.jpg"],
    features: ["ECG Monitoring", "Sleep Tracking", "GPS Built-in", "Water Resistant"]
  },
  {
    id: 9,
    name: "Apple Watch SE",
    brand: "Apple",
    type: "wearable",
    description: "The affordable Apple Watch with essential features for fitness tracking and daily tasks.",
    price: 6499,
    specs: "40mm, S8 SiP, 32GB Storage, watchOS",
    icon: "⌚",
    images: ["Apple_Watch_1.jpg", "Apple_Watch_2.jpg"],
    features: ["Fall Detection", "Heart Rate Notifications", "Water Resistant", "Emergency SOS"]
  }
];

// --- Utility Functions ---

function showNotification(message, type = 'info') {
  const notificationContainer = document.querySelector('.notification-container');
  if (!notificationContainer) {
    console.error('Notification container not found!');
    return;
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  notificationContainer.appendChild(notification);

  // Animate the notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hide');
    notification.addEventListener('transitionend', () => {
      notification.remove();
    });
  }, 3000);
}

// --- Render Functions ---

function renderProducts(filteredProducts = products) {
  productGrid.innerHTML = '';
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
    return;
  }
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-icon">${product.icon}</div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-brand">${product.brand}</p>
      <p class="product-price">R${product.price.toLocaleString()}</p>
      <div class="product-actions">
        <button class="btn btn-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="btn btn-quick" onclick="openModal(${product.id})">Quick View</button>
        <button class="btn btn-compare" onclick="addToCompare(${product.id})">Compare</button>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty.</p>
        <a href="#" data-page="home" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    updateCartTotal(0);
    return;
  }

  const cartList = document.createElement('div');
  cartList.className = 'cart-list';

  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-icon">${product.icon}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-brand">${product.brand}</div>
        <div class="cart-item-price">R${(product.price * item.quantity).toLocaleString()}</div>
      </div>
      <div class="cart-item-quantity">
        <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${product.id}, this.value)">
      </div>
      <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
    `;
    cartList.appendChild(cartItem);
  });

  cartContainer.appendChild(cartList);

  const cartSummary = document.createElement('div');
  cartSummary.className = 'cart-summary';
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.productId).price * item.quantity, 0);
  cartSummary.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-line">
      <span>Subtotal:</span>
      <span>R${total.toLocaleString()}</span>
    </div>
    <div class="summary-line">
      <span>VAT (15%):</span>
      <span>R${(total * 0.15).toLocaleString()}</span>
    </div>
    <div class="summary-line summary-total">
      <span>Total:</span>
      <span>R${(total * 1.15).toLocaleString()}</span>
    </div>
    <button id="checkout-btn" class="btn btn-primary btn-block">Proceed to Checkout</button>
  `;
  cartContainer.appendChild(cartSummary);

  updateCartTotal(cart.length);
}

function renderCompare() {
  const compareContainer = document.getElementById('compare-container');
  if (!compareContainer) return;

  compareContainer.innerHTML = '';
  if (compare.length === 0) {
    compareContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <p>Add up to 3 products to compare them here.</p>
        <a href="#" data-page="home" class="btn btn-primary">Start Browsing</a>
      </div>
    `;
    return;
  }

  const compareTable = document.createElement('table');
  compareTable.className = 'compare-table';

  const properties = ['icon', 'name', 'brand', 'price', 'description', 'specs', 'features'];
  let tableHTML = '<thead><tr><th>Feature</th></tr></thead><tbody>';

  properties.forEach(prop => {
    tableHTML += `<tr><td>${prop.charAt(0).toUpperCase() + prop.slice(1)}</td>`;
    compare.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        let value = product[prop];
        if (prop === 'price') {
          value = `R${value.toLocaleString()}`;
        } else if (prop === 'features') {
          value = value.join(', ');
        } else if (prop === 'icon') {
          value = `<span class="product-icon-small">${value}</span>`;
        }
        tableHTML += `<td>${value}</td>`;
      }
    });
    tableHTML += '</tr>';
  });

  tableHTML += '</tbody>';
  compareTable.innerHTML = tableHTML;
  compareContainer.appendChild(compareTable);
}


function addToCart(productId) {
  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
    showNotification('Product quantity updated in cart.', 'info');
  } else {
    cart.push({ productId, quantity: 1 });
    showNotification('Product added to cart!', 'success');
  }
  updateCartTotal(cart.length);
  updateAdminStats();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  showNotification('Product removed from cart.', 'info');
  updateCartTotal(cart.length);
  updateAdminStats();
  renderCart();
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = parseInt(quantity);
    renderCart();
  }
}

function addToCompare(productId) {
  if (compare.length >= 3) {
    showNotification('You can only compare up to 3 products.', 'warning');
    return;
  }
  if (!compare.includes(productId)) {
    compare.push(productId);
    showNotification('Product added to compare list.', 'info');
    updateAdminStats();
  } else {
    showNotification('Product is already in the compare list.', 'info');
  }
}

function removeFromCompare(productId) {
  compare = compare.filter(id => id !== productId);
  showNotification('Product removed from compare list.', 'info');
  updateAdminStats();
  renderCompare();
}


function updateAdminStats() {
  const totalProducts = products.length;
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCompareItems = compare.length;
  const totalSubscribers = subscribers.length;

  document.getElementById('total-products').innerText = totalProducts;
  document.getElementById('cart-items').innerText = totalCartItems;
  document.getElementById('compare-items').innerText = totalCompareItems;
  document.getElementById('subscribers-count').innerText = totalSubscribers;
}



function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('current-page');
  });
  document.getElementById(`${pageId}-page`).classList.add('current-page');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }


  const searchContainer = document.querySelector('.search-container');
  if (pageId === 'home') {
    searchContainer.style.display = 'flex';
  } else {
    searchContainer.style.display = 'none';
  }


  if (pageId === 'cart') {
    renderCart();
  } else if (pageId === 'compare') {
    renderCompare();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCartTotal(count) {
  document.getElementById('cart-count').innerText = count;
}

function openModal(productId) {
  const modal = document.getElementById('quickViewModal');
  const modalContent = document.getElementById('quickViewContent');
  const product = products.find(p => p.id === productId);

  if (!product) {
    console.error('Product not found for modal.');
    return;
  }

  currentImageIndex = 0;

  modalContent.innerHTML = `
    <div class="quick-view-content">
      <div class="quick-view-images">
        <img src="images/${product.images[currentImageIndex]}" alt="${product.name}" class="quick-view-image">
        <div class="image-controls">
          <button class="image-nav prev" onclick="changeImage(${productId}, -1)">&#10094;</button>
          <button class="image-nav next" onclick="changeImage(${productId}, 1)">&#10095;</button>
        </div>
      </div>
      <div class="quick-view-info">
        <h2>${product.name}</h2>
        <div class="quick-view-brand">${product.brand}</div>
        <div class="quick-view-price">R${product.price.toLocaleString()}</div>
        <div class="quick-view-description">${product.description}</div>
        <div class="quick-view-specs">
          <h4>Technical Specifications:</h4>
          <p>${product.specs}</p>
        </div>
        <div class="quick-view-features">
          <h4>Key Features:</h4>
          <ul>
            ${product.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="quick-view-actions">
          <button class="btn btn-cart" onclick="addToCart(${product.id}); closeModal();">Add to Cart</button>
          <button class="btn btn-compare" onclick="addToCompare(${product.id}); closeModal();">Add to Compare</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('show');
}

function closeModal() {
  document.getElementById('quickViewModal').classList.remove('show');
}

function changeImage(productId, direction) {
  const product = products.find(p => p.id === productId);
  const totalImages = product.images.length;
  currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
  const imageElement = document.querySelector('#quickViewModal .quick-view-image');
  if (imageElement) {
    imageElement.src = `images/${product.images[currentImageIndex]}`;
  }
}

function scrollToProducts() {
  const productsSection = document.getElementById('products-section');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
}


function handleCheckout() {

  if (cart.length === 0) {
    showNotification('Your cart is empty. Add some products first!', 'info');
    return;
  }


  showNotification('Order placed successfully! Thank you for shopping with us.', 'success');


  cart = [];


  renderCart();
  updateAdminStats();
  document.getElementById('cart-count').innerText = 0;


  setTimeout(() => {
    switchPage('home');
  }, 2000);
}



document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateAdminStats();

  document.querySelectorAll('.nav-link, .logo, .back-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pageId = e.target.dataset.page;
      if (pageId) {
        switchPage(pageId);
      }
      document.getElementById('nav-links').classList.remove('mobile-open');
    });
  });

  const filterAndSearch = () => {
    const brandValue = brandFilter.value;
    const typeValue = typeFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    let filtered = products.filter(product => {
      const matchesBrand = (brandValue === 'all' || product.brand === brandValue);
      const matchesType = (typeValue === 'all' || product.type === typeValue);
      const matchesSearch = product.name.toLowerCase().includes(searchValue) || product.brand.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue);
      return matchesBrand && matchesType && matchesSearch;
    });
    renderProducts(filtered);
  };

  brandFilter.addEventListener('change', filterAndSearch);
  typeFilter.addEventListener('change', filterAndSearch);
  searchInput.addEventListener('input', filterAndSearch);

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email && !subscribers.includes(email)) {
        subscribers.push(email);
        showNotification('Thank you for subscribing!', 'success');
        newsletterForm.reset();
        updateAdminStats();
      } else if (subscribers.includes(email)) {
        showNotification('You are already subscribed.', 'info');
      }
    });
  }

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
        specs: formData.get('specs'),
        icon: formData.get('icon') || '📦',
        images: [`${formData.get('name').toLowerCase().replace(/\s/g, '')}_1.jpg`],
        features: ['Premium Quality', 'Latest Technology', 'Warranty Included']
      };

      products.push(newProduct);
      showNotification('Product added successfully!', 'success');
      e.target.reset();
      updateAdminStats();
      renderProducts();
    });
  }


  document.getElementById('quickViewModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.getElementById('nav-links').classList.remove('mobile-open');
    }
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
});