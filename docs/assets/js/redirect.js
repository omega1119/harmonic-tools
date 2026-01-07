(function () {
  function normalizeLocale(locale) {
    return String(locale || '').trim().toLowerCase();
  }

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
      if (loc === 'pl' || loc.indexOf('pl-') === 0) return 'pl';
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
    if (s && s.dataset && (s.dataset.redirectEn || s.dataset.redirectPl)) return s;
    return document.querySelector('script[data-redirect-en], script[data-redirect-pl]');
  }

  function getTargetsFromScript(scriptEl) {
    var ds = scriptEl && scriptEl.dataset ? scriptEl.dataset : {};
    return {
      en: ds.redirectEn || 'en/',
      pl: ds.redirectPl || 'pl/',
      defaultLang: (ds.defaultLang || 'en').toLowerCase(),
      countryTimeoutMs: Number(ds.countryTimeoutMs || 2500)
    };
  }

  function isSupported(lang, targets) {
    return lang === 'pl' || lang === 'en' || (lang === targets.defaultLang);
  }

  function main() {
    var scriptEl = findConfigScript();
    var targets = getTargetsFromScript(scriptEl);

    // If we don't have explicit targets, do nothing.
    if (!targets.en && !targets.pl) return;

    var preferred = getPreferredLanguage();

    // Prefer explicit Polish locale immediately.
    if (preferred === 'pl' && targets.pl) {
      redirectTo(targets.pl);
      return;
    }

    // Fallback: do a quick country lookup (useful for VPN testing).
    // If lookup fails or is slow, default to English.
    var didRedirect = false;
    var timeoutId = window.setTimeout(function () {
      if (didRedirect) return;
      didRedirect = true;
      redirectTo(targets.en || targets[targets.defaultLang]);
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
        if (cc === 'PL' && targets.pl) {
          redirectTo(targets.pl);
        } else {
          redirectTo(targets.en || targets[targets.defaultLang]);
        }
      })
      .catch(function () {
        if (didRedirect) return;
        didRedirect = true;
        window.clearTimeout(timeoutId);
        redirectTo(targets.en || targets[targets.defaultLang]);
      });
  }

  main();
})();
