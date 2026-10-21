/* ==========================================================================
   BETHEL – Poarta Cerului · JavaScript principal (fără framework)
   Folosește: GSAP + ScrollTrigger (CDN) și datele din data/proiecte.js (window.BETHEL).

   Cuprins:
   0. Utilitare și setări            6. Poveste la scroll + slider înainte/după
   1. Pictograme (sprite SVG)        7. Pagina „Proiecte” (filtre)
   2. Navigare și date generale      8. Pagina unui proiect + lightbox
   3. Imagini („developare”)         9. Donații, formular, transparență
   4. Animația de deschidere        10. Pornirea paginii
   5. Hero, contoare, reveal-uri
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 0. Utilitare și setări ---------- */
  var D = window.BETHEL;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Animăm doar dacă GSAP s-a încărcat și utilizatorul nu a cerut mișcare redusă */
  var canAnimate = !!(window.gsap && window.ScrollTrigger) && !prefersReduced;
  if (canAnimate) gsap.registerPlugin(ScrollTrigger);

  var fmt = function (v) { return Math.round(v).toLocaleString('ro-RO'); };
  var page = document.body.getAttribute('data-page') || 'index';

  /* Calea unei poze de proiect: images/proiecte/<slug>/<fisier> (sau o adresă completă) */
  function imgPath(slug, f) {
    return /^(https?:)?\/\/|^images\//.test(f) ? f : 'images/proiecte/' + slug + '/' + f;
  }
  function catName(id) {
    var c = (D.categorii || []).filter(function (x) { return x.id === id; })[0];
    return c ? c.nume : id;
  }
  function projectUrl(p) { return 'proiect.html?p=' + encodeURIComponent(p.slug); }
  function coverAlt(p) {
    var g = (p.galerie || []).filter(function (x) { return x.f === p.coperta; })[0];
    return g ? g.alt : p.titlu;
  }

  /* Dacă o poză lipsește, afișăm un fundal cald în loc de pictograma „imagine ruptă” */
  var FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4EEE2"/><stop offset="1" stop-color="#E3B873"/></linearGradient></defs><rect width="4" height="3" fill="url(#g)"/></svg>');
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = '1'; t.src = FALLBACK; }
  }, true);

  /* ---------- 1. Pictograme (sprite SVG injectat o singură dată) ---------- */
  function injectSprite() {
    var icons = {
      cross: '<path d="M12 3v18M7.5 8h9"/>',
      phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
      copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
      check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
      instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".6"/>',
      youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
      hands: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5h14M12 8.5v5l-3 6.5M12 13.5l3 6.5"/>',
      elder: '<circle cx="10" cy="4.5" r="2"/><path d="M10 8v6l-2 6M10 14l3 6M10 9.5l4 1.5M16.5 11v9"/>',
      child: '<circle cx="12" cy="5.5" r="2.5"/><path d="M6 11h12M12 10v6M9.5 21 12 16l2.5 5"/>',
      heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/>',
      bread: '<path d="M4 11a4 4 0 0 1 3-6h10a4 4 0 0 1 3 6v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="m9 9 1 3M14 9l1 3"/>',
      shirt: '<path d="M8 4 3 7l2 4 3-1v10h8V10l3 1 2-4-5-3a4 4 0 0 1-8 0z"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6"/>',
      calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
      close: '<path d="M6 6l12 12M18 6 6 18"/>',
      left: '<path d="m15 5-7 7 7 7"/>',
      right: '<path d="m9 5 7 7-7 7"/>',
      pdf: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 14h6M9 17h4"/>',
      qr: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h3v3m3 0v3h-3m-3 0v-3"/>'
    };
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">';
    Object.keys(icons).forEach(function (k) { s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + icons[k] + '</symbol>'; });
    document.body.insertAdjacentHTML('afterbegin', s + '</svg>');
  }
  var icon = function (name, cls) { return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };

  /* ---------- 2. Navigare și date generale ---------- */
  function initNav() {
    var header = $('#site-header'), toggle = $('.nav-toggle');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    if (toggle) {
      var setOpen = function (open) {
        document.body.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
      };
      toggle.addEventListener('click', function () { setOpen(!document.body.classList.contains('nav-open')); });
      $$('#nav-list a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }
    /* Marchează „Proiecte” ca pagină curentă pe paginile de proiecte */
    if (page === 'proiecte' || page === 'proiect') {
      var a = $('#nav-list a[href="proiecte.html"]'); if (a) a.setAttribute('aria-current', 'page');
    }
  }

  /* Completează contactul, footerul și donațiile din data/proiecte.js */
  function fillOrg() {
    var o = D.org;
    $$('[data-org]').forEach(function (el) { el.textContent = o[el.getAttribute('data-org')] || ''; });
    $$('[data-org-href]').forEach(function (el) {
      var t = el.getAttribute('data-org-href');
      el.href = t === 'tel' ? 'tel:' + o.telefonHref : 'mailto:' + o.email;
    });
    var labels = { idno: 'IDNO: ', inregistrare: '', adresaJuridica: 'Sediu: ' };
    $$('[data-legal]').forEach(function (el) {
      var k = el.getAttribute('data-legal'), v = o.juridic && o.juridic[k];
      if (v) el.textContent = labels[k] + v; else el.remove();
    });
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    var soc = $('#socials');
    if (soc) {
      var nets = [['facebook', 'Facebook'], ['instagram', 'Instagram'], ['youtube', 'YouTube']];
      soc.innerHTML = nets.filter(function (n) { return o.sociale && o.sociale[n[0]]; }).map(function (n) {
        return '<a href="' + esc(o.sociale[n[0]]) + '" target="_blank" rel="noopener noreferrer" aria-label="' + n[1] + '">' + icon(n[0]) + '</a>';
      }).join('');
    }
    var qr = $('#qr-box');
    if (qr && o.qr) qr.innerHTML = '<img src="' + esc(o.qr) + '" alt="Cod QR pentru donații" loading="lazy">';
  }

  /* ---------- 3. Imagini: efect de „developare” (blur → clar) ---------- */
  function initDevelop(root) {
    var imgs = $$('img.develop:not([data-dev])', root);
    function show(img) {
      var go = function () { requestAnimationFrame(function () { img.classList.add('is-in'); }); };
      if (img.complete && img.naturalWidth) go();
      else { img.addEventListener('load', go, { once: true }); img.addEventListener('error', go, { once: true }); }
    }
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }) : null;
    imgs.forEach(function (img) {
      img.setAttribute('data-dev', '1');
      if (io) io.observe(img); else img.classList.add('is-in');
    });
  }

  /* ---------- 4. Animația de deschidere ---------- */
  var heroPlayed = false;
  function heroIn() {
    if (heroPlayed) return; heroPlayed = true;
    if (!canAnimate) return;
    gsap.from('.hero__bg', { scale: 1.12, duration: 2.6, ease: 'power2.out' });
    gsap.from('[data-hero]', { y: 32, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity' });
  }

  function dashSetup(paths) {
    paths.forEach(function (p) {
      var L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
    });
  }

  function playIntro(done) {
    var root = document.documentElement, intro = $('#intro');
    var finished = false;
    var finish = function () {
      if (finished) return; finished = true;
      root.classList.remove('intro-on');
      if (intro) intro.style.display = 'none';
      try { sessionStorage.setItem('bethel-intro', '1'); } catch (e) {}
      heroIn(); done();
    };

    /* Pregătire: barele porților, desenul norilor și al drumului */
    $$('.gate__bars', intro).forEach(function (b) { b.innerHTML = new Array(10).join('<span></span>'); });
    var clouds = $$('.intro__clouds path', intro), road = $$('.intro__road path', intro);
    dashSetup(clouds); dashSetup(road);
    gsap.set('.intro__script', { clipPath: 'inset(-40% 100% -40% -5%)' });
    gsap.set('.intro__cross', { y: 50, scale: 0.6, transformOrigin: '50% 100%' });

    /* Cronologie (≈3,9 s): porți închise → fantă pulsând → porțile se deschid în 3D → lumină + raze →
       crucea se ridică → drumul se desenează → BETHEL → „Poarta Cerului” → trecere lină spre hero */
    var tl = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: finish });
    tl.to(clouds, { strokeDashoffset: 0, duration: 0.7, stagger: 0.12 }, 0)
      .to('.intro__slit', { opacity: 1, duration: 0.35 }, 0.15)
      .to('.intro__slit', { scaleX: 1.9, duration: 0.3, repeat: 1, yoyo: true, ease: 'sine.inOut' }, 0.5)
      .to('.gate--l', { rotationY: -80, duration: 1.1, ease: 'power3.inOut' }, 0.95)
      .to('.gate--r', { rotationY: 80, duration: 1.1, ease: 'power3.inOut' }, 0.95)
      .to('.intro__glow', { opacity: 1, duration: 0.9 }, 0.95)
      .to('.intro__slit', { opacity: 0, duration: 0.3 }, 1.1)
      .to('.intro__rays', { opacity: 1, duration: 0.7 }, 1.05)
      .to('.intro__rays', { rotation: 45, duration: 3, ease: 'none' }, 0.95)
      .to('.gate', { opacity: 0, duration: 0.45 }, 1.75)
      .to('.intro__glow', { opacity: 0.35, duration: 0.9 }, 2.0)
      .to('.intro__cross', { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, 1.35)
      .to(road, { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' }, 1.85)
      .to('.intro__title span', { opacity: 1, y: 0, duration: 0.35, stagger: 0.07 }, 2.35)
      .to('.intro__script', { opacity: 1, clipPath: 'inset(-40% -5% -40% -5%)', duration: 0.6, ease: 'power1.inOut' }, 2.8)
      .call(heroIn, null, 3.3)
      .to('.intro__logo', { scale: 1.08, opacity: 0, duration: 0.55, ease: 'power2.in' }, 3.3)
      .to(intro, { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 3.35);
    gsap.set('.intro__title span', { y: 16 });
    gsap.set('.intro__script', { opacity: 0 });

    var skip = $('#intro-skip');
    if (skip) {
      skip.focus({ preventScroll: true });
      skip.addEventListener('click', function () {
        tl.kill();
        gsap.to(intro, { opacity: 0, duration: 0.35, onComplete: finish });
        heroIn();
      });
    }
    setTimeout(finish, 6500); /* plasă de siguranță */
  }

  /* ---------- 5. Hero, contoare, reveal-uri ---------- */
  function initCounters() {
    var ul = $('#counters'); if (!ul) return;
    ul.innerHTML = D.contoare.map(function (c) {
      return '<li class="counter"><span class="counter__num" data-target="' + c.valoare + '">' + fmt(c.valoare) + '</span><span class="counter__label">' + esc(c.eticheta) + '</span></li>';
    }).join('');
    if (!canAnimate) return;
    $$('.counter__num', ul).forEach(function (n) {
      var target = +n.getAttribute('data-target'), o = { v: 0 };
      n.textContent = '0';
      ScrollTrigger.create({
        trigger: n, start: 'top 90%', once: true,
        onEnter: function () { gsap.to(o, { v: target, duration: 2.2, ease: 'power2.out', onUpdate: function () { n.textContent = fmt(o.v); } }); }
      });
    });
  }

  function initReveals() {
    if (!canAnimate) return;
    $$('.reveal').forEach(function (el) {
      gsap.from(el, {
        y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });
    $$('.spend .bar i').forEach(function (b, i) {
      gsap.from(b, { scaleX: 0, duration: 1.3, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
    });
  }

  /* ---------- Carduri de proiect (acasă + pagina Proiecte) ---------- */
  function cardHTML(p) {
    return '<article class="card" data-cats="' + esc(p.categorii.join(' ')) + '">' +
      '<a class="card__link" href="' + projectUrl(p) + '">' +
      '<div class="card__media"><img class="develop" src="' + esc(imgPath(p.slug, p.coperta)) + '" alt="' + esc(coverAlt(p)) + '" width="800" height="600" loading="lazy" decoding="async"></div>' +
      '<div class="card__body"><span class="tag">' + esc(catName(p.categorii[0])) + '</span>' +
      '<h3>' + esc(p.titlu) + '</h3><p>' + esc(p.scurt) + '</p>' +
      '<span class="card__more">Vezi povestea ' + icon('arrow') + '</span></div></a></article>';
  }
  function renderCards(container, list) {
    container.innerHTML = list.map(cardHTML).join('');
    initDevelop(container);
  }
  /* Apariție eșalonată la scroll */
  function animateCards(container) {
    if (!canAnimate) return;
    var cards = $$('.card', container);
    gsap.set(cards, { opacity: 0, y: 48 });
    ScrollTrigger.batch(cards, {
      start: 'top 92%', once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity' });
      }
    });
  }

  /* ---------- 6. Poveste la scroll + slider înainte/după ---------- */
  function renderStory() {
    var st = D.poveste, stage = $('#story-stage');
    if (!st || !stage) return;
    $('#story-eyebrow').textContent = st.eticheta;
    $('#story-title').textContent = st.titlu;

    var html = '<ol class="story-progress" aria-hidden="true">' + st.pasi.map(function (p) { return '<li><span>' + esc(p.eticheta) + '</span></li>'; }).join('') + '</ol>';
    st.pasi.forEach(function (p, i) {
      var media;
      if (p.compara) {
        media = '<div class="compare" data-compare>' +
          '<img class="compare__after" src="' + esc(imgPath(st.proiect, p.img)) + '" alt="' + esc(p.compara.altDupa) + '" loading="lazy" decoding="async">' +
          '<img class="compare__before" src="' + esc(imgPath(st.proiect, p.compara.inainte)) + '" alt="' + esc(p.compara.altInainte) + '" loading="lazy" decoding="async">' +
          '<span class="compare__label compare__label--l">Înainte</span><span class="compare__label compare__label--r">După</span>' +
          '<input class="compare__range" type="range" min="0" max="100" value="50" aria-label="Trage pentru a compara casa înainte și după renovare">' +
          '<span class="compare__handle" aria-hidden="true"></span></div>';
      } else {
        media = '<img src="' + esc(imgPath(st.proiect, p.img)) + '" alt="' + esc(p.alt) + '" loading="lazy" decoding="async" width="1200" height="800">';
      }
      var text = p.citat
        ? '<blockquote class="story-quote">„' + esc(p.citat) + '”</blockquote>' + (p.semnatura ? '<p class="story-sign">' + esc(p.semnatura) + '</p>' : '')
        : '<p>' + esc(p.text) + '</p>';
      html += '<article class="story-step" aria-label="' + esc(p.eticheta) + '"><div class="story-media">' + media + '</div>' +
        '<div class="story-text"><span class="eyebrow">Pasul ' + (i + 1) + ' · ' + esc(p.eticheta) + '</span><h3>' + esc(p.titlu) + '</h3>' + text + '</div></article>';
    });
    stage.innerHTML = html;

    /* Slider: variabila CSS --pos urmărește valoarea input-ului */
    $$('[data-compare]', stage).forEach(function (c) {
      var r = $('.compare__range', c);
      var set = function () { c.style.setProperty('--pos', r.value + '%'); };
      r.addEventListener('input', set); set();
    });

    /* Fixare (pin) cu ScrollTrigger: pașii se succed cât timp secțiunea rămâne pe ecran */
    if (!canAnimate) return;
    var steps = $$('.story-step', stage), dots = $$('.story-progress li', stage), n = steps.length;
    stage.classList.add('is-pinned');
    gsap.set(steps.slice(1), { autoAlpha: 0 });
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage, start: 'top top', end: '+=' + (n * 90) + '%', pin: true, scrub: 0.6, anticipatePin: 1,
        onUpdate: function (self) {
          var i = Math.min(n - 1, Math.round(self.progress * (n - 1) + 0.0001));
          dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
        }
      }
    });
    for (var i = 1; i < n; i++) {
      tl.to(steps[i - 1], { autoAlpha: 0, y: -24, duration: 0.5 }, i - 0.5)
        .fromTo(steps[i], { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.5 }, i - 0.35);
    }
    tl.to({}, { duration: 0.6 }, n - 1); /* pauză la final, ca ultimul pas să se citească */
    dots[0].classList.add('is-active');
  }

  /* ---------- 7. Pagina „Proiecte” (filtre după categorie) ---------- */
  function initProjectsPage() {
    var box = $('#filters'), grid = $('#project-cards'), status = $('#filter-status');
    if (!box || !grid) return;
    renderCards(grid, D.proiecte);
    var cats = [{ id: 'toate', nume: 'Toate' }].concat(D.categorii);
    box.innerHTML = cats.map(function (c) {
      return '<button type="button" class="filter" data-cat="' + c.id + '" aria-pressed="false">' + esc(c.nume) + '</button>';
    }).join('');
    var cards = $$('.card', grid);

    function apply(id, animate) {
      var shown = [];
      cards.forEach(function (card) {
        var ok = id === 'toate' || card.getAttribute('data-cats').split(' ').indexOf(id) > -1;
        card.hidden = !ok; if (ok) shown.push(card);
      });
      $$('.filter', box).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === id)); });
      status.textContent = shown.length ? shown.length + (shown.length === 1 ? ' proiect' : ' proiecte') + (id === 'toate' ? '' : ' în categoria „' + catName(id) + '”') : 'Nu am găsit proiecte în această categorie.';
      if (animate && canAnimate) gsap.fromTo(shown, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity' });
      initDevelop(grid);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.filter'); if (!b) return;
      var id = b.getAttribute('data-cat');
      apply(id, true);
      try { history.replaceState(null, '', id === 'toate' ? location.pathname : '?cat=' + id); } catch (err) {}
    });
    var start = new URLSearchParams(location.search).get('cat') || 'toate';
    if (!cats.some(function (c) { return c.id === start; })) start = 'toate';
    apply(start, false);
    animateCards(grid);
  }

  /* ---------- 8. Pagina unui proiect + lightbox ---------- */
  function setMeta(sel, attr, val) { var m = $(sel); if (m) m.setAttribute(attr, val); }

  function initProjectPage() {
    var root = $('#project-root'); if (!root) return;
    var slug = new URLSearchParams(location.search).get('p');
    var idx = -1;
    D.proiecte.forEach(function (p, i) { if (p.slug === slug) idx = i; });

    if (idx < 0) {
      root.innerHTML = '<section class="page-hero"><div class="wrap"><h1 class="h1">Nu am găsit proiectul</h1>' +
        '<p class="lead" style="margin:1rem 0 1.6rem">Linkul poate fi vechi sau greșit. Vezi toate proiectele noastre.</p>' +
        '<a class="btn btn--gold" href="proiecte.html">Toate proiectele</a></div></section>';
      return;
    }
    var p = D.proiecte[idx];
    var prev = D.proiecte[(idx - 1 + D.proiecte.length) % D.proiecte.length];
    var next = D.proiecte[(idx + 1) % D.proiecte.length];

    /* Meta tag-uri dinamice (utile în browser; crawlerele sociale citesc varianta statică) */
    var absCover = new URL(imgPath(p.slug, p.coperta), location.href).href;
    document.title = p.titlu + ' · BETHEL – Poarta Cerului';
    setMeta('meta[name="description"]', 'content', p.scurt);
    setMeta('meta[property="og:title"]', 'content', p.titlu + ' · BETHEL – Poarta Cerului');
    setMeta('meta[property="og:description"]', 'content', p.scurt);
    setMeta('meta[property="og:image"]', 'content', absCover);
    setMeta('meta[property="og:url"]', 'content', location.href);

    var facts = [];
    if (p.data) facts.push(icon('calendar') + esc(p.data));
    if (p.localitate) facts.push(icon('pin') + esc(p.localitate));
    if (p.beneficiari) facts.push(icon('users') + '<span><strong>' + fmt(p.beneficiari) + '</strong> ' + esc(p.beneficiariText || 'oameni ajutați') + '</span>');

    var gallery = p.galerie.map(function (g, i) {
      return '<li><button type="button" data-i="' + i + '" aria-label="Deschide fotografia ' + (i + 1) + ': ' + esc(g.alt) + '">' +
        '<img class="develop" src="' + esc(imgPath(p.slug, g.f)) + '" alt="' + esc(g.alt) + '" width="800" height="600" loading="lazy" decoding="async"></button></li>';
    }).join('');

    root.innerHTML =
      '<section class="page-hero"><div class="wrap">' +
        '<p class="crumbs"><a href="index.html">Acasă</a> · <a href="proiecte.html">Proiecte</a> · ' + esc(p.titlu) + '</p>' +
        p.categorii.map(function (c) { return '<span class="tag" style="margin-right:.4rem">' + esc(catName(c)) + '</span>'; }).join('') +
        '<h1 class="h1" style="margin:.9rem 0 0">' + esc(p.titlu) + '</h1>' +
        (facts.length ? '<ul class="facts">' + facts.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' : '') +
      '</div></section>' +
      '<section class="section" style="padding-top:1.5rem"><div class="wrap">' +
        '<div class="project-cover reveal"><img class="develop" src="' + esc(imgPath(p.slug, p.coperta)) + '" alt="' + esc(coverAlt(p)) + '" width="1600" height="800" decoding="async"></div>' +
        '<div class="project-layout" style="margin-top:3rem">' +
          '<div class="prose reveal">' + p.poveste.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
          '<aside class="side-card on-dark reveal"><h2>Fă și tu parte din poveste</h2><p>Un proiect ca acesta este posibil doar datorită oamenilor care dăruiesc bani, timp și rugăciune.</p>' +
          '<a class="btn btn--gold" href="index.html#ajuta">Vreau să ajut</a></aside>' +
        '</div></div></section>' +
      '<section class="section section--alt" aria-labelledby="gal-title"><div class="wrap">' +
        '<div class="section-head"><span class="eyebrow">Galerie foto</span><h2 class="h2" id="gal-title">Așa arată <em>binele</em></h2>' +
        '<p class="lead">Apasă pe o fotografie ca s-o vezi mare. Navighezi cu săgețile de pe tastatură sau cu degetul, prin glisare.</p></div>' +
        '<ul class="gallery" id="gallery">' + gallery + '</ul>' +
        '<nav class="pager" aria-label="Alte proiecte">' +
          '<a class="prev" href="' + projectUrl(prev) + '"><small>← Proiectul anterior</small><strong>' + esc(prev.titlu) + '</strong></a>' +
          '<a class="next" href="' + projectUrl(next) + '"><small>Următorul proiect →</small><strong>' + esc(next.titlu) + '</strong></a>' +
        '</nav></div></section>';

    initDevelop(root);
    initLightbox(p);
  }

  /* Lightbox cu săgeți, tastatură, swipe pe telefon și focus prins în dialog */
  function initLightbox(p) {
    var items = p.galerie, cur = 0, opener = null;
    var lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Galerie foto: ' + p.titlu);
    lb.innerHTML =
      '<div class="lb-count" aria-live="polite"></div>' +
      '<button type="button" class="lb-btn lb-close" aria-label="Închide galeria">' + icon('close') + '</button>' +
      '<button type="button" class="lb-btn lb-prev" aria-label="Fotografia anterioară">' + icon('left') + '</button>' +
      '<figure><img alt="" style="transition:opacity .35s"><figcaption></figcaption></figure>' +
      '<button type="button" class="lb-btn lb-next" aria-label="Fotografia următoare">' + icon('right') + '</button>';
    document.body.appendChild(lb);
    var img = $('img', lb), cap = $('figcaption', lb), count = $('.lb-count', lb), fig = $('figure', lb);

    function show(i) {
      cur = (i + items.length) % items.length;
      var it = items[cur];
      img.style.opacity = 0;
      img.onload = img.onerror = function () { img.style.opacity = 1; };
      img.src = imgPath(p.slug, it.f); img.alt = it.alt; cap.textContent = it.alt;
      count.textContent = (cur + 1) + ' / ' + items.length;
      /* Pre-încarcă vecinii, ca trecerea să fie instantă */
      [cur - 1, cur + 1].forEach(function (k) { var im = new Image(); im.src = imgPath(p.slug, items[(k + items.length) % items.length].f); });
    }
    function open(i, trigger) {
      opener = trigger; show(i);
      lb.classList.add('is-open'); document.documentElement.style.overflow = 'hidden';
      $('.lb-close', lb).focus();
    }
    function close() {
      lb.classList.remove('is-open'); document.documentElement.style.overflow = '';
      if (opener) opener.focus();
    }

    $('#gallery').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]'); if (b) open(+b.getAttribute('data-i'), b);
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', function () { show(cur - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === 'Tab') { /* prinde focusul în dialog */
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* Swipe pe telefon */
    var x0 = null, y0 = null;
    fig.addEventListener('pointerdown', function (e) { x0 = e.clientX; y0 = e.clientY; });
    fig.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) show(cur + (dx < 0 ? 1 : -1));
    });
    fig.addEventListener('pointercancel', function () { x0 = null; });
  }

  /* ---------- 9. Donații, formular, transparență ---------- */
  function initCopyIban() {
    var btn = $('#copy-iban'); if (!btn) return;
    var label = $('span', btn), status = $('#copy-status');
    btn.addEventListener('click', function () {
      var text = (D.org.iban || '').replace(/\s+/g, '');
      var done = function (ok) {
        label.textContent = ok ? 'Copiat ✓' : 'Selectează și copiază';
        status.textContent = ok ? 'IBAN copiat în clipboard.' : 'Nu am putut copia automat.';
        setTimeout(function () { label.textContent = 'Copiază'; }, 2400);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else { /* rezervă pentru browsere vechi / pagini necriptate */
        var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        ta.remove(); done(ok);
      }
    });
  }

  function initForm() {
    var form = $('#volunteer-form'); if (!form) return;
    var status = $('#form-status'), o = D.org;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nume = form.nume.value.trim(), tel = form.telefon.value.trim();
      if (!nume || !tel) { status.textContent = 'Te rugăm să completezi numele și telefonul.'; (nume ? form.telefon : form.nume).focus(); return; }
      var body = 'Nume: ' + nume + '\nTelefon: ' + tel + '\nE-mail: ' + form.email.value.trim() +
        '\nVreau să ajut: ' + form.interes.value + '\n\n' + form.mesaj.value.trim();
      if (o.formularEndpoint) {
        status.textContent = 'Se trimite…';
        fetch(o.formularEndpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
          .then(function (r) { if (!r.ok) throw new Error(); status.textContent = 'Mulțumim! Te vom contacta în curând.'; form.reset(); })
          .catch(function () { status.textContent = 'Nu s-a trimis. Te rugăm să ne suni sau să ne scrii direct.'; });
      } else {
        status.textContent = 'Se deschide aplicația de e-mail pentru a trimite mesajul…';
        location.href = 'mailto:' + o.email + '?subject=' + encodeURIComponent('Vreau să devin voluntar') + '&body=' + encodeURIComponent(body);
      }
    });
  }

  function initTransparency() {
    var sp = $('#spend'), rp = $('#reports');
    if (sp) sp.innerHTML = D.cheltuieli.map(function (c) {
      return '<li><div><span>' + esc(c.eticheta) + '</span><span>' + c.procent + '%</span></div><div class="bar" aria-hidden="true"><i style="--w:' + c.procent + '%"></i></div></li>';
    }).join('');
    if (rp) rp.innerHTML = D.rapoarte.length ? D.rapoarte.map(function (r) {
      return '<a class="report" href="' + esc(r.fisier) + '" download>' + icon('pdf') + '<span><strong>' + esc(r.titlu) + '</strong><small>' + esc(r.detalii || 'PDF') + '</small></span></a>';
    }).join('') : '<p class="empty">Rapoartele noastre în format PDF vor fi publicate aici.</p>';
  }

  /* ---------- 10. Pornirea paginii ---------- */
  function init() {
    if (!D) { console.error('BETHEL: lipsește data/proiecte.js'); return; }
    document.documentElement.classList.add('js-ready');
    injectSprite();
    initNav();
    fillOrg();

    var intro = $('#intro'), introOn = document.documentElement.classList.contains('intro-on');
    var afterIntro = function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); };

    if (page === 'index') {
      initCounters();
      renderStory();
      var home = $('#home-cards');
      if (home) renderCards(home, D.proiecte);
      initCopyIban(); initForm(); initTransparency();
    }
    if (page === 'proiecte') initProjectsPage();
    if (page === 'proiect') initProjectPage();

    initDevelop(document);
    initReveals();

    if (introOn && intro && canAnimate) playIntro(afterIntro);
    else {
      document.documentElement.classList.remove('intro-on');
      if (intro) intro.style.display = 'none';
      heroIn();
    }
    window.addEventListener('load', function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
  }

  /* Scripturile au `defer`, deci DOM-ul e gata; verificăm totuși pentru siguranță */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
