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
    numeComplet: "Asociația Obștească „BETHEL – Poarta Cerului”",
    tara: "Republica Moldova",
    telefon: "+373 000 00 000",            // EXEMPLU
    telefonHref: "+37300000000",            // fără spații, pentru legătura tel:
    email: "contact@exemplu.md",            // EXEMPLU
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
  contoare: [                               // EXEMPLU – completează cu cifre reale
    { valoare: 120, eticheta: "copii ajutați" },
    { valoare: 85,  eticheta: "bătrâni sprijiniți" },
    { valoare: 1500, eticheta: "pungi cu alimente" },
    { valoare: 20000, eticheta: "pâini distribuite" },
    { valoare: 40,  eticheta: "voluntari" }
  ],

  /* ---------- Categorii (filtrele de pe pagina „Proiecte”) ---------- */
  categorii: [
    { id: "copii",     nume: "Copii" },
    { id: "batrani",   nume: "Bătrâni" },
    { id: "familii",   nume: "Familii" },
    { id: "hrana",     nume: "Hrană" },
    { id: "educatie",  nume: "Educație" }
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
    titlu: "O casă pentru patru copii și o mamă care nu s-a dat bătută",
    pasi: [
      {
        eticheta: "Înainte",
        titlu: "O familie și o casă care aștepta ajutor",
        text: "O mamă își crește singură cei patru copii. Casa în care locuiau avea nevoie urgentă de reparații, iar puterile unui singur om nu ajungeau.",
        img: "inainte.webp",
        alt: "Casa familiei înainte de renovare"
      },
      {
        eticheta: "Lucrările",
        titlu: "Mâini multe, o singură inimă",
        text: "Voluntari, meșteri și donatori s-au adunat la aceeași masă și la același șantier. Fiecare a dat ce a avut: bani, materiale, timp, o vorbă bună.",
        img: "lucrari.webp",
        alt: "Voluntari lucrând la renovarea casei"
      },
      {
        eticheta: "După",
        titlu: "Un cămin cald și sigur",
        text: "Trage de mijloc ca să vezi diferența. Acolo unde era grijă, acum e liniște, lumină și loc pentru jocurile copiilor.",
        img: "dupa.webp",
        alt: "Casa familiei după renovare",
        compara: { inainte: "inainte.webp", altInainte: "Casa înainte de renovare", altDupa: "Casa după renovare" }
      },
      {
        eticheta: "Mesajul familiei",
        titlu: "În cuvintele lor",
        citat: "[Mesajul familiei – de completat cu cuvintele lor, cu acordul lor]", // EXEMPLU
        semnatura: "",                      // ex. „– Mama și cei patru copii”
        img: "familia.webp",
        alt: "Familia în fața casei renovate"
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
      scurt: "Zile de joc, prietenie și credință pentru copiii care rareori pleacă de acasă.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "Pentru mulți copii din familii cu venituri mici, vacanța înseamnă să stea acasă. Taberele BETHEL le oferă o săptămână de aer curat, jocuri, cântece, prietenii noi și clipe de rugăciune în care se simt așteptați și iubiți.",
        "Fiecare tabără este pregătită cu grijă de voluntari: program, mese calde, activități creative și multă răbdare. Nu cerem nimic în schimb – doar bucuria de a-i vedea zâmbind."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Copii zâmbind în timpul unei activități în tabără" },
        { f: "02.webp", alt: "Joc în aer liber cu copiii din tabără" },
        { f: "03.webp", alt: "Copii și voluntari la masă" },
        { f: "04.webp", alt: "Activitate creativă în tabără" },
        { f: "05.webp", alt: "Cântec în cerc, seara" },
        { f: "06.webp", alt: "Grupul taberei, împreună" }
      ]
    },

    {
      slug: "cadouri-craciun",
      titlu: "Cadouri de Crăciun",
      categorii: ["copii", "familii"],
      scurt: "Un pachet cu dulciuri și daruri, pentru ca niciun copil să nu simtă că a fost uitat de sărbători.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "În fiecare iarnă pregătim pachete de Crăciun pentru copiii din familii vulnerabile. Donatori și voluntari aleg împreună dulciuri, jucării, haine groase și, mai ales, un bilet scris de mână.",
        "Pachetele ajung la copii acasă sau la un mic eveniment al comunității, unde sărbătoarea se simte ca o familie mare."
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
      slug: "paine-batrani",
      titlu: "Pâine pentru bătrâni",
      categorii: ["batrani", "hrana"],
      scurt: "Pâine caldă și o vorbă bună la ușa oamenilor în vârstă care trăiesc singuri.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "bătrâni",
      poveste: [
        "Pentru un om în vârstă care trăiește singur, o pâine caldă înseamnă mai mult decât hrană: înseamnă că cineva s-a gândit la el. Voluntarii noștri bat la ușă, se așază pentru câteva minute și întreabă cum se simt.",
        "De multe ori, conversația e darul cel mai mare. Păstrăm legătura cu fiecare om și încercăm să-l ajutăm și cu alte nevoi, atunci când ni le spune."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Voluntar oferind pâine unei bătrâne zâmbitoare" },
        { f: "02.webp", alt: "Pâini proaspete pregătite pentru distribuire" },
        { f: "03.webp", alt: "Vizită la poarta unui bătrân" },
        { f: "04.webp", alt: "Conversație caldă pe prispa casei" },
        { f: "05.webp", alt: "Voluntarii încarcă pâinea în mașină" },
        { f: "06.webp", alt: "Bătrân primind pâine și un zâmbet" }
      ]
    },

    {
      slug: "casa-renovata",
      titlu: "Casă renovată pentru o familie cu 4 copii",
      categorii: ["familii", "copii"],
      scurt: "O mamă singură și patru copii au primit un cămin reparat și cald, cu ajutorul a zeci de oameni.",
      data: "",
      localitate: "",
      beneficiari: 5,
      beneficiariText: "persoane (o mamă și 4 copii)",
      poveste: [
        "O mamă își crește singură patru copii într-o casă care avea nevoie urgentă de reparații. Nu ceruse nimic; noi am aflat de la vecini și am mers s-o cunoaștem.",
        "Împreună cu voluntari, meșteri și donatori am renovat casa pas cu pas, încercând ca familia să rămână în centrul tuturor deciziilor. Rezultatul e un cămin sigur, luminos și cald, în care copiii pot crește liniștiți.",
        "Povestea completă, cu înainte și după, o găsești și pe prima pagină."
      ],
      coperta: "dupa.webp",
      galerie: [
        { f: "inainte.webp", alt: "Casa înainte de renovare" },
        { f: "lucrari.webp", alt: "Voluntari lucrând la casă" },
        { f: "lucrari-2.webp", alt: "Meșteri și voluntari, împreună pe șantier" },
        { f: "dupa.webp", alt: "Casa după renovare" },
        { f: "interior.webp", alt: "Interiorul renovat" },
        { f: "familia.webp", alt: "Familia în fața casei renovate" }
      ]
    },

    {
      slug: "triciclete-paine",
      titlu: "Două triciclete pentru distribuirea pâinii prin sate",
      categorii: ["hrana", "batrani"],
      scurt: "Două triciclete cu bagaj ajung acolo unde mașina nu poate: pe ulițele satelor, la ușa oamenilor.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "oameni",
      poveste: [
        "Multe case din sate sunt departe de drumul mare. Cu două triciclete cu bagaj, voluntarii noștri pot duce pâinea până la poarta fiecărui om, fără costuri de combustibil și fără grabă.",
        "Tricicletele au fost cumpărate din donații și poartă, pe lângă pâine, vestea că nimeni nu e uitat."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Cele două triciclete încărcate cu pâine" },
        { f: "02.webp", alt: "Voluntar pe tricicletă, pe o uliță de sat" },
        { f: "03.webp", alt: "Predarea pâinii la poartă" },
        { f: "04.webp", alt: "Triciclete și voluntari, înaintea plecării" },
        { f: "05.webp", alt: "Pâine proaspătă în cutiile de transport" },
        { f: "06.webp", alt: "Întâlnire cu sătenii" }
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
        "Muzica deschide uși. În cursurile noastre gratuite, copiii învață mandolina și chitara, descoperă disciplina frumoasă a exercițiului și cântă împreună, la biserică și la evenimentele comunității.",
        "Vrem ca fiecare copil să aibă șansa de a învăța ceva ce nu i-a putut oferi, până acum, nici familia, nici școala."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Elevi la o oră de chitară" },
        { f: "02.webp", alt: "Profesorul arată o poziție la mandolină" },
        { f: "03.webp", alt: "Copii cântând împreună" },
        { f: "04.webp", alt: "Mandoline și chitare pregătite pentru lecție" },
        { f: "05.webp", alt: "Un mic concert al elevilor" },
        { f: "06.webp", alt: "Elevii și profesorii, după concert" }
      ]
    },

    {
      slug: "pungi-alimente",
      titlu: "Pungi cu alimente pentru familii nevoiașe",
      categorii: ["hrana", "familii"],
      scurt: "Pungi cu produse de bază, pregătite cu grijă și duse direct în familiile care au nevoie.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "familii",
      poveste: [
        "Făină, ulei, zahăr, cereale, conserve: un pachet simplu poate liniști o familie pentru câteva săptămâni. Donatorii cumpără, voluntarii împachetează, iar noi ducem pungile personal, în fiecare familie.",
        "Încercăm să păstrăm legătura cu familiile și să ne interesăm și de alte nevoi, cu discreție și respect."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Voluntari împachetând pungi cu alimente" },
        { f: "02.webp", alt: "Pungi cu alimente aranjate în rânduri" },
        { f: "03.webp", alt: "Predarea unui pachet într-o familie" },
        { f: "04.webp", alt: "Voluntari încărcând mașina cu pungi" },
        { f: "05.webp", alt: "Produse de bază pregătite pentru împachetare" },
        { f: "06.webp", alt: "Echipa de voluntari, după distribuire" }
      ]
    },

    {
      slug: "haine-donate",
      titlu: "Haine strânse și împărțite celor în nevoie",
      categorii: ["familii", "copii"],
      scurt: "Haine curate și bine îngrijite, strânse de la oameni buni și împărțite cu respect.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "oameni",
      poveste: [
        "Oamenii ne aduc haine pe care nu le mai folosesc, iar noi le sortăm, le împăturim și le oferim mai departe, ca fiecare să poată alege cu demnitate ceea ce are nevoie.",
        "Primim haine curate și în stare bună, mai ales pentru copii și sezonul rece."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Voluntari sortând haine donate" },
        { f: "02.webp", alt: "Haine împăturite și aranjate pe categorii" },
        { f: "03.webp", alt: "O mamă alege haine pentru copii" },
        { f: "04.webp", alt: "Cutii cu haine pregătite pentru distribuire" },
        { f: "05.webp", alt: "Haine de iarnă pentru copii" },
        { f: "06.webp", alt: "Voluntarii după o zi de sortare" }
      ]
    },

    {
      slug: "evenimente-copii",
      titlu: "Evenimente și sărbători pentru copii",
      categorii: ["copii"],
      scurt: "Sărbători cu jocuri, muzică și daruri, în care fiecare copil contează.",
      data: "",
      localitate: "",
      beneficiari: null,
      beneficiariText: "copii",
      poveste: [
        "De Paști, de 1 iunie, la început de an școlar sau doar într-o sâmbătă frumoasă, organizăm sărbători pentru copii: jocuri, muzică, atelier de creație și o masă pusă cu drag.",
        "Ne dorim ca fiecare copil să plece acasă cu amintiri frumoase și cu certitudinea că este prețuit."
      ],
      coperta: "01.webp",
      galerie: [
        { f: "01.webp", alt: "Copii dansând la o sărbătoare" },
        { f: "02.webp", alt: "Joc de grup cu voluntarii" },
        { f: "03.webp", alt: "Copii la masa festivă" },
        { f: "04.webp", alt: "Atelier de creație pentru copii" },
        { f: "05.webp", alt: "Baloane și zâmbete la eveniment" },
        { f: "06.webp", alt: "Poză de grup la finalul sărbătorii" }
      ]
    }
  ]
};
