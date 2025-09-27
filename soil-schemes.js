// Soil Analysis & Government Schemes - Specific JavaScript Functions

// Initialize soil analysis page
document.addEventListener('DOMContentLoaded', function() {
    initializeSoilAnalysis();
    loadGovernmentSchemes();
    setupCropRecommendation();
});

// Initialize soil analysis functionality
function initializeSoilAnalysis() {
    // Load real-time weather data
    loadRealTimeWeather();
    
    // Load crop recommendations
    loadRealCropRecommendations();
    
    // Setup file upload functionality
    setupFileUpload();
}

// Setup crop recommendation functionality
function setupCropRecommendation() {
    const cropSelect = document.getElementById('cropSelect');
    if (cropSelect) {
        cropSelect.addEventListener('change', handleCropSelection);
    }
}

// Handle crop selection and show recommendations
function handleCropSelection(event) {
    const selectedCrop = event.target.value;
    const recommendationDiv = document.getElementById('cropRecommendation');
    const modificationsDiv = document.getElementById('modifications');
    
    if (selectedCrop && recommendationDiv && modificationsDiv) {
        recommendationDiv.classList.remove('hidden');
        showCropRecommendations(selectedCrop, modificationsDiv);
    } else if (recommendationDiv) {
        recommendationDiv.classList.add('hidden');
    }
}

// Show crop recommendations based on selection
function showCropRecommendations(crop, container) {
    // Show loading state
    container.innerHTML = '<div class="text-center py-4"><div class="spinner"></div><p>Generating recommendations...</p></div>';
    
    // Simulate API call delay
    setTimeout(() => {
        const recommendations = getCropRecommendations(crop);
        displayRecommendations(recommendations, container);
    }, 1000);
}

// Get crop recommendations data
function getCropRecommendations(crop) {
    const cropData = {
        wheat: {
            modifications: [
                { type: 'nitrogen', text: 'Apply nitrogen fertilizer (120kg/acre)', color: 'red', priority: 'high' },
                { type: 'phosphorus', text: 'Add phosphorus for root development (60kg/acre)', color: 'orange', priority: 'medium' },
                { type: 'potassium', text: 'Maintain potassium levels (80kg/acre)', color: 'green', priority: 'low' },
                { type: 'organic', text: 'Add organic matter to improve soil structure', color: 'purple', priority: 'high' }
            ],
            timing: 'Plant in October-November for best results',
            expectedYield: '45-50 quintals/acre',
            profitMargin: 'High'
        },
        rice: {
            modifications: [
                { type: 'water', text: 'Ensure proper water management and drainage', color: 'blue', priority: 'high' },
                { type: 'nitrogen', text: 'Split nitrogen application (150kg/acre)', color: 'red', priority: 'high' },
                { type: 'zinc', text: 'Apply zinc sulfate (25kg/acre)', color: 'purple', priority: 'medium' },
                { type: 'pathogen', text: 'Apply bio-fungicide for pathogen control', color: 'red', priority: 'high' }
            ],
            timing: 'Plant in June-July for Kharif season',
            expectedYield: '35-40 quintals/acre',
            profitMargin: 'Medium'
        },
        corn: {
            modifications: [
                { type: 'nitrogen', text: 'High nitrogen requirement (180kg/acre)', color: 'red', priority: 'high' },
                { type: 'phosphorus', text: 'Phosphorus for root development (80kg/acre)', color: 'orange', priority: 'high' },
                { type: 'potassium', text: 'Potassium for stalk strength (100kg/acre)', color: 'green', priority: 'medium' }
            ],
            timing: 'Plant in March-April for summer crop',
            expectedYield: '60-70 quintals/acre',
            profitMargin: 'High'
        },
        potato: {
            modifications: [
                { type: 'potassium', text: 'High potassium for tuber development (120kg/acre)', color: 'green', priority: 'high' },
                { type: 'phosphorus', text: 'Phosphorus for root growth (70kg/acre)', color: 'orange', priority: 'high' },
                { type: 'organic', text: 'Add compost for better soil structure', color: 'purple', priority: 'medium' }
            ],
            timing: 'Plant in October-November for winter crop',
            expectedYield: '200-250 quintals/acre',
            profitMargin: 'High'
        },
        tomato: {
            modifications: [
                { type: 'calcium', text: 'Calcium for fruit quality (150kg/acre)', color: 'blue', priority: 'high' },
                { type: 'phosphorus', text: 'Phosphorus for flowering (60kg/acre)', color: 'orange', priority: 'high' },
                { type: 'pathogen', text: 'Apply fungicide for disease prevention', color: 'red', priority: 'high' }
            ],
            timing: 'Plant in August-September for winter crop',
            expectedYield: '300-400 quintals/acre',
            profitMargin: 'Very High'
        }
    };
    
    return cropData[crop] || {
        modifications: [
            { type: 'general', text: 'General soil improvement recommendations', color: 'blue', priority: 'medium' }
        ],
        timing: 'Consult local agricultural extension for timing',
        expectedYield: 'Varies by crop and conditions',
        profitMargin: 'Medium'
    };
}

