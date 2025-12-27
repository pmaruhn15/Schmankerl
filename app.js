/**
 * Freizeitsport München - Sportarten-Visualisierung
 * Daten: opendata.muenchen.de
 * Version: 1.0.0
 */

const DATA_URL = 'hallensportprogramm_2025_2026.csv';

// Sport Icons (SVG) - smooth, rounded style
const SPORT_ICONS = {
    "Basketball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/><path d="M5.6 5.6c3 3.5 3 8.3 0 11.8"/><path d="M18.4 5.6c-3 3.5-3 8.3 0 11.8"/></svg>`,
    "BodyART": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v6"/><path d="M12 9q-4 0-6 3"/><path d="M12 9q4 0 6 3"/><path d="M12 12.5L8 21"/><path d="M12 12.5L16 21"/></svg>`,
    "Bodystyling": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 9L8 10L9 14"/><path d="M12 9L16 10L15 14"/><path d="M12 11.5L10 21"/><path d="M12 11.5L14 21"/></svg>`,
    "Core Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="10" r="2"/><path d="M7 10L18 12"/><path d="M7 10L6 16"/><path d="M18 12L20 18"/><path d="M3 18h18"/></svg>`,
    "Eltern-Kind-Turnen": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="4" r="2.5"/><path d="M8 6.5v5"/><path d="M8 9L5 12"/><path d="M8 9L12 8"/><path d="M8 11.5L6 20"/><path d="M8 11.5L10 20"/><circle cx="16" cy="7" r="2"/><path d="M16 9v3"/><path d="M16 10L14 8"/><path d="M16 10L18 8"/><path d="M16 12L15 17"/><path d="M16 12L17 17"/></svg>`,
    "Fatburn": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z"/><path d="M12 22c-2-2-3-4-3-6a3 3 0 0 1 6 0c0 2-1 4-3 6z"/></svg>`,
    "Female Moves": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 8L7 6"/><path d="M12 8L17 10"/><path d="M12 11.5L9 21"/><path d="M12 11.5L16 19"/></svg>`,
    "Fitness Classic": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="12" x2="17" y2="12"/><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/></svg>`,
    "Fitness Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="12" x2="17" y2="12"/><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="4" fill="white" stroke="none"/><path d="M13 8l-2 4h2l-1 4 4-5h-3l1-3z" fill="currentColor" stroke="none"/></svg>`,
    "Functional Training": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    "Generation plus": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>`,
    "HIIT": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3 8 6-16 3 8h4"/></svg>`,
    "Kickbox-Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="4" r="2.5"/><path d="M10 6.5v5"/><path d="M10 8L17 7"/><path d="M10 9L7 7"/><path d="M10 11.5L7 20"/><path d="M10 11.5L16 16"/></svg>`,
    "Mobility Stretching": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="2.5"/><path d="M8 8.5L16 12"/><path d="M16 12L20 10"/><path d="M8 8.5L4 18"/><path d="M8 8.5L12 16L16 20"/></svg>`,
    "Nordic Walking": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="3" r="2.5"/><path d="M11 5.5L12 11"/><path d="M12 9L7 7"/><path d="M7 7L4 20"/><path d="M12 9L16 11"/><path d="M16 11L19 20"/><path d="M12 11L8 21"/><path d="M12 11L15 21"/></svg>`,
    "Pilates": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="16" r="2"/><path d="M6 16h10"/><path d="M16 16L20 8"/><path d="M16 16L22 10"/><path d="M2 20h20"/></svg>`,
    "Power Circuit": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/></svg>`,
    "Qi Gong": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18a4.5 4.5 0 0 1 0-9a4.5 4.5 0 0 0 0-9"/><circle cx="12" cy="7.5" r="1.5" fill="currentColor"/><circle cx="12" cy="16.5" r="1.5"/></svg>`,
    "Rücken Fitness": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M6 10 Q6 7 12 6.5 Q18 7 18 10"/><path d="M8 10 L12 18 L16 10"/><path d="M12 7 L12 18"/></svg>`,
    "Silent Disco": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v-5a8 8 0 0 1 16 0v5"/><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="18" y="14" width="4" height="6" rx="1"/></svg>`,
    "Step Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="16" width="20" height="4" rx="1"/><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v4"/><path d="M12 8L8 6"/><path d="M12 8L16 6"/><path d="M12 10.5L10 16"/><path d="M12 10.5L14 14"/></svg>`,
    "Volleyball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3q4 3 4 9t-4 9"/><path d="M12 3q-4 3-4 9t4 9"/><path d="M3 12q3-4 9-4t9 4"/></svg>`,
    "Yoga": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 9L8 12"/><path d="M12 9L16 12"/><path d="M8 12q4 3 8 0"/><path d="M6 15h12"/><path d="M8 20q4-2 8 0"/></svg>`,
    "Zirkuskünste": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="2.5"/><path d="M12 12.5v5"/><path d="M12 14L8 11"/><path d="M12 14L16 11"/><path d="M12 17.5L10 22"/><path d="M12 17.5L14 22"/><circle cx="6" cy="6" r="1.5" fill="currentColor"/><circle cx="12" cy="4" r="1.5" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/></svg>`,
    "Zumba": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5L13 12"/><path d="M13 9L9 6"/><path d="M13 9L17 7"/><path d="M13 12L9 21"/><path d="M13 12L17 19"/></svg>`
};

