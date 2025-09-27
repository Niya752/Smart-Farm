// Learning Hub - Specific JavaScript Functions

// Initialize learning hub page
document.addEventListener('DOMContentLoaded', function() {
    initializeLearningHub();
    setupContentFilters();
    setupVideoUpload();
    setupBlogEditor();
});

// Initialize learning hub functionality
function initializeLearningHub() {
    loadContent();
    updateWordCount();
    setupContentInteraction();
}

// Setup content filters
function setupContentFilters() {
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    const categorySelect = document.querySelector('select');
    const typeSelect = document.querySelectorAll('select')[1];
    const sortSelect = document.querySelectorAll('select')[2];

    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterContent, 300));
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', filterContent);
    }

    if (typeSelect) {
        typeSelect.addEventListener('change', filterContent);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', sortContent);
    }
}

// Filter content based on search and filters
function filterContent() {
    const searchTerm = document.querySelector('input[placeholder*="Search"]').value.toLowerCase();
    const category = document.querySelector('select').value;
    const type = document.querySelectorAll('select')[1].value;
    
    const contentCards = document.querySelectorAll('.video-card');
    
    contentCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const cardCategory = card.dataset.category || '';
        const cardType = card.dataset.type || '';
        
        const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
        const matchesCategory = !category || cardCategory === category;
        const matchesType = !type || cardType === type;
        
        if (matchesSearch && matchesCategory && matchesType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Sort content based on selected criteria
function sortContent() {
    const sortBy = document.querySelectorAll('select')[2].value;
    const container = document.querySelector('.grid');
    const cards = Array.from(container.querySelectorAll('.video-card'));
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'Most Popular':
                return parseInt(b.querySelector('[data-views]')?.textContent || '0') - parseInt(a.querySelector('[data-views]')?.textContent || '0');
            case 'Most Liked':
                return parseInt(b.querySelector('[data-likes]')?.textContent || '0') - parseInt(a.querySelector('[data-likes]')?.textContent || '0');
            case 'Most Viewed':
                return parseInt(b.querySelector('[data-views]')?.textContent || '0') - parseInt(a.querySelector('[data-views]')?.textContent || '0');
            default: // Latest
                return 0; // Keep original order
        }
    });
    
    cards.forEach(card => container.appendChild(card));
}

// Load content from API or local storage
function loadContent() {
    // This would typically load from an API
    const content = getSampleContent();
    displayContent(content);
}

// Get sample content data
function getSampleContent() {
    return [
        {
            id: 1,
            type: 'video',
            title: 'Organic Farming Techniques',
            description: 'Learn sustainable farming methods that improve soil health and crop yield',
            category: 'organic-farming',
            views: 1200,
            likes: 89,
            coins: 50,
            thumbnail: '🎥'
        },
        {
            id: 2,
            type: 'video',
            title: 'Poultry Care Basics',
            description: 'Essential tips for maintaining healthy chickens and maximizing egg production',
            category: 'livestock',
            views: 856,
            likes: 67,
            coins: 35,
            thumbnail: '🎥'
        },
        {
            id: 3,
            type: 'video',
            title: 'Aquaculture Setup Guide',
            description: 'Complete guide to setting up fish farming for beginners',
            category: 'aquaculture',
            views: 642,
            likes: 45,
            coins: 28,
            thumbnail: '🎥'
        },
        {
            id: 4,
            type: 'blog',
            title: 'Crop Rotation Benefits',
            description: 'Blog post about improving soil fertility through proper crop rotation',
            category: 'crop-cultivation',
            views: 423,
            likes: 32,
            coins: 20,
            thumbnail: '📝'
        },
        {
            id: 5,
            type: 'video',
            title: 'Cattle Breeding Techniques',
            description: 'Advanced breeding methods for improving cattle genetics',
            category: 'livestock',
            views: 789,
            likes: 56,
            coins: 42,
            thumbnail: '🎥'
        },
        {
            id: 6,
            type: 'video',
            title: 'Hydroponic Farming Setup',
            description: 'Modern soilless farming techniques for urban agriculture',
            category: 'equipment',
            views: 1500,
            likes: 112,
            coins: 65,
            thumbnail: '🎥'
        }
    ];
}

// Display content in the grid
function displayContent(content) {
    const container = document.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = content.map(item => createContentCard(item)).join('');
}

