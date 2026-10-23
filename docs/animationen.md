# Animationen — so benutzt du das Kit

Alles hier ist reines CSS plus ein kleines Skript. Du schreibst normales HTML und hängst ein Attribut oder eine Klasse dran.

## Einbinden (einmal pro Seite)

Im `<head>`:

```html
<link rel="stylesheet" href="../../kit/base.css">
<link rel="stylesheet" href="../../kit/animations.css">
```

Ganz unten vor `</body>`:

```html
<script src="../../kit/animations.js"></script>
```

(Der Pfad `../../` gilt für Seiten in `sites/<name>/`. Für `index.html` im Hauptordner reicht `kit/…`.)

## Beim Scrollen einblenden

```html
<section data-reveal>…</section>              <!-- von unten -->
<img data-reveal="links" …>                    <!-- von links -->
<div data-reveal="rechts">…</div>
<div data-reveal="zoom">…</div>                <!-- leicht vergrößern -->
<h2 data-reveal="wischen">…</h2>               <!-- wird von links aufgedeckt -->
<p data-reveal data-verzoegerung="200">…</p>   <!-- 200 ms später als normal -->
```

**Was passiert:** Das Element ist unsichtbar, bis es ins Bild scrollt. Dann blendet es sich einmal ein und bleibt. Ohne JavaScript ist es von Anfang an sichtbar.

**Regel:** Zwei bis vier Stellen pro Seite. Nicht jeden Absatz.

## Mehrere Dinge nacheinander (Staffeln)

```html
<div class="raster" data-reveal-group>
  <article>…</article>
  <article>…</article>
  <article>…</article>
</div>
```

Jedes Kind erscheint 90 ms nach dem vorigen. Anderer Abstand: `style="--staffel: 140ms"` auf den Container.

## Der Ladeauftritt (Hero)

Genau einmal pro Seite, ganz oben.

```html
<h1>
  <span class="zeile-maske"><span>Erste Zeile</span></span>
  <span class="zeile-maske"><span>Zweite Zeile</span></span>
</h1>
<div class="hero-sequenz" style="--start: 2">   <!-- 2 = Anzahl der Zeilen davor -->
  <p>Absatz kommt danach.</p>
  <a class="knopf" href="#">Knopf noch später.</a>
</div>
```

`zeile-maske` lässt jede Zeile von unten „hochfahren", wie hinter einem Fenster. `hero-sequenz` lässt die Kinder nacheinander erscheinen. Mit `--start` sagst du, wie viele Zeilen vorher dran waren, damit die Reihenfolge stimmt.

## Zahlen hochzählen

```html
<span data-zaehler="1200" data-suffix="+">0</span>
<span data-zaehler="98" data-suffix=" %" data-dauer="2000">0</span>
```

Startet, sobald die Zahl im Bild ist. Formatiert deutsch (1.200). Im HTML steht `0`, damit auch ohne JavaScript etwas da ist.

## Reaktion auf die Maus

| Klasse | Effekt | Hinweis |
|---|---|---|
| `.hebt` | hebt sich an, bekommt Schatten | für Karten und Kacheln |
| `.kippt` | neigt sich zum Mauszeiger (3D) | Stärke: `data-kipp-staerke="8"` |
| `.zoom-rahmen` | Bild darin zoomt sanft | Klasse auf den Rahmen, nicht aufs Bild |
| `.link-wachsend` | Unterstrich wächst von links | für Navigation und Textlinks |
| `.schwebt` | schwebt dauerhaft auf und ab | nur für Deko im Hintergrund, nie für Text |

## Seitenweit

```html
<div class="fortschritt"></div>          <!-- dünner Balken oben, zeigt Scrollposition -->
<header class="nav-fest">…</header>      <!-- bleibt oben, wird beim Scrollen leicht transparent -->

<div class="marquee">                    <!-- Laufband -->
  <div class="marquee__spur">
    <span>A</span><span>B</span><span>C</span>
    <span aria-hidden="true">A</span><span aria-hidden="true">B</span><span aria-hidden="true">C</span>
  </div>
</div>
```

Beim Laufband steht der Inhalt **zweimal** drin — so läuft die Schleife ohne Sprung. Tempo: `style="--marquee-dauer: 20s"` auf `.marquee`.

## Eigene Animationen schreiben

Drei Regeln, dann wird es gut:

1. Nur `transform` (verschieben, drehen, skalieren) und `opacity` animieren. Alles andere ruckelt.
2. Kurven aus `base.css` benutzen: `var(--ease-out)` für fast alles, `var(--ease-spring)` für kleine, verspielte Reaktionen.
3. In `animations.css` ganz unten steht der Block `prefers-reduced-motion`. Wenn deine neue Animation dort nicht automatisch abgeschaltet wird, trag sie ein.

## Begriffe

- **transform** — CSS-Eigenschaft zum Verschieben, Drehen oder Vergrößern, ohne das Layout zu verändern.
- **opacity** — Deckkraft, 0 = unsichtbar, 1 = voll sichtbar.
- **IntersectionObserver** — eine Browser-Funktion, die meldet, wenn ein Element ins Bild kommt. Spart Rechenzeit gegenüber ständigem Nachmessen.
- **prefers-reduced-motion** — Systemeinstellung („Bewegung reduzieren"), die manche Menschen wegen Schwindel oder Konzentration aktivieren. Websites sollen sie respektieren.
- **CSS-Variable** — ein benannter Wert wie `--farbe-akzent`, den man einmal festlegt und überall benutzt.