// Display recommendations in the UI
function displayRecommendations(recommendations, container) {
    const modificationsHtml = recommendations.modifications.map(mod => `
        <div class="flex items-center space-x-3 p-3 bg-${mod.color}-50 rounded-lg border-l-4 border-${mod.color}-400">
            <span class="w-3 h-3 bg-${mod.color}-500 rounded-full"></span>
            <div class="flex-1">
                <span class="text-sm text-${mod.color}-800 font-medium">${mod.text}</span>
                <span class="ml-2 px-2 py-1 bg-${mod.color}-200 text-${mod.color}-800 text-xs rounded-full">
                    ${mod.priority} priority
                </span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="space-y-4">
            <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <h6 class="font-semibold text-green-800 mb-2">📅 Planting Timing</h6>
                <p class="text-sm text-green-700">${recommendations.timing}</p>
            </div>
            
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <h6 class="font-semibold text-blue-800 mb-2">🌱 Soil Modifications Required</h6>
                <div class="space-y-2">
                    ${modificationsHtml}
                </div>
            </div>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <h6 class="font-semibold text-yellow-800 mb-2">📊 Expected Results</h6>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="font-medium">Expected Yield:</span>
                        <span class="text-yellow-700">${recommendations.expectedYield}</span>
                    </div>
                    <div>
                        <span class="font-medium">Profit Margin:</span>
                        <span class="text-yellow-700">${recommendations.profitMargin}</span>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="getDetailedPlan()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                    Get Detailed Plan
                </button>
                <button onclick="saveRecommendations()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Save Recommendations
                </button>
            </div>
        </div>
    `;
}

// Setup file upload functionality
function setupFileUpload() {
    const uploadArea = document.querySelector('.border-dashed');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
    }
    
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';
    fileInput.accept = '.pdf,.jpg,.jpeg,.png';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', handleFileSelect);
    document.body.appendChild(fileInput);
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

// Handle file drop
function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
}

// Handle file upload
function handleFileUpload(file) {
    // Validate file type and size
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        SmartFarm.showNotification('Please select a valid file (PDF, JPG, PNG)', 'error');
        return;
    }
    
    if (file.size > maxSize) {
        SmartFarm.showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    // Show upload progress
    showUploadProgress();
    
    // Simulate file processing
    setTimeout(() => {
        processSoilReport(file);
    }, 2000);
}

