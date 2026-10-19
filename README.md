# BETHEL – Poarta Cerului · site de prezentare

Site static (HTML + CSS + JS, GSAP prin CDN) pentru GitHub Pages.

## Structură
- `index.html` – pagina principală · `proiecte.html` – lista cu filtre · `proiect.html?p=<slug>` – șablon pagină de proiect
- `css/style.css`, `js/main.js` – stil și logică (comentate)
- `data/proiecte.js` – **singurul fișier de editat**: date asociație, cifre, proiecte, galerii, IBAN, rapoarte
- `images/proiecte/<slug>/` – pozele fiecărui proiect (.webp)

## Cum adaugi poze
1. Pune `07.webp` în `images/proiecte/<slug>/`.
2. Adaugă în `galerie` a proiectului: `{ f: "07.webp", alt: "Descriere" }`.

Imaginile actuale sunt **substituenți** („Fotografie de înlocuit”) – înlocuiește-le cu același nume de fișier sau schimbă numele în `data/proiecte.js`. Înlocuiește și `images/hero.webp`, `images/echipa.webp`.

## De completat înainte de publicare
Valorile „EXEMPLU” din `data/proiecte.js`: telefon, e-mail, adresă, IBAN, bancă, date juridice, cifrele din contoare, procentele de la Transparență, mesajul familiei, datele/localitățile proiectelor. Câmpurile goale se ascund automat.

## Publicare
GitHub → Settings → Pages → Deploy from branch → `main` / root. Dacă domeniul diferă de `weblamax.github.io/charity-BETHEL-`, actualizează adresele `og:*`/`canonical` din cele 3 pagini HTML.
Notă: pe paginile de proiect, titlul/descrierea se actualizează prin JS; previzualizarea la share (Facebook/Viber) arată meta-ul general.