// Create content card HTML
function createContentCard(item) {
    const isVideo = item.type === 'video';
    const buttonClass = isVideo ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700';
    const buttonText = isVideo ? 'Watch Now' : 'Read Article';
    
    return `
        <div class="video-card bg-white rounded-lg shadow-lg overflow-hidden" data-category="${item.category}" data-type="${item.type}">
            <div class="video-thumbnail bg-gray-200 h-48 flex items-center justify-center">
                <span class="text-6xl">${item.thumbnail}</span>
            </div>
            <div class="p-4">
                <h4 class="font-semibold mb-2">${item.title}</h4>
                <p class="text-sm text-gray-600 mb-3">${item.description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span data-views="👀 ${item.views} views">👀 ${item.views} views</span>
                    <span data-likes="👍 ${item.likes} likes">👍 ${item.likes} likes</span>
                    <span>🪙 +${item.coins} coins</span>
                </div>
                <button class="w-full ${buttonClass} text-white py-2 rounded" onclick="openContent(${item.id}, '${item.type}')">
                    ${buttonText}
                </button>
            </div>
        </div>
    `;
}

// Open content (video or blog)
function openContent(id, type) {
    if (type === 'video') {
        openVideoPlayer(id);
    } else {
        openBlogReader(id);
    }
}

// Open video player
function openVideoPlayer(id) {
    // This would typically open a video player modal or redirect to video page
    SmartFarm.showNotification('Opening video player...', 'info');
    console.log('Opening video:', id);
}

// Open blog reader
function openBlogReader(id) {
    // This would typically open a blog reader modal or redirect to blog page
    SmartFarm.showNotification('Opening blog reader...', 'info');
    console.log('Opening blog:', id);
}

// Setup content interaction
function setupContentInteraction() {
    // Add like functionality
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('👍')) {
            handleLike(e.target);
        }
    });
}

// Handle like action
function handleLike(element) {
    const currentLikes = parseInt(element.textContent.match(/\d+/)[0]);
    const newLikes = currentLikes + 1;
    element.textContent = element.textContent.replace(/\d+/, newLikes);
    
    // Add visual feedback
    element.style.color = '#ef4444';
    setTimeout(() => {
        element.style.color = '';
    }, 1000);
    
    SmartFarm.showNotification('Thanks for the like!', 'success');
}

// Video Upload Functions
function openVideoUpload() {
    SmartFarm.openModal('videoUploadModal');
}

function closeVideoUpload() {
    SmartFarm.closeModal('videoUploadModal');
    resetVideoForm();
}

function handleVideoSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('videoPreview');
        const fileName = document.getElementById('videoFileName');
        const fileSize = document.getElementById('videoFileSize');
        
        if (preview && fileName && fileSize) {
            preview.classList.remove('hidden');
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
        }
    }
}

function handleThumbnailSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('thumbnailPreview');
        const fileName = document.getElementById('thumbnailName');
        
        if (preview && fileName) {
            preview.classList.remove('hidden');
            fileName.textContent = file.name;
        }
    }
}

