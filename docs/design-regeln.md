# Design-Regeln — woran man eine professionelle Website erkennt

Diese Regeln stehen in Kurzform auch in `CLAUDE.md`, damit Claude sie beim Bauen einhält. Hier sind sie erklärt, damit du sie verstehst und selbst anwenden kannst.

## 1. Erst das Thema, dann die Gestaltung

Bevor eine Farbe gewählt wird, drei Fragen beantworten:

- **Worum geht es?** (Ein Verein, ein Handwerksbetrieb, dein Portfolio, ein Projekt?)
- **Für wen?** (Wer besucht die Seite, und mit welchem Gerät?)
- **Was soll die Person tun?** (Anrufen, lesen, etwas herunterladen, sich anmelden?)

Alles Weitere — Farben, Schrift, Tonfall, Bilder — kommt aus diesen Antworten. Eine Seite für einen Dachdecker sieht anders aus als eine für ein Musikfestival, und das ist gut so. Seiten wirken billig, wenn sie für jedes Thema gleich aussehen.

## 2. Eine Sache darf laut sein

Jede gute Seite hat genau ein Element, das man sich merkt: eine große Überschrift, ein starkes Foto, eine Animation, eine ungewöhnliche Farbe. Alles andere ist ruhig und ordentlich. Wer drei laute Dinge hat, hat keins.

Praktisch: Bevor du abgibst, schau auf die Seite und entferne eine Verzierung.

## 3. Schrift macht die Persönlichkeit

- **Ein oder zwei Schriftfamilien.** Wenn zwei, dann deutlich verschieden (z. B. eine markante für Überschriften, eine ruhige für Text).
- **Zeilenbreite:** Fließtext nicht breiter als etwa 65–75 Zeichen. Längere Zeilen sind anstrengend zu lesen. Im Kit regelt das `--breite-text`.
- **Zeilenhöhe:** 1.5 bis 1.7 im Fließtext.
- **Nicht:** GROSSBUCHSTABEN für kleine Labels, ein einzelnes farbiges Wort in der Überschrift, kleine Überschriften über Dingen, die keine brauchen. Das sind die typischen Merkmale generierter Seiten.

## 4. Struktur ist Information, keine Deko

Linien, Rahmen, Nummern und Karten sagen dem Besucher etwas: „Das gehört zusammen", „Das ist Schritt 2 von 4". Wenn sie nichts sagen, lass sie weg.

- Nur nummerieren, wenn es wirklich eine Reihenfolge ist.
- Nicht jeden Inhalt in gleiche Kästchen mit gleichem Schatten packen.
- Verläufe als Hintergrund-Deko sind fast immer überflüssig.

## 5. Farbe mit Absicht

Vier bis sechs Farben, als Variablen in `:root` benannt (siehe `kit/base.css`): Hintergrund, Fläche, Text, leiser Text, Linie, Akzent. **Eine** Akzentfarbe — für Knöpfe, Links, Betonung.

Zwei Kombinationen tauchen in generierten Seiten ständig auf und sind daher abgenutzt: Cremeweiß mit Terrakotta-Orange, und Nachtschwarz mit Neongrün. Nimm sie nur, wenn das Thema genau danach verlangt.

Kontrast prüfen: Text auf Hintergrund mindestens 4.5 : 1 (z. B. mit dem Kontrast-Checker von WebAIM).

## 6. Text ist Teil des Designs

„Lorem ipsum" und „Wir sind Ihr kompetenter Partner" machen jede Gestaltung kaputt. Schreib konkret, was die Sache ist und was sie bringt.

- Knöpfe sagen, was passiert: „Termin anfragen", nicht „Absenden".
- Aktiv formulieren, kurz, normale Groß-/Kleinschreibung.
- Kein Pfeil „→" hinter jedem Link, keine Mittelpunkte „A · B · C" als Trennung.

## 7. Bewegung sparsam

Steht ausführlich in `docs/animationen.md`. Kurz: ein inszenierter Moment beim Laden, zwei bis vier Einblendungen beim Scrollen, und sonst bewegt sich nur, was der Besucher anfasst.

## 8. Der Qualitätsboden

Das ist nicht „nice to have", sondern das Minimum. Vor jeder Abgabe:

- [ ] Auf dem Handy (375 px breit) ohne Seitwärts-Scrollen nutzbar
- [ ] Mit der Tab-Taste bedienbar, Fokus sichtbar
- [ ] Jedes Bild hat einen `alt`-Text
- [ ] Genau eine `<h1>`, Überschriften in sinnvoller Reihenfolge
- [ ] `<title>` und `<meta name="description">` gesetzt
- [ ] Seite funktioniert ohne Animationen vollständig
- [ ] Kontrast ausreichend

## Begriffe

- **Hero** — der oberste Bereich einer Seite, das Erste, was man sieht.
- **Akzentfarbe** — die eine auffällige Farbe für Knöpfe und Wichtiges.
- **Kontrast** — Helligkeitsunterschied zwischen Text und Hintergrund. Zu wenig = schlecht lesbar.
- **alt-Text** — Beschreibung eines Bildes für Screenreader und für den Fall, dass das Bild nicht lädt.
- **Responsive** — die Seite passt sich der Bildschirmbreite an, vom Handy bis zum großen Monitor.
