/**
 * Freizeitsport München - Sportarten-Visualisierung
 * Daten: opendata.muenchen.de
 * Version: 1.0.0
 */

const DATA_URL = 'hallensportprogramm_2025_2026.csv';

// Sport Icons (SVG) - smooth, rounded style
const SPORT_ICONS = {
    "Basketball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/><path d="M5.6 5.6c3 3.5 3 8.3 0 11.8"/><path d="M18.4 5.6c-3 3.5-3 8.3 0 11.8"/></svg>`,
    "BodyART": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v7"/><path d="M7 11q5 2 10 0"/><path d="M8 20q4-5 8 0"/></svg>`,
    "Bodystyling": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v5"/><path d="M6 18q0-6 6-6t6 6"/><path d="M4 21h16"/></svg>`,
    "Core Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    "Eltern-Kind-Turnen": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="4" r="2.5"/><circle cx="17" cy="6" r="2"/><path d="M8 6.5v4.5q0 2-2 4l-1 3"/><path d="M8 11q2 0 2 2l1 5"/><path d="M17 8v3q0 1.5-1.5 3l-.5 4"/><path d="M17 11q1.5 0 1.5 2l.5 5"/></svg>`,
    "Fatburn": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21q-5-3-5-9 0-5 5-9 5 4 5 9 0 6-5 9z"/><path d="M12 17q-2 0-2-3t2-3q2 0 2 3"/></svg>`,
    "Female Moves": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v4"/><path d="M8 10.5q4 1 8 0l1 4H7l1-4z"/><path d="M10 14.5l-2 6M14 14.5l2 6"/><path d="M6 14q-2 2-2 4M18 14q2 2 2 4"/></svg>`,
    "Fitness Classic": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="12" x2="17" y2="12"/><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/></svg>`,
    "Fitness Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="12" x2="17" y2="12"/><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="2.5"/></svg>`,
    "Functional Training": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    "Generation plus": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>`,
    "HIIT": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3 8 6-16 3 8h4"/></svg>`,
    "Kickbox-Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/><path d="M9 15q3 1 6 0"/></svg>`,
    "Mobility Stretching": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="4" r="2.5"/><path d="M17 6.5q0 4-4 6t-8 2"/><path d="M5 18q5-2 8-4"/><path d="M3 13q2 0 4 1"/></svg>`,
    "Nordic Walking": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2.5"/><path d="M11 6.5q0 3-2 6l-2 8"/><path d="M11 10q2 2 2 5l1 6"/><path d="M5 8l2 13M17 8l-1 13"/></svg>`,
    "Pilates": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="18" rx="7" ry="2.5"/><circle cx="12" cy="5" r="2.5"/><path d="M12 7.5v8"/></svg>`,
    "Power Circuit": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/></svg>`,
    "Qi Gong": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3c0 9 0 18 0 18"/><path d="M12 3c4 3 4 7 0 9s-4 6 0 9"/><circle cx="12" cy="7.5" r="1.5" fill="currentColor"/><circle cx="12" cy="16.5" r="1.5"/></svg>`,
    "Rücken Fitness": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v2"/><path d="M10 10h4M10 13h4M10 16h4M10 19h4"/><path d="M12 8.5v12"/><path d="M8 10q2 5 0 10"/><path d="M16 10q-2 5 0 10"/></svg>`,
    "Silent Disco": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v-5a8 8 0 0 1 16 0v5"/><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="18" y="14" width="4" height="6" rx="1"/></svg>`,
    "Step Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="15" width="6" height="5" rx="1"/><rect x="9" y="11" width="6" height="9" rx="1"/><rect x="15" y="7" width="6" height="13" rx="1"/></svg>`,
    "Volleyball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3q4 3 4 9t-4 9"/><path d="M12 3q-4 3-4 9t4 9"/><path d="M3 12q3-4 9-4t9 4"/></svg>`,
    "Yoga": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M4 19q8-6 16 0"/><path d="M8 16q4-3 8 0"/></svg>`,
    "Zirkuskünste": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20L12 4l9 16H3z"/><circle cx="9" cy="16" r="1.5" fill="currentColor"/><circle cx="15" cy="16" r="1.5" fill="currentColor"/><path d="M12 8v4"/></svg>`,
    "Zumba": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M8 11q-3 0-4 3"/><path d="M16 11q3 0 4 3"/><path d="M9 11.5q0 5-1 9"/><path d="M15 11.5q0 5 1 9"/></svg>`
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
    elements.detailCard = document.getElementById('detailCard');
    elements.detailOverlay = document.getElementById('detailOverlay');
    elements.detailTitle = document.getElementById('detailTitle');
    elements.detailTime = document.getElementById('detailTime');
    elements.detailLocation = document.getElementById('detailLocation');
    elements.detailClose = document.getElementById('detailClose');
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

/**
 * Show a specific sport
 */
function showSport(sport) {
    // Update markers and z-index
    markerElements.forEach(({ marker, sport: markerSport }) => {
        const dot = marker.getElement()?.querySelector('.marker-dot');
        const isActive = markerSport === sport;

        if (dot) {
            dot.classList.toggle('active', isActive);
        }

        // Bring active markers to front
        marker.setZIndexOffset(isActive ? 1000 : 0);
    });

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
    autoPlayInterval = setInterval(nextSport, 3000);
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
 * Setup event listeners
 */
function setupEventListeners() {
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
