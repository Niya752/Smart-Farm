// News & Alerts - Specific JavaScript Functions

// Initialize news and alerts page
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsAlerts();
    setupNewsFilters();
    loadNews();
    loadWeatherData();
    loadMarketPrices();
    loadQuickAlerts();
});

// Initialize news and alerts functionality
function initializeNewsAlerts() {
    setupNewsInteraction();
    setupRealTimeUpdates();
}

// Load news from API or local storage
function loadNews() {
    const news = getSampleNews();
    displayNews(news);
}

// Get sample news data
function getSampleNews() {
    return [
        {
            id: 1,
            title: 'Monsoon Arrives Early in Northern India',
            content: 'The Indian Meteorological Department has announced that the monsoon has arrived 10 days earlier than expected in northern states. Farmers are advised to prepare their fields and adjust their planting schedules accordingly.',
            category: 'weather',
            type: 'news',
            priority: 'urgent',
            views: 1200,
            likes: 89,
            comments: 23,
            timestamp: '2 hours ago',
            icon: '🌦️',
            color: 'blue'
        },
        {
            id: 2,
            title: 'Wheat Prices Rise 15% Due to Export Demand',
            content: 'International demand for Indian wheat has increased significantly, leading to a 15% rise in domestic prices. This is good news for wheat farmers who can expect better returns this season.',
            category: 'market-prices',
            type: 'news',
            priority: 'important',
            views: 856,
            likes: 67,
            comments: 15,
            timestamp: '4 hours ago',
            icon: '💰',
            color: 'green'
        },
        {
            id: 3,
            title: 'New AI-Powered Soil Analysis Tool Launched',
            content: 'A revolutionary AI-powered soil analysis tool has been launched that can provide instant soil health reports and crop recommendations. The tool is now available for free to all Smart Farm users.',
            category: 'technology',
            type: 'news',
            priority: 'normal',
            views: 2100,
            likes: 156,
            comments: 42,
            timestamp: '6 hours ago',
            icon: '🔬',
            color: 'purple'
        },
        {
            id: 4,
            title: 'New Subsidy Scheme for Solar Pumps Announced',
            content: 'The government has announced a new subsidy scheme providing up to 90% subsidy on solar water pumps for irrigation. Applications are now open for eligible farmers.',
            category: 'government-schemes',
            type: 'news',
            priority: 'normal',
            views: 1800,
            likes: 124,
            comments: 38,
            timestamp: '1 day ago',
            icon: '🏛️',
            color: 'yellow'
        }
    ];
}

// Display news in the feed
function displayNews(news) {
    const container = document.querySelector('.space-y-6');
    if (!container) return;
    
    container.innerHTML = news.map(item => createNewsCard(item)).join('');
}

// Create news card HTML
function createNewsCard(item) {
    const priorityColors = {
        'urgent': 'bg-red-100 text-red-800',
        'important': 'bg-yellow-100 text-yellow-800',
        'normal': 'bg-blue-100 text-blue-800'
    };

    const categoryColors = {
        'weather': 'bg-blue-100 text-blue-800',
        'market-prices': 'bg-green-100 text-green-800',
        'technology': 'bg-purple-100 text-purple-800',
        'government-schemes': 'bg-yellow-100 text-yellow-800'
    };

    return `
        <div class="news-card bg-white rounded-lg shadow-lg overflow-hidden" data-category="${item.category}" data-type="${item.type}">
            <div class="h-48 bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center">
                <span class="text-6xl">${item.icon}</span>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center space-x-2">
                        <span class="${categoryColors[item.category]} px-2 py-1 rounded text-xs">${item.category.replace('-', ' ').toUpperCase()}</span>
                        <span class="${priorityColors[item.priority]} px-2 py-1 rounded text-xs">${item.priority.toUpperCase()}</span>
                    </div>
                    <span class="text-sm text-gray-500">${item.timestamp}</span>
                </div>
                <h4 class="text-xl font-semibold text-gray-800 mb-2">${item.title}</h4>
                <p class="text-gray-600 mb-4">${item.content}</p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👀 ${item.views} views</span>
                        <span>👍 ${item.likes} likes</span>
                        <span>💬 ${item.comments} comments</span>
                    </div>
                    <button onclick="readNews(${item.id})" class="text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                </div>
            </div>
        </div>
    `;
}

// Setup news filters
function setupNewsFilters() {
    const searchInput = document.querySelector('input[placeholder*="Search news"]');
    const categorySelect = document.querySelectorAll('select')[0];
    const typeSelect = document.querySelectorAll('select')[1];
    const sortSelect = document.querySelectorAll('select')[2];

    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterNews, 300));
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', filterNews);
    }

    if (typeSelect) {
        typeSelect.addEventListener('change', filterNews);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', sortNews);
    }
}

// Filter news based on search and filters
function filterNews() {
    const searchTerm = document.querySelector('input[placeholder*="Search news"]').value.toLowerCase();
    const category = document.querySelectorAll('select')[0].value;
    const type = document.querySelectorAll('select')[1].value;
    
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        const cardCategory = card.dataset.category || '';
        const cardType = card.dataset.type || '';
        
        const matchesSearch = !searchTerm || title.includes(searchTerm) || content.includes(searchTerm);
        const matchesCategory = !category || cardCategory === category.toLowerCase().replace('🌦️ ', '').replace('💰 ', '').replace('🌱 ', '').replace('🏛️ ', '').replace('🔬 ', '').replace('📈 ', '');
        const matchesType = !type || cardType === type.toLowerCase().replace('📰 ', '').replace('⚠️ ', '').replace('📊 ', '').replace('💡 ', '');
        
        if (matchesSearch && matchesCategory && matchesType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Sort news based on selected criteria
function sortNews() {
    const sortBy = document.querySelectorAll('select')[2].value;
    const container = document.querySelector('.space-y-6');
    const cards = Array.from(container.querySelectorAll('.news-card'));
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'Most Popular':
                const viewsA = parseInt(a.querySelector('[data-views]')?.textContent || '0');
                const viewsB = parseInt(b.querySelector('[data-views]')?.textContent || '0');
                return viewsB - viewsA;
            case 'Most Important':
                const priorityOrder = { 'urgent': 3, 'important': 2, 'normal': 1 };
                const priorityA = priorityOrder[a.dataset.priority] || 1;
                const priorityB = priorityOrder[b.dataset.priority] || 1;
                return priorityB - priorityA;
            case 'By Category':
                return a.dataset.category.localeCompare(b.dataset.category);
            default: // Latest
                return 0; // Keep original order
        }
    });
    
    cards.forEach(card => container.appendChild(card));
}

