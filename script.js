/**
 * What's Special Today? - Main JavaScript
 * Handles date detection, JSON loading, navigation, and sharing
 */

// Constants
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Global state
let specialDaysData = [];
let currentDayData = null;

/**
 * Initialize the application
 */
async function init() {
    try {
        await loadData();

        // Determine which page we're on by checking for the element
        const isHomePage = document.getElementById('special-day-content') !== null;
        const isDayPage = document.getElementById('day-content') !== null;

        if (isHomePage && !isDayPage) {
            displayTodaysSpecialDay();
            // Show content container
            const content = document.getElementById('special-day-content');
            if (content) content.style.display = 'block';
        } else if (isDayPage) {
            initDatePicker();
            handleUrlParams();
            // Show content container
            const content = document.getElementById('day-content');
            if (content) content.style.display = 'block';
        }

        // Hide loading
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';

    } catch (error) {
        console.error('Failed to initialize:', error);
        showError('Failed to load data. Please try refreshing the page or use a local server.');
    }
}

/**
 * Load special days data from JSON
 */
async function loadData() {
    const response = await fetch('data/special-days.json');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    specialDaysData = await response.json();
}

/**
 * Find special day data for a given date
 */
function findSpecialDay(month, day) {
    return specialDaysData.find(
        item => item.month === month && item.day === day
    );
}

/**
 * Display today's special day on the home page
 */
function displayTodaysSpecialDay() {
    const today = new Date();
    const month = MONTHS[today.getMonth()];
    const day = today.getDate();

    const dayData = findSpecialDay(month, day);
    if (dayData) {
        currentDayData = dayData;
        renderSpecialDay(dayData);
        updatePageMeta(dayData);
    } else {
        showError('No special day found for today.');
    }
}

/**
 * Render special day content
 */
