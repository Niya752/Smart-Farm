// Farm Visits - Specific JavaScript Functions

// Initialize farm visits page
document.addEventListener('DOMContentLoaded', function() {
    initializeFarmVisits();
    setupFarmFilters();
    loadFarms();
});

// Initialize farm visits functionality
function initializeFarmVisits() {
    setupFarmInteraction();
}

// Load farms from API or local storage
function loadFarms() {
    const farms = getSampleFarms();
    displayFarms(farms);
}

// Get sample farms data
function getSampleFarms() {
    return [
        {
            id: 1,
            name: 'Green Valley Organic Farm',
            type: 'organic',
            size: '15 acres',
            location: 'Maharashtra',
            description: 'Learn sustainable farming techniques and organic crop cultivation methods',
            price: 200,
            rating: 4.9,
            reviews: 127,
            icon: '🌱',
            features: ['Featured'],
            included: ['Farm Tour', 'Fresh Produce', 'Educational Session']
        },
        {
            id: 2,
            name: 'Happy Cow Dairy Farm',
            type: 'dairy',
            size: '25 acres',
            location: 'Punjab',
            description: 'Experience modern dairy farming and learn milk production techniques',
            price: 180,
            rating: 4.8,
            reviews: 89,
            icon: '🐄',
            features: ['Popular'],
            included: ['Farm Tour', 'Traditional Meal', 'Hands-on Activities']
        },
        {
            id: 3,
            name: 'Sunrise Poultry Farm',
            type: 'poultry',
            size: '8 acres',
            location: 'Karnataka',
            description: 'Learn poultry management and egg production best practices',
            price: 150,
            rating: 4.6,
            reviews: 45,
            icon: '🐔',
            features: ['New'],
            included: ['Farm Tour', 'Educational Session', 'Refreshments']
        },
        {
            id: 4,
            name: 'Aqua Fresh Fish Farm',
            type: 'aquaculture',
            size: '12 acres',
            location: 'Tamil Nadu',
            description: 'Discover fish farming techniques and water management systems',
            price: 250,
            rating: 4.7,
            reviews: 63,
            icon: '🐟',
            features: ['Special'],
            included: ['Farm Tour', 'Fresh Produce', 'Hands-on Activities']
        },
        {
            id: 5,
            name: 'Urban Hydroponic Farm',
            type: 'hydroponic',
            size: '2 acres',
            location: 'Maharashtra',
            description: 'Learn soilless farming and urban agriculture techniques',
            price: 300,
            rating: 4.9,
            reviews: 78,
            icon: '🥬',
            features: ['Modern'],
            included: ['Farm Tour', 'Educational Session', 'Refreshments']
        },
        {
            id: 6,
            name: 'Golden Apple Orchard',
            type: 'fruit',
            size: '30 acres',
            location: 'Himachal Pradesh',
            description: 'Experience fruit cultivation and orchard management practices',
            price: 350,
            rating: 4.8,
            reviews: 92,
            icon: '🍎',
            features: ['Premium'],
            included: ['Farm Tour', 'Fresh Produce', 'Traditional Meal']
        }
    ];
}

// Display farms in the grid
function displayFarms(farms) {
    const container = document.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = farms.map(farm => createFarmCard(farm)).join('');
}

