'use strict';

/* eslint no-magic-numbers: off */

/*
 * eslint rule max-statements with option ignoreTopLevelFunctions does not work
 * actually with IIFE https://github.com/eslint/eslint/issues/12950
 *
 * max-line-per-function has actually no option ignoreTopLevelFunctions
 * https://github.com/eslint/eslint/issues/11459
 */

/**
 * Throw an error
 * @param {string} message the message of the error
 */
const throwError = (message) => {
  // eslint-disable-next-line no-alert
  alert(message);
  throw new Error(message);
};

/**
 * ============================================================================
 * Navigation menu
 * ============================================================================
 */

/**
 * Script to display the menu when we scroll of `scrollMenuOffset'
 */
// See above why we disale this eslint rules
// eslint-disable-next-line max-lines-per-function, max-statements
(() => {
  const [header] = document.getElementsByTagName('header');
  if (!header) {
    const message = 'No tag element "header"';
    throwError(message);
  }

  const baseFontSize = 16;

  /*
   * Set value of scrollMenuOffset
   */
  const setScrollMenuOffset = () => {
    const paddingTopMainTag = 12;
    const scrollMenuOffsetDesktop = paddingTopMainTag * baseFontSize;
    const scrollMenuOffsetMobile = 100;
    return window.width >= 768
      ? scrollMenuOffsetDesktop
      : scrollMenuOffsetMobile;
  };
  // At initialisation
  let scrollMenuOffset = setScrollMenuOffset();
  // On resize
  window.addEventListener('resize', () => {
    scrollMenuOffset = setScrollMenuOffset();
  });

  /*
   * Set Add or remove css class 'header--scrollstate' to header tag
   * if window.scrollY > scrollMenuOffset
   */
  const testDisplayScrollMenu = (scrollMenuOffsetVar) => {
    if (window.scrollY > scrollMenuOffsetVar) {
      header.classList.add('header--scrollstate');
    } else {
      header.classList.remove('header--scrollstate');
    }
  };
  // At initialisation
  testDisplayScrollMenu(scrollMenuOffset);
  // On scroll
  window.addEventListener('scroll', () => {
    testDisplayScrollMenu(scrollMenuOffset);
  });
})();

/**
 * Script to display menu mobile when we click on the button with three
 * horizontals lines
 */
(() => {
  const menuBtn = document.getElementById('header-mobile-threebarbutton');
  const menuMobile = document.getElementById('header-mobile-navmenu');
  const [body] = document.getElementsByTagName('body');
  if (menuBtn && menuMobile && body) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('menuMobileIsDisplayed');
      menuMobile.classList.toggle('menuMobileIsDisplayed');
      body.classList.toggle('menuMobileIsDisplayed');
    });
  } else {
    const message =
      'No element with id "header-mobile-threebarbutton" ' +
      ' and / or "header-mobile-navmenu"';
    throwError(message);
  }
})();

/**
 * ============================================================================
 * Index page
 * ============================================================================
 */

(() => {
  const titleMaxLength = 60;
  // `blogIndexArticleTitleAll' is never null, but could be empty.
  const blogIndexArticleTitleAll = document.querySelectorAll(
    '.blogindex-article-title'
  );
  blogIndexArticleTitleAll.forEach((blogIndexArticleTitle) => {
    // `text' is never null, but could be empty string.
    const text = blogIndexArticleTitle.innerText;
    if (text.length > titleMaxLength) {
      blogIndexArticleTitle.title = text;
      const textTruncate = text.substring(0, titleMaxLength);
      blogIndexArticleTitle.innerHTML = `${textTruncate}…`;
    }
  });
})();


/**
 * ============================================================================
 * Job page
 * ============================================================================
 */

 const toggleJobDetails = (id) => {
   const addedClass = 'open';
   const panelDetailId = id + '-details';
   const detailPanel = document.getElementById(panelDetailId);
   if (detailPanel) {
     let panelClasses = detailPanel.getAttribute('class').split(' ');
     if (panelClasses.includes(addedClass)) {
      panelClasses = panelClasses.filter(className => className != addedClass);
     } else {
      panelClasses.push(addedClass);
    }
    detailPanel.setAttribute('class', panelClasses.join(' '));
   }
 }