function renderSpecialDay(data) {
    const container = document.getElementById('special-day-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card-header">
            <div class="date-display">${data.date}</div>
            <span class="category-badge">${data.category}</span>
        </div>
        <div class="card-body">
            <h1 class="special-day-title">${data.title}</h1>
            <p class="special-day-description">${data.description}</p>
            <div class="hashtags">
                ${data.hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join('')}
            </div>
            <div class="btn-group">
                <a href="day.html" class="btn btn-primary">
                    📅 View Any Date
                </a>
                <button onclick="shareDay()" class="btn btn-secondary">
                    📤 Share
                </button>
            </div>
        </div>
    `;

    // Hide loading state
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

/**
 * Initialize date picker on day.html
 */
function initDatePicker() {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');

    if (!monthSelect || !daySelect) return;

    // Set to current month/day by default (months are pre-populated in HTML)
    const today = new Date();
    monthSelect.value = MONTHS[today.getMonth()];
    updateDayOptions();
    daySelect.value = today.getDate();

    // Event listeners
    monthSelect.addEventListener('change', () => {
        updateDayOptions();
        loadSelectedDay();
    });

    daySelect.addEventListener('change', loadSelectedDay);

    // Navigation buttons (will be re-attached when content loads)
}

/**
 * Update day options based on selected month
 */
function updateDayOptions() {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');

    if (!monthSelect || !daySelect) return;

    const monthIndex = MONTHS.indexOf(monthSelect.value);
    const daysCount = DAYS_IN_MONTH[monthIndex];
    const currentDay = parseInt(daySelect.value) || 1;

    // Clear existing options
    daySelect.innerHTML = '';

    // Add day options
    for (let i = 1; i <= daysCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Restore selected day if valid
    daySelect.value = Math.min(currentDay, daysCount);
}

/**
 * Handle URL parameters on day.html
 */
function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const month = params.get('month');
    const day = params.get('day');

    if (month && day) {
        const monthSelect = document.getElementById('month-select');
        const daySelect = document.getElementById('day-select');

        if (monthSelect && daySelect && MONTHS.includes(month)) {
            monthSelect.value = month;
            updateDayOptions();
            daySelect.value = day;
        }
    }

    loadSelectedDay();
}

/**
 * Load and display the selected day
 */
function loadSelectedDay() {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');

    if (!monthSelect || !daySelect) return;

    const month = monthSelect.value;
    const day = parseInt(daySelect.value);

    const dayData = findSpecialDay(month, day);

    if (dayData) {
        currentDayData = dayData;
        renderSelectedDay(dayData);
        updateUrl(month, day);
        updatePageMeta(dayData);
    } else {
        showNoDataMessage(month, day);
    }
}

/**
 * Render selected day content on day.html
 */
function renderSelectedDay(data) {
    const container = document.getElementById('day-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card-header">
            <div class="date-display">${data.date}</div>
            <span class="category-badge">${data.category}</span>
        </div>
        <div class="card-body">
            <h1 class="special-day-title">${data.title}</h1>
            <p class="special-day-description">${data.description}</p>
            <div class="hashtags">
                ${data.hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join('')}
            </div>
            <div class="nav-buttons">
                <button id="prev-day" class="nav-btn">← Previous Day</button>
                <button id="next-day" class="nav-btn">Next Day →</button>
            </div>
            <div class="btn-group" style="margin-top: 1rem;">
                <a href="index.html" class="btn btn-secondary">
                    🏠 Back to Today
                </a>
                <button onclick="shareDay()" class="btn btn-primary">
                    📤 Share
                </button>
            </div>
        </div>
    `;

    // Re-attach navigation listeners
    document.getElementById('prev-day').addEventListener('click', goToPreviousDay);
    document.getElementById('next-day').addEventListener('click', goToNextDay);

    // Hide loading state
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

/**
 * Show message when no data is found
 */
function showNoDataMessage(month, day) {
    const container = document.getElementById('day-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card-body">
            <div class="error-state">
                <div class="emoji">🔍</div>
                <h2>No Special Day Found</h2>
                <p>We couldn't find a special day for ${month} ${day}.</p>
            </div>
        </div>
    `;
}

/**
 * Navigate to previous day
 */
function goToPreviousDay() {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');

    if (!monthSelect || !daySelect) return;

    let monthIndex = MONTHS.indexOf(monthSelect.value);
    let day = parseInt(daySelect.value);

    day--;

    if (day < 1) {
        monthIndex--;
        if (monthIndex < 0) {
            monthIndex = 11; // December
        }
        day = DAYS_IN_MONTH[monthIndex];
    }

    monthSelect.value = MONTHS[monthIndex];
    updateDayOptions();
    daySelect.value = day;
    loadSelectedDay();
}

/**
 * Navigate to next day
 */
function goToNextDay() {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');

    if (!monthSelect || !daySelect) return;

    let monthIndex = MONTHS.indexOf(monthSelect.value);
    let day = parseInt(daySelect.value);

    day++;

    if (day > DAYS_IN_MONTH[monthIndex]) {
        monthIndex++;
        if (monthIndex > 11) {
            monthIndex = 0; // January
        }
        day = 1;
    }

    monthSelect.value = MONTHS[monthIndex];
    updateDayOptions();
    daySelect.value = day;
    loadSelectedDay();
}

/**
 * Update browser URL without reloading
 */
function updateUrl(month, day) {
    const newUrl = `day.html?month=${encodeURIComponent(month)}&day=${day}`;
    window.history.replaceState({}, '', newUrl);
}

/**
 * Update page meta tags for SEO
 */
function updatePageMeta(data) {
    // Update title
    document.title = `${data.title} - ${data.date} | What's Special Today?`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = `${data.date}: ${data.title} - ${data.description}`;
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = `${data.title} - ${data.date}`;
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = data.description;
    }

    // Update structured data
    updateStructuredData(data);
}

/**
 * Update Schema.org structured data
 */
function updateStructuredData(data) {
    let script = document.getElementById('structured-data');
    if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": data.title,
        "description": data.description,
        "startDate": getISODate(data.month, data.day),
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "organizer": {
            "@type": "Organization",
            "name": "What's Special Today?"
        }
    };

    script.textContent = JSON.stringify(structuredData);
}

/**
 * Get ISO date string for a month and day
 */
function getISODate(month, day) {
    const year = new Date().getFullYear();
    const monthIndex = MONTHS.indexOf(month);
    const date = new Date(year, monthIndex, day);
    return date.toISOString().split('T')[0];
}

/**
 * Share current day
 */
function shareDay() {
    if (!currentDayData) return;

    const shareUrl = window.location.href;
    const shareText = `${currentDayData.date}: ${currentDayData.title} - ${currentDayData.description}`;

    // Try native share API first
    if (navigator.share) {
        navigator.share({
            title: currentDayData.title,
            text: shareText,
            url: shareUrl
        }).catch(() => {
            // Fallback to copy
            copyToClipboard(shareUrl);
        });
    } else {
        // Fallback to copy
        copyToClipboard(shareUrl);
    }
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard! 📋');
    }).catch(() => {
        showToast('Failed to copy link');
    });
}

/**
 * Show toast notification
 */
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Show error message
 */
function showError(message) {
    const content = document.getElementById('special-day-content') ||
        document.getElementById('day-content');

    if (content) {
        content.innerHTML = `
            <div class="card-body">
                <div class="error-state">
                    <div class="emoji">😕</div>
                    <h2>Oops!</h2>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }

    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
