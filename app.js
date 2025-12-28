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
    "Core Power": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M6 2.5C6 1.5 7 1 8 1h2.5c1 0 1.5.5 1.5 1.5v5c0 1-.5 1.5-1.5 1.5H8c-1 0-2-.5-2-1.5v-5z" fill="currentColor"/><path d="M12 2.5c0-1 .5-1.5 1.5-1.5H16c1 0 2 .5 2 1.5v5c0 1-1 1.5-2 1.5h-2.5c-1 0-1.5-.5-1.5-1.5v-5z" fill="currentColor"/><path d="M6.5 10c0-.8.5-1.2 1.5-1.2h2c1 0 1.5.4 1.5 1.2v4.5c0 .8-.5 1.2-1.5 1.2H8c-1 0-1.5-.4-1.5-1.2V10z" fill="currentColor"/><path d="M12.5 10c0-.8.5-1.2 1.5-1.2h2c1 0 1.5.4 1.5 1.2v4.5c0 .8-.5 1.2-1.5 1.2h-2c-1 0-1.5-.4-1.5-1.2V10z" fill="currentColor"/><path d="M7.5 17c0-.6.4-1 1.2-1h1.6c.8 0 1.2.4 1.2 1v4c0 .8-.4 1.5-1.2 1.5H8.7c-.8 0-1.2-.7-1.2-1.5v-4z" fill="currentColor"/><path d="M12.5 17c0-.6.4-1 1.2-1h1.6c.8 0 1.2.4 1.2 1v4c0 .8-.4 1.5-1.2 1.5h-1.6c-.8 0-1.2-.7-1.2-1.5v-4z" fill="currentColor"/></svg>`,
    "Eltern-Kind-Turnen": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="4" r="2.5"/><path d="M8 6.5v5"/><path d="M8 9L5 12"/><path d="M8 9L12 8"/><path d="M8 11.5L6 20"/><path d="M8 11.5L10 20"/><circle cx="16" cy="7" r="2"/><path d="M16 9v3"/><path d="M16 10L14 8"/><path d="M16 10L18 8"/><path d="M16 12L15 17"/><path d="M16 12L17 17"/></svg>`,
    "Fatburn": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M12 1c-4 5-7 9-7 14c0 4 3 7 7 7s7-3 7-7c0-5-3-9-7-14z" fill="currentColor"/><path d="M7.5 3c-2 2-3.5 4-3.5 7c0 2 1 3 2.5 3c1.5 0 2.5-1 2.5-2.5c0-2.5-1-5-1.5-7.5z" fill="currentColor"/><path d="M12 22c-2.5 0-4-1.5-4-4c0-3 2-5.5 4-8c2 2.5 4 5 4 8c0 2.5-1.5 4-4 4z" fill="white"/></svg>`,
    "Female Moves": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 8L7 6"/><path d="M12 8L17 10"/><path d="M12 11.5L9 21"/><path d="M12 11.5L16 19"/></svg>`,
    "Fitness Classic": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="12" x2="17" y2="12"/><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/></svg>`,
    "Fitness Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/><line x1="7" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="17" y2="12"/><circle cx="12" cy="12" r="4"/><path d="M12 9L10.5 12H12.5L11 15L14 11H11.5L13 9Z" fill="currentColor" stroke="none"/></svg>`,
    "Functional Training": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    "Generation plus": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>`,
    "HIIT": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3 8 6-16 3 8h4"/></svg>`,
    "Kickbox-Power": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><circle cx="8" cy="4" r="2.5" fill="currentColor"/><path d="M8 6.5L10 11L7 15L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11L14 13L12 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9L6 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 10L21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    "Mobility Stretching": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="2.5"/><path d="M8 8.5L16 12"/><path d="M16 12L20 10"/><path d="M8 8.5L4 18"/><path d="M8 8.5L12 16L16 20"/></svg>`,
    "Nordic Walking": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="3" r="2.5"/><path d="M10 5.5v5"/><path d="M10 8L7 10L3 21"/><path d="M10 8L14 10L18 21"/><path d="M10 10.5L7 20"/><path d="M10 10.5L14 18"/></svg>`,
    "Pilates": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="16" r="2"/><path d="M6 16h10"/><path d="M16 16L20 8"/><path d="M16 16L22 10"/><path d="M2 20h20"/></svg>`,
    "Power Circuit": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/></svg>`,
    "Qi Gong": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18a4.5 4.5 0 0 1 0-9a4.5 4.5 0 0 0 0-9" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" stroke-width="1.2"/><circle cx="12" cy="16.5" r="1.2" stroke-width="1.2"/></svg>`,
    "Rücken Fitness": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M6 10 Q6 7 12 6.5 Q18 7 18 10"/><path d="M8 10 L12 18 L16 10"/><path d="M12 7 L12 18"/></svg>`,
    "Silent Disco": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v-5a8 8 0 0 1 16 0v5"/><rect x="2" y="14" width="4" height="6" rx="1" fill="currentColor" stroke="none"/><rect x="18" y="14" width="4" height="6" rx="1" fill="currentColor" stroke="none"/></svg>`,
    "Step Power": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M2 22V18H6V14H10V10H14V6H18V2H22V22Z" fill="currentColor"/></svg>`,
    "Volleyball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3q4 3 4 9t-4 9"/><path d="M12 3q-4 3-4 9t4 9"/><path d="M3 12q3-4 9-4t9 4"/></svg>`,
    "Yoga": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 9L8 12"/><path d="M12 9L16 12"/><path d="M8 12q4 3 8 0"/><path d="M6 15h12"/><path d="M8 20q4-2 8 0"/></svg>`,
    "Zirkuskünste": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="2.5"/><path d="M12 12.5v5"/><path d="M12 14L8 11"/><path d="M12 14L16 11"/><path d="M12 17.5L10 22"/><path d="M12 17.5L14 22"/><circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/></svg>`,
    "Zumba": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5L13 12"/><path d="M13 9L9 6"/><path d="M13 9L17 7"/><path d="M13 12L9 21"/><path d="M13 12L17 19"/></svg>`
};

