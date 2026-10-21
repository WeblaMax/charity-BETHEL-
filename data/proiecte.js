/* ==========================================================================
   BETHEL – Poarta Cerului  ·  FIȘIER DE DATE (singurul pe care trebuie să-l editezi)
   --------------------------------------------------------------------------
   Aici sunt: datele asociației, cifrele din contoare, proiectele și pozele lor.
   Nu e nevoie să modifici HTML-ul.

   CUM ADAUGI POZE NOI
   1. Pune fișierele .webp în  images/proiecte/<slug-proiect>/   (ex. images/proiecte/tabere-copii/07.webp)
   2. Adaugă o linie în lista `galerie` a proiectului:   { f: "07.webp", alt: "Descrierea pozei" }
   Gata – apare automat în galerie și în lightbox.

   CUM ADAUGI UN PROIECT NOU
   Copiază un bloc din `proiecte`, schimbă `slug` (fără spații/diacritice), creează folderul
   cu același nume în images/proiecte/ și completează câmpurile.

   ⚠ Valorile marcate „EXEMPLU” sunt de umplutură – înlocuiește-le cu date reale înainte de publicare.
   Câmpurile lăsate goale ("" sau null) sunt ascunse automat pe site.
   ========================================================================== */

window.BETHEL = {

  /* ---------- Datele asociației (apar în contact, footer, donații) ---------- */
  org: {
    nume: "BETHEL – Poarta Cerului",
    numeComplet: "Asociația Obștească „Bethel – Poarta Cerului”",
    fondare: "Asociația a fost înființată în 2022 de Cojocari Victor, Cojocari Iosif și Rusu Laric.",
    tara: "Republica Moldova",
    telefon: "+373 76 712 725",
    telefonHref: "+37376712725",             // fără spații, pentru legătura tel:
    email: "rusularic@gmail.com",
    adresa: "Strada Exemplu 1, Chișinău, Republica Moldova", // EXEMPLU
    sociale: {                              // lasă "" pentru a ascunde o rețea
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      youtube: ""
    },

    /* Donații */
    beneficiar: "AO BETHEL-POARTA CERULUI",
    iban: "MD93 AG00 0000 0225 1524 7125",
    banca: "Moldova Agroindbank",
    codBanca: "AGRNMD2X",                      // cod SWIFT/BIC
    qr: "",                                 // ex. "images/qr-donatie.webp" – când e gol se afișează un loc rezervat

    /* Date juridice (footer) */
    juridic: {
      idno: "1022620012754",                  // cod fiscal (IDNO)
      inregistrare: "",                     // ex. „Înregistrată la Ministerul Justiției, nr. …, din …”
      adresaJuridica: ""
    },

    /* Formularul de voluntari.
       - Dacă lași gol, formularul deschide aplicația de e-mail a vizitatorului (mailto:).
       - Dacă pui un endpoint (ex. Formspree: "https://formspree.io/f/xxxxxxx"), mesajul se trimite direct. */
    formularEndpoint: ""
  },

  /* ---------- Contoare animate (secțiunea „În cifre”) ---------- */
  contoare: [
    { valoare: 4,   eticheta: "tabere pentru copii" },
    { valoare: 400, sufix: "+", eticheta: "familii primesc pâine în fiecare miercuri" },
    { valoare: 120, eticheta: "familii au primit saci cu cartofi" },
    { valoare: 3,   eticheta: "biserici construite" },
    { valoare: 220, sufix: " m", eticheta: "de drum amenajat în Sălcuța Nouă" }
  ],

  /* ---------- Categorii (filtrele de pe pagina „Proiecte”) ---------- */
  categorii: [
    { id: "copii",     nume: "Copii" },
    { id: "batrani",   nume: "Bătrâni" },
    { id: "familii",   nume: "Familii" },
    { id: "hrana",     nume: "Hrană" },
    { id: "educatie",  nume: "Educație" },
    { id: "comunitate", nume: "Comunitate" }
  ],

  /* ---------- Transparență ---------- */
  cheltuieli: [                             // EXEMPLU – suma trebuie să fie 100
    { eticheta: "Alimente și produse de bază", procent: 45 },
    { eticheta: "Copii: tabere, cadouri, evenimente", procent: 25 },
    { eticheta: "Renovări și reparații", procent: 15 },
    { eticheta: "Transport și distribuire", procent: 8 },
    { eticheta: "Administrare", procent: 7 }
  ],
  /* Rapoarte PDF: pune fișierele în folderul /rapoarte și adaugă-le aici.
     Exemplu: { titlu: "Raport de activitate 2024", fisier: "rapoarte/raport-2024.pdf", detalii: "PDF · 1,2 MB" } */
  rapoarte: [],

  /* ---------- Povestea de la scroll: casa unei mame cu 4 copii ---------- */
  poveste: {
    proiect: "casa-renovata",               // folderul cu pozele: images/proiecte/casa-renovata/
    eticheta: "Poveste din inima noastră",
    titlu: "O casă care a primit o nouă șansă",
    pasi: [
      {
        eticheta: "Familia",
        titlu: "Pentru ei a fost făcut totul",
        text: "Copiii familiei, în fața casei. Le protejăm fețele, dar bucuria se vede.",
        img: "familia.webp",
        alt: "Copiii familiei în fața casei (fețe blurate)"
      },
      {
        eticheta: "Înainte",
        titlu: "O familie și o casă care aștepta ajutor",
        text: "Casa familiei avea nevoie de ajutor ca să devină cu adevărat un loc cald, sigur și îngrijit pentru copii.",
        img: "pas-inainte.webp",
        alt: "Una dintre camerele casei familiei"
      },
      {
        eticheta: "Lucrările",
        titlu: "Mâini multe, o singură inimă",
        text: "Voluntari, meșteri și donatori s-au adunat la același șantier. Fiecare a dat ce a avut: bani, materiale, timp, o vorbă bună.",
        img: "lucrari.webp",
        alt: "Tavan nou din plăci OSB, în timpul lucrărilor"
      },
      {
        eticheta: "După",
        titlu: "Un cămin cald și sigur",
        text: "Trage de mijloc ca să vezi diferența. Aceeași cameră: pereți netezi, tavan nou și o lumină care chiar încălzește.",
        img: "dupa.webp",
        alt: "Aceeași cameră după renovare",
        compara: { inainte: "inainte.webp", altInainte: "Camera înainte de renovare", altDupa: "Camera după renovare" }
      }
    ]
  },

  /* ======================================================================
     PROIECTE
     Câmpuri:
       slug         identificator unic (și numele folderului cu poze)
       titlu        titlul proiectului
       categorii    una sau mai multe din: copii, batrani, familii, hrana, educatie
       scurt        o frază pentru card
       data         ex. "Vara 2024" sau "Din 2022, în fiecare iarnă" (gol = ascuns)
       localitate   ex. "Chișinău" (gol = ascuns)
       beneficiari  număr întreg (null = ascuns)  +  beneficiariText – ex. "familie" / "copii"
       poveste      lista de paragrafe
       coperta      poza de pe card (din folderul proiectului)
       galerie      lista de poze: { f: "fisier.webp", alt: "descriere" }
     ====================================================================== */
  proiecte: [

    {
      slug: "tabere-copii",
      titlu: "Tabere pentru copii",
      categorii: ["copii"],
      scurt: "Patru tabere, în patru sate: Coșcalia, Baimaclia, Ciuflești și Carnațenii Noi.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "Am organizat patru tabere pentru copii, în patru sate: Coșcalia (60 de copii), Baimaclia (80–90 de copii), Ciuflești (80–90 de copii) și Carnațenii Noi (90–100 de copii).",
        "Zile de joc, prietenie și credință pentru copiii care rareori au ocazia să facă așa ceva."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Copii zâmbind în timpul unei activități în tabără" },
        { f: "02.webp", alt: "Joc în aer liber cu copiii din tabără" },
        { f: "03.webp", alt: "Grupul taberei, împreună" }
      ]
    },

    {
      slug: "cadouri-craciun",
      titlu: "Cadouri de Crăciun",
      categorii: ["copii", "familii"],
      scurt: "Pachete de Crăciun pentru copiii din școlile satelor în care lucrăm.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "În fiecare iarnă ducem cadouri de Crăciun copiilor de la școlile din satele în care lucrăm. Donatori și voluntari pregătesc pachetele, iar copiii le deschid împreună, în sala școlii.",
        "Pentru mulți dintre ei, e cel mai așteptat moment al iernii."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Copii și voluntari cu pachetele de Crăciun, pe scena sălii" },
        { f: "02.webp", alt: "Grupul de copii din sat, cu pachetele primite, în curtea școlii" },
        { f: "03.webp", alt: "Copii ridicând fericiți cutiile cu daruri" },
        { f: "04.webp", alt: "Un voluntar oferă un pachet unui băiat, într-o sală plină de copii" },
        { f: "05.webp", alt: "Un voluntar împarte pachetele de Crăciun copiilor așezați pe scaune" },
        { f: "06.webp", alt: "Copii în sală, curioși, primind pachetele" },
        { f: "07.webp", alt: "Doi băieți răsfoiesc cărțile primite în pachet" },
        { f: "08.webp", alt: "Copii deschizând împreună cutiile de Crăciun" },
        { f: "09.webp", alt: "Oameni primind dulciuri și pachete la intrare" },
        { f: "10.webp", alt: "O fetiță cu punga ei de Crăciun" }
      ]
    },

    {
      slug: "dotari-scoala",
      titlu: "Televizoare și cărți pentru școala din Carnațenii Noi",
      categorii: ["educatie"],
      scurt: "Televizoare de 2.500 $ și cărți de 100 $, cumpărate pentru elevii școlii din Carnațenii Noi.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "elevi",
      poveste: [
        "Pentru școala din Carnațenii Noi am cumpărat televizoare în valoare de 2.500 $, ca elevii să învețe în condiții mai bune.",
        "Tot pentru școală am cumpărat cărți în valoare de 100 $."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "casa-renovata",
      titlu: "Casă renovată pentru o familie vulnerabilă",
      categorii: ["familii", "copii"],
      scurt: "Reparații la casa unei familii vulnerabile, cu ajutorul voluntarilor și al donatorilor.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "familie",
      poveste: [
        "Am renovat casa unei familii vulnerabile, cu ajutorul voluntarilor și al donatorilor.",
        "În galerie vezi camerele înainte și după reparații și familia, cu fețele copiilor protejate."
      ],
      coperta: "dupa.webp",
      galerie: [
        { f: "inainte.webp", alt: "Camera înainte de reparații" },
        { f: "dupa.webp", alt: "Aceeași cameră, după renovare" },
        { f: "inainte-2.webp", alt: "Altă cameră a casei, înainte de reparații" },
        { f: "dupa-2.webp", alt: "Camera renovată, cu tapet nou și tavan nou" },
        { f: "inainte-3.webp", alt: "Tavanul din plăci OSB, în timpul lucrărilor" },
        { f: "dupa-3.webp", alt: "Colț al camerei, după renovare" },
        { f: "familia.webp", alt: "Copiii familiei, în fața casei (fețe blurate)" }
      ]
    },

    {
      slug: "cursuri-muzica",
      titlu: "Cursuri de mandolină și chitară",
      categorii: ["educatie", "copii"],
      scurt: "Copiii învață să cânte la mandolină și chitară – un dar care rămâne pentru toată viața.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "elevi",
      poveste: [
        "Muzica deschide uși. În cursurile noastre, copiii învață mandolina și chitara, descoperă disciplina frumoasă a exercițiului și cântă împreună, la biserică și la evenimentele comunității.",
        "Vrem ca fiecare copil să aibă șansa de a învăța ceva ce nu i-a putut oferi, până acum, nici familia, nici școala."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Orchestra de mandoline la o repetiție, cu publicul în sală" },
        { f: "02.webp", alt: "Grupul de mandolină și chitară, la un eveniment de Crăciun" },
        { f: "03.webp", alt: "Două eleve exersează la mandolină, cu caietele de note" },
        { f: "04.webp", alt: "Doi elevi la lecția de chitară" },
        { f: "05.webp", alt: "O elevă cu mandolina" },
        { f: "06.webp", alt: "Un elev cu mandolina, la lecție" },
        { f: "07.webp", alt: "O elevă exersează la mandolină" },
        { f: "08.webp", alt: "O elevă concentrată pe acordurile de la mandolină" }
      ]
    },

    {
      slug: "ghiozdane",
      titlu: "Ghiozdane pentru 15 familii vulnerabile",
      categorii: ["copii", "familii", "educatie"],
      scurt: "Ghiozdane noi, pentru ca niciun copil să nu înceapă școala fără.",
      data: "",
      localitate: "",
      beneficiari: 15,
      beneficiariText: "familii",
      poveste: [
        "Am oferit ghiozdane copiilor din 15 familii vulnerabile, pentru începutul anului școlar."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "pungi-alimente",
      titlu: "Pachete pentru familii vulnerabile și persoane cu dizabilități",
      categorii: ["hrana", "familii"],
      scurt: "Pachete duse direct, în 70–80 de familii vulnerabile și la oameni cu dizabilități.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "familii",
      poveste: [
        "Am dus pachete cu ajutoare în 70–80 de familii vulnerabile și la persoane cu dizabilități.",
        "Le ducem personal, la ușa fiecăruia."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "paine-batrani",
      titlu: "Pâine în fiecare miercuri",
      categorii: ["hrana", "familii"],
      scurt: "Pâine caldă, împărțită cu triciclete electrice în fiecare miercuri, la peste 400 de familii.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "familii",
      poveste: [
        "În fiecare miercuri împărțim pâine la peste 400 de familii.",
        "Pâinea ajunge la oameni cu ajutorul tricicletelor electrice, care fac parte din proiect: cu ele împărțim pâinea în localitate, de la poartă la poartă.",
        "Pe lângă pâine, ducem și o vorbă bună oamenilor care au nevoie."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "O femeie primește pâine caldă" },
        { f: "02.webp", alt: "O mamă și fetița ei, cu pâinea primită (fața copilului blurată)" },
        { f: "03.webp", alt: "O femeie zâmbind, cu trei pâini în brațe" },
        { f: "04.webp", alt: "O bătrână strânge la piept pâinea primită" },
        { f: "05.webp", alt: "Un om în vârstă cu pâinea primită, pe uliță" },
        { f: "06.webp", alt: "Cele două triciclete electrice cu care împărțim pâinea" },
        { f: "07.webp", alt: "Un om cu dizabilități primește o pâine proaspătă" }
      ]
    },

    {
      slug: "saci-cartofi",
      titlu: "Saci cu cartofi pentru 120 de familii",
      categorii: ["hrana", "familii"],
      scurt: "4.600 kg de cartofi, împărțiți la 120 de familii.",
      data: "",
      localitate: "",
      beneficiari: 120,
      beneficiariText: "familii",
      poveste: [
        "Am împărțit 4.600 kg de cartofi, în saci, la 120 de familii."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "incaltaminte-copii",
      titlu: "Încălțăminte pentru copiii din Ciuflești",
      categorii: ["copii"],
      scurt: "Încălțăm copiii din Ciuflești.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "Am încălțat copiii din satul Ciuflești."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "gradinita",
      titlu: "Autobuz și grupa „Mandarine” pentru grădiniță",
      categorii: ["copii", "educatie"],
      scurt: "Un autobuz pentru grădiniță și 2.500 $ pentru grupa „Mandarine”.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "Am sprijinit grădinița cu un autobuz pentru copii.",
        "Pentru grupa „Mandarine” am investit 2.500 $."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "drum-salcuta",
      titlu: "Drumul din mijlocul satului Sălcuța Nouă",
      categorii: ["comunitate"],
      scurt: "220 de metri de drum, în valoare de 68.000 $, pentru toți sătenii.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "locuitori",
      poveste: [
        "Am amenajat drumul din mijlocul satului Sălcuța Nouă, pe o lungime de 220 de metri. Valoarea lucrării este de 68.000 $.",
        "Un drum bun folosește fiecărei familii din sat."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "baie-om-cu-dizabilitati",
      titlu: "Baie pentru o persoană cu dizabilități",
      categorii: ["familii", "comunitate"],
      scurt: "O baie construită pentru un om cu dizabilități, în valoare de peste 17.000 $.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "persoană",
      poveste: [
        "Am construit o baie pentru o persoană cu dizabilități. Valoarea lucrării este de peste 17.000 $."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "constructie-biserici",
      titlu: "Construcția bisericilor",
      categorii: ["comunitate"],
      scurt: "Biserici construite în Ciuflești, Baimaclia și Carnațenii Noi.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "comunități",
      poveste: [
        "Am construit biserici în trei sate: Ciuflești, Baimaclia și Carnațenii Noi.",
        "Sunt locuri în care comunitatea se adună, se roagă și se ajută."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    },

    {
      slug: "studiu-biblic",
      titlu: "Studiu biblic în fiecare săptămână",
      categorii: ["comunitate"],
      scurt: "Întâlniri săptămânale, deschise tuturor, în jurul Bibliei.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "oameni",
      poveste: [
        "În fiecare săptămână ne adunăm la studiu biblic.",
        "Citim împreună, ne rugăm și ne sprijinim unii pe alții."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Fotografie în curând" }
      ]
    }
  ]
};
