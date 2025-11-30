import translations from './translations.js';

let currentLanguage = localStorage.getItem('language') || 'de';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);

  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  updateContent();
  updateActiveLanguageButton();
}

function updateContent() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getNestedTranslation(key);

    if (translation) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  const titleElement = document.querySelector('title[data-i18n]');
  if (titleElement) {
    const key = titleElement.getAttribute('data-i18n');
    const translation = getNestedTranslation(key);
    if (translation) {
      titleElement.textContent = translation;
    }
  }

  const metaDescription = document.querySelector('meta[name="description"][data-i18n]');
  if (metaDescription) {
    const key = metaDescription.getAttribute('data-i18n');
    const translation = getNestedTranslation(key);
    if (translation) {
      metaDescription.setAttribute('content', translation);
    }
  }
}

function getNestedTranslation(key) {
  const keys = key.split('.');
  let value = translations[currentLanguage];

  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      return null;
    }
  }

  return value;
}

function updateActiveLanguageButton() {
  const buttons = document.querySelectorAll('.language-switcher button');
  buttons.forEach(button => {
    const lang = button.getAttribute('data-lang');
    if (lang === currentLanguage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('.language-switcher button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  setLanguage(currentLanguage);
}

function getCurrentLanguage() {
  return currentLanguage;
}

export { initLanguageSwitcher, setLanguage, getCurrentLanguage };