// Sport name mapping (CSV name -> Display name)
const SPORT_NAME_MAP = {
    "BodyART®": "BodyART",
    "Core - Power für Bauch und Rücken": "Core Power",
    "Fitness für Frauen": "Fitness Classic",
    "HIIT - High.intensity interval training": "HIIT",
    "Mobility Streching": "Mobility Stretching",
    "Power Circuit Training": "Power Circuit",
    "Rücken Fitness": "Rücken Fitness",
    "Silent Disco Groove": "Silent Disco",
    "Zirkuskünste Eltern-Kind-Turnen": "Zirkuskünste"
};

// Day abbreviations
const DAY_MAP = {
    "Montag": "Mo",
    "Dienstag": "Di",
    "Mittwoch": "Mi",
    "Donnerstag": "Do",
    "Freitag": "Fr",
    "Samstag": "Sa",
    "Sonntag": "So"
};

// State
let kurse = [];
let sportarten = [];
let sportCounts = {};
let currentSportIndex = 0;
let isPlaying = true;
let autoPlayInterval = null;
let map = null;
let markerElements = [];

// DOM Elements
const elements = {};

/**
 * Initialize the application
 */
async function init() {
    cacheElements();
    await loadData();
    initMap();
    createMarkers();
    createPills();
    setupEventListeners();
    showSport(sportarten[0]);
    startAutoPlay();
}

/**
 * Cache DOM elements
 */
function cacheElements() {
    elements.loading = document.getElementById('loading');
    elements.sportIcon = document.getElementById('sportIcon');
    elements.sportName = document.getElementById('sportName');
    elements.sportCount = document.getElementById('sportCount');
    elements.sportPills = document.getElementById('sportPills');
    elements.uiPanel = document.querySelector('.ui-panel');
    elements.detailCard = document.getElementById('detailCard');
    elements.detailOverlay = document.getElementById('detailOverlay');
    elements.detailTitle = document.getElementById('detailTitle');
    elements.detailTime = document.getElementById('detailTime');
    elements.detailLocation = document.getElementById('detailLocation');
    elements.detailClose = document.getElementById('detailClose');
    elements.infoModal = document.getElementById('infoModal');
    elements.infoOverlay = document.getElementById('infoOverlay');
    elements.infoClose = document.getElementById('infoClose');
}

/**
 * Load and parse CSV data from Open Data Portal
 */
