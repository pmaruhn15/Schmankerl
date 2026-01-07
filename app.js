/**
 * Freizeitsport München - Sportarten-Visualisierung
 * Daten: opendata.muenchen.de
 * Version: 1.0.0
 */

const DATA_URL = 'hallensportprogramm_2025_2026.csv';

// Sport Icons - werden aus externen SVG-Dateien geladen
let SPORT_ICONS = {};

// Liste der Sportarten mit externen Icon-Dateien
const SPORT_ICON_FILES = [
    "Basketball", "BodyART", "Bodystyling", "Boxen", "Core Power",
    "Eltern-Kind-Turnen", "Fatburn", "Female Moves", "Fitness Classic",
    "Fitness Power", "Functional Training", "Generation plus", "HIIT",
    "Kickbox-Power", "Mobility Stretching", "Nordic Walking", "Pilates",
    "Power Circuit", "Qi Gong", "Rücken Fitness", "Silent Disco",
    "Step Power", "Volleyball", "Yoga", "Zirkuskünste", "Zumba"
];

/**
 * Lädt alle Sport-Icons aus externen SVG-Dateien
 */
async function loadSportIcons() {
    const loadPromises = SPORT_ICON_FILES.map(async (sport) => {
        try {
            const response = await fetch(`icons/${sport}.svg`);
            if (response.ok) {
                const svgText = await response.text();
                // Entferne XML-Header und behalte nur das SVG-Element
                const cleanSvg = svgText.replace(/<\?xml[^?]*\?>/g, '').trim();
                SPORT_ICONS[sport] = cleanSvg;
            }
        } catch (error) {
            console.warn(`Icon für ${sport} konnte nicht geladen werden:`, error);
        }
    });

    await Promise.all(loadPromises);
}

// Active state icons werden nicht mehr benötigt - externe SVGs verwenden currentColor
const SPORT_ICONS_ACTIVE = {};

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
    await loadSportIcons();
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