// Setup news interaction
function setupNewsInteraction() {
    // Add click handlers for news cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.news-card')) {
            const newsId = e.target.closest('.news-card').dataset.id;
            if (newsId && !e.target.closest('button')) {
                readNews(newsId);
            }
        }
    });
}

// Read news article
function readNews(newsId) {
    SmartFarm.showNotification('Opening news article...', 'info');
    console.log('Reading news:', newsId);
    // This would typically open a detailed news view or modal
}

// Load weather data
function loadWeatherData() {
    const weatherData = getSampleWeatherData();
    updateWeatherWidget(weatherData);
}

// Get sample weather data
function getSampleWeatherData() {
    return {
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '☀️'
    };
}

// Update weather widget
function updateWeatherWidget(data) {
    const weatherWidget = document.querySelector('.bg-white.rounded-lg.shadow-lg.p-6');
    if (weatherWidget) {
        const iconElement = weatherWidget.querySelector('.text-4xl');
        const tempElement = weatherWidget.querySelector('.text-3xl');
        const conditionElement = weatherWidget.querySelector('.text-sm.text-gray-600');
        
        if (iconElement) iconElement.textContent = data.icon;
        if (tempElement) tempElement.textContent = `${data.temperature}°C`;
        if (conditionElement) conditionElement.textContent = data.condition;
    }
}

// Load market prices
function loadMarketPrices() {
    const prices = getSampleMarketPrices();
    updateMarketPricesWidget(prices);
}

// Get sample market prices
function getSampleMarketPrices() {
    return [
        { name: 'Wheat', price: 2150 },
        { name: 'Rice', price: 3200 },
        { name: 'Cotton', price: 6800 },
        { name: 'Sugarcane', price: 350 }
    ];
}

// Update market prices widget
function updateMarketPricesWidget(prices) {
    const pricesWidget = document.querySelector('.bg-white.rounded-lg.shadow-lg.p-6:last-child');
    if (pricesWidget) {
        const pricesList = pricesWidget.querySelector('.space-y-3');
        if (pricesList) {
            pricesList.innerHTML = prices.map(price => `
                <div class="flex justify-between items-center">
                    <span class="text-sm">${price.name}</span>
                    <span class="font-semibold text-green-600">₹${price.price.toLocaleString()}</span>
                </div>
            `).join('');
        }
    }
}

// Load quick alerts
function loadQuickAlerts() {
    const alerts = getSampleQuickAlerts();
    updateQuickAlertsWidget(alerts);
}

// Get sample quick alerts
function getSampleQuickAlerts() {
    return [
        {
            type: 'pest',
            title: 'Pest Alert',
            message: 'Locust swarm detected in nearby areas',
            icon: '🚨',
            color: 'red'
        },
        {
            type: 'price',
            title: 'Price Alert',
            message: 'Tomato prices dropped by 20%',
            icon: '⚠️',
            color: 'yellow'
        },
        {
            type: 'good',
            title: 'Good News',
            message: 'New irrigation scheme approved',
            icon: '✅',
            color: 'green'
        }
    ];
}

// Update quick alerts widget
function updateQuickAlertsWidget(alerts) {
    const alertsWidget = document.querySelector('.bg-white.rounded-lg.shadow-lg.p-6:nth-child(2)');
    if (alertsWidget) {
        const alertsList = alertsWidget.querySelector('.space-y-3');
        if (alertsList) {
            alertsList.innerHTML = alerts.map(alert => `
                <div class="flex items-start space-x-3 p-3 bg-${alert.color}-50 rounded-lg">
                    <span class="text-${alert.color}-500 text-lg">${alert.icon}</span>
                    <div>
                        <div class="font-semibold text-${alert.color}-800 text-sm">${alert.title}</div>
                        <div class="text-xs text-${alert.color}-600">${alert.message}</div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Setup real-time updates
function setupRealTimeUpdates() {
    // Update weather every 30 minutes
    setInterval(loadWeatherData, 30 * 60 * 1000);
    
    // Update market prices every 15 minutes
    setInterval(loadMarketPrices, 15 * 60 * 1000);
    
    // Update news every hour
    setInterval(loadNews, 60 * 60 * 1000);
}

// Dismiss alert
function dismissAlert(alertElement) {
    alertElement.style.display = 'none';
}

// Load more news
function loadMoreNews() {
    SmartFarm.showNotification('Loading more news...', 'info');
    // This would typically load additional news from API
    console.log('Loading more news');
}

// View all prices
function viewAllPrices() {
    SmartFarm.showNotification('Opening detailed prices view...', 'info');
    // This would typically open a detailed prices page
    console.log('Viewing all prices');
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
window.NewsAlerts = {
    readNews,
    loadMoreNews,
    viewAllPrices,
    dismissAlert,
    filterNews,
    sortNews
};