// Create farm card HTML
function createFarmCard(farm) {
    const featuresHtml = farm.features.map(feature => {
        const colors = {
            'Featured': 'bg-yellow-100 text-yellow-800',
            'Popular': 'bg-green-100 text-green-800',
            'New': 'bg-blue-100 text-blue-800',
            'Special': 'bg-purple-100 text-purple-800',
            'Modern': 'bg-teal-100 text-teal-800',
            'Premium': 'bg-orange-100 text-orange-800'
        };
        return `<span class="${colors[feature] || 'bg-gray-100 text-gray-800'} px-2 py-1 rounded text-xs">${feature}</span>`;
    }).join('');

    return `
        <div class="farm-card bg-white rounded-lg shadow-lg overflow-hidden" data-type="${farm.type}" data-id="${farm.id}">
            <div class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span class="text-6xl">${farm.icon}</span>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold text-lg">${farm.name}</h4>
                    ${featuresHtml}
                </div>
                <p class="text-sm text-gray-600 mb-2">${farm.icon} ${farm.type.charAt(0).toUpperCase() + farm.type.slice(1)} Farm • ${farm.size} • ${farm.location}</p>
                <p class="text-sm text-gray-600 mb-3">${farm.description}</p>
                <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center space-x-2">
                        <span class="text-yellow-500">${'⭐'.repeat(Math.floor(farm.rating))}</span>
                        <span class="text-sm text-gray-600">${farm.rating} (${farm.reviews} reviews)</span>
                    </div>
                    <span class="font-bold text-green-600">₹${farm.price}/person</span>
                </div>
                <div class="flex space-x-2">
                    <button onclick="openBookVisit(${farm.id})" class="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Book Visit</button>
                    <button class="px-3 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50">❤️</button>
                </div>
            </div>
        </div>
    `;
}

// Setup farm filters
function setupFarmFilters() {
    const searchInput = document.querySelector('input[placeholder*="Search farms"]');
    const typeSelect = document.querySelectorAll('select')[0];
    const locationSelect = document.querySelectorAll('select')[1];
    const sortSelect = document.querySelectorAll('select')[2];

    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterFarms, 300));
    }

    if (typeSelect) {
        typeSelect.addEventListener('change', filterFarms);
    }

    if (locationSelect) {
        locationSelect.addEventListener('change', filterFarms);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', sortFarms);
    }
}

// Filter farms based on search and filters
function filterFarms() {
    const searchTerm = document.querySelector('input[placeholder*="Search farms"]').value.toLowerCase();
    const type = document.querySelectorAll('select')[0].value;
    const location = document.querySelectorAll('select')[1].value;
    
    const farmCards = document.querySelectorAll('.farm-card');
    
    farmCards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const cardType = card.dataset.type || '';
        const cardLocation = card.querySelector('p').textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || name.includes(searchTerm) || description.includes(searchTerm);
        const matchesType = !type || cardType === type.toLowerCase().replace('🌱 ', '').replace('🐄 ', '').replace('🐔 ', '').replace('🐟 ', '').replace('🌾 ', '').replace('🥬 ', '').replace('🍎 ', '').replace('🥕 ', '');
        const matchesLocation = !location || cardLocation.includes(location.toLowerCase());
        
        if (matchesSearch && matchesType && matchesLocation) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Sort farms based on selected criteria
function sortFarms() {
    const sortBy = document.querySelectorAll('select')[2].value;
    const container = document.querySelector('.grid');
    const cards = Array.from(container.querySelectorAll('.farm-card'));
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'Price: Low to High':
                const priceA = parseInt(a.querySelector('.text-green-600').textContent.replace('₹', '').replace('/person', ''));
                const priceB = parseInt(b.querySelector('.text-green-600').textContent.replace('₹', '').replace('/person', ''));
                return priceA - priceB;
            case 'Price: High to Low':
                const priceA2 = parseInt(a.querySelector('.text-green-600').textContent.replace('₹', '').replace('/person', ''));
                const priceB2 = parseInt(b.querySelector('.text-green-600').textContent.replace('₹', '').replace('/person', ''));
                return priceB2 - priceA2;
            case 'Rating: High to Low':
                const ratingA = parseFloat(a.querySelector('.text-sm').textContent.split(' ')[0]);
                const ratingB = parseFloat(b.querySelector('.text-sm').textContent.split(' ')[0]);
                return ratingB - ratingA;
            default: // Distance
                return 0; // Keep original order
        }
    });
    
    cards.forEach(card => container.appendChild(card));
}

