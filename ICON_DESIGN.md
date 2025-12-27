# Icon Design Guidelines

## Design Prinzipien

### Allgemein
- **Stroke-based**: Alle Icons nutzen `stroke-width="1.5"` mit `stroke-linecap="round"` und `stroke-linejoin="round"`
- **ViewBox**: Einheitlich `24x24`
- **Keine Fills**: Außer für kleine Akzente (Augen, Punkte)
- **Erkennbarkeit**: Icons müssen auch in 32px Größe erkennbar sein

### Figurative Icons (Menschen/Bewegung)
- Kopf als Kreis (`r="2.5"`)
- Körper mit fließenden Kurven (Bézier-Pfade mit `q` oder `c`)
- Keine harten Winkel bei Gliedmaßen
- Proportionen: Kopf ~1/6 der Gesamthöhe

### Abstrakte Icons (Bälle, Symbole)
- Klare geometrische Formen
- Symmetrie wo möglich
- Charakteristische Details die den Sport erkennbar machen

---

## Feedback Log

### Iteration 1 (2024-12-27)
**Feedback**: "Icons zu abgehackt und hässlich, besonders Strichmännchen"

**Interpretation**:
- Gerade Linien bei menschlichen Figuren wirken unnatürlich
- Fehlende `stroke-linecap/linejoin="round"` macht Ecken hart
- Zu wenig Kurven in Bewegungsdarstellungen

**Änderungen**:
- Alle Icons auf rounded strokes umgestellt
- Menschliche Figuren mit Bézier-Kurven neu gezeichnet

---

### Iteration 2 (2024-12-27)
**Feedback**: "Basketball und Qi Gong waren vorher besser"

**Interpretation**:
- Nicht alle Änderungen sind Verbesserungen
- Klassische, erkennbare Darstellungen beibehalten
- Bei bekannten Symbolen (Yin-Yang, Basketball-Linien) nicht zu stark abstrahieren

**Änderungen**:
- Basketball: Zurück zu klassischen Ball-Linien
- Qi Gong: S-Kurve für Yin-Yang wiederhergestellt

---

### Iteration 3 (2024-12-27)
**Feedback**: "Rücken icon schöner und erkennbarer machen"

**Interpretation**:
- Abstrakte Körperteile müssen anatomisch erkennbar sein
- Rücken/Wirbelsäule braucht klarere visuelle Metapher
- Icon muss auf den ersten Blick "Rücken" kommunizieren

**Änderungen**:
- Rücken Fitness: Wirbelsäule als vertikale Struktur mit Wirbeln
- Seitliche Silhouette für bessere Erkennbarkeit

---

## Icon Status

| Icon | Status | Notizen |
|------|--------|---------|
| Basketball | ✅ OK | Klassische Ball-Linien |
| Qi Gong | ✅ OK | Yin-Yang Symbol |
| Rücken Fitness | 🔄 Überarbeitet | Wirbelsäulen-Darstellung |
| Yoga | ✅ OK | Lotus-Position angedeutet |
| Zumba | ⚠️ Prüfen | Tanzende Figur |
| Nordic Walking | ⚠️ Prüfen | Stöcke + Bewegung |