function uploadVideo() {
    const form = document.getElementById('videoUploadForm');
    if (!SmartFarm.validateForm('videoUploadForm')) {
        SmartFarm.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate upload process
    simulateVideoUpload();
}

function simulateVideoUpload() {
    const progressBar = document.getElementById('uploadProgress');
    const status = document.getElementById('uploadStatus');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        status.textContent = `Uploading... ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            status.textContent = 'Upload complete! Processing...';
            
            setTimeout(() => {
                SmartFarm.showNotification('Video uploaded successfully!', 'success');
                closeVideoUpload();
            }, 2000);
        }
    }, 200);
}

function saveAsDraft() {
    const formData = getVideoFormData();
    localStorage.setItem('videoDraft', JSON.stringify(formData));
    SmartFarm.showNotification('Video saved as draft', 'info');
    closeVideoUpload();
}

function resetVideoForm() {
    const form = document.getElementById('videoUploadForm');
    if (form) {
        form.reset();
    }
    
    const preview = document.getElementById('videoPreview');
    const thumbnailPreview = document.getElementById('thumbnailPreview');
    
    if (preview) preview.classList.add('hidden');
    if (thumbnailPreview) thumbnailPreview.classList.add('hidden');
}

function getVideoFormData() {
    return {
        title: document.getElementById('videoTitle').value,
        description: document.getElementById('videoDescription').value,
        category: document.getElementById('videoCategory').value,
        language: document.getElementById('videoLanguage').value,
        tags: document.getElementById('videoTags').value,
        timestamp: new Date().toISOString()
    };
}

// Blog Editor Functions
function openBlogEditor() {
    SmartFarm.openModal('blogEditorModal');
    loadBlogDraft();
}

function closeBlogEditor() {
    SmartFarm.closeModal('blogEditorModal');
    resetBlogForm();
}

function handleBlogImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('blogImagePreview');
        const fileName = document.getElementById('blogImageName');
        
        if (preview && fileName) {
            preview.classList.remove('hidden');
            fileName.textContent = file.name;
        }
    }
}

function formatText(command) {
    document.execCommand(command, false, null);
    updateWordCount();
}

function insertList(type) {
    if (type === 'ul') {
        document.execCommand('insertUnorderedList', false, null);
    } else {
        document.execCommand('insertOrderedList', false, null);
    }
    updateWordCount();
}

function insertHeading() {
    const heading = prompt('Enter heading text:');
    if (heading) {
        document.execCommand('insertHTML', false, `<h2>${heading}</h2>`);
        updateWordCount();
    }
}

function insertQuote() {
    document.execCommand('insertHTML', false, '<blockquote>Quote text here</blockquote>');
    updateWordCount();
}

function updateWordCount() {
    const editor = document.getElementById('blogEditor');
    const wordCount = document.getElementById('wordCount');
    
    if (editor && wordCount) {
        const text = editor.textContent || editor.innerText || '';
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCount.textContent = words;
    }
}

function publishBlog() {
    if (!SmartFarm.validateForm('blogForm')) {
        SmartFarm.showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const blogData = getBlogFormData();
    
    // Simulate publishing
    SmartFarm.showNotification('Publishing blog post...', 'info');
    
    setTimeout(() => {
        SmartFarm.showNotification('Blog published successfully!', 'success');
        closeBlogEditor();
    }, 2000);
}

function saveBlogDraft() {
    const blogData = getBlogFormData();
    localStorage.setItem('blogDraft', JSON.stringify(blogData));
    SmartFarm.showNotification('Blog saved as draft', 'info');
}

function previewBlog() {
    const blogData = getBlogFormData();
    // This would typically open a preview modal
    SmartFarm.showNotification('Opening preview...', 'info');
    console.log('Blog preview:', blogData);
}

function loadBlogDraft() {
    const draft = localStorage.getItem('blogDraft');
    if (draft) {
        const blogData = JSON.parse(draft);
        populateBlogForm(blogData);
    }
}

function populateBlogForm(data) {
    if (data.title) document.getElementById('blogTitle').value = data.title;
    if (data.category) document.getElementById('blogCategory').value = data.category;
    if (data.tags) document.getElementById('blogTags').value = data.tags;
    if (data.content) document.getElementById('blogEditor').innerHTML = data.content;
    if (data.metaDescription) document.getElementById('metaDescription').value = data.metaDescription;
    
    updateWordCount();
}

function resetBlogForm() {
    const form = document.getElementById('blogForm');
    if (form) {
        form.reset();
    }
    
    const editor = document.getElementById('blogEditor');
    if (editor) {
        editor.innerHTML = '<p>Start writing your blog post here...</p>';
    }
    
    const imagePreview = document.getElementById('blogImagePreview');
    if (imagePreview) {
        imagePreview.classList.add('hidden');
    }
    
    updateWordCount();
}

function getBlogFormData() {
    return {
        type: document.querySelector('input[name="blogType"]:checked').value,
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        content: document.getElementById('blogEditor').innerHTML,
        tags: document.getElementById('blogTags').value,
        readingTime: document.getElementById('readingTime').value,
        metaDescription: document.getElementById('metaDescription').value,
        timestamp: new Date().toISOString()
    };
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

// Export functions for global access
window.LearningHub = {
    openVideoUpload,
    closeVideoUpload,
    openBlogEditor,
    closeBlogEditor,
    uploadVideo,
    publishBlog,
    saveAsDraft,
    saveBlogDraft,
    previewBlog,
    formatText,
    insertList,
    insertHeading,
    insertQuote,
    updateWordCount
};