/**
 * ============================================================================
 * Tarteaucitron
 * ============================================================================
 */

const googleIdentifier = 'UA-38249160-1';

/**
 * Inspired from https://github.com/AmauriC/tarteaucitron.js/blob/bdff0c5dcf435a5654380be38a1bb0736d6b8cd1/tarteaucitron.services.js#L1727
 * See example into https://github.com/AmauriC/tarteaucitron.js/wiki/Custom-service-init-EN
 * google analytics
 */
// eslint-disable-next-line no-undef
tarteaucitron.services.gtagCustom = {
  key: 'gtagCustom',
  type: 'analytic',
  name: 'Google Analytics (gtag.js)',
  uri: 'https://policies.google.com/privacy',
  needConsent: true,
  // eslint-disable-next-line func-names
  cookies: (function () {
    // eslint-disable-next-line no-undef
    let tagUaCookie = `_gat_gtag_${googleIdentifier}`,
      tagGCookie = `_ga_${googleIdentifier}`;

    // eslint-disable-next-line require-unicode-regexp
    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    // eslint-disable-next-line require-unicode-regexp
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return [
      '_ga',
      '_gat',
      '_gid',
      '__utma',
      '__utmb',
      '__utmc',
      '__utmt',
      '__utmz',
      tagUaCookie,
      tagGCookie,
    ];
  })(),
  js() {
    'use strict';
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line no-undef
    tarteaucitron.addScript(
      `https://www.googletagmanager.com/gtag/js?id=${googleIdentifier}`,
      '',
      // eslint-disable-next-line func-names
      function () {
        window.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params,no-undef
          dataLayer.push(arguments);
        };
        // eslint-disable-next-line no-undef
        gtag('js', new Date());
        // eslint-disable-next-line no-undef
        gtag(
          'config',
          googleIdentifier,
          // eslint-disable-next-line camelcase
          { anonymize_ip: true },
          {
            /**
             * https://support.google.com/analytics/answer/7476333?hl=en
             * https:// developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
             */
            linker: {
              domains: ['blog.sogilis.fr', 'sogilis.fr', 'sogilis.com'],
            },
          }
        );
      }
    );
  },
  fallback() {
    // eslint-disable-next-line no-console
    console.error('Google Analytics is not loaded.');
  },
};

/**
 * See https://github.com/AmauriC/tarteaucitron.js/
 */
// eslint-disable-next-line no-undef
tarteaucitron.init({
  /* Privacy policy url */
  privacyUrl: '',

  /* Open the panel with this hashtag */
  hashtag: '#tarteaucitron',
  /* Cookie name */
  cookieName: 'tarteaucitron',

  /* Banner position (top - bottom - middle - popup) */
  orientation: 'bottom',

  /* Group services by category */
  groupServices: false,

  /* Show the small banner on bottom right */
  showAlertSmall: false,
  /* Show the cookie list */
  cookieslist: true,

  /* Show cookie icon to manage cookies */
  showIcon: false,

  /* Optionnal: URL or base64 encoded image */
  // "iconSrc": "",

  /*
   * Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft
   */
  iconPosition: 'BottomRight',

  /* Show a Warning if an adblocker is detected */
  adblocker: true,

  /* Show the deny all button */
  DenyAllCta: true,
  /* Show the accept all button when highPrivacy on */
  AcceptAllCta: true,
  /* HIGHLY RECOMMANDED Disable auto consent */
  highPrivacy: true,

  /* If Do Not Track == 1, disallow all */
  handleBrowserDNTRequest: false,

  /* Remove credit link */
  removeCredit: true,
  /* Show more info link */
  moreInfoLink: true,
  /* If false, the tarteaucitron.css file will be loaded */
  useExternalCss: false,

  /* Shared cookie for subdomain website */
  // "cookieDomain": ".my-multisite-domaine.fr",

  /* Change the default readmore link pointing to tarteaucitron.io */
  readmoreLink: '',

  /* Show a message about mandatory cookies */
  mandatory: true,
});

/**
 * If we use Google Analytics (and not Google Manager) with
 * tarteaucitron.user.analyticsAnonymizeIp` set to true, it is not blocked by
 * uBlock
 */
// eslint-disable-next-line no-undef
(tarteaucitron.job = tarteaucitron.job || []).push('gtagCustom');