// Show upload progress
function showUploadProgress() {
    const uploadArea = document.querySelector('.border-dashed');
    if (uploadArea) {
        uploadArea.innerHTML = `
            <div class="text-center">
                <div class="spinner mb-2"></div>
                <p class="text-blue-600">Processing soil report...</p>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div class="bg-blue-600 h-2 rounded-full progress-bar" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        // Animate progress bar
        const progressBar = uploadArea.querySelector('.progress-bar');
        let width = 0;
        const interval = setInterval(() => {
            width += 10;
            progressBar.style.width = width + '%';
            if (width >= 100) {
                clearInterval(interval);
            }
        }, 200);
    }
}

// Process soil report
function processSoilReport(file) {
    // Simulate AI processing
    setTimeout(() => {
        updateSoilData();
        SmartFarm.showNotification('Soil report processed successfully!', 'success');
        resetUploadArea();
    }, 1000);
}

// Update soil data based on uploaded report
function updateSoilData() {
    // Simulate updated soil data
    const updatedData = {
        moisture: Math.floor(Math.random() * 20) + 40, // 40-60%
        ph: (Math.random() * 2 + 6).toFixed(1), // 6.0-8.0
        conductivity: (Math.random() * 1.5 + 1.5).toFixed(1), // 1.5-3.0
        organicMatter: (Math.random() * 2 + 1).toFixed(1), // 1.0-3.0
        nitrogen: Math.floor(Math.random() * 100) + 200, // 200-300
        phosphorus: Math.floor(Math.random() * 30) + 30, // 30-60
        potassium: Math.floor(Math.random() * 100) + 250 // 250-350
    };
    
    // Update UI with new data
    updateSoilDashboard(updatedData);
}

// Update soil dashboard with new data
function updateSoilDashboard(data) {
    // Update summary cards
    const moistureCard = document.querySelector('.bg-gradient-to-br.from-blue-400');
    if (moistureCard) {
        moistureCard.querySelector('.text-2xl.font-bold').textContent = data.moisture + '%';
    }
    
    const phCard = document.querySelector('.bg-gradient-to-br.from-green-400');
    if (phCard) {
        phCard.querySelector('.text-2xl.font-bold').textContent = data.ph;
    }
    
    const conductivityCard = document.querySelector('.bg-gradient-to-br.from-yellow-400');
    if (conductivityCard) {
        conductivityCard.querySelector('.text-2xl.font-bold').textContent = data.conductivity;
    }
    
    const organicCard = document.querySelector('.bg-gradient-to-br.from-purple-400');
    if (organicCard) {
        organicCard.querySelector('.text-2xl.font-bold').textContent = data.organicMatter + '%';
    }
    
    // Update nutrient levels
    updateNutrientLevels(data);
}

// Update nutrient levels in the UI
function updateNutrientLevels(data) {
    // Update nitrogen level
    const nitrogenBar = document.querySelector('.bg-red-500.h-2');
    if (nitrogenBar) {
        const percentage = Math.min((data.nitrogen / 400) * 100, 100);
        nitrogenBar.style.width = percentage + '%';
        nitrogenBar.parentElement.previousElementSibling.querySelector('.text-sm').textContent = data.nitrogen + ' mg/kg';
    }
    
    // Update phosphorus level
    const phosphorusBar = document.querySelector('.bg-orange-500.h-2');
    if (phosphorusBar) {
        const percentage = Math.min((data.phosphorus / 80) * 100, 100);
        phosphorusBar.style.width = percentage + '%';
        phosphorusBar.parentElement.previousElementSibling.querySelector('.text-sm').textContent = data.phosphorus + ' mg/kg';
    }
    
    // Update potassium level
    const potassiumBar = document.querySelector('.bg-green-500.h-2');
    if (potassiumBar) {
        const percentage = Math.min((data.potassium / 400) * 100, 100);
        potassiumBar.style.width = percentage + '%';
        potassiumBar.parentElement.previousElementSibling.querySelector('.text-sm').textContent = data.potassium + ' mg/kg';
    }
}

// Reset upload area
function resetUploadArea() {
    const uploadArea = document.querySelector('.border-dashed');
    if (uploadArea) {
        uploadArea.innerHTML = `
            <div class="text-4xl mb-2">📄</div>
            <p class="text-blue-600 mb-3">Drag & drop your soil analysis report or click to browse</p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Choose File</button>
            <p class="text-xs text-blue-500 mt-2">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
        `;
        
        // Re-setup event listeners
        setupFileUpload();
    }
}

// Get detailed farming plan
function getDetailedPlan() {
    SmartFarm.showNotification('Detailed plan generation started!', 'info');
    // This would typically open a modal or redirect to a detailed plan page
    console.log('Generating detailed farming plan...');
}

// Save recommendations
function saveRecommendations() {
    const recommendations = {
        crop: document.getElementById('cropSelect').value,
        timestamp: new Date().toISOString(),
        modifications: document.getElementById('modifications').innerHTML
    };
    
    localStorage.setItem('savedRecommendations', JSON.stringify(recommendations));
    SmartFarm.showNotification('Recommendations saved successfully!', 'success');
}

// Load saved recommendations
function loadSavedRecommendations() {
    const saved = localStorage.getItem('savedRecommendations');
    if (saved) {
        const recommendations = JSON.parse(saved);
        document.getElementById('cropSelect').value = recommendations.crop;
        if (recommendations.crop) {
            handleCropSelection({ target: { value: recommendations.crop } });
        }
    }
}

// Export functions for global access
window.SoilAnalysis = {
    handleCropSelection,
    getDetailedPlan,
    saveRecommendations,
    loadSavedRecommendations,
    handleFileUpload
};
