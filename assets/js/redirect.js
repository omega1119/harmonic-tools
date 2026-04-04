(function () {
  /** Non-English languages supported by the site. */
  var SUPPORTED_LANGS = ['pl', 'fr', 'de', 'es', 'ko', 'ja', 'pt-br', 'pt-pt', 'zh-hans', 'zh-hant'];

  /** Country-code → language mapping for geo-based fallback. */
  var COUNTRY_TO_LANG = {
    PL: 'pl',
    FR: 'fr',
    DE: 'de',
    AT: 'de',
    CH: 'de',
    ES: 'es',
    MX: 'es',
    AR: 'es',
    CO: 'es',
    CL: 'es',
    PE: 'es',
    VE: 'es',
    EC: 'es',
    GT: 'es',
    CU: 'es',
    BO: 'es',
    DO: 'es',
    HN: 'es',
    PY: 'es',
    SV: 'es',
    NI: 'es',
    CR: 'es',
    PA: 'es',
    UY: 'es',
    GQ: 'es',
    KR: 'ko',
    JP: 'ja',
    BR: 'pt-br',
    PT: 'pt-pt',
    AO: 'pt-pt',
    MZ: 'pt-pt',
    CN: 'zh-hans',
    SG: 'zh-hans',
    TW: 'zh-hant',
    HK: 'zh-hant',
    MO: 'zh-hant'
  };

  function normalizeLocale(locale) {
    return String(locale || '').trim().toLowerCase();
  }

  // Maps browser locale codes to our supported language codes where they differ.
  var LOCALE_ALIASES = {
    'zh': 'zh-hans', 'zh-cn': 'zh-hans', 'zh-sg': 'zh-hans', 'zh-hans': 'zh-hans',
    'zh-tw': 'zh-hant', 'zh-hk': 'zh-hant', 'zh-mo': 'zh-hant', 'zh-hant': 'zh-hant',
    'pt': 'pt-pt', 'pt-pt': 'pt-pt', 'pt-br': 'pt-br'
  };

  function getPreferredLanguage() {
    var list = [];
    try {
      if (Array.isArray(navigator.languages) && navigator.languages.length) {
        list = navigator.languages;
      } else if (navigator.language) {
        list = [navigator.language];
      }
    } catch (e) {
      list = [];
    }

    for (var i = 0; i < list.length; i++) {
      var loc = normalizeLocale(list[i]);
      // Check aliases first (for zh-*, pt-* variants)
      if (LOCALE_ALIASES[loc]) return LOCALE_ALIASES[loc];
      // Then check supported languages directly
      for (var j = 0; j < SUPPORTED_LANGS.length; j++) {
        var lang = SUPPORTED_LANGS[j];
        if (loc === lang || loc.indexOf(lang + '-') === 0) return lang;
      }
      // Base language fallback for aliased families
      var base = loc.split('-')[0];
      if (LOCALE_ALIASES[base]) return LOCALE_ALIASES[base];
    }

    return 'en';
  }

  function redirectTo(target) {
    var suffix = (location.search || '') + (location.hash || '');
    window.location.replace(String(target) + suffix);
  }

  function findConfigScript() {
    // Prefer currentScript, but fall back for browsers where it can be null.
    var s = document.currentScript;
    if (s && s.dataset && s.dataset.redirectEn) return s;
    return document.querySelector('script[data-redirect-en]');
  }

  function getTargetsFromScript(scriptEl) {
    var ds = scriptEl && scriptEl.dataset ? scriptEl.dataset : {};
    var targets = {
      en: ds.redirectEn || 'en/',
      defaultLang: (ds.defaultLang || 'en').toLowerCase(),
      countryTimeoutMs: Number(ds.countryTimeoutMs || 2500)
    };
    // Dynamically read data-redirect-<lang> for every supported language.
    // data-redirect-pt-br → dataset.redirectPtBr (camelCase conversion)
    for (var i = 0; i < SUPPORTED_LANGS.length; i++) {
      var lang = SUPPORTED_LANGS[i];
      var key = 'redirect' + lang.replace(/(^|-)([a-z])/g, function(_, __, c) { return c.toUpperCase(); });
      if (ds[key]) targets[lang] = ds[key];
    }
    return targets;
  }

  function main() {
    var scriptEl = findConfigScript();
    var targets = getTargetsFromScript(scriptEl);

    if (!targets.en) return;

    var preferred = getPreferredLanguage();

    // Immediate redirect for non-English preferred locale.
    if (preferred !== 'en' && targets[preferred]) {
      redirectTo(targets[preferred]);
      return;
    }

    // Fallback: quick country lookup (useful for VPN / locale mismatch).
    // If lookup fails or is slow, default to English.
    var didRedirect = false;
    var timeoutId = window.setTimeout(function () {
      if (didRedirect) return;
      didRedirect = true;
      redirectTo(targets.en);
    }, targets.countryTimeoutMs);

    fetch('https://ipapi.co/country/', { cache: 'no-store' })
      .then(function (r) {
        return r.ok ? r.text() : '';
      })
      .then(function (text) {
        if (didRedirect) return;
        didRedirect = true;
        window.clearTimeout(timeoutId);
        var cc = String(text || '').trim().toUpperCase();
        // Be defensive: ipapi can return error pages/strings when rate limited.
        cc = /^[A-Z]{2}$/.test(cc) ? cc : '';
        var lang = COUNTRY_TO_LANG[cc];
        if (lang && targets[lang]) {
          redirectTo(targets[lang]);
        } else {
          redirectTo(targets.en);
        }
      })
      .catch(function () {
        if (didRedirect) return;
        didRedirect = true;
        window.clearTimeout(timeoutId);
        redirectTo(targets.en);
      });
  }

  main();
})();
