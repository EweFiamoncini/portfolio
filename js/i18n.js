import { translations } from './translations.js';
import { resetTyping, setTexts } from './typing.js';

const getSettings = () => JSON.parse(localStorage.getItem('portfolio-settings') || '{}');
export let currentLanguage = getSettings().lang || 'pt';
const langToggle = document.getElementById('language-toggle');

export function updateLanguage(lang) {
  currentLanguage = lang;

  const settings = getSettings();
  settings.lang = lang;
  localStorage.setItem('portfolio-settings', JSON.stringify(settings));

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];

    if (translation) {
      element.innerHTML = translation;
    }

    const linkKey = `${key}-link`;
    if (translations[lang][linkKey] && element.tagName === 'A') {
      element.href = translations[lang][linkKey];
    }
  });

  if (langToggle) langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';

  setTexts(translations[lang]['typing-texts']);
  resetTyping();
}

export function initLanguage() {
  langToggle?.addEventListener('click', () => {
    const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
    updateLanguage(newLang);
  });

  updateLanguage(currentLanguage);
}