// Setup farm interaction
function setupFarmInteraction() {
    // Add click handlers for farm cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.farm-card')) {
            const farmId = e.target.closest('.farm-card').dataset.id;
            if (farmId && !e.target.closest('button')) {
                openFarmDetails(farmId);
            }
        }
    });
}

// Open farm details
function openFarmDetails(farmId) {
    SmartFarm.showNotification('Opening farm details...', 'info');
    console.log('Opening farm details for:', farmId);
}

// List My Farm Functions
function openListMyFarm() {
    SmartFarm.openModal('listMyFarmModal');
}

function closeListMyFarm() {
    SmartFarm.closeModal('listMyFarmModal');
    resetFarmForm();
}

function handleFarmImages(event) {
    const files = Array.from(event.target.files);
    const previewContainer = document.getElementById('farmImagePreviewContainer');
    const previewGrid = document.getElementById('farmImagePreviewGrid');
    
    if (files.length > 0) {
        previewContainer.classList.remove('hidden');
        previewGrid.innerHTML = files.map((file, index) => `
            <div class="relative">
                <img src="${URL.createObjectURL(file)}" alt="Preview ${index + 1}" class="w-full h-24 object-cover rounded">
                <button onclick="removeFarmImage(${index})" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
            </div>
        `).join('');
    }
}

function removeFarmImage(index) {
    const previewGrid = document.getElementById('farmImagePreviewGrid');
    const imageDiv = previewGrid.children[index];
    if (imageDiv) {
        imageDiv.remove();
    }
}

