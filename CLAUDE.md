# Arbeitsregeln für dieses Repo

Dieses Repository ist Yoones' Werkstatt für professionelle Websites. Jede Seite, die hier entsteht, soll aussehen, als hätte sie ein gutes Designstudio gebaut — nicht wie eine Vorlage. Diese Datei wird von Claude in jedem Gespräch gelesen. Halte dich daran, ohne es zu erwähnen.

## Wer hier arbeitet

Yoones lernt Webentwicklung (Anfänger, Deutsch). Darum gilt:

- Antworte auf Deutsch. Fachbegriffe beim ersten Auftauchen in einem Halbsatz erklären.
- Code kurz kommentieren — auf Deutsch, so dass man beim Lesen etwas lernt.
- Bei größeren Entscheidungen (Farben, Schriften, Aufbau) erst einen kurzen Plan zeigen, dann bauen.
- Wenn Yoones etwas selbst machen will, erkläre den Weg statt es stumm zu erledigen.

## Aufbau des Repos

```
kit/                  Wiederverwendbare Basis — wird in jede Seite eingebunden, nicht verändert
  base.css            Reset, Farb- und Schriftvariablen, Abstände, Layout-Helfer
  animations.css      Alle Animationsklassen (Einblenden, Staffeln, Hover, Marquee …)
  animations.js       Macht die Animationen scrollabhängig; Zähler, Navigation, sanftes Scrollen
index.html            Vorführseite: zeigt alles, was das Kit kann
sites/<name>/         Jede neue Website bekommt hier ihren eigenen Ordner
docs/                 Erklärungen für Menschen (nicht für Claude)
```

Neue Website anlegen: `sites/<name>/index.html` mit eigener `style.css`, die `../../kit/base.css` und `../../kit/animations.css` einbindet und nur die Farb- und Schriftvariablen überschreibt. Das Kit selbst bleibt unangetastet — Verbesserungen am Kit sind ein eigener, bewusster Schritt.

## Technik

- Reines HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt, nichts installieren.
- Schriften von Google Fonts. Bibliotheken nur, wenn ein konkreter Grund vorliegt — dann über cdnjs.
- Jede Seite muss direkt per Doppelklick im Browser laufen und unverändert auf Netlify / GitHub Pages deploybar sein.
- Bilder liegen neben der Seite in `img/`, mit `width`/`height`-Attributen und `loading="lazy"` unterhalb des ersten Bildschirms.

## Design — was eine Seite professionell macht

**Zuerst das Thema verstehen.** Bevor du gestaltest, kläre: Worum geht es, für wen ist die Seite, was soll der Besucher tun? Farben, Schrift und Tonfall kommen aus dem Thema — ein Handwerksbetrieb sieht anders aus als ein Musikprojekt.

**Eine Sache darf laut sein.** Entscheide, was das Markante der Seite ist (eine Headline, ein Bild, eine Animation, eine Farbe) und halte alles andere ruhig. Wer alles betont, betont nichts.

**Typografie trägt die Persönlichkeit.** Ein oder höchstens zwei Schriftfamilien, klar unterscheidbar. Fließtext nie breiter als etwa 70 Zeichen. Zeilenhöhe im Fließtext 1.5–1.7. Keine Großbuchstaben-Labels, kein einzelnes farbiges Wort in der Headline, keine überflüssigen Mini-Überschriften über Inhalten.

**Struktur ist Information.** Rahmen, Linien, Nummern und Karten nur, wenn sie etwas über den Inhalt sagen. Drei Dinge sind keine Reihenfolge — also nicht nummerieren. Nicht jeden Inhalt in identische Karten mit gleichem Schatten packen.

**Farbe mit Absicht.** 4–6 benannte Farben als CSS-Variablen in `:root`, davon eine Akzentfarbe. Hintergrund nicht pauschal Cremeweiß mit Terrakotta oder Nachtschwarz mit Neongrün — das sind die Standardlooks generierter Seiten. Wähle die Palette aus dem Thema.

**Text ist Design.** Schreib echte, konkrete Texte statt „Lorem ipsum" oder „Wir sind Ihr Partner für…". Buttons sagen, was passiert („Termin anfragen", nicht „Absenden"). Aktiv, kurz, in normaler Groß-/Kleinschreibung.

**Vermeide die üblichen Erkennungszeichen generierter Seiten:** Pfeil „→" hinter jedem Link, Meta-Zeilen mit Mittelpunkten (A · B · C), gleich gerundete Ecken auf allem, Verlaufsflächen als Deko, Monospace für kleine Labels, Hero mit großer Zahl + kleinem Label + Verlauf.

## Animationen — die Regeln

Animationen sind das, was eine Seite lebendig und teuer wirken lässt — oder billig, wenn man sie übertreibt.

1. **Ein orchestrierter Moment.** Beim Laden der Seite gibt es genau eine inszenierte Sequenz (meist im Hero). Danach bewegt sich nur, was der Besucher auslöst oder was beim Scrollen neu ins Bild kommt.
2. **Scroll-Reveal sparsam.** Nicht jede Sektion „faded und rutscht hoch". Nutze `data-reveal` für die 2–4 Stellen, die Aufmerksamkeit verdienen, und staffle Gruppen (`data-reveal-group`), statt alles einzeln zu animieren.
3. **Bewegung antwortet auf Handlung.** Hover, Aufklappen, Umschalten, Bestätigen — hier ist Bewegung immer willkommen, weil sie zeigt, was sich geändert hat.
4. **Nur `transform` und `opacity` animieren.** Nie `width`, `height`, `top`, `left`, `margin` — das ruckelt. `will-change` nur gezielt.
5. **Dauer und Kurve:** Kleine UI-Reaktionen 150–250 ms, Einblendungen 500–800 ms, große Hero-Sequenzen bis 1.2 s. Kurven aus `base.css` (`--ease-out`, `--ease-spring`) verwenden, nie `linear` für sichtbare Bewegung.
6. **`prefers-reduced-motion` respektieren.** Das Kit schaltet Animationen für Menschen ab, die das im System eingestellt haben. Neue Animationen müssen in diesem Fall ebenfalls ruhig bleiben.
7. **Inhalt ist auch ohne JavaScript da.** Elemente mit `data-reveal` sind nur unsichtbar, wenn `animations.js` geladen ist (Klasse `js` auf `<html>`). Ohne JS ist alles sofort sichtbar.

Was das Kit kann, steht in `docs/animationen.md`. Bevor du eine neue Animation erfindest, prüfe, ob eine vorhandene Klasse reicht.

## Qualitätsboden — vor jeder Abgabe prüfen

- Funktioniert auf 375 px Breite (Handy) ohne horizontales Scrollen und ohne winzigen Text?
- Sind Fokus-Ringe sichtbar, wenn man mit Tab durch die Seite geht?
- Reicht der Kontrast (Text auf Hintergrund mindestens 4.5:1)?
- Hat jedes Bild einen sinnvollen `alt`-Text, jede Seite einen `<title>` und eine `<meta name="description">`?
- Gibt es genau eine `<h1>`, und folgen die Überschriften einer Ordnung (h2 nach h1, h3 nach h2)?
- Ist die Seite mit ausgeschalteten Animationen immer noch vollständig und verständlich?
- Letzter Blick: Was kann noch weg? Eine Verzierung entfernen, bevor man abgibt.

## Arbeitsweise mit Git

- Kleine, benannte Commits auf Deutsch: „Hero-Animation für Portfolio-Seite", nicht „update".
- Nichts committen, was nicht im Browser geprüft wurde.
- Das Kit ändern → eigener Commit mit Begründung in der Nachricht.
