# SportFinder München - Konzept

## Vision
Eine interaktive Webanwendung, die Münchner Bürger:innen hilft, passende FreizeitSport-Kurse in ihrer Nähe zu finden - basierend auf Standort, Reisebereitschaft und persönlichen Präferenzen.

## Warum dieses Schmankerl?

### Alleinstellungsmerkmale
1. **Erstes interaktives HTML-Schmankerl** - bisherige sind nur Bilder/Videos
2. **Personalisiert** - Nutzer gibt eigenen Standort ein
3. **Praktischer Mehrwert** - direkt nutzbar, nicht nur informativ
4. **Kombination Zeit + Raum + Interaktion** - maximaler Erkenntnisgewinn

### Bewertungskriterien-Fit
| Kriterium | Gewicht | Unser Ansatz |
|-----------|---------|--------------|
| Kreativität | 30% | Interaktives Tool statt statische Grafik |
| Erkenntnisgewinn | 30% | Personalisierte Empfehlungen, Erreichbarkeitsanalyse |
| Klarheit | 20% | Intuitive Kartenoberfläche mit Filtern |
| Technische Qualität | 20% | Moderne Web-Technologien, Routing-API |

---

## Features

### MVP (Minimum Viable Product)
1. **Interaktive Karte** mit allen 122 Kursen als Marker
2. **Standort-Eingabe** (Adresse oder GPS)
3. **Isochrone-Darstellung** - "Was erreiche ich in X Minuten?"
4. **Filter** nach:
   - Sportart
   - Wochentag
   - Uhrzeit
   - Verkehrsmittel (Fahrrad, Fußweg, Auto)
5. **Kurs-Details** bei Klick auf Marker

### Nice-to-Have
- Routenberechnung zum ausgewählten Kurs
- Wochenplan-Export
- Favoriten speichern (localStorage)
- "Überrasch mich" - Zufallsempfehlung

---

## Technische Architektur

### Stack
```
┌─────────────────────────────────────────────┐
│           SportFinder München               │
│              (Single HTML File)             │
├─────────────────────────────────────────────┤
│  Frontend                                   │
│  ├── Leaflet.js (Karte)                    │
│  ├── Vanilla JS (Logik)                    │
│  └── CSS (Styling)                         │
├─────────────────────────────────────────────┤
│  Externe APIs                               │
│  ├── OpenRouteService (Isochrone/Routing)  │
│  └── Nominatim (Adress-Geocoding)          │
├─────────────────────────────────────────────┤
│  Daten                                      │
│  └── Hallensportprogramm CSV (eingebettet) │
└─────────────────────────────────────────────┘
```

### Warum Single HTML File?
- Challenge-Anforderung: max. 10 MB, HTML-Format
- Keine Serverabhängigkeit
- Einfach einzureichen und zu hosten

### APIs

#### OpenRouteService (kostenlos)
- **Isochrone API**: Erreichbarkeitspolygone berechnen
- **Directions API**: Routen berechnen
- Profile: `cycling-regular`, `foot-walking`, `driving-car`
- Limits: 5 Locations, 1h Auto / 5h Fahrrad / 20h Fußweg
- API-Key erforderlich (kostenlos registrieren)

#### Nominatim (OpenStreetMap)
- Adress-zu-Koordinaten (Geocoding)
- Kostenlos, kein API-Key nötig
- Fair-Use: max. 1 Request/Sekunde

### ÖPNV-Hinweis
Die MVV-Routing-API ist leider noch in geschlossener Beta. Alternativen:
1. Fahrrad als Proxy (ähnliche Geschwindigkeit wie Tram/Bus in der Stadt)
2. Hinweis "ÖPNV-Zeiten sind geschätzt"
3. Link zur MVV-App für genaue Verbindungen

---

## Datenmodell

### Eingabe (CSV → JSON)
```javascript
{
  "kurse": [
    {
      "id": 1,
      "sportart": "Basketball",
      "detail": "",
      "wochentag": "Donnerstag",
      "start": "20:00",
      "ende": "21:30",
      "adresse": "Luisenstr. 29",
      "stadtteil": "Königsplatz",
      "schule": "Städtische Berufsschule...",
      "lat": 48.1454129828542,
      "lng": 11.562628207656,
      "webseite": "https://..."
    },
    // ... 121 weitere Kurse
  ]
}
```

### Dynamische Erweiterung (zur Laufzeit)
```javascript
{
  // ... Basisdaten ...
  "entfernung_m": 2340,        // Luftlinie
  "reisezeit_min": {
    "fahrrad": 12,
    "fuss": 28,
    "auto": 8
  },
  "erreichbar": true           // innerhalb Isochrone?
}
```

---

## UI/UX Design

