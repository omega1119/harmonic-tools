(function(){
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const yearEl = document.getElementById('year');

  // ── Language Dropdown Injector ──────────────────────────────
  // Usage: <div class="language-selector"
  //             data-languages='{"en":"./","de":"../de/"}'
  //             data-active-lang="en"></div>
  const LANG_NAMES = {
    en:'English', de:'Deutsch', es:'Español', fr:'Français',
    pl:'Polski', ja:'日本語', ko:'한국어', pt:'Português',
    it:'Italiano', nl:'Nederlands', zh:'中文', ru:'Русский',
    sv:'Svenska', da:'Dansk', fi:'Suomi', nb:'Norsk',
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
    pl: { privacy: 'Prywatno\u015b\u0107', terms: 'Regulamin' }
  };

  function initFooter() {
    const footer = document.querySelector('footer.site-footer[data-footer-type]');
    if (!footer) return;

    const type = footer.getAttribute('data-footer-type') || 'simple';
    const lang = (root.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
    const s = FOOTER_STRINGS[lang] || FOOTER_STRINGS.en;

    // Determine privacy/terms paths based on page depth
    const inProducts = window.location.pathname.includes('/products/');
    const privacyHref = inProducts ? '../privacy.html' : './privacy.html';
    const termsHref = inProducts ? '../terms.html' : './terms.html';

    let html = '<div class="container footer-inner">' +
      '<small>\u00a9 <span id="year"></span> Harmonic Tools</small>';

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
  // Generates all 8 <link rel="alternate" hreflang="..."> tags
  // by detecting the current page's language prefix and page path,
  // then substituting each supported language prefix.
  // x-default always points to the English version.
  const HREFLANG_LANGS = ['en', 'pl', 'fr', 'de', 'es', 'ko', 'ja'];
  const HREFLANG_ORIGIN = 'https://harmonic.tools';

  function initHreflang() {
    const path = window.location.pathname;
    // Match /{lang}/ or /{lang}/page.html or /{lang}/products/page.html
    const match = path.match(/^\/([a-z]{2})(\/.*)?$/);
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
    pl: 'Przejdź do treści'
  };

  function initSkipLink() {
    const lang = (root.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
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
    en: { products: 'Products', pillars: 'Focus Areas', philosophy: 'Philosophy', contact: 'Contact', home: 'Home' },
    de: { products: 'Produkte', pillars: 'Bereiche', philosophy: 'Philosophie', contact: 'Kontakt', home: 'Startseite' },
    es: { products: 'Productos', pillars: '\u00c1reas', philosophy: 'Filosof\u00eda', contact: 'Contacto', home: 'Inicio' },
    fr: { products: 'Produits', pillars: 'Domaines', philosophy: 'Philosophie', contact: 'Contact', home: 'Accueil' },
    ja: { products: '\u88fd\u54c1', pillars: '\u5206\u91ce', philosophy: '\u7406\u5ff5', contact: '\u304a\u554f\u3044\u5408\u308f\u305b', home: '\u30db\u30fc\u30e0' },
    ko: { products: '\uc81c\ud488', pillars: '\ubd84\uc57c', philosophy: '\ucca0\ud559', contact: '\uc5f0\ub77d\ucc98', home: '\ud648' },
    pl: { products: 'Produkty', pillars: 'Obszary', philosophy: 'Filozofia', contact: 'Kontakt', home: 'Strona g\u0142\u00f3wna' }
  };

  function initNavItems() {
    const ul = document.querySelector('ul#primary-menu.nav-list');
    if (!ul) return;

    const lang = (root.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
    const s = NAV_STRINGS[lang] || NAV_STRINGS.en;

    // Determine page type: index pages have no filename or end with /
    const path = window.location.pathname;
    const isIndex = /\/[a-z]{2}\/$/.test(path) || /\/[a-z]{2}\/index\.html$/.test(path);
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
    en: { text: 'We use cookies to analyze site traffic and improve your experience. By clicking "Accept", you consent to our use of cookies.', accept: 'Accept', deny: 'Deny', privacy: 'Privacy Policy' },
    de: { text: 'Wir verwenden Cookies, um den Website-Traffic zu analysieren und Ihre Erfahrung zu verbessern. Durch Klicken auf \u201eAkzeptieren\u201c stimmen Sie unserer Verwendung von Cookies zu.', accept: 'Akzeptieren', deny: 'Ablehnen', privacy: 'Datenschutzerkl\u00e4rung' },
    es: { text: 'Utilizamos cookies para analizar el tr\u00e1fico del sitio y mejorar su experiencia. Al hacer clic en \u00abAceptar\u00bb acepta nuestro uso de cookies.', accept: 'Aceptar', deny: 'Rechazar', privacy: 'Pol\u00edtica de privacidad' },
    fr: { text: 'Nous utilisons des cookies pour analyser le trafic du site et am\u00e9liorer votre exp\u00e9rience. En cliquant sur \u00ab\u00a0Accepter\u00a0\u00bb, vous consentez \u00e0 notre utilisation des cookies.', accept: 'Accepter', deny: 'Refuser', privacy: 'Politique de confidentialit\u00e9' },
    ja: { text: '\u5f53\u30b5\u30a4\u30c8\u3067\u306f\u3001\u30c8\u30e9\u30d5\u30a3\u30c3\u30af\u306e\u5206\u6790\u3068\u30e6\u30fc\u30b6\u30fc\u30a8\u30af\u30b9\u30da\u30ea\u30a8\u30f3\u30b9\u306e\u5411\u4e0a\u306e\u305f\u3081\u306bCookie\u3092\u4f7f\u7528\u3057\u3066\u3044\u307e\u3059\u3002\u300c\u540c\u610f\u300d\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u3001Cookie\u306e\u4f7f\u7528\u306b\u540c\u610f\u3057\u305f\u3053\u3068\u306b\u306a\u308a\u307e\u3059\u3002', accept: '\u540c\u610f', deny: '\u62d2\u5426', privacy: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc' },
    ko: { text: '\ub2f9\uc0ac\ub294 \uc0ac\uc774\ud2b8 \ud2b8\ub798\ud53d\uc744 \ubd84\uc11d\ud558\uace0 \uc0ac\uc6a9\uc790 \uacbd\ud5d8\uc744 \uac1c\uc120\ud558\uae30 \uc704\ud574 \ucfe0\ud0a4\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4. \u00ab\ub3d9\uc758\u00bb\ub97c \ud074\ub9ad\ud558\uba74 \ucfe0\ud0a4 \uc0ac\uc6a9\uc5d0 \ub3d9\uc758\ud558\uac8c \ub429\ub2c8\ub2e4.', accept: '\ub3d9\uc758', deny: '\uac70\ubd80', privacy: '\uac1c\uc778\uc815\ubcf4 \ucc98\ub9ac\ubc29\uce68' },
    pl: { text: 'U\u017cywamy plik\u00f3w cookie do analizy ruchu na stronie i poprawy Twojego do\u015bwiadczenia. Klikaj\u0105c \u201eAkceptuj\u201d, wyra\u017casz zgod\u0119 na nasze u\u017cycie plik\u00f3w cookie.', accept: 'Akceptuj', deny: 'Odrzu\u0107', privacy: 'Polityka prywatno\u015bci' }
  };

  function initCookieConsent() {
    if (!document.body.hasAttribute('data-cookie-consent')) return;

    const lang = (root.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
    const s = COOKIE_STRINGS[lang] || COOKIE_STRINGS.en;
    const privacyHref = window.location.pathname.includes('/products/') ? '../privacy.html' : './privacy.html';
    const sep = lang === 'ja' ? '' : ' ';

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
