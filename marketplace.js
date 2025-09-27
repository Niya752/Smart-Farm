// Marketplace - Specific JavaScript Functions

// Initialize marketplace page
document.addEventListener('DOMContentLoaded', function() {
    initializeMarketplace();
    setupProductFilters();
    loadMandiPrices();
    updateCartDisplay();
});

// Initialize marketplace functionality
function initializeMarketplace() {
    loadProducts();
    setupProductInteraction();
}

// Load products from API or local storage
function loadProducts() {
    const products = getSampleProducts();
    displayProducts(products);
}

// Get sample products data
function getSampleProducts() {
    return [
        {
            id: 1,
            name: 'Premium Wheat Seeds',
            description: 'High yield variety - 50kg bag',
            price: 2250,
            category: 'seeds',
            rating: 4.8,
            reviews: 23,
            icon: '🌾'
        },
        {
            id: 2,
            name: 'Hybrid Corn Seeds',
            description: 'Disease resistant - 25kg bag',
            price: 1800,
            category: 'seeds',
            rating: 4.7,
            reviews: 18,
            icon: '🌽'
        },
        {
            id: 3,
            name: 'Basmati Rice Seeds',
            description: 'Premium quality - 30kg bag',
            price: 3200,
            category: 'seeds',
            rating: 4.9,
            reviews: 35,
            icon: '🌾'
        },
        {
            id: 4,
            name: 'Organic Fertilizer NPK',
            description: '10:26:26 - 25kg bag',
            price: 850,
            category: 'fertilizers',
            rating: 4.6,
            reviews: 15,
            icon: '🧪'
        },
        {
            id: 5,
            name: 'Urea Fertilizer',
            description: '46% Nitrogen - 50kg bag',
            price: 1200,
            category: 'fertilizers',
            rating: 4.5,
            reviews: 28,
            icon: '🌱'
        },
        {
            id: 6,
            name: 'Vermicompost',
            description: 'Organic compost - 40kg bag',
            price: 600,
            category: 'fertilizers',
            rating: 4.8,
            reviews: 42,
            icon: '🍃'
        },
        {
            id: 7,
            name: 'Mini Tractor',
            description: '15 HP - Perfect for small farms',
            price: 250000,
            category: 'tools',
            rating: 4.9,
            reviews: 12,
            icon: '🚜'
        },
        {
            id: 8,
            name: 'Drip Irrigation Kit',
            description: 'Complete setup for 1 acre',
            price: 15000,
            category: 'tools',
            rating: 4.7,
            reviews: 25,
            icon: '💧'
        },
        {
            id: 9,
            name: 'Organic Pesticide',
            description: 'Neem-based - 1 liter bottle',
            price: 450,
            category: 'organic',
            rating: 4.8,
            reviews: 19,
            icon: '🌿'
        }
    ];
}

// Display products in the grid
function displayProducts(products) {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card product-item border rounded-lg p-4 hover:shadow-md transition-shadow" data-category="${product.category}" data-id="${product.id}">
            <div class="text-2xl mb-2">${product.icon}</div>
            <h4 class="font-semibold">${product.name}</h4>
            <p class="text-sm text-gray-600 mb-2">${product.description}</p>
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-green-600">₹${product.price.toLocaleString()}</span>
                <span class="text-xs text-gray-500">⭐ ${product.rating} (${product.reviews} reviews)</span>
            </div>
            <div class="flex space-x-2">
                <button onclick="openBuyNow(${product.id})" class="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Buy Now</button>
                <button onclick="addToCart(${product.id})" class="px-3 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50">+</button>
            </div>
        </div>
    `;
}

// Setup product filters
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-gray-200'));
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-gray-200');
            
            // Filter products
            const category = this.textContent.toLowerCase();
            filterProducts(category);
        });
    });
}

// Filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Setup product interaction
function setupProductInteraction() {
    // Add click handlers for product cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card')) {
            const productId = e.target.closest('.product-card').dataset.id;
            if (productId && !e.target.closest('button')) {
                openProductDetails(productId);
            }
        }
    });
}

// Open product details
function openProductDetails(productId) {
    SmartFarm.showNotification('Opening product details...', 'info');
    console.log('Opening product details for:', productId);
}

// Add to cart
function addToCart(productId) {
    SmartFarm.addToCart(productId);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    // Update cart modal if open
    const cartModal = document.getElementById('cartModal');
    if (cartModal && !cartModal.classList.contains('hidden')) {
        displayCartItems();
    }
}

// Display cart items in modal
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        cartItems.innerHTML = '';
    } else {
        cartEmpty.classList.add('hidden');
        cartSummary.classList.remove('hidden');
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item flex items-center justify-between p-3 border rounded-lg">
                <div class="flex items-center space-x-3">
                    <span class="text-2xl">${item.icon || '📦'}</span>
                    <div>
                        <h5 class="font-semibold">${item.name}</h5>
                        <p class="text-sm text-gray-600">₹${item.price} each</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQuantity(${item.id}, -1)" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">-</button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">+</button>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 ml-2">🗑️</button>
                </div>
            </div>
        `).join('');
        
        updateCartSummary();
    }
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 100;
    const total = subtotal + shipping;
    
    document.getElementById('cartSubtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;
}

