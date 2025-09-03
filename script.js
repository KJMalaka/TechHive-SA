let cart = [];
let compare = [];
let subscribers = [];
let currentImageIndex = 0;
let currentProduct = null;

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
        images: ["iphone_1.jpg", "iphone15_2.jpg", "iphone15_3.jpg"],
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
        images: ["macbook_1.jpeg", "macbook_2.jpeg", "macbook_3.jpeg"],
        features: ["M2 Chip Performance", "All-Day Battery", "Silent Operation", "MagSafe Charging"]
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
        features: ["Health Monitoring", "Fitness Tracking", "Water Resistant", "ECG Capability"]
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
        features: ["AI Photography", "S Pen Support", "120Hz Display", "Ultra-Fast Charging"]
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
        features: ["ANC Technology", "360 Audio", "Touch Controls", "Voice Assistant"]
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
        features: ["4K OLED Display", "Professional Graphics", "Premium Build", "Long Battery Life"]
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
        features: ["Gaming Ready", "RGB Lighting", "VR Compatible", "Upgrade Friendly"]
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
        features: ["High Refresh Display", "Advanced Cooling", "RGB Keyboard", "Premium Audio"]
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
        features: ["Business Grade", "Enhanced Security", "Durable Design", "Excellent Keyboard"]
    }
];