async function loadData() {
    try {
        console.log('Fetching:', DATA_URL);
        const response = await fetch(DATA_URL);
        console.log('Response status:', response.status);
        const csvText = await response.text();
        console.log('CSV length:', csvText.length);
        kurse = parseCSV(csvText);
        console.log('Parsed courses:', kurse.length);

        // Count sports and create sorted list
        sportCounts = {};
        kurse.forEach(k => {
            sportCounts[k.sport] = (sportCounts[k.sport] || 0) + 1;
        });

        sportarten = Object.entries(sportCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([sport]) => sport);

        if (elements.loading) {
            elements.loading.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading data:', error);
        if (elements.loading) {
            elements.loading.textContent = 'Fehler beim Laden der Daten';
        }
    }
}

/**
 * Parse CSV text into structured data
 */
function parseCSV(csvText) {
    // Remove BOM if present
    if (csvText.charCodeAt(0) === 0xFEFF) {
        csvText = csvText.slice(1);
    }

    // Normalize line endings
    csvText = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const lines = csvText.trim().split('\n');
    const headers = parseCSVLine(lines[0]);
    const result = [];

    console.log('CSV Headers:', headers);
    console.log('Total lines:', lines.length);

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length < headers.length) continue;

        const lat = parseFloat(values[11]);
        const lng = parseFloat(values[12]);

        if (isNaN(lat) || isNaN(lng)) continue;

        let sportName = values[0].trim();
        sportName = SPORT_NAME_MAP[sportName] || sportName;

        const tag = DAY_MAP[values[2]] || values[2];
        const zeitStart = values[3];
        const zeitEnd = values[4];
        const strasse = values[5];
        const hausnummer = values[6];
        const stadtteil = values[8];

        result.push({
            sport: sportName,
            lat: lat,
            lng: lng,
            tag: tag,
            zeit: `${zeitStart}-${zeitEnd}`,
            ort: `${strasse} ${hausnummer}${stadtteil ? ', ' + stadtteil : ''}`
        });
    }

    return result;
}

/**
 * Parse a single CSV line (handling quoted fields)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

/**
 * Initialize Leaflet map
 */
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([48.137154, 11.576124], 12);

    // Dark base layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Labels layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        opacity: 0.6
    }).addTo(map);
}

/**
 * Create map markers for all courses
 */