// Open cart modal
function openCart() {
    SmartFarm.openModal('cartModal');
    displayCartItems();
}

// Close cart modal
function closeCart() {
    SmartFarm.closeModal('cartModal');
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        SmartFarm.showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    SmartFarm.showNotification('Redirecting to checkout...', 'info');
    // This would typically redirect to checkout page
    console.log('Proceeding to checkout with cart:', cart);
}

// Open buy now modal
function openBuyNow(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('buyNowModal');
    const content = document.getElementById('buyNowContent');
    
    if (modal && content) {
        content.innerHTML = createBuyNowContent(product);
        SmartFarm.openModal('buyNowModal');
    }
}

// Close buy now modal
function closeBuyNow() {
    SmartFarm.closeModal('buyNowModal');
}

// Create buy now content
function createBuyNowContent(product) {
    return `
        <div class="space-y-6">
            <div class="flex items-center space-x-4">
                <span class="text-4xl">${product.icon}</span>
                <div>
                    <h4 class="text-xl font-semibold">${product.name}</h4>
                    <p class="text-gray-600">${product.description}</p>
                    <div class="flex items-center space-x-4 mt-2">
                        <span class="text-2xl font-bold text-green-600">₹${product.price.toLocaleString()}</span>
                        <span class="text-sm text-gray-500">⭐ ${product.rating} (${product.reviews} reviews)</span>
                    </div>
                </div>
            </div>
            
            <div class="border-t pt-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <div class="flex items-center space-x-2">
                            <button onclick="updateBuyQuantity(-1)" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">-</button>
                            <input type="number" id="buyQuantity" value="1" min="1" class="w-16 text-center border border-gray-300 rounded px-2 py-1">
                            <button onclick="updateBuyQuantity(1)" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">+</button>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
                        <div class="text-2xl font-bold text-green-600" id="totalPrice">₹${product.price.toLocaleString()}</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 class="font-semibold text-blue-800 mb-2">Payment Options</h5>
                <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="payment" value="cash" checked>
                        <span>💵 Cash on Delivery</span>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="payment" value="online">
                        <span>💳 Online Payment</span>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="payment" value="coins">
                        <span>🪙 Pay with Coins</span>
                    </label>
                </div>
            </div>
            
            <div class="flex space-x-4">
                <button onclick="confirmPurchase(${product.id})" class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
                    Confirm Purchase
                </button>
                <button onclick="addToCartFromBuy(${product.id})" class="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Update buy quantity
function updateBuyQuantity(change) {
    const quantityInput = document.getElementById('buyQuantity');
    const currentQuantity = parseInt(quantityInput.value);
    const newQuantity = Math.max(1, currentQuantity + change);
    
    quantityInput.value = newQuantity;
    updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('buyQuantity').value);
    const productId = document.querySelector('#buyNowContent').dataset.productId;
    const product = getProductById(productId);
    
    if (product) {
        const total = product.price * quantity;
        document.getElementById('totalPrice').textContent = `₹${total.toLocaleString()}`;
    }
}

// Get product by ID
function getProductById(id) {
    const products = getSampleProducts();
    return products.find(product => product.id === parseInt(id));
}

// Confirm purchase
function confirmPurchase(productId) {
    const quantity = parseInt(document.getElementById('buyQuantity').value);
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    SmartFarm.showNotification('Processing purchase...', 'info');
    
    // Simulate purchase processing
    setTimeout(() => {
        SmartFarm.showNotification('Purchase successful!', 'success');
        closeBuyNow();
    }, 2000);
}

// Add to cart from buy modal
function addToCartFromBuy(productId) {
    const quantity = parseInt(document.getElementById('buyQuantity').value);
    SmartFarm.addToCart(productId, quantity);
    SmartFarm.showNotification('Added to cart!', 'success');
    closeBuyNow();
}

// Sell Product Functions
function openSellProduct() {
    SmartFarm.openModal('sellProductModal');
}

function closeSellProduct() {
    SmartFarm.closeModal('sellProductModal');
    resetSellProductForm();
}

function handleProductImages(event) {
    const files = Array.from(event.target.files);
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewGrid = document.getElementById('imagePreviewGrid');
    
    if (files.length > 0) {
        previewContainer.classList.remove('hidden');
        previewGrid.innerHTML = files.map((file, index) => `
            <div class="relative">
                <img src="${URL.createObjectURL(file)}" alt="Preview ${index + 1}" class="w-full h-24 object-cover rounded">
                <button onclick="removeProductImage(${index})" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
            </div>
        `).join('');
    }
}

function removeProductImage(index) {
    // Remove image from preview
    const previewGrid = document.getElementById('imagePreviewGrid');
    const imageDiv = previewGrid.children[index];
    if (imageDiv) {
        imageDiv.remove();
    }
}

function submitProduct() {
    if (!SmartFarm.validateForm('sellProductForm')) {
        SmartFarm.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const productData = getSellProductData();
    
    SmartFarm.showNotification('Submitting product...', 'info');
    
    // Simulate product submission
    setTimeout(() => {
        SmartFarm.showNotification('Product listed successfully!', 'success');
        closeSellProduct();
    }, 2000);
}

function saveProductDraft() {
    const productData = getSellProductData();
    localStorage.setItem('productDraft', JSON.stringify(productData));
    SmartFarm.showNotification('Product saved as draft', 'info');
}

function resetSellProductForm() {
    const form = document.getElementById('sellProductForm');
    if (form) {
        form.reset();
    }
    
    const previewContainer = document.getElementById('imagePreviewContainer');
    if (previewContainer) {
        previewContainer.classList.add('hidden');
    }
}

function getSellProductData() {
    return {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        quantity: document.getElementById('productQuantity').value,
        unit: document.getElementById('productUnit').value,
        price: document.getElementById('productPrice').value,
        state: document.getElementById('productState').value,
        city: document.getElementById('productCity').value,
        contactNumber: document.getElementById('contactNumber').value,
        contactTime: document.getElementById('contactTime').value,
        timestamp: new Date().toISOString()
    };
}

// My Orders Functions
function openMyOrders() {
    SmartFarm.openModal('myOrdersModal');
}

function closeMyOrders() {
    SmartFarm.closeModal('myOrdersModal');
}

// Mandi Prices Functions
function loadMandiPrices() {
    const prices = getSampleMandiPrices();
    displayMandiPrices(prices);
}

function getSampleMandiPrices() {
    return [
        { name: 'Wheat', price: 2150, change: 2.5, color: 'green' },
        { name: 'Rice', price: 3200, change: -1.2, color: 'yellow' },
        { name: 'Sugarcane', price: 350, change: 0.8, color: 'blue' },
        { name: 'Cotton', price: 6800, change: 3.1, color: 'purple' },
        { name: 'Onion', price: 1850, change: -5.2, color: 'orange' },
        { name: 'Tomato', price: 2400, change: 8.3, color: 'teal' }
    ];
}

function displayMandiPrices(prices) {
    // Prices are already displayed in HTML, this function can be used for dynamic updates
    console.log('Mandi prices loaded:', prices);
}

function updateMandiPrices(state) {
    SmartFarm.showNotification(`Loading prices for ${state}...`, 'info');
    // This would typically fetch prices for the selected state
    console.log('Updating mandi prices for:', state);
}

function viewAllPrices() {
    SmartFarm.showNotification('Opening all prices view...', 'info');
    // This would typically open a detailed prices page
    console.log('Viewing all prices');
}

// Export functions for global access
window.Marketplace = {
    addToCart,
    openCart,
    closeCart,
    openBuyNow,
    closeBuyNow,
    openSellProduct,
    closeSellProduct,
    submitProduct,
    saveProductDraft,
    openMyOrders,
    closeMyOrders,
    filterProducts,
    updateMandiPrices,
    viewAllPrices
};