function renderProducts(brand = 'all', type = 'all', search = '') {
    productGrid.style.opacity = '0';

    setTimeout(() => {
        productGrid.innerHTML = '';

        const filteredProducts = products.filter(product => {
            const matchesBrand = brand === 'all' || product.brand === brand;
            const matchesType = type === 'all' || product.type === type;
            const matchesSearch = search === '' || product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.brand.toLowerCase().includes(search.toLowerCase());
            return matchesBrand && matchesType && matchesSearch;
        });

        filteredProducts.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.innerHTML = `
        <div class="product-icon">${product.icon}</div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-brand">${product.brand} | ${product.type}</p>
        <p class="product-price">R${parseFloat(product.price).toLocaleString()}</p>
        <div class="product-actions">
          <button class="btn-cart" onclick="addToCart(${product.id})" title="Add to Cart">
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

        productGrid.style.opacity = '1';
    }, 200);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Added to cart!', 'success');
        animateCartBadge();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartPage();
    showNotification('Removed from cart!', 'info');
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function animateCartBadge() {
    const badge = document.getElementById('cart-count');
    badge.style.transform = 'scale(1.5)';
    badge.style.background = '#10b981';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
        badge.style.background = '';
    }, 300);
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product; // Set the current product for image navigation

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    currentImageIndex = 0;

    content.innerHTML = `
    <div class="quick-view-content">
      <div class="quick-view-images">
        <img class="quick-view-image" id="quickImage" 
             src="images/${product.images[0]}" 
             alt="${product.name}"
             onerror="this.style.background='var(--bg-secondary)'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='${product.icon}'; this.style.fontSize='4rem'; this.style.color='var(--primary-color)';">
        <div class="image-controls">
          <button class="image-nav" onclick="changeQuickImage(-1)">‹</button>
          <button class="image-nav" onclick="changeQuickImage(1)">›</button>
        </div>
      </div>
      <div class="quick-view-info">
        <h2>${product.name}</h2>
        <p class="quick-view-brand">${product.brand}</p>
        <p class="quick-view-price">R${parseFloat(product.price).toLocaleString()}</p>
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
          <button class="btn-cart" onclick="addToCart(${product.id}); closeModal();">🛒 Add to Cart</button>
          <button class="btn-compare" onclick="addToCompare(${product.id}); closeModal();">⚖️ Add to Compare</button>
        </div>
      </div>
    </div>
  `;

    modal.classList.add('show');
}

function changeQuickImage(direction) {
    if (!currentProduct) return;
    currentImageIndex = (currentImageIndex + direction + currentProduct.images.length) % currentProduct.images.length;
    const quickImg = document.getElementById('quickImage');
    quickImg.src = `images/${currentProduct.images[currentImageIndex]}`;
}


function closeModal() {
    document.getElementById('quickViewModal').classList.remove('show');
    currentProduct = null;
}

function addToCompare(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    if (compare.find(p => p.id === productId)) {
        showNotification('Product already in comparison!', 'warning');
        return;
    }
    if (compare.length >= 3) {
        showNotification('Maximum 3 products can be compared!', 'warning');
        return;
    }
    compare.push(product);
    showNotification('Added to comparison!', 'success');
    updateCompareCount();
}

function removeFromCompare(productId) {
    compare = compare.filter(p => p.id !== productId);
    renderComparePage();
    showNotification('Removed from comparison!', 'info');
    updateCompareCount();
}

function updateCompareCount() {
    const compareLink = document.querySelector('[data-page="compare"]');
    const currentText = compareLink.textContent.split(' ')[0];
    compareLink.innerHTML = `${currentText} ${compare.length > 0 ? `<span class="cart-badge">${compare.length}</span>` : ''}`;
}

function renderCartPage() {
    const container = document.getElementById('cart-container');
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

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const vat = total * 0.15;
    const subtotal = total - vat;
    container.innerHTML = `
    <div class="cart-items">
      ${cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-icon">${item.icon}</div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-brand">${item.brand} | ${item.type}</div>
            <div class="cart-item-price">R${parseFloat(item.price).toLocaleString()}</div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `).join('')}
    </div>
    <div style="border-top: 1px solid var(--border-color); padding-top: 2rem; margin-top: 2rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <span>Subtotal (excl. VAT):</span>
        <span>R${subtotal.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <span>VAT (15%):</span>
        <span>R${vat.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 2rem; font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">
        <span>Total (incl. VAT):</span>
        <span>R${total.toLocaleString()}</span>
      </div>
      <button class="btn btn-primary btn-block">Proceed to Checkout</button>
    </div>
  `;
}

function renderComparePage() {
    const container = document.getElementById('compare-container');
    if (compare.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">⚖️</div>
        <h3>No products to compare</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Add up to 3 products to compare their features side-by-side.</p>
        <button class="btn btn-primary" onclick="switchPage('home')">Continue Shopping</button>
      </div>
    `;
        return;
    }

    const headers = ['Feature', ...compare.map(p => p.name)];
    const features = ['Brand', 'Price', 'Description', 'Specs', 'Key Features'];

    const tableHtml = `
    <table class="compare-table">
      <thead>
        <tr>
          ${headers.map(h => `<th>${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          ${compare.map(p => `<td style="font-weight: 600; font-size: 1.5rem;">${p.icon}</td>`).join('')}
        </tr>
        ${features.map(feature => `
          <tr>
            <td><strong>${feature}</strong></td>
            ${compare.map(p => {
        let value = '';
        if (feature === 'Price') {
            value = `R${parseFloat(p.price).toLocaleString()}`;
        } else if (feature === 'Key Features') {
            value = `<ul>${p.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>`;
        } else {
            value = p[feature.toLowerCase().replace(/\s/g, '')];
        }
        return `<td>${value}</td>`;
    }).join('')}
          </tr>
        `).join('')}
        <tr>
          <td></td>
          ${compare.map(p => `<td><button class="btn-remove-compare" onclick="removeFromCompare(${p.id})">Remove</button></td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;
    container.innerHTML = tableHtml;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
}

function switchPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('current-page'));
    document.getElementById(`${pageId}-page`).classList.add('current-page');

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    if (pageId === 'cart') {
        renderCartPage();
    } else if (pageId === 'compare') {
        renderComparePage();
    }
}

function updateAdminStats() {
    document.getElementById('total-products').innerText = products.length;
    document.getElementById('cart-items').innerText = cart.length;
    document.getElementById('compare-items').innerText = compare.length;
    document.getElementById('subscribers-count').innerText = subscribers.length;
}

function scrollToProducts() {
    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    brandFilter.addEventListener('change', () => {
        renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
    });

    typeFilter.addEventListener('change', () => {
        renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
    });

    searchInput.addEventListener('input', () => {
        renderProducts(brandFilter.value, typeFilter.value, searchInput.value);
    });

    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const pageId = link.dataset.page;
            switchPage(pageId);
        });
    });

    document.querySelector('.logo').addEventListener('click', e => {
        e.preventDefault();
        switchPage('home');
    });

    document.getElementById('themeToggle').addEventListener('click', () => {
        const currentTheme = document.documentElement.dataset.theme;
        document.documentElement.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
    });

    document.getElementById('mobileMenuToggle').addEventListener('click', () => {
        document.getElementById('nav-links').classList.toggle('mobile-open');
    });

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
});

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    font-size: 1rem;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    opacity: 0;
    transform: translateX(100%);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  }
  .notification.show {
    opacity: 1;
    transform: translateX(0);
  }
  .notification.hide {
    opacity: 0;
    transform: translateX(100%);
  }
  .notification.success {
    background-color: #10b981;
  }
  .notification.info {
    background-color: #3b82f6;
  }
  .notification.warning {
    background-color: #f97316;
  }
`;
document.head.appendChild(style);