function submitFarmListing() {
    if (!SmartFarm.validateForm('listFarmForm')) {
        SmartFarm.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const farmData = getFarmFormData();
    
    SmartFarm.showNotification('Submitting farm listing...', 'info');
    
    // Simulate farm submission
    setTimeout(() => {
        SmartFarm.showNotification('Farm listed successfully!', 'success');
        closeListMyFarm();
    }, 2000);
}

function saveFarmDraft() {
    const farmData = getFarmFormData();
    localStorage.setItem('farmDraft', JSON.stringify(farmData));
    SmartFarm.showNotification('Farm saved as draft', 'info');
}

function resetFarmForm() {
    const form = document.getElementById('listFarmForm');
    if (form) {
        form.reset();
    }
    
    const previewContainer = document.getElementById('farmImagePreviewContainer');
    if (previewContainer) {
        previewContainer.classList.add('hidden');
    }
}

function getFarmFormData() {
    return {
        farmerName: document.getElementById('farmerName').value,
        farmName: document.getElementById('farmName').value,
        farmAddress: document.getElementById('farmAddress').value,
        landArea: document.getElementById('landArea').value,
        areaUnit: document.getElementById('areaUnit').value,
        farmType: document.getElementById('farmType').value,
        farmDescription: document.getElementById('farmDescription').value,
        visitPrice: document.getElementById('visitPrice').value,
        maxVisitors: document.getElementById('maxVisitors').value,
        farmContactNumber: document.getElementById('farmContactNumber').value,
        bestTime: document.getElementById('bestTime').value,
        timestamp: new Date().toISOString()
    };
}

// Book Visit Functions
function openBookVisit(farmId) {
    const farm = getFarmById(farmId);
    if (!farm) return;
    
    const modal = document.getElementById('bookVisitModal');
    const content = document.getElementById('bookVisitContent');
    
    if (modal && content) {
        content.innerHTML = createBookVisitContent(farm);
        SmartFarm.openModal('bookVisitModal');
    }
}

function closeBookVisit() {
    SmartFarm.closeModal('bookVisitModal');
}

function createBookVisitContent(farm) {
    return `
        <div class="space-y-6">
            <div class="flex items-center space-x-4">
                <span class="text-4xl">${farm.icon}</span>
                <div>
                    <h4 class="text-xl font-semibold">${farm.name}</h4>
                    <p class="text-gray-600">${farm.type.charAt(0).toUpperCase() + farm.type.slice(1)} Farm • ${farm.size} • ${farm.location}</p>
                    <div class="flex items-center space-x-4 mt-2">
                        <span class="text-2xl font-bold text-green-600">₹${farm.price}/person</span>
                        <span class="text-sm text-gray-500">⭐ ${farm.rating} (${farm.reviews} reviews)</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
                <h5 class="font-semibold text-gray-800 mb-2">What's Included:</h5>
                <div class="grid grid-cols-2 gap-2">
                    ${farm.included.map(item => `<span class="text-sm text-gray-600">• ${item}</span>`).join('')}
                </div>
            </div>
            
            <div class="border-t pt-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Number of Visitors</label>
                        <div class="flex items-center space-x-2">
                            <button onclick="updateVisitQuantity(-1)" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">-</button>
                            <input type="number" id="visitQuantity" value="1" min="1" class="w-16 text-center border border-gray-300 rounded px-2 py-1">
                            <button onclick="updateVisitQuantity(1)" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">+</button>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Visit Date</label>
                        <input type="date" id="visitDate" class="w-full border border-gray-300 rounded px-3 py-2" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 class="font-semibold text-blue-800 mb-2">Payment Options</h5>
                <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="visitPayment" value="cash" checked>
                        <span>💵 Cash on Arrival</span>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="visitPayment" value="online">
                        <span>💳 Online Payment</span>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="visitPayment" value="coins">
                        <span>🪙 Pay with Coins</span>
                    </label>
                </div>
            </div>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 class="font-semibold text-green-800 mb-2">Total Amount</h5>
                <div class="text-2xl font-bold text-green-600" id="visitTotalPrice">₹${farm.price}</div>
                <p class="text-sm text-green-700">Price includes all activities and refreshments</p>
            </div>
            
            <div class="flex space-x-4">
                <button onclick="confirmVisitBooking(${farm.id})" class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
                    Confirm Booking
                </button>
                <button onclick="closeBookVisit()" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Cancel
                </button>
            </div>
        </div>
    `;
}

function updateVisitQuantity(change) {
    const quantityInput = document.getElementById('visitQuantity');
    const currentQuantity = parseInt(quantityInput.value);
    const newQuantity = Math.max(1, currentQuantity + change);
    
    quantityInput.value = newQuantity;
    updateVisitTotalPrice();
}

function updateVisitTotalPrice() {
    const quantity = parseInt(document.getElementById('visitQuantity').value);
    const farmId = document.querySelector('#bookVisitContent').dataset.farmId;
    const farm = getFarmById(farmId);
    
    if (farm) {
        const total = farm.price * quantity;
        document.getElementById('visitTotalPrice').textContent = `₹${total.toLocaleString()}`;
    }
}

function confirmVisitBooking(farmId) {
    const quantity = parseInt(document.getElementById('visitQuantity').value);
    const visitDate = document.getElementById('visitDate').value;
    const paymentMethod = document.querySelector('input[name="visitPayment"]:checked').value;
    
    if (!visitDate) {
        SmartFarm.showNotification('Please select a visit date', 'error');
        return;
    }
    
    SmartFarm.showNotification('Processing booking...', 'info');
    
    // Simulate booking processing
    setTimeout(() => {
        SmartFarm.showNotification('Booking confirmed!', 'success');
        closeBookVisit();
    }, 2000);
}

function getFarmById(id) {
    const farms = getSampleFarms();
    return farms.find(farm => farm.id === parseInt(id));
}

// My Bookings Functions
function openMyBookings() {
    SmartFarm.openModal('myBookingsModal');
}

function closeMyBookings() {
    SmartFarm.closeModal('myBookingsModal');
}

// Utility functions
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

// Export functions for global access
window.FarmVisits = {
    openListMyFarm,
    closeListMyFarm,
    submitFarmListing,
    saveFarmDraft,
    openBookVisit,
    closeBookVisit,
    openMyBookings,
    closeMyBookings,
    filterFarms,
    sortFarms
};