function createMarkers() {
    markerElements = [];

    kurse.forEach((kurs, index) => {
        const marker = L.marker([kurs.lat, kurs.lng], {
            icon: L.divIcon({
                className: 'marker-container',
                html: `<div class="marker-dot" data-sport="${kurs.sport}" data-index="${index}"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            }),
            zIndexOffset: 0
        }).addTo(map);

        // Direct click handler on Leaflet marker
        marker.on('click', () => {
            const dot = marker.getElement()?.querySelector('.marker-dot');
            if (dot && dot.classList.contains('active')) {
                showDetail(index);
            }
        });

        markerElements.push({ marker, sport: kurs.sport, index });
    });
}

/**
 * Create sport filter pills
 */
function createPills() {
    if (!elements.sportPills) return;

    elements.sportPills.innerHTML = '';

    sportarten.forEach((sport, index) => {
        const pill = document.createElement('div');
        pill.className = 'sport-pill';
        pill.innerHTML = SPORT_ICONS[sport] || SPORT_ICONS["Fitness Classic"];
        pill.dataset.index = index;
        pill.addEventListener('click', () => handlePillClick(index));
        elements.sportPills.appendChild(pill);
    });
}

/**
 * Handle pill click
 */
function handlePillClick(index) {
    currentSportIndex = index;
    showSport(sportarten[index]);
    stopAutoPlay();
    isPlaying = false;
}

// Track current active sport for transitions
let currentActiveSport = null;
let isTransitioning = false;

/**
 * Show a specific sport with smooth transition
 */
function showSport(sport, skipTransition = false) {
    // Skip if already showing this sport or currently transitioning
    if (sport === currentActiveSport) return;
    if (isTransitioning && !skipTransition) return;

    const isFirstLoad = currentActiveSport === null;
    isTransitioning = true;

    // Collect current and new dots
    const currentDots = [];
    const newDots = [];

    markerElements.forEach(({ marker, sport: markerSport }) => {
        const dot = marker.getElement()?.querySelector('.marker-dot');
        if (!dot) return;

        if (dot.classList.contains('active')) {
            currentDots.push(dot);
        }
        if (markerSport === sport) {
            newDots.push({ dot, marker });
        }
    });

    // Update UI immediately for responsiveness
    updateSportUI(sport);

    // For first load or skipTransition, activate immediately
    if (isFirstLoad || skipTransition) {
        activateNewMarkers(newDots);
        currentActiveSport = sport;
        isTransitioning = false;
        return;
    }

    // Phase 1: Fade out current active markers
    currentDots.forEach(dot => {
        dot.classList.add('fading-out');
    });

    // Phase 2: After fade-out, activate new markers
    setTimeout(() => {
        // Remove old active states
        currentDots.forEach(dot => {
            dot.classList.remove('active', 'fading-out');
        });

        // Reset z-index for old markers
        markerElements.forEach(({ marker, sport: markerSport }) => {
            if (markerSport !== sport) {
                marker.setZIndexOffset(0);
            }
        });

        // Activate new markers
        activateNewMarkers(newDots);

        currentActiveSport = sport;
        isTransitioning = false;
    }, 200); // Fade-out duration
}

/**
 * Activate new markers with synced animation
 */
function activateNewMarkers(newDots) {
    newDots.forEach(({ dot, marker }, index) => {
        // Small random delay for organic feel (0-80ms)
        const stagger = Math.random() * 0.08;
        dot.style.setProperty('--pulse-delay', `${stagger}s`);

        // Activate with very slight stagger for wave effect
        setTimeout(() => {
            dot.classList.add('active');
            marker.setZIndexOffset(1000);
        }, Math.min(index * 3, 100)); // Cap total stagger at 100ms
    });
}

/**
 * Update sport UI elements (icon, name, count, pills)
 */
function updateSportUI(sport) {
    // Update info display
    if (elements.sportIcon) {
        elements.sportIcon.innerHTML = SPORT_ICONS[sport] || SPORT_ICONS["Fitness Classic"];
    }
    if (elements.sportName) {
        elements.sportName.textContent = sport;
    }
    if (elements.sportCount) {
        const count = sportCounts[sport] || 0;
        elements.sportCount.textContent = `${count} Standort${count !== 1 ? 'e' : ''}`;
    }

    // Update pills
    document.querySelectorAll('.sport-pill').forEach((pill, i) => {
        pill.classList.toggle('active', sportarten[i] === sport);
    });
}

/**
 * Show next sport
 */
function nextSport() {
    currentSportIndex = (currentSportIndex + 1) % sportarten.length;
    showSport(sportarten[currentSportIndex]);
}

/**
 * Start auto-play
 */
function startAutoPlay() {
    stopAutoPlay();
    // Longer interval to account for transition time and let users appreciate each sport
    autoPlayInterval = setInterval(nextSport, 3500);
}

/**
 * Stop auto-play
 */
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

/**
 * Show detail card for a course
 */
function showDetail(index) {
    const kurs = kurse[index];
    if (!kurs) return;

    if (elements.detailTitle) {
        elements.detailTitle.textContent = kurs.sport;
    }
    if (elements.detailTime) {
        elements.detailTime.textContent = `${kurs.tag} ${kurs.zeit}`;
    }
    if (elements.detailLocation) {
        elements.detailLocation.textContent = kurs.ort;
    }

    elements.detailCard?.classList.add('visible');
    elements.detailOverlay?.classList.add('visible');
}

/**
 * Hide detail card
 */
function hideDetail() {
    elements.detailCard?.classList.remove('visible');
    elements.detailOverlay?.classList.remove('visible');
}

/**
 * Hide info modal
 */
function hideInfoModal() {
    elements.infoModal?.classList.add('hidden');
    elements.infoOverlay?.classList.add('hidden');

    // Show UI panel after modal slides away
    setTimeout(() => {
        elements.uiPanel?.classList.add('visible');
    }, 200);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Info modal close
    elements.infoClose?.addEventListener('click', hideInfoModal);
    elements.infoOverlay?.addEventListener('click', hideInfoModal);

    // Detail card close
    elements.detailClose?.addEventListener('click', hideDetail);
    elements.detailOverlay?.addEventListener('click', hideDetail);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentSportIndex = (currentSportIndex + 1) % sportarten.length;
            showSport(sportarten[currentSportIndex]);
            stopAutoPlay();
            isPlaying = false;
        } else if (e.key === 'ArrowLeft') {
            currentSportIndex = (currentSportIndex - 1 + sportarten.length) % sportarten.length;
            showSport(sportarten[currentSportIndex]);
            stopAutoPlay();
            isPlaying = false;
        } else if (e.key === 'Escape') {
            hideDetail();
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
