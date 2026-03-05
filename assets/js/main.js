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

  // Cookie Consent
  function initCookieConsent() {
    const consentBanner = document.querySelector('.cookie-consent');
    if (!consentBanner) return;

    const acceptBtn = consentBanner.querySelector('.cookie-consent__btn--accept');
    const denyBtn = consentBanner.querySelector('.cookie-consent__btn--deny');

    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
      // Show banner if no choice has been made
      consentBanner.classList.add('show');
    } else if (consent === 'accepted') {
      // Enable analytics if previously accepted
      enableAnalytics();
    }

    acceptBtn?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      consentBanner.classList.remove('show');
      enableAnalytics();
    });

    denyBtn?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'denied');
      consentBanner.classList.remove('show');
      disableAnalytics();
    });
  }

  function enableAnalytics() {
    // Grant consent for Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });

      // If GA was initialized while consent was denied, it may not emit the
      // initial page_view. Re-run config (or send a page_view) after consent.
      const pagePath = window.location.pathname + window.location.search + window.location.hash;
      const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js?id="]');

      let measurementId = null;
      if (gaScript && gaScript.getAttribute('src')) {
        try {
          const u = new URL(gaScript.getAttribute('src'), window.location.href);
          measurementId = u.searchParams.get('id');
        } catch (_) {
          measurementId = null;
        }
      }

      if (measurementId) {
        gtag('config', measurementId, { page_path: pagePath });
      } else {
        gtag('event', 'page_view', { page_path: pagePath });
      }
    }
  }

  function disableAnalytics() {
    // Deny consent for Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  }

  // Initialize cookie consent
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
