# My-Website — Yoones' Website-Werkstatt

Hier entstehen Websites. Das Repo enthält ein kleines Kit (CSS + JavaScript) für professionelle Seiten mit Animationen, eine Vorführseite und die Regeln, nach denen Claude hier arbeitet.

## Was wo liegt

| Ordner / Datei | Was das ist |
|---|---|
| `CLAUDE.md` | Arbeitsregeln für Claude: Design-Standards, Animationsregeln, Qualitätscheck. Wird in jedem Gespräch mit diesem Repo automatisch gelesen. |
| `kit/` | Das wiederverwendbare Fundament. Wird in jede Seite eingebunden, nicht verändert. |
| `index.html` | Vorführseite — zeigt alle Animationen des Kits. Doppelklick → öffnet im Browser. |
| `sites/` | Hier kommt jede neue Website in ihren eigenen Ordner. |
| `docs/` | Erklärungen für Menschen: `animationen.md` (wie man das Kit benutzt), `design-regeln.md` (was eine Seite gut macht). |

## Neue Website anfangen

1. Ordner anlegen: `sites/meine-seite/`
2. Darin `index.html` und `style.css`
3. In `style.css` nur die Variablen überschreiben:

```css
@import url("../../kit/base.css");
@import url("../../kit/animations.css");

:root {
  --farbe-hintergrund: #…;
  --farbe-akzent: #…;
  --schrift-display: "…";
}
```

4. Unten in `index.html`: `<script src="../../kit/animations.js"></script>`
5. Claude im Projekt sagen: „Bau in `sites/meine-seite/` eine Seite für …" — die Regeln aus `CLAUDE.md` greifen dann automatisch.

## Veröffentlichen

Die Seiten laufen ohne Build-Schritt. Bei Netlify reicht: Repo verbinden, Veröffentlichungsordner = `/` (oder `sites/meine-seite` für eine einzelne Seite). Bei GitHub Pages: Settings → Pages → Branch `main`, Ordner `/`.

## Lernen

Die `docs/`-Dateien erklären jede Technik und jeden Begriff. Beste Reihenfolge: erst `index.html` im Browser öffnen und scrollen, dann den Quelltext daneben lesen, dann `docs/animationen.md`.
