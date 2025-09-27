// Smart Farm - Main JavaScript Functions

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let coinBalance = parseInt(localStorage.getItem('coinBalance')) || 1250;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateCoinBalance();
    initializeApp();
});

// Initialize app with backend check
async function initializeApp() {
    const isBackendAvailable = await checkBackendHealth();
    
    if (isBackendAvailable) {
        console.log('✅ Backend API is available');
        showStatusIndicator('🌐 API Connected', 'green');
    } else {
        console.log('⚠️ Backend API not available, using static data');
        showStatusIndicator('📡 Offline Mode', 'yellow');
    }
}

// Show status indicator
function showStatusIndicator(message, color) {
    const statusIndicator = document.createElement('div');
    statusIndicator.className = `fixed top-4 right-4 bg-${color}-500 text-white px-3 py-1 rounded-full text-sm z-50`;
    statusIndicator.innerHTML = message;
    document.body.appendChild(statusIndicator);
    
    setTimeout(() => {
        statusIndicator.remove();
    }, 3000);
}

// Backend health check
async function checkBackendHealth() {
    try {
        const response = await fetch('http://localhost:8000/health', {
            method: 'GET',
            timeout: 5000
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Update coin balance display
function updateCoinBalance() {
    const coinBalanceElement = document.getElementById('coinBalance');
    if (coinBalanceElement) {
        coinBalanceElement.textContent = coinBalance.toLocaleString();
    }
    localStorage.setItem('coinBalance', coinBalance.toString());
}

// Update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity,
            name: `Product ${productId}`,
            price: 100 // Default price
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart!', 'success');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item removed from cart!', 'info');
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-4 py-2 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// File upload functions
function handleFileSelect(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(file);
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// API functions
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

// Weather API integration
async function loadRealTimeWeather() {
    try {
        const weatherData = await fetchData('http://localhost:8000/api/weather');
        if (weatherData) {
            updateWeatherDisplay(weatherData);
        }
    } catch (error) {
        console.log('Weather data not available');
    }
}

function updateWeatherDisplay(weatherData) {
    const weatherElement = document.getElementById('weatherInfo');
    if (weatherElement) {
        weatherElement.innerHTML = `
            <div class="text-center">
                <div class="text-2xl">${weatherData.icon}</div>
                <div class="text-lg font-semibold">${weatherData.temperature}°C</div>
                <div class="text-sm text-gray-600">${weatherData.condition}</div>
                <div class="text-xs text-gray-500">Humidity: ${weatherData.humidity}%</div>
            </div>
        `;
    }
}

// Crop recommendations API
async function loadRealCropRecommendations() {
    try {
        const recommendations = await fetchData('http://localhost:8000/api/crop-recommendations');
        if (recommendations) {
            updateCropRecommendations(recommendations);
        }
    } catch (error) {
        console.log('Crop recommendations not available');
    }
}

function updateCropRecommendations(recommendations) {
    const cropSelect = document.getElementById('cropSelect');
    if (cropSelect && recommendations.length > 0) {
        cropSelect.innerHTML = '<option value="">Select a crop...</option>';
        recommendations.slice(0, 5).forEach((rec, index) => {
            const option = document.createElement('option');
            option.value = rec.crop_name.toLowerCase();
            option.textContent = `${rec.crop_name} (Score: ${rec.score})`;
            option.dataset.score = rec.score;
            option.dataset.suitability = rec.suitability;
            cropSelect.appendChild(option);
        });
    }
}

// Government schemes API
async function loadGovernmentSchemes() {
    try {
        const schemes = await fetchData('http://localhost:8000/api/government-schemes');
        if (schemes) {
            updateGovernmentSchemes(schemes);
        }
    } catch (error) {
        console.log('Government schemes not available');
    }
}

function updateGovernmentSchemes(schemes) {
    const schemesContainer = document.querySelector('#government-schemes .grid');
    if (schemesContainer && schemes.length > 0) {
        schemes.slice(0, 3).forEach(scheme => {
            const schemeCard = document.createElement('div');
            schemeCard.className = 'bg-white rounded-lg p-4 border border-gray-200';
            schemeCard.innerHTML = `
                <h4 class="font-semibold text-gray-800 mb-2">${scheme.scheme_name}</h4>
                <p class="text-sm text-gray-600 mb-3">${scheme.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-green-600 font-semibold">₹${scheme.benefit_amount.toLocaleString()}</span>
                    <span class="bg-${scheme.priority_level === 'high' ? 'red' : scheme.priority_level === 'medium' ? 'yellow' : 'green'}-100 text-${scheme.priority_level === 'high' ? 'red' : scheme.priority_level === 'medium' ? 'yellow' : 'green'}-800 px-2 py-1 rounded text-xs">${scheme.priority_level}</span>
                </div>
            `;
            schemesContainer.appendChild(schemeCard);
        });
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other files
window.SmartFarm = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    updateCoinBalance,
    showNotification,
    openModal,
    closeModal,
    validateForm,
    handleFileSelect,
    loadRealTimeWeather,
    loadRealCropRecommendations,
    loadGovernmentSchemes,
    formatCurrency,
    formatDate,
    debounce
};