// Active state icons (black on white background) - only for icons that need different rendering
const SPORT_ICONS_ACTIVE = {
    "Qi Gong": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18a4.5 4.5 0 0 1 0-9a4.5 4.5 0 0 0 0-9" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" fill="white" stroke="none"/><circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none"/></svg>`,
    "Fatburn": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M12 1c-4 5-7 9-7 14c0 4 3 7 7 7s7-3 7-7c0-5-3-9-7-14z" fill="currentColor"/><path d="M7.5 3c-2 2-3.5 4-3.5 7c0 2 1 3 2.5 3c1.5 0 2.5-1 2.5-2.5c0-2.5-1-5-1.5-7.5z" fill="currentColor"/></svg>`
};

/**
 * Get icon for a sport, optionally for active state
 */
function getIcon(sport, isActive = false) {
    if (isActive && SPORT_ICONS_ACTIVE[sport]) {
        return SPORT_ICONS_ACTIVE[sport];
    }
    return SPORT_ICONS[sport] || SPORT_ICONS["Fitness Classic"];
}

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

        // Extract description/details (e.g., age groups)
        const beschreibung = values[1].trim();

        result.push({
            sport: sportName,
            beschreibung: beschreibung,
            lat: lat,
            lng: lng,
            tag: tag,
            zeit: `${zeitStart}-${zeitEnd}`,
            ort: `${strasse} ${hausnummer}${stadtteil ? ', ' + stadtteil : ''}`,
            webseite: values[13] ? values[13].trim() : ''
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
        pill.innerHTML = getIcon(sport, false);
        pill.dataset.sport = sport;
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
    // Update info display (always use inactive/default icon for large display)
    if (elements.sportIcon) {
        elements.sportIcon.innerHTML = getIcon(sport, false);
    }
    if (elements.sportName) {
        elements.sportName.textContent = sport;
    }
    if (elements.sportCount) {
        const count = sportCounts[sport] || 0;
        elements.sportCount.textContent = `${count} Kurs${count !== 1 ? 'e' : ''}`;
    }

    // Update pills - swap icons based on active state
    document.querySelectorAll('.sport-pill').forEach((pill) => {
        const pillSport = pill.dataset.sport;
        const isActive = pillSport === sport;
        pill.classList.toggle('active', isActive);
        // Update icon to match active/inactive state
        pill.innerHTML = getIcon(pillSport, isActive);
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
 * Show detail card for a course - shows all courses at same location
 */
function showDetail(index) {
    const kurs = kurse[index];
    if (!kurs) return;

    // Find all courses at the same location with the same sport
    const coursesAtLocation = kurse.filter(k =>
        k.sport === kurs.sport &&
        k.lat === kurs.lat &&
        k.lng === kurs.lng
    );

    if (elements.detailTitle) {
        elements.detailTitle.textContent = kurs.sport;
    }

    if (elements.detailLocation) {
        elements.detailLocation.textContent = kurs.ort;
    }

    // Build course list HTML
    if (elements.detailTime) {
        let coursesHTML = '';

        if (coursesAtLocation.length === 1) {
            // Single course - simple display
            const beschr = kurs.beschreibung !== kurs.sport ? kurs.beschreibung : '';
            coursesHTML = `
                <div class="course-item">
                    <span class="course-time">${kurs.tag} ${kurs.zeit}</span>
                    ${beschr ? `<span class="course-desc">${beschr}</span>` : ''}
                </div>
            `;
        } else {
            // Multiple courses - show list
            coursesHTML = coursesAtLocation.map(k => {
                const beschr = k.beschreibung !== k.sport ? k.beschreibung : '';
                return `
                    <div class="course-item">
                        <span class="course-time">${k.tag} ${k.zeit}</span>
                        ${beschr ? `<span class="course-desc">${beschr}</span>` : ''}
                    </div>
                `;
            }).join('');
        }

        // Add website link if available
        if (kurs.webseite) {
            coursesHTML += `
                <a href="${kurs.webseite}" target="_blank" rel="noopener" class="course-link">
                    Mehr erfahren →
                </a>
            `;
        }

        elements.detailTime.innerHTML = coursesHTML;
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
