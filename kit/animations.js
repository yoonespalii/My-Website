/* ============================================================
   kit/animations.js — macht die Animationen aus animations.css lebendig
   Einbinden ganz unten vor </body>:  <script src="../../kit/animations.js"></script>

   Was hier passiert:
   1. Markiert <html> mit der Klasse "js" (dann erst werden data-reveal-Elemente versteckt)
   2. Beobachtet, wann Elemente ins Bild scrollen → setzt .sichtbar
   3. Nummeriert Kinder von Gruppen (--i), damit CSS sie staffeln kann
   4. Zahlen hochzählen (data-zaehler)
   5. Navigation kompakt machen beim Scrollen (.nav-fest)
   6. Scroll-Fortschritt (.fortschritt)
   7. 3D-Kippeffekt (.kippt)
   ============================================================ */
(function () {
  "use strict";

  // Hat die Person "Bewegung reduzieren" eingestellt? Dann machen wir fast nichts.
  const bewegungReduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1) Erst jetzt dürfen die CSS-Regeln ".js [data-reveal]" greifen.
  document.documentElement.classList.add("js");

  // 3) Kinder nummerieren: --i = 0, 1, 2 … (CSS rechnet daraus die Verzögerung)
  //    Gilt für Reveal-Gruppen, Hero-Sequenzen und maskierte Zeilen.
  document.querySelectorAll("[data-reveal-group], .hero-sequenz").forEach(gruppe => {
    Array.from(gruppe.children).forEach((kind, i) => kind.style.setProperty("--i", i));
  });
  document.querySelectorAll(".zeile-maske").forEach((zeile, i) => {
    zeile.querySelector("span")?.style.setProperty("--i", i);
  });

  // Einzelne Verzögerung: <div data-reveal data-verzoegerung="200">
  document.querySelectorAll("[data-verzoegerung]").forEach(el => {
    el.style.setProperty("--verzoegerung", el.dataset.verzoegerung + "ms");
  });

  // 2) Scroll-Reveal mit IntersectionObserver
  //    (Der Browser sagt uns Bescheid, sobald ein Element sichtbar wird —
  //     viel sparsamer als bei jedem Scroll-Pixel selbst zu rechnen.)
  const revealElemente = document.querySelectorAll("[data-reveal], [data-reveal-group]");
  if (bewegungReduziert || !("IntersectionObserver" in window)) {
    revealElemente.forEach(el => el.classList.add("sichtbar"));
  } else {
    const beobachter = new IntersectionObserver((eintraege) => {
      eintraege.forEach(eintrag => {
        if (eintrag.isIntersecting) {
          eintrag.target.classList.add("sichtbar");
          beobachter.unobserve(eintrag.target);   // einmal reicht
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    // rootMargin: Element gilt erst als "im Bild", wenn es 12 % über dem unteren Rand ist
    revealElemente.forEach(el => beobachter.observe(el));
  }

  // 4) Zahlen hochzählen: <span data-zaehler="1200" data-suffix="+">0</span>
  const zaehler = document.querySelectorAll("[data-zaehler]");
  if (zaehler.length) {
    const format = new Intl.NumberFormat("de-DE");
    const zaehle = (el) => {
      const ziel = parseFloat(el.dataset.zaehler);
      const suffix = el.dataset.suffix || "";
      const dauer = parseInt(el.dataset.dauer || "1400", 10);
      if (bewegungReduziert) { el.textContent = format.format(ziel) + suffix; return; }
      const start = performance.now();
      const schritt = (jetzt) => {
        const t = Math.min((jetzt - start) / dauer, 1);
        const eased = 1 - Math.pow(1 - t, 3);          // schnell starten, weich enden
        el.textContent = format.format(Math.round(ziel * eased)) + suffix;
        if (t < 1) requestAnimationFrame(schritt);
      };
      requestAnimationFrame(schritt);
    };
    const zaehlBeobachter = new IntersectionObserver((eintraege) => {
      eintraege.forEach(e => {
        if (e.isIntersecting) { zaehle(e.target); zaehlBeobachter.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    zaehler.forEach(el => zaehlBeobachter.observe(el));
  }

  // 5) + 6) Scroll-abhängige Dinge — gebündelt in einem Handler
  const nav = document.querySelector(".nav-fest");
  const fortschritt = document.querySelector(".fortschritt");
  if (nav || fortschritt) {
    let angefragt = false;
    const beiScroll = () => {
      if (angefragt) return;
      angefragt = true;
      requestAnimationFrame(() => {               // höchstens einmal pro Bildwiederholung
        const y = window.scrollY;
        if (nav) nav.classList.toggle("gescrollt", y > 24);
        if (fortschritt) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          fortschritt.style.setProperty("--fortschritt", max > 0 ? (y / max).toFixed(4) : 0);
        }
        angefragt = false;
      });
    };
    window.addEventListener("scroll", beiScroll, { passive: true });
    beiScroll();
  }

  // 7) 3D-Kippeffekt: Karte neigt sich zum Mauszeiger
  if (!bewegungReduziert && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".kippt").forEach(karte => {
      const staerke = parseFloat(karte.dataset.kippStaerke || "6"); // Grad
      karte.addEventListener("pointermove", (ev) => {
        const r = karte.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
        const y = (ev.clientY - r.top) / r.height - 0.5;
        karte.style.setProperty("--ry", (x * staerke * 2) + "deg");
        karte.style.setProperty("--rx", (-y * staerke * 2) + "deg");
      });
      karte.addEventListener("pointerleave", () => {
        karte.style.setProperty("--rx", "0deg");
        karte.style.setProperty("--ry", "0deg");
      });
    });
  }
})();
