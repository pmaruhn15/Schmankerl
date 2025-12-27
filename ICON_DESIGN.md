# Icon Design Guidelines

## Vision: Eine Icon-Familie

Wir designen eine **zusammenhängende Icon-Familie** für alle Sportarten - ähnlich wie die ikonischen Piktogramme der Olympischen Spiele (z.B. München 1972 von Otl Aicher oder Tokyo 2020).

**Ziel**: Jedes Icon soll...
- Sofort als Teil der gleichen Familie erkennbar sein
- Die Sportart eindeutig kommunizieren
- In kleiner Größe (24x24) funktionieren
- Einen einheitlichen visuellen Stil teilen

**Inspiration**: Olympische Piktogramme, die über Jahrzehnte beweisen, dass Sport-Icons universell verständlich und ästhetisch zeitlos sein können.

---

## Design Prinzipien

### Grundlagen
- **ViewBox**: `24x24` - alle Icons
- **Stroke-width**: `1.5` als Standard
- **Stroke-linecap/linejoin**: `round` für weiche Übergänge

### Ecken & Rundungen

**Abgerundet verwenden bei:**
- Organischen Formen (Menschen, Flammen, Blätter)
- Verbindungspunkten von Linien
- Enden von offenen Pfaden
- Weichen, einladenden Elementen

**Kantig/Scharf verwenden bei:**
- Technischen Objekten (Hanteln, Stufen, Gebäude)
- Geometrischen Grundformen wo Präzision wichtig ist
- Kontrastelementen für visuelles Interesse

**Regel**: Innerhalb eines Icons konsistent bleiben. Nicht mischen außer bewusst als Kontrast.

### Fills vs. Strokes

**Nur Strokes:**
- Standard für die meisten Icons
- Leichter, luftiger Look
- Gut für komplexe Formen

**Fills als Akzent:**
- Kleine Punkte/Augen (signalisiert "aktiv" oder "Fokus")
- Gewichte bei Fitness-Icons (signalisiert "Masse")
- Max. 1-2 filled Elemente pro Icon

**Volle Fills:**
- Vermeiden - macht Icons zu schwer
- Ausnahme: Silhouetten-Stil (nicht unser Stil)

### Visuelle Hierarchie
1. **Primäres Element**: Größte Form, zentralste Position
2. **Sekundäre Details**: Unterstützen Erkennbarkeit
3. **Akzente**: Kleine Fills oder besondere Linien

### Proportionen
- Padding: ~2px zum Rand (Icon nutzt ca. 20x20 im 24x24 ViewBox)
- Figurative Icons: Kopf r="2.5", Körper proportional
- Linien-Balance: Nicht zu dünn (< 1), nicht zu dick (> 2)

---

## Feedback Log

### Iteration 1
**Feedback**: "Icons zu abgehackt, besonders Strichmännchen"
**Lösung**: Rounded strokes, Bézier-Kurven für Körper

### Iteration 2
**Feedback**: "Basketball und Qi Gong waren vorher besser"
**Lösung**: Klassische Symbole nicht über-simplifizieren

### Iteration 3
**Feedback**: "Rücken icon schöner und erkennbarer"
**Lösung**: Anatomische Klarheit, Wirbelsäulen-Metapher

### Iteration 4 (aktuell)
**Feedback**: "Fitness Classic cleaner, sinnvoll mit Ecken arbeiten, Fills überdenken"

**Analyse Fitness Classic (Hantel)**:
- Hantel = technisches Objekt → eher kantig
- Gewichtsscheiben = Masse → könnten filled sein
- Stange = Verbindung → dünn, aber sichtbar

**Design-Entscheidung**:
- Gewichtsscheiben: Filled rectangles (signalisiert Gewicht/Masse)
- Stange: Dünne Linie
- Ecken: `rx="0"` für technischen Look, aber rounded stroke-ends

---

## Icon Status

| Icon | Status | Notizen |
|------|--------|---------|
| Basketball | ✅ | Klassische Ball-Linien |
| Qi Gong | ✅ | Yin-Yang Symbol |
| Rücken Fitness | ✅ | Wirbelsäulen-Darstellung |
| Yoga | ✅ | Lotus-arme |
| Fitness Classic | ✅ | Filled Plates, sharp corners, clean bar |
| Fitness Power | ✅ | Wie Classic + Akzent-Kreis |
| Zumba | ⚠️ | Prüfen |
| Nordic Walking | ⚠️ | Prüfen |

---

## Referenzen & Inspiration
- Lucide Icons (stroke-based, konsistent)
- Phosphor Icons (gute Balance Rundung/Kanten)
- SF Symbols (Apple - gute Gewichtung)
