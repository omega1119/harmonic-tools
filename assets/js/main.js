(function(){
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const yearEl = document.getElementById('year');

  // ── Language Helper ─────────────────────────────────────
  // Returns the full lowercase lang code from <html lang>, e.g. 'pt-br', 'zh-hans'.
  // Use getLang() for dict lookups that have full-code keys; fall back to base.
  function getPageLang() {
    return (root.getAttribute('lang') || 'en').toLowerCase();
  }
  function resolveLang(dict) {
    var full = getPageLang();
    if (dict[full]) return full;
    var base = full.split('-')[0];
    return dict[base] ? base : 'en';
  }

  // ── Language Dropdown Injector ──────────────────────────────
  // Usage: <div class="language-selector"
  //             data-languages='{"en":"./","de":"../de/"}'
  //             data-active-lang="en"></div>
  const LANG_NAMES = {
    en:'English', de:'Deutsch', es:'Español', fr:'Français',
    pl:'Polski', ja:'日本語', ko:'한국어', pt:'Português',
    'pt-br':'Português (Brasil)', 'pt-pt':'Português (Portugal)',
    'zh-hans':'简体中文', 'zh-hant':'繁體中文',
    it:'Italiano', nl:'Nederlands', zh:'中文', ru:'Русский',
    sv:'Svenska', da:'Dansk', fi:'Suomi', nb:'Norsk', no:'Norsk',
    ar:'العربية', bn:'বাংলা', el:'Ελληνικά', hi:'हिन्दी',
    id:'Bahasa Indonesia', pa:'ਪੰਜਾਬੀ',
    tr:'Türkçe', cs:'Čeština', ro:'Română', hu:'Magyar'
  };
  const GLOBE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" fill-rule="evenodd" d="M2 16c0 7.72 6.28 14 14 14s14-6.28 14-14S23.72 2 16 2S2 8.28 2 16m2.041-1c.15-1.81.703-3.506 1.568-5h3.55a16 16 0 0 0-1.128 5zm5.994 0a14 14 0 0 1 1.31-5H15v5zM15 17h-4.965a14 14 0 0 0 1.31 5H15zm0 7h-2.494A14 14 0 0 0 15 26.73zm4.005 3.62A12 12 0 0 0 24.94 24h-3.074a16 16 0 0 1-2.86 3.62M22.84 22h3.55v.002A11.9 11.9 0 0 0 27.959 17h-3.99a16 16 0 0 1-1.13 5m-.875-5a14 14 0 0 1-1.31 5H17v-5zm2.004-2h3.99a11.9 11.9 0 0 0-1.569-5.002V10h-3.55a16 16 0 0 1 1.13 5m-3.315-5a14 14 0 0 1 1.31 5H17v-5zm1.212-2h3.073a12 12 0 0 0-5.926-3.618A16 16 0 0 1 21.865 8M17 5.27V8h2.494A14 14 0 0 0 17 5.27m-2 0A14 14 0 0 0 12.506 8H15zM17 24v2.73A14 14 0 0 0 19.494 24zM5.609 22h3.554a16 16 0 0 1-1.132-5H4.04c.15 1.81.703 3.506 1.568 5M13 27.621A16 16 0 0 1 10.14 24H7.06a12 12 0 0 0 5.941 3.621M10.134 8a16 16 0 0 1 2.853-3.617A12 12 0 0 0 7.061 8z" clip-rule="evenodd"/></svg>';

  function initLanguageDropdowns() {
    document.querySelectorAll('.language-selector[data-languages]').forEach((el) => {
      let langs;
      try { langs = JSON.parse(el.getAttribute('data-languages')); } catch { return; }
      const activeLang = (el.getAttribute('data-active-lang') || '').toLowerCase();
      const keys = Object.keys(langs);
      if (!keys.length) return;

      const btn = document.createElement('button');
      btn.className = 'language-btn';
      btn.setAttribute('aria-label', 'Change language');
      btn.setAttribute('title', 'Change language');
      btn.innerHTML = GLOBE_SVG;

      const dropdown = document.createElement('div');
      dropdown.className = 'language-dropdown';
      keys.forEach((code) => {
        const a = document.createElement('a');
        a.className = 'language-option';
        a.setAttribute('href', langs[code]);
        a.setAttribute('lang', code);
        a.textContent = LANG_NAMES[code] || code;
        if (code === activeLang) a.classList.add('active');
        dropdown.appendChild(a);
      });

      el.innerHTML = '';
      el.appendChild(btn);
      el.appendChild(dropdown);
    });
  }
  initLanguageDropdowns();

  // ── Footer Injector ─────────────────────────────────────
  // Usage: <footer class="site-footer" data-footer-type="full"></footer>
  //    or: <footer class="site-footer" data-footer-type="simple"></footer>
  // "full" = copyright + Privacy/Terms links (index pages)
  // "simple" = copyright only (privacy, terms, product pages)
  const FOOTER_STRINGS = {
    en: { privacy: 'Privacy', terms: 'Terms' },
    de: { privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' },
    es: { privacy: 'Privacidad', terms: 'Condiciones de uso' },
    fr: { privacy: 'Confidentialit\u00e9', terms: 'Conditions' },
    ja: { privacy: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc', terms: '\u5229\u7528\u898f\u7d04' },
    ko: { privacy: '\uac1c\uc778\uc815\ubcf4 \ucc98\ub9ac\ubc29\uce68', terms: '\uc774\uc6a9\uc57d\uad00' },
    pl: { privacy: 'Prywatno\u015b\u0107', terms: 'Regulamin' },
    'pt-br': { privacy: 'Privacidade', terms: 'Termos de Uso' },
    'pt-pt': { privacy: 'Privacidade', terms: 'Termos e Condi\u00e7\u00f5es' },
    'zh-hans': { privacy: '\u9690\u79c1\u653f\u7b56', terms: '\u670d\u52a1\u6761\u6b3e' },
    'zh-hant': { privacy: '\u96b1\u79c1\u6b0a\u653f\u7b56', terms: '\u670d\u52d9\u689d\u6b3e' },
    ar: { privacy: 'الخصوصية', terms: 'الشروط' },
    bn: { privacy: 'গোপনীয়তা', terms: 'শর্তাবলী' },
    da: { privacy: 'Privatliv', terms: 'Vilkår' },
    el: { privacy: 'Απόρρητο', terms: 'Όροι' },
    fi: { privacy: 'Tietosuoja', terms: 'Ehdot' },
    hi: { privacy: 'गोपनीयता', terms: 'शर्तें' },
    id: { privacy: 'Privasi', terms: 'Ketentuan' },
    it: { privacy: 'Privacy', terms: 'Termini' },
    no: { privacy: 'Personvern', terms: 'Vilkår' },
    pa: { privacy: 'ਪਰਦੇਦਾਰੀ', terms: 'ਸ਼ਰਤਾਂ' },
    sv: { privacy: 'Integritet', terms: 'Villkor' }
  };

  function initFooter() {
    const footer = document.querySelector('footer.site-footer[data-footer-type]');
    if (!footer) return;

    const type = footer.getAttribute('data-footer-type') || 'simple';
    const lang = resolveLang(FOOTER_STRINGS);
    const s = FOOTER_STRINGS[lang] || FOOTER_STRINGS.en;

    // Determine privacy/terms paths based on page depth
    const inProducts = window.location.pathname.includes('/products/');
    const privacyHref = inProducts ? '../privacy.html' : './privacy.html';
    const termsHref = inProducts ? '../terms.html' : './terms.html';

    var INSTAGRAM_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';

    let html = '<div class="container footer-inner">' +
      '<small>\u00a9 <span id="year"></span> Harmonic Tools</small>' +
      '<ul class="footer-social">' +
      '<li><a href="https://www.instagram.com/harmonictools.app" target="_blank" rel="noopener noreferrer" aria-label="Harmonic Tools on Instagram">' + INSTAGRAM_SVG + '</a></li>' +
      '</ul>';

    if (type === 'full') {
      html += '<ul class="footer-links">' +
        '<li><a href="' + privacyHref + '">' + s.privacy + '</a></li>' +
        '<li><a href="' + termsHref + '">' + s.terms + '</a></li>' +
        '</ul>';
    }

    html += '</div>';
    footer.innerHTML = html;
  }
  initFooter();

  // ── Hreflang Injector ───────────────────────────────────
  // Generates one <link rel="alternate" hreflang="..."> tag per supported language
  // by detecting the current page's language prefix and page path,
  // then substituting each supported language prefix.
  // x-default always points to the English version.
  const HREFLANG_LANGS = ['en', 'pl', 'fr', 'de', 'es', 'ko', 'ja', 'pt-br', 'pt-pt', 'zh-hans', 'zh-hant', 'ar', 'bn', 'da', 'el', 'fi', 'hi', 'id', 'it', 'no', 'pa', 'sv'];
  const HREFLANG_ORIGIN = 'https://harmonic.tools';

  function initHreflang() {
    const path = window.location.pathname;
    // Match /{lang}/ or /{lang}/page.html or /{lang}/products/page.html
    const match = path.match(/^\/([a-z]{2}(?:-[a-z]+)?)(\/.*)?$/);
    if (!match) return;

    const pagePart = match[2] || '/'; // e.g. "/" or "/privacy.html" or "/products/metric.html"

    const head = document.head;
    HREFLANG_LANGS.forEach(function(lang) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = HREFLANG_ORIGIN + '/' + lang + pagePart;
      head.appendChild(link);
    });

    // x-default → English version
    const xd = document.createElement('link');
    xd.rel = 'alternate';
    xd.hreflang = 'x-default';
    xd.href = HREFLANG_ORIGIN + '/en' + pagePart;
    head.appendChild(xd);
  }
  initHreflang();

  // ── Skip-Link Injector ──────────────────────────────────
  // Injects <a class="skip-link" href="#main">Skip to content</a>
  // (translated) as the first child of <body> on every page.
  const SKIP_STRINGS = {
    en: 'Skip to content',
    de: 'Zum Inhalt springen',
    es: 'Ir al contenido',
    fr: 'Aller au contenu',
    ja: '本文へスキップ',
    ko: '본문으로 건너뛰기',
    pl: 'Przejdź do treści',
    'pt-br': 'Pular para o conteúdo',
    'pt-pt': 'Saltar para o conteúdo',
    'zh-hans': '跳至正文',
    'zh-hant': '跳至正文',
    ar: 'انتقل إلى المحتوى',
    bn: 'মূল বিষয়বস্তুতে যান',
    da: 'Gå til indhold',
    el: 'Μετάβαση στο περιεχόμενο',
    fi: 'Siirry sisältöön',
    hi: 'सामग्री पर जाएँ',
    id: 'Langsung ke konten',
    it: 'Vai al contenuto',
    no: 'Hopp til innhold',
    pa: 'ਸਮੱਗਰੀ ਵੱਲ ਜਾਓ',
    sv: 'Hoppa till innehåll'
  };

  function initSkipLink() {
    const lang = resolveLang(SKIP_STRINGS);
    const text = SKIP_STRINGS[lang] || SKIP_STRINGS.en;
    const a = document.createElement('a');
    a.className = 'skip-link';
    a.href = '#main';
    a.textContent = text;
    document.body.insertBefore(a, document.body.firstChild);
  }
  initSkipLink();

  // ── Nav Items Injector ──────────────────────────────────
  // Populates <ul id="primary-menu" class="nav-list"></ul> based on page type.
  // Index pages get 4 anchor links; sub-pages get 2 links (Home + Products).
  const NAV_STRINGS = {
    en: { products: 'Products', pillars: 'Focus areas', philosophy: 'Philosophy', contact: 'Contact', home: 'Home' },
    de: { products: 'Produkte', pillars: 'Schwerpunkte', philosophy: 'Philosophie', contact: 'Kontakt', home: 'Startseite' },
    es: { products: 'Productos', pillars: '\u00c1reas de trabajo', philosophy: 'Filosof\u00eda', contact: 'Contacto', home: 'Inicio' },
    fr: { products: 'Produits', pillars: 'Axes de travail', philosophy: 'Philosophie', contact: 'Contact', home: 'Accueil' },
    ja: { products: '\u88fd\u54c1', pillars: '\u6ce8\u529b\u5206\u91ce', philosophy: '\u7406\u5ff5', contact: '\u304a\u554f\u3044\u5408\u308f\u305b', home: '\u30db\u30fc\u30e0' },
    ko: { products: '\uc81c\ud488', pillars: '\uc8fc\uc694 \ubd84\uc57c', philosophy: '\ucca0\ud559', contact: '\uc5f0\ub77d\ucc98', home: '\ud648' },
    pl: { products: 'Produkty', pillars: 'Obszary dzia\u0142ania', philosophy: 'Filozofia', contact: 'Kontakt', home: 'Strona g\u0142\u00f3wna' },
    'pt-br': { products: 'Produtos', pillars: '\u00c1reas de foco', philosophy: 'Filosofia', contact: 'Contato', home: 'In\u00edcio' },
    'pt-pt': { products: 'Produtos', pillars: '\u00c1reas de foco', philosophy: 'Filosofia', contact: 'Contacto', home: 'In\u00edcio' },
    'zh-hans': { products: '\u4ea7\u54c1', pillars: '\u9886\u57df', philosophy: '\u7406\u5ff5', contact: '\u8054\u7cfb\u6211\u4eec', home: '\u9996\u9875' },
    'zh-hant': { products: '\u7522\u54c1', pillars: '\u91cd\u9ede\u9818\u57df', philosophy: '\u7406\u5ff5', contact: '\u806f\u7d61\u6211\u5011', home: '\u9996\u9801' },
    ar: { products: 'المنتجات', pillars: 'مجالات التركيز', philosophy: 'الفلسفة', contact: 'التواصل', home: 'الرئيسية' },
    bn: { products: 'পণ্য', pillars: 'মূল ক্ষেত্র', philosophy: 'দর্শন', contact: 'যোগাযোগ', home: 'হোম' },
    da: { products: 'Produkter', pillars: 'Fokusområder', philosophy: 'Filosofi', contact: 'Kontakt', home: 'Hjem' },
    el: { products: 'Προϊόντα', pillars: 'Τομείς εστίασης', philosophy: 'Φιλοσοφία', contact: 'Επικοινωνία', home: 'Αρχική' },
    fi: { products: 'Tuotteet', pillars: 'Painopistealueet', philosophy: 'Filosofia', contact: 'Yhteystiedot', home: 'Etusivu' },
    hi: { products: 'प्रोडक्ट', pillars: 'मुख्य क्षेत्र', philosophy: 'दृष्टिकोण', contact: 'संपर्क', home: 'होम' },
    id: { products: 'Produk', pillars: 'Area fokus', philosophy: 'Filosofi', contact: 'Kontak', home: 'Beranda' },
    it: { products: 'Prodotti', pillars: 'Aree di lavoro', philosophy: 'Filosofia', contact: 'Contatti', home: 'Home' },
    no: { products: 'Produkter', pillars: 'Fokusområder', philosophy: 'Filosofi', contact: 'Kontakt', home: 'Hjem' },
    pa: { products: 'ਉਤਪਾਦ', pillars: 'ਮੁੱਖ ਖੇਤਰ', philosophy: 'ਫ਼ਲਸਫ਼ਾ', contact: 'ਸੰਪਰਕ', home: 'ਮੁੱਖ ਪੰਨਾ' },
    sv: { products: 'Produkter', pillars: 'Fokusområden', philosophy: 'Filosofi', contact: 'Kontakt', home: 'Hem' }
  };

  function initNavItems() {
    const ul = document.querySelector('ul#primary-menu.nav-list');
    if (!ul) return;

    const lang = resolveLang(NAV_STRINGS);
    const s = NAV_STRINGS[lang] || NAV_STRINGS.en;

    // Determine page type: index pages have no filename or end with /
    const path = window.location.pathname;
    const isIndex = /\/[a-z]{2}(?:-[a-z]+)?\/$/.test(path) || /\/[a-z]{2}(?:-[a-z]+)?\/index\.html$/.test(path);
    const inProducts = path.includes('/products/');
    const homeHref = inProducts ? '../' : './';

    const items = [];
    if (isIndex) {
      items.push({ label: s.products, href: '#products' });
      items.push({ label: s.pillars, href: '#pillars' });
      items.push({ label: s.philosophy, href: '#philosophy' });
      items.push({ label: s.contact, href: '#contact' });
    } else {
      items.push({ label: s.home, href: homeHref });
      items.push({ label: s.products, href: homeHref + '#products' });
    }

    ul.innerHTML = '';
    items.forEach(function(item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }
  initNavItems();

  // ── Store Badge Injector ────────────────────────────────
  // Usage: <span class="store-badge store-badge--disabled"
  //              data-store="ios|mac"
  //              data-store-product="Modes iOS"></span>
  // Injects the localised App Store / Mac App Store badge <img> (with
  // data-theme-src-light / data-theme-src-dark for theme switching).
  // Products with a URL in STORE_URLS become clickable links;
  // all others render as disabled "Coming Soon" badges.
  //
  // Apple universal links handle device routing (iOS vs Mac) and
  // localisation automatically: one URL per product is sufficient.
  const STORE_URLS = {
    'Modes':            'https://apps.apple.com/app/modes/id6757521945',
    'Modes iOS':        'https://apps.apple.com/app/modes/id6757521945',
    'Metric':           'https://apps.apple.com/app/metric/id6757522050',
    'Metric iOS':       'https://apps.apple.com/app/metric/id6757522050',
    'Modes Guitar':     'https://apps.apple.com/us/app/modes-guitar/id6795276397',
    'Modes Guitar iOS': 'https://apps.apple.com/us/app/modes-guitar/id6795276397'
  };
  const STORE_BADGE_DATA = {
    en: {
      comingSoon: 'Coming soon',
      ios: {
        alt: 'Download on the App Store',
        ariaPrefix: 'coming soon on the App Store',
        dark: 'Download-on-the-App-Store/US/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/US/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      },
      mac: {
        alt: 'Download on the Mac App Store',
        ariaPrefix: 'coming soon on the Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      }
    },
    de: {
      comingSoon: 'Demn\u00e4chst verf\u00fcgbar',
      ios: {
        alt: 'Laden im App Store',
        ariaPrefix: 'bald im App Store verf\u00fcgbar',
        dark: 'Download-on-the-App-Store/DE/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_DE_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/DE/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_DE_RGB_wht_092917.svg'
      },
      mac: {
        alt: 'Laden im Mac App Store',
        ariaPrefix: 'bald im Mac App Store verf\u00fcgbar',
        dark: 'Download-on-the-Mac-App-Store/DE/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_DE_RGB_blk_092917.svg',
        light: 'Download-on-the-Mac-App-Store/DE/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_DE_RGB_wht_092917.svg'
      }
    },
    es: {
      comingSoon: 'Pr\u00f3ximamente',
      ios: {
        alt: 'Descargar en el App Store',
        ariaPrefix: 'pr\u00f3ximamente en el App Store',
        dark: 'Download-on-the-App-Store/ES/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_ES_RGB_blk_100217.svg',
        light: 'Download-on-the-App-Store/ES/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_ES_RGB_wht_100217.svg'
      },
      mac: {
        alt: 'Descargar en el Mac App Store',
        ariaPrefix: 'pr\u00f3ximamente en el Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/ES/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_ES_RGB_blk_100217.svg',
        light: 'Download-on-the-Mac-App-Store/ES/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_ES_RGB_wht_100217.svg'
      }
    },
    fr: {
      comingSoon: 'Bient\u00f4t disponible',
      ios: {
        alt: "T\u00e9l\u00e9charger sur l'App Store",
        ariaPrefix: "bient\u00f4t disponible sur l'App Store",
        dark: 'Download-on-the-App-Store/FR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg',
        light: 'Download-on-the-App-Store/FR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_FR_RGB_wht_100217.svg'
      },
      mac: {
        alt: "T\u00e9l\u00e9charger sur le Mac App Store",
        ariaPrefix: "bient\u00f4t disponible sur le Mac App Store",
        dark: 'Download-on-the-Mac-App-Store/FR/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_FR_RGB_blk_100217.svg',
        light: 'Download-on-the-Mac-App-Store/FR/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_FR_RGB_wht_100217.svg'
      }
    },
    ja: {
      comingSoon: '\u8fd1\u65e5\u516c\u958b',
      ios: {
        alt: 'App Store\u304b\u3089\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9',
        ariaPrefix: '\u8fd1\u65e5App Store\u306b\u767b\u5834',
        dark: 'Download-on-the-App-Store/JP/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_JP_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/JP/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_JP_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Mac App Store\u304b\u3089\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9',
        ariaPrefix: '\u8fd1\u65e5Mac App Store\u306b\u767b\u5834',
        dark: 'Download-on-the-Mac-App-Store/JP/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_JP_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/JP/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_JP_RGB_wht_100317.svg'
      }
    },
    ko: {
      comingSoon: '\ucd9c\uc2dc \uc608\uc815',
      ios: {
        alt: 'App Store\uc5d0\uc11c \ub2e4\uc6b4\ub85c\ub4dc',
        ariaPrefix: '\uace7 App Store\uc5d0 \ucd9c\uc2dc',
        dark: 'Download-on-the-App-Store/KR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_KR_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/KR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_KR_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Mac App Store\uc5d0\uc11c \ub2e4\uc6b4\ub85c\ub4dc',
        ariaPrefix: '\uace7 Mac App Store\uc5d0 \ucd9c\uc2dc',
        dark: 'Download-on-the-Mac-App-Store/KR/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_KR_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/KR/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_KR_RGB_wht_100317.svg'
      }
    },
    pl: {
      comingSoon: 'Wkr\u00f3tce',
      ios: {
        alt: 'Pobierz z App Store',
        ariaPrefix: 'wkr\u00f3tce w App Store',
        dark: 'Download-on-the-App-Store/PL/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_PL_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/PL/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_PL_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Pobierz z Mac App Store',
        ariaPrefix: 'wkr\u00f3tce w Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/PL/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_PL_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/PL/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_PL_RGB_wht_100317.svg'
      }
    },
    'pt-br': {
      comingSoon: 'Em breve',
      ios: {
        alt: 'Baixar na App Store',
        ariaPrefix: 'em breve na App Store',
        dark: 'Download-on-the-App-Store/PTBR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_PTBR_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/PTBR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_PTBR_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Baixar na Mac App Store',
        ariaPrefix: 'em breve na Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/PTBR/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_PTBR_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/PTBR/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_PTBR_RGB_wht_100317.svg'
      }
    },
    'pt-pt': {
      comingSoon: 'Brevemente',
      ios: {
        alt: 'Transferir na App Store',
        ariaPrefix: 'brevemente na App Store',
        dark: 'Download-on-the-App-Store/PTPT/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_PTPT_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/PTPT/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_PTPT_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Transferir na Mac App Store',
        ariaPrefix: 'brevemente na Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/PTPT/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_PTPT_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/PTPT/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_PTPT_RGB_wht_100317.svg'
      }
    },
    'zh-hans': {
      comingSoon: '\u5373\u5c06\u63a8\u51fa',
      ios: {
        alt: '\u5728 App Store \u4e0b\u8f7d',
        ariaPrefix: '\u5373\u5c06\u767b\u9646 App Store',
        dark: 'Download-on-the-App-Store/CN(SC)/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_CNSC_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/CN(SC)/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_CNSC_RGB_wht_092917.svg'
      },
      mac: {
        alt: '\u5728 Mac App Store \u4e0b\u8f7d',
        ariaPrefix: '\u5373\u5c06\u767b\u9646 Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/CN(SC)/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_CNSC_RGB_blk_092917.svg',
        light: 'Download-on-the-Mac-App-Store/CN(SC)/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_CNSC_RGB_wht_092917.svg'
      }
    },
    'zh-hant': {
      comingSoon: '\u5373\u5c07\u63a8\u51fa',
      ios: {
        alt: '\u5728 App Store \u4e0b\u8f09',
        ariaPrefix: '\u5373\u5c07\u767b\u9678 App Store',
        dark: 'Download-on-the-App-Store/HKTW(TC)/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_CNTC_RGB_blk_100217.svg',
        light: 'Download-on-the-App-Store/HKTW(TC)/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_CNTC_RGB_wht_100217.svg'
      },
      mac: {
        alt: '\u5728 Mac App Store \u4e0b\u8f09',
        ariaPrefix: '\u5373\u5c07\u767b\u9678 Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/HKTW(TC)/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_CNTC_RGB_blk_100217.svg',
        light: 'Download-on-the-Mac-App-Store/HKTW(TC)/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_CNTC_RGB_wht_100217.svg'
      }
    },
    ar: {
      comingSoon: 'قريبًا',
      ios: {
        alt: 'التنزيل من App Store',
        ariaPrefix: 'قريبًا على App Store',
        dark: 'Download-on-the-App-Store/AR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_AR_RGB_blk_102417.svg',
        light: 'Download-on-the-App-Store/AR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_AR_RGB_wht_102417.svg'
      },
      mac: {
        alt: 'التنزيل من Mac App Store',
        ariaPrefix: 'قريبًا على Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/AR/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_AR_RGB_blk_102417.svg',
        light: 'Download-on-the-Mac-App-Store/AR/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_AR_RGB_wht_102417.svg'
      }
    },
    bn: {
      comingSoon: 'শীঘ্রই আসছে',
      ios: {
        alt: 'App Store থেকে ডাউনলোড করুন',
        ariaPrefix: 'শীঘ্রই App Store-এ আসছে',
        dark: 'Download-on-the-App-Store/US/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/US/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      },
      mac: {
        alt: 'Mac App Store থেকে ডাউনলোড করুন',
        ariaPrefix: 'শীঘ্রই Mac App Store-এ আসছে',
        dark: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      }
    },
    da: {
      comingSoon: 'Kommer snart',
      ios: {
        alt: 'Hent i App Store',
        ariaPrefix: 'kommer snart i App Store',
        dark: 'Download-on-the-App-Store/DK/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_DK_RGB_blk_100217.svg',
        light: 'Download-on-the-App-Store/DK/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_DK_RGB_wht_100217.svg'
      },
      mac: {
        alt: 'Hent i Mac App Store',
        ariaPrefix: 'kommer snart i Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/DK/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_DK_RGB_blk_100217.svg',
        light: 'Download-on-the-Mac-App-Store/DK/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_DK_RGB_wht_100217.svg'
      }
    },
    el: {
      comingSoon: 'Σύντομα διαθέσιμο',
      ios: {
        alt: 'Λήψη από το App Store',
        ariaPrefix: 'σύντομα στο App Store',
        dark: 'Download-on-the-App-Store/GR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_GR_RGB_blk_100217.svg',
        light: 'Download-on-the-App-Store/GR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_GR_RGB_wht_100217.svg'
      },
      mac: {
        alt: 'Λήψη από το Mac App Store',
        ariaPrefix: 'σύντομα στο Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/GR/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_GR_RGB_blk_100217.svg',
        light: 'Download-on-the-Mac-App-Store/GR/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_GR_RGB_wht_100217.svg'
      }
    },
    fi: {
      comingSoon: 'Tulossa pian',
      ios: {
        alt: 'Lataa App Storesta',
        ariaPrefix: 'tulossa pian App Storeen',
        dark: 'Download-on-the-App-Store/FI/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_FI_RGB_blk_100217.svg',
        light: 'Download-on-the-App-Store/FI/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_FI_RGB_wht_100217.svg'
      },
      mac: {
        alt: 'Lataa Mac App Storesta',
        ariaPrefix: 'tulossa pian Mac App Storeen',
        dark: 'Download-on-the-Mac-App-Store/FI/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_FI_RGB_blk_100217.svg',
        light: 'Download-on-the-Mac-App-Store/FI/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_FI_RGB_wht_100217.svg'
      }
    },
    hi: {
      comingSoon: 'जल्द आ रहा है',
      ios: {
        alt: 'App Store से डाउनलोड करें',
        ariaPrefix: 'जल्द ही App Store पर',
        dark: 'Download-on-the-App-Store/US/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/US/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      },
      mac: {
        alt: 'Mac App Store से डाउनलोड करें',
        ariaPrefix: 'जल्द ही Mac App Store पर',
        dark: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      }
    },
    id: {
      comingSoon: 'Segera hadir',
      ios: {
        alt: 'Unduh di App Store',
        ariaPrefix: 'segera hadir di App Store',
        dark: 'Download-on-the-App-Store/ID/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_ID_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/ID/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_ID_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Unduh di Mac App Store',
        ariaPrefix: 'segera hadir di Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/ID/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_ID_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/ID/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_ID_RGB_wht_100317.svg'
      }
    },
    it: {
      comingSoon: 'Prossimamente',
      ios: {
        alt: 'Scarica su App Store',
        ariaPrefix: 'prossimamente su App Store',
        dark: 'Download-on-the-App-Store/IT/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_IT_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/IT/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_IT_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Scarica su Mac App Store',
        ariaPrefix: 'prossimamente su Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/IT/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_IT_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/IT/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_IT_RGB_wht_100317.svg'
      }
    },
    no: {
      comingSoon: 'Kommer snart',
      ios: {
        alt: 'Last ned fra App Store',
        ariaPrefix: 'kommer snart i App Store',
        dark: 'Download-on-the-App-Store/NO/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_NO_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/NO/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_NO_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Last ned fra Mac App Store',
        ariaPrefix: 'kommer snart i Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/NO/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_NO_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/NO/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_NO_RGB_wht_100317.svg'
      }
    },
    pa: {
      comingSoon: 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ',
      ios: {
        alt: 'App Store ਤੋਂ ਡਾਊਨਲੋਡ ਕਰੋ',
        ariaPrefix: 'ਜਲਦੀ ਹੀ App Store ਵਿੱਚ',
        dark: 'Download-on-the-App-Store/US/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-App-Store/US/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      },
      mac: {
        alt: 'Mac App Store ਤੋਂ ਡਾਊਨਲੋਡ ਕਰੋ',
        ariaPrefix: 'ਜਲਦੀ ਹੀ Mac App Store ਵਿੱਚ',
        dark: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_blk_092917.svg',
        light: 'Download-on-the-Mac-App-Store/US/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_wht_092917.svg'
      }
    },
    sv: {
      comingSoon: 'Kommer snart',
      ios: {
        alt: 'Hämta i App Store',
        ariaPrefix: 'kommer snart i App Store',
        dark: 'Download-on-the-App-Store/SE/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_SE_RGB_blk_100317.svg',
        light: 'Download-on-the-App-Store/SE/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_SE_RGB_wht_100317.svg'
      },
      mac: {
        alt: 'Hämta i Mac App Store',
        ariaPrefix: 'kommer snart i Mac App Store',
        dark: 'Download-on-the-Mac-App-Store/SE/Download_on_Mac_App_Store/Black_lockup/SVG/Download_on_the_Mac_App_Store_Badge_SE_RGB_blk_100317.svg',
        light: 'Download-on-the-Mac-App-Store/SE/Download_on_Mac_App_Store/White_lockup/SVG/Download_on_the_Mac_App_Store_Badge_SE_RGB_wht_100317.svg'
      }
    }
  };

  function initStoreBadges() {
    var lang = resolveLang(STORE_BADGE_DATA);
    var data = STORE_BADGE_DATA[lang] || STORE_BADGE_DATA.en;
    var inProducts = window.location.pathname.includes('/products/');
    var assetsPrefix = inProducts ? '../../assets/images/' : '../assets/images/';

    document.querySelectorAll('.store-badge[data-store]').forEach(function(el) {
      var store = el.getAttribute('data-store'); // "ios" or "mac"
      var product = el.getAttribute('data-store-product') || '';
      var info = data[store];
      if (!info) return;

      var storeUrl = STORE_URLS[product];

      var img = document.createElement('img');
      img.src = assetsPrefix + info.dark;
      img.setAttribute('data-theme-src-light', assetsPrefix + info.light);
      img.setAttribute('data-theme-src-dark', assetsPrefix + info.dark);
      img.alt = info.alt;
      img.width = 180;
      img.height = 53;

      if (storeUrl) {
        // Active badge: wrap in a link to the store
        el.classList.remove('store-badge--disabled');
        el.setAttribute('aria-label', info.alt + ': ' + product);
        var a = document.createElement('a');
        a.href = storeUrl;
        a.appendChild(img);
        el.appendChild(a);
      } else {
        // Coming soon: disabled badge
        el.setAttribute('aria-label', product + ' ' + info.ariaPrefix);
        el.appendChild(img);
        var label = document.createElement('span');
        label.className = 'coming-soon-label';
        label.textContent = data.comingSoon;
        el.appendChild(label);
      }
    });
  }
  initStoreBadges();

  // ── Organization JSON-LD Injector ───────────────────────
  // Injects the Organization schema block into <head> on index pages.
  // Only the description varies per language.
  const ORG_DESCRIPTIONS = {
    en: 'Music software for producers and musicians: Metric (timing and frequency toolkit), Modes (music theory) and Modes Guitar (fretboard scales and chords) for macOS and iOS.',
    de: 'Musiksoftware f\u00fcr Produzenten und Musiker: Metric (Werkzeuge f\u00fcr Timing und Frequenzen), Modes (Musiktheorie) und Modes Guitar (Tonleitern und Akkorde auf dem Griffbrett) f\u00fcr macOS und iOS.',
    es: 'Software musical para productores y m\u00fasicos: Metric (herramientas de tempo y frecuencia), Modes (teor\u00eda musical) y Modes Guitar (escalas y acordes en el m\u00e1stil) para macOS e iOS.',
    fr: 'Logiciels musicaux pour producteurs et musiciens\u00a0: Metric (outils de timing et de fr\u00e9quences), Modes (th\u00e9orie musicale) et Modes Guitar (gammes et accords sur le manche) pour macOS et iOS.',
    ja: '\u30d7\u30ed\u30c7\u30e5\u30fc\u30b5\u30fc\u3068\u30df\u30e5\u30fc\u30b8\u30b7\u30e3\u30f3\u5411\u3051\u306e\u97f3\u697d\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u3002\u30bf\u30a4\u30df\u30f3\u30b0\u3068\u5468\u6ce2\u6570\u306e\u30c4\u30fc\u30eb\u30ad\u30c3\u30c8Metric\u3001\u97f3\u697d\u7406\u8ad6\u30a2\u30d7\u30eaModes\u3001\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9\u306e\u30b9\u30b1\u30fc\u30eb\u3068\u30b3\u30fc\u30c9\u3092\u6271\u3046Modes Guitar\u3092\u3001macOS\u3068iOS\u5411\u3051\u306b\u63d0\u4f9b\u3057\u3066\u3044\u307e\u3059\u3002',
    ko: '\ud504\ub85c\ub4c0\uc11c\uc640 \ubba4\uc9c0\uc158\uc744 \uc704\ud55c \uc74c\uc545 \uc18c\ud504\ud2b8\uc6e8\uc5b4: macOS \ubc0f iOS\uc6a9 Metric(\ud0c0\uc774\ubc0d \ubc0f \uc8fc\ud30c\uc218 \ud234\ud0b7), Modes(\uc74c\uc545 \uc774\ub860), Modes Guitar(\uc9c0\ud310 \uc2a4\ucf00\uc77c\uacfc \ucf54\ub4dc).',
    pl: 'Oprogramowanie muzyczne dla producent\u00f3w i muzyk\u00f3w: Metric (narz\u0119dzia do tempa i cz\u0119stotliwo\u015bci), Modes (teoria muzyki) i Modes Guitar (skale i akordy na gryfie) na macOS i iOS.',
    'pt-br': 'Software musical para produtores e m\u00fasicos: Metric (ferramentas de tempo e frequ\u00eancia), Modes (teoria musical) e Modes Guitar (escalas e acordes no bra\u00e7o) para macOS e iOS.',
    'pt-pt': 'Software musical para produtores e m\u00fasicos: Metric (toolkit de tempo e frequ\u00eancia), Modes (teoria musical) e Modes Guitar (escalas e acordes no bra\u00e7o) para macOS e iOS.',
    'zh-hans': '\u9762\u5411\u5236\u4f5c\u4eba\u4e0e\u97f3\u4e50\u4eba\u7684\u97f3\u4e50\u8f6f\u4ef6\uff1a\u9002\u7528\u4e8e macOS \u548c iOS \u7684 Metric\uff08\u65f6\u95f4\u4e0e\u9891\u7387\u5de5\u5177\u5305\uff09\u3001Modes\uff08\u4e50\u7406\uff09\u548c Modes Guitar\uff08\u6307\u677f\u97f3\u9636\u4e0e\u548c\u5f26\uff09\u3002',
    'zh-hant': '\u70ba\u88fd\u4f5c\u4eba\u8207\u97f3\u6a02\u4eba\u6253\u9020\u7684\u97f3\u6a02\u8edf\u9ad4\uff1a\u9069\u7528\u65bc macOS \u548c iOS \u7684 Metric\uff08\u6642\u9593\u8207\u983b\u7387\u5de5\u5177\u7d44\uff09\u3001Modes\uff08\u6a02\u7406\uff09\u548c Modes Guitar\uff08\u6307\u677f\u97f3\u968e\u8207\u548c\u5f26\uff09\u3002',
    ar: 'برامج موسيقية للمنتجين والموسيقيين: Metric (أدوات التوقيت والتردد) وModes (نظرية الموسيقى) وModes Guitar (السلالم والتآلفات على ذراع الغيتار) لنظامي macOS وiOS.',
    bn: 'প্রযোজক ও সংগীতশিল্পীদের জন্য সংগীত সফটওয়্যার: macOS ও iOS-এর জন্য Metric (টাইমিং ও ফ্রিকোয়েন্সি টুলকিট), Modes (সংগীততত্ত্ব) এবং Modes Guitar (ফ্রেটবোর্ডে স্কেল ও কর্ড)।',
    da: 'Musiksoftware til producere og musikere: Metric (værktøjer til tempo og frekvens), Modes (musikteori) og Modes Guitar (skalaer og akkorder på gribebrættet) til macOS og iOS.',
    el: 'Λογισμικό μουσικής για παραγωγούς και μουσικούς: Metric (εργαλεία χρονισμού και συχνότητας), Modes (θεωρία της μουσικής) και Modes Guitar (κλίμακες και συγχορδίες στην ταστιέρα) για macOS και iOS.',
    fi: 'Musiikkiohjelmistoja tuottajille ja muusikoille: Metric (tempon ja taajuuden työkalut), Modes (musiikin teoria) ja Modes Guitar (asteikot ja soinnut otelaudalla) macOS:lle ja iOS:lle.',
    hi: 'प्रोड्यूसरों और संगीतकारों के लिए संगीत सॉफ़्टवेयर: macOS और iOS के लिए Metric (टाइमिंग और फ़्रीक्वेंसी टूलकिट), Modes (संगीत सिद्धांत) और Modes Guitar (फ़्रेटबोर्ड पर स्केल और कॉर्ड)।',
    id: 'Perangkat lunak musik untuk produser dan musisi: Metric (toolkit tempo dan frekuensi), Modes (teori musik) dan Modes Guitar (skala dan akor di fretboard) untuk macOS dan iOS.',
    it: 'Software musicale per produttori e musicisti: Metric (strumenti per tempo e frequenze), Modes (teoria musicale) e Modes Guitar (scale e accordi sulla tastiera) per macOS e iOS.',
    no: 'Musikkprogramvare for produsenter og musikere: Metric (verktøy for tempo og frekvens), Modes (musikkteori) og Modes Guitar (skalaer og akkorder på gripebrettet) for macOS og iOS.',
    pa: 'ਪ੍ਰੋਡਿਊਸਰਾਂ ਅਤੇ ਸੰਗੀਤਕਾਰਾਂ ਲਈ ਸੰਗੀਤ ਸਾਫ਼ਟਵੇਅਰ: macOS ਅਤੇ iOS ਲਈ Metric (ਟਾਈਮਿੰਗ ਅਤੇ ਫ਼੍ਰੀਕੁਐਂਸੀ ਟੂਲਕਿੱਟ), Modes (ਸੰਗੀਤ ਸਿਧਾਂਤ) ਅਤੇ Modes Guitar (ਫ੍ਰੇਟਬੋਰਡ ਉੱਤੇ ਸਕੇਲ ਅਤੇ ਕੋਰਡ)।',
    sv: 'Musikprogram för producenter och musiker: Metric (verktyg för tempo och frekvens), Modes (musikteori) och Modes Guitar (skalor och ackord på greppbrädan) för macOS och iOS.'
  };

  function initOrgJsonLd() {
    var path = window.location.pathname;
    var isIndex = /\/[a-z]{2}(?:-[a-z]+)?\/$/.test(path) || /\/[a-z]{2}(?:-[a-z]+)?\/index\.html$/.test(path);
    if (!isIndex) return;

    var lang = resolveLang(ORG_DESCRIPTIONS);
    var desc = ORG_DESCRIPTIONS[lang] || ORG_DESCRIPTIONS.en;

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Greenwood IT Consultancy Ltd',
      'alternateName': 'Harmonic Tools',
      'url': 'https://harmonic.tools',
      'logo': 'https://harmonic.tools/favicon.svg',
      'description': desc,
      'foundingDate': '2020',
      'sameAs': ['https://github.com/harmonic-tools'],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Support',
        'email': 'contact@gitc.digital'
      }
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
  initOrgJsonLd();

  // Theme-aware <picture> swapping
  function updateThemeImages(theme) {
    // First: explicit theme-src swapping (used for store badges).
    document.querySelectorAll('img[data-theme-src-light][data-theme-src-dark]').forEach((img) => {
      const lightSrc = img.getAttribute('data-theme-src-light') || '';
      const darkSrc = img.getAttribute('data-theme-src-dark') || '';
      const targetSrc = theme === 'light' ? lightSrc : darkSrc;
      if (!targetSrc) return;
      if (img.getAttribute('src') !== targetSrc) img.setAttribute('src', targetSrc);
    });

    document.querySelectorAll('picture').forEach((picture) => {
      const darkSource = picture.querySelector('source[data-theme="dark"]');
      const img = picture.querySelector('img');
      if (!darkSource || !img) return;

      // Persist the light (default) and dark sources once.
      if (!img.hasAttribute('data-default-src')) {
        img.setAttribute('data-default-src', img.getAttribute('src') || '');
      }
      if (!darkSource.hasAttribute('data-dark-srcset')) {
        darkSource.setAttribute('data-dark-srcset', darkSource.getAttribute('srcset') || '');
      }

      const defaultSrc = img.getAttribute('data-default-src') || '';
      const darkSrcset = darkSource.getAttribute('data-dark-srcset') || '';

      const shouldEnableDarkSource = theme === 'dark';

      if (shouldEnableDarkSource) {
        // Ensure the themed <source> is present, and also set <img> as a hard fallback.
        if (darkSrcset) darkSource.setAttribute('srcset', darkSrcset);
        if (darkSrcset) img.setAttribute('src', darkSrcset);
      } else {
        // Disable the themed <source> so the <img> wins.
        // Removing `srcset` tends to be more reliable than toggling `media`.
        darkSource.removeAttribute('srcset');
        if (defaultSrc) img.setAttribute('src', defaultSrc);
      }
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      const icon = theme === 'dark' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M18.362 3.202a2.936 2.936 0 0 0-4.724 0a2.94 2.94 0 0 1-3.25 1.055a2.936 2.936 0 0 0-3.822 2.778a2.94 2.94 0 0 1-2.008 2.763a2.936 2.936 0 0 0-1.46 4.494a2.94 2.94 0 0 1 0 3.416a2.936 2.936 0 0 0 1.46 4.494a2.94 2.94 0 0 1 2.008 2.763a2.936 2.936 0 0 0 3.823 2.778a2.94 2.94 0 0 1 3.249 1.055a2.936 2.936 0 0 0 4.724 0a2.94 2.94 0 0 1 3.25-1.055a2.936 2.936 0 0 0 3.822-2.778a2.94 2.94 0 0 1 2.008-2.763a2.936 2.936 0 0 0 1.46-4.494a2.94 2.94 0 0 1 0-3.416a2.936 2.936 0 0 0-1.46-4.494a2.94 2.94 0 0 1-2.008-2.763a2.936 2.936 0 0 0-3.823-2.778a2.94 2.94 0 0 1-3.249-1.055m-7.594 21.86c-5.005-2.89-6.72-9.29-3.83-14.294s9.29-6.72 14.294-3.83s6.72 9.29 3.83 14.294s-9.29 6.72-14.294 3.83"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><g fill="none"><g fill="currentColor" clip-path="url(#a)"><path d="M26.3 14.132a1.57 1.57 0 1 0 0-3.14a1.57 1.57 0 0 0 0 3.14m-12.92 12.88a1.57 1.57 0 1 0 0-3.14a1.57 1.57 0 0 0 0 3.14m14.41-9.03a.99.99 0 1 1-1.98 0a.99.99 0 0 1 1.98 0m-5.99 7a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/><path d="m21.466 6.102l.002.006c.428 1.745.48 3.645.016 5.626c-1.08 4.562-4.84 8.143-9.428 8.97h-.004a11.9 11.9 0 0 1-6.927-.783c-1.202-.53-2.395-.065-3.05.707a2.67 2.67 0 0 0-.316 3l.004.009c3.027 5.574 9.271 9.142 16.24 8.218h.002c7.14-.951 12.833-6.753 13.691-13.894l.001-.008c.684-5.903-1.83-11.254-6.031-14.554l-.01-.007l-.01-.007c-1.932-1.48-4.772.263-4.18 2.717m-9.055 16.57c5.38-.97 9.76-5.15 11.02-10.48a14 14 0 0 0 .096-6.04l-.004-.024a14 14 0 0 0-.113-.496c-.14-.58.55-1.02 1.02-.66q.196.154.388.316l.004.004a14 14 0 0 1 .7.631c3.013 2.91 4.727 7.154 4.189 11.8c-.75 6.24-5.74 11.32-11.97 12.15c-5.593.74-10.64-1.81-13.488-5.99a13 13 0 0 1-.51-.806l-.008-.014a14 14 0 0 1-.214-.38c-.29-.54.24-1.18.8-.93q.256.111.518.213l.009.003a14 14 0 0 0 .715.256c2.101.685 4.426.888 6.848.447"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h32v32H0z"/></clipPath></defs></g></svg>';
      themeBtn.innerHTML = icon;
    }
    updateThemeImages(theme);
  }

  // Theme: keep the last-commit behavior (localStorage key `theme`, system-follow when unset)
  const stored = (() => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
      // Only follow system if user hasn't manually set a preference
      let hasStored = false;
      try { hasStored = !!localStorage.getItem('theme'); } catch { hasStored = false; }
      if (hasStored) return;
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch { /* ignore */ }
      applyTheme(next);
    });
  }

  // Mobile nav
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Screenshot modal/lightbox (desktop only)
  function initScreenshotModal() {
    // Only run on desktop
    if (window.innerWidth < 900) return;

    // Check if we're on a product page
    if (!document.querySelector('.product-page')) return;

    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'screenshot-modal';
    modal.innerHTML = '<div class="screenshot-modal__backdrop"></div><div class="screenshot-modal__content"><button class="screenshot-modal__close" aria-label="Close">&times;</button><img class="screenshot-modal__image" alt="" /></div>';
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.screenshot-modal__image');
    const closeBtn = modal.querySelector('.screenshot-modal__close');
    const backdrop = modal.querySelector('.screenshot-modal__backdrop');

    function openModal(imgSrc, imgAlt) {
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt || '';
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // Find all screenshot images (inside device-shot__screen)
    const screenshotImages = document.querySelectorAll('.device-shot__screen picture img');
    
    screenshotImages.forEach((img) => {
      // Make clickable
      img.style.cursor = 'pointer';
      
      // Add click handler
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(this.src, this.alt);
      });
    });

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Backdrop click
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // Run when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenshotModal);
  } else {
    initScreenshotModal();
  }

  // ── Cookie Consent Injector ──────────────────────────────
  // Usage: <body data-cookie-consent>
  // Reads <html lang> to select translated strings.
  // Privacy-policy href auto-computed from URL path.
  const COOKIE_STRINGS = {
    en: { text: 'We use cookies to analyse site traffic. By clicking "Accept", you consent to our use of cookies.', accept: 'Accept', deny: 'Deny', privacy: 'Privacy policy' },
    de: { text: 'Wir verwenden Cookies, um den Website-Traffic zu analysieren. Mit einem Klick auf \u201eAkzeptieren\u201c stimmen Sie der Verwendung von Cookies zu.', accept: 'Akzeptieren', deny: 'Ablehnen', privacy: 'Datenschutzerkl\u00e4rung' },
    es: { text: 'Utilizamos cookies para analizar el tr\u00e1fico del sitio. Al hacer clic en \u00abAceptar\u00bb acepta nuestro uso de cookies.', accept: 'Aceptar', deny: 'Rechazar', privacy: 'Pol\u00edtica de privacidad' },
    fr: { text: 'Nous utilisons des cookies pour analyser le trafic du site. En cliquant sur \u00ab\u00a0Accepter\u00a0\u00bb, vous consentez \u00e0 notre utilisation des cookies.', accept: 'Accepter', deny: 'Refuser', privacy: 'Politique de confidentialit\u00e9' },
    ja: { text: '\u5f53\u30b5\u30a4\u30c8\u3067\u306f\u3001\u30b5\u30a4\u30c8\u306e\u30c8\u30e9\u30d5\u30a3\u30c3\u30af\u3092\u5206\u6790\u3059\u308b\u305f\u3081\u306bCookie\u3092\u4f7f\u7528\u3057\u3066\u3044\u307e\u3059\u3002\u300c\u540c\u610f\u300d\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u3001Cookie\u306e\u4f7f\u7528\u306b\u540c\u610f\u3057\u305f\u3053\u3068\u306b\u306a\u308a\u307e\u3059\u3002', accept: '\u540c\u610f', deny: '\u62d2\u5426', privacy: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc' },
    ko: { text: '\ub2f9\uc0ac\ub294 \uc0ac\uc774\ud2b8 \ud2b8\ub798\ud53d\uc744 \ubd84\uc11d\ud558\uae30 \uc704\ud574 \ucfe0\ud0a4\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4. "\ub3d9\uc758"\ub97c \ud074\ub9ad\ud558\uba74 \ucfe0\ud0a4 \uc0ac\uc6a9\uc5d0 \ub3d9\uc758\ud558\uac8c \ub429\ub2c8\ub2e4.', accept: '\ub3d9\uc758', deny: '\uac70\ubd80', privacy: '\uac1c\uc778\uc815\ubcf4 \ucc98\ub9ac\ubc29\uce68' },
    pl: { text: 'U\u017cywamy plik\u00f3w cookie do analizy ruchu na stronie. Klikaj\u0105c \u201eAkceptuj\u201d, wyra\u017casz zgod\u0119 na u\u017cywanie przez nas plik\u00f3w cookie.', accept: 'Akceptuj', deny: 'Odrzu\u0107', privacy: 'Polityka prywatno\u015bci' },
    'pt-br': { text: 'Usamos cookies para analisar o tr\u00e1fego do site. Ao clicar em \u201cAceitar\u201d, voc\u00ea consente com o uso de cookies.', accept: 'Aceitar', deny: 'Recusar', privacy: 'Pol\u00edtica de privacidade' },
    'pt-pt': { text: 'Utilizamos cookies para analisar o tr\u00e1fego do site. Ao clicar em \u201cAceitar\u201d, consente a utiliza\u00e7\u00e3o de cookies.', accept: 'Aceitar', deny: 'Recusar', privacy: 'Pol\u00edtica de privacidade' },
    'zh-hans': { text: '\u6211\u4eec\u4f7f\u7528 Cookie \u6765\u5206\u6790\u7f51\u7ad9\u6d41\u91cf\u3002\u70b9\u51fb\u201c\u63a5\u53d7\u201d\u5373\u8868\u793a\u540c\u610f\u6211\u4eec\u4f7f\u7528 Cookie\u3002', accept: '\u63a5\u53d7', deny: '\u62d2\u7edd', privacy: '\u9690\u79c1\u653f\u7b56' },
    'zh-hant': { text: '\u6211\u5011\u4f7f\u7528 Cookie \u4f86\u5206\u6790\u7db2\u7ad9\u6d41\u91cf\u3002\u9ede\u64ca\u300c\u63a5\u53d7\u300d\u5373\u8868\u793a\u540c\u610f\u6211\u5011\u4f7f\u7528 Cookie\u3002', accept: '\u63a5\u53d7', deny: '\u62d2\u7d55', privacy: '\u96b1\u79c1\u6b0a\u653f\u7b56' },
    ar: { text: 'نستخدم ملفات تعريف الارتباط لتحليل حركة الزيارات إلى الموقع. بالنقر على «قبول» فإنك توافق على استخدامنا لها.', accept: 'قبول', deny: 'رفض', privacy: 'سياسة الخصوصية' },
    bn: { text: 'আমরা সাইটের ট্রাফিক বিশ্লেষণের জন্য কুকি ব্যবহার করি। "গ্রহণ করুন" ক্লিক করলে আপনি আমাদের কুকি ব্যবহারে সম্মতি দিচ্ছেন।', accept: 'গ্রহণ করুন', deny: 'প্রত্যাখ্যান করুন', privacy: 'গোপনীয়তা নীতি' },
    da: { text: 'Vi bruger cookies til at analysere trafikken på webstedet. Ved at klikke på "Accepter" samtykker du til vores brug af cookies.', accept: 'Accepter', deny: 'Afvis', privacy: 'Privatlivspolitik' },
    el: { text: 'Χρησιμοποιούμε cookies για την ανάλυση της επισκεψιμότητας του ιστότοπου. Κάνοντας κλικ στο «Αποδοχή», συναινείτε στη χρήση των cookies.', accept: 'Αποδοχή', deny: 'Απόρριψη', privacy: 'Πολιτική απορρήτου' },
    fi: { text: 'Käytämme evästeitä sivuston liikenteen analysointiin. Napsauttamalla "Hyväksy" annat suostumuksesi evästeiden käyttöön.', accept: 'Hyväksy', deny: 'Hylkää', privacy: 'Tietosuojakäytäntö' },
    hi: { text: 'हम साइट के ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं। "स्वीकार करें" पर क्लिक करके आप कुकीज़ के हमारे उपयोग के लिए सहमति देते हैं।', accept: 'स्वीकार करें', deny: 'अस्वीकार करें', privacy: 'गोपनीयता नीति' },
    id: { text: 'Kami menggunakan cookie untuk menganalisis lalu lintas situs. Dengan mengeklik "Terima", Anda menyetujui penggunaan cookie oleh kami.', accept: 'Terima', deny: 'Tolak', privacy: 'Kebijakan privasi' },
    it: { text: 'Utilizziamo i cookie per analizzare il traffico del sito. Facendo clic su "Accetta", acconsenti all\'uso dei cookie.', accept: 'Accetta', deny: 'Rifiuta', privacy: 'Informativa sulla privacy' },
    no: { text: 'Vi bruker informasjonskapsler til å analysere trafikken på nettstedet. Ved å klikke på «Godta» samtykker du til at vi bruker informasjonskapsler.', accept: 'Godta', deny: 'Avslå', privacy: 'Personvernerklæring' },
    pa: { text: 'ਅਸੀਂ ਸਾਈਟ ਦੇ ਟ੍ਰੈਫ਼ਿਕ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਲਈ ਕੂਕੀਜ਼ ਵਰਤਦੇ ਹਾਂ। "ਮਨਜ਼ੂਰ ਕਰੋ" \'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਤੁਸੀਂ ਕੂਕੀਜ਼ ਦੀ ਸਾਡੀ ਵਰਤੋਂ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦੇ ਹੋ।', accept: 'ਮਨਜ਼ੂਰ ਕਰੋ', deny: 'ਅਸਵੀਕਾਰ ਕਰੋ', privacy: 'ਪਰਦੇਦਾਰੀ ਨੀਤੀ' },
    sv: { text: 'Vi använder cookies för att analysera trafiken på webbplatsen. Genom att klicka på "Godkänn" samtycker du till vår användning av cookies.', accept: 'Godkänn', deny: 'Avvisa', privacy: 'Integritetspolicy' }
  };

  function initCookieConsent() {
    if (!document.body.hasAttribute('data-cookie-consent')) return;

    const lang = resolveLang(COOKIE_STRINGS);
    const s = COOKIE_STRINGS[lang] || COOKIE_STRINGS.en;
    const privacyHref = window.location.pathname.includes('/products/') ? '../privacy.html' : './privacy.html';
    const sep = (lang === 'ja' || lang === 'zh-hans' || lang === 'zh-hant') ? '' : ' ';

    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.innerHTML =
      '<div class="cookie-consent__content">' +
        '<div class="cookie-consent__text">' +
          s.text + sep + '<a href="' + privacyHref + '">' + s.privacy + '</a>' +
        '</div>' +
        '<div class="cookie-consent__buttons">' +
          '<button class="cookie-consent__btn cookie-consent__btn--accept">' + s.accept + '</button>' +
          '<button class="cookie-consent__btn cookie-consent__btn--deny">' + s.deny + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    const acceptBtn = banner.querySelector('.cookie-consent__btn--accept');
    const denyBtn = banner.querySelector('.cookie-consent__btn--deny');
    const consent = (() => { try { return localStorage.getItem('cookieConsent'); } catch { return null; } })();

    if (!consent) {
      banner.classList.add('show');
    } else if (consent === 'accepted') {
      enableAnalytics();
    }

    acceptBtn.addEventListener('click', () => {
      try { localStorage.setItem('cookieConsent', 'accepted'); } catch { /* ignore */ }
      banner.classList.remove('show');
      enableAnalytics();
    });

    denyBtn.addEventListener('click', () => {
      try { localStorage.setItem('cookieConsent', 'denied'); } catch { /* ignore */ }
      banner.classList.remove('show');
      disableAnalytics();
    });
  }

  function enableAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
      const pagePath = window.location.pathname + window.location.search + window.location.hash;
      const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js?id="]');
      let measurementId = null;
      if (gaScript && gaScript.getAttribute('src')) {
        try {
          const u = new URL(gaScript.getAttribute('src'), window.location.href);
          measurementId = u.searchParams.get('id');
        } catch (_) { measurementId = null; }
      }
      if (measurementId) {
        gtag('config', measurementId, { page_path: pagePath });
      } else {
        gtag('event', 'page_view', { page_path: pagePath });
      }
    }
  }

  function disableAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { 'analytics_storage': 'denied' });
    }
  }

  initCookieConsent();

  // Make product cards clickable
  document.querySelectorAll('.product-card').forEach((card) => {
    const learnMoreLink = card.querySelector('.btn-tertiary');
    if (!learnMoreLink) return;

    card.style.cursor = 'pointer';

    card.addEventListener('click', (e) => {
      // Don't navigate if clicking on a link or button
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      window.location.href = learnMoreLink.getAttribute('href');
    });
  });

  // Optional email obfuscation helper (kept from last commit)
  document.querySelectorAll('[data-email]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const val = a.getAttribute('data-email');
      if (!val) return;
      const [user, domain] = val.split('|');
      if (!user || !domain) return;
      const mailto = `mailto:${user}@${domain}`;
      a.textContent = `${user}@${domain}`;
      a.setAttribute('href', mailto);
    });
  });
})();