### Layout
```
┌────────────────────────────────────────────────────┐
│  🏃 SportFinder München                      [?]   │
├────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │ 📍 Dein Standort │  │                        │  │
│  │ [Adresse eingeben]  │                        │  │
│  │ [📍 GPS nutzen]  │  │                        │  │
│  ├──────────────────┤  │                        │  │
│  │ 🚴 Verkehrsmittel│  │      KARTE             │  │
│  │ ○ Fahrrad        │  │                        │  │
│  │ ○ Zu Fuß         │  │   [Isochrone]          │  │
│  │ ○ Auto           │  │      ◉ ◉               │  │
│  ├──────────────────┤  │    ◉   ◉ ◉             │  │
│  │ ⏱️ Max. Reisezeit│  │      ◉                 │  │
│  │ [====●=====] 20m │  │                        │  │
│  ├──────────────────┤  │                        │  │
│  │ 🏀 Sportart      │  │                        │  │
│  │ [Alle ▼]         │  │                        │  │
│  ├──────────────────┤  │                        │  │
│  │ 📅 Wochentag     │  │                        │  │
│  │ ☑Mo ☑Di ☑Mi...  │  │                        │  │
│  ├──────────────────┤  └────────────────────────┘  │
│  │ 📋 Ergebnisse    │                              │
│  │ ┌──────────────┐ │                              │
│  │ │ Basketball   │ │                              │
│  │ │ Do 20:00     │ │                              │
│  │ │ 🚴 12 min    │ │                              │
│  │ └──────────────┘ │                              │
│  └──────────────────┘                              │
└────────────────────────────────────────────────────┘
```

### Farbschema
- Primär: München-Blau (#0066CC) oder Datengartln-Grün
- Sportart-Kategorien farbcodiert:
  - Fitness: Orange
  - Yoga/Pilates: Lila
  - Ball/Team: Grün
  - Tanz: Pink

### Interaktionen
1. Adresse eingeben → Geocoding → Karte zentriert
2. Verkehrsmittel wählen → Isochrone wird gezeichnet
3. Reisezeit-Slider → Isochrone aktualisiert
4. Marker innerhalb Isochrone hervorgehoben
5. Klick auf Marker → Popup mit Details + "Route anzeigen"

---

## Implementierungsplan

### Phase 1: Grundgerüst
- [ ] HTML-Struktur mit Sidebar + Karte
- [ ] Leaflet.js einbinden
- [ ] CSV → JSON konvertieren und einbetten
- [ ] Alle Kurse als Marker anzeigen

### Phase 2: Filter
- [ ] Sportart-Dropdown
- [ ] Wochentag-Checkboxen
- [ ] Uhrzeit-Filter
- [ ] Marker filtern

### Phase 3: Standort & Routing
- [ ] Adresseingabe mit Nominatim-Geocoding
- [ ] GPS-Standort abfragen
- [ ] OpenRouteService API-Integration
- [ ] Isochrone zeichnen

### Phase 4: Polish
- [ ] Responsive Design
- [ ] Ladeanimationen
- [ ] Error Handling
- [ ] Performance-Optimierung

### Phase 5: Dokumentation
- [ ] Beschreibungstext (500-2000 Zeichen)
- [ ] Credits & Lizenz
- [ ] Testen auf verschiedenen Geräten

---

## Technische Anforderungen

### Dateigröße (max. 10 MB)
| Komponente | Geschätzte Größe |
|------------|------------------|
| HTML + CSS + JS | ~50 KB |
| Leaflet.js (minified) | ~140 KB |
| Marker-Icons | ~10 KB |
| Daten (JSON) | ~30 KB |
| **Gesamt** | **~230 KB** ✅ |

### Browser-Kompatibilität
- Chrome, Firefox, Safari, Edge (aktuelle Versionen)
- Mobile: iOS Safari, Chrome Android

### API-Keys benötigt
- OpenRouteService: Kostenlos registrieren unter https://openrouteservice.org/

---

## Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|--------|-------------------|------------|
| ORS-API Rate Limits | Mittel | Caching, Debouncing |
| CORS-Probleme | Niedrig | APIs unterstützen CORS |
| Große Dateigröße | Niedrig | Nur essentielle Libs |
| Komplexität | Mittel | MVP-First-Ansatz |

---

## Quellen & Lizenzen

### Datensatz
- **Hallensportprogramm 2025-2026**
- Quelle: opendata.muenchen.de
- Lizenz: Datenlizenz Deutschland Namensnennung 2.0

### APIs
- [OpenRouteService](https://openrouteservice.org/) - Routing & Isochrone
- [Nominatim](https://nominatim.org/) - Geocoding

### Bibliotheken
- [Leaflet.js](https://leafletjs.com/) - BSD-2-Clause
- OpenStreetMap Tiles - ODbL

### Schmankerl-Lizenz
CC BY (Namensnennung) - ermöglicht maximale Weiterverwendung

---

## Nächste Schritte

1. ✅ Konzept erstellen
2. ⬜ OpenRouteService API-Key besorgen
3. ⬜ Prototyp mit Karte + Markern
4. ⬜ Filter implementieren
5. ⬜ Routing-Integration
6. ⬜ Feinschliff & Einreichung
