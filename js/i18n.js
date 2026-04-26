import { translations } from './translations.js';
import { resetTyping, setTexts } from './typing.js';

let currentLanguage = localStorage.getItem('portfolio-lang') || 'pt';
const langToggle = document.getElementById('language-toggle');

export function updateLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('portfolio-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];

    if (translation) {
      element.innerHTML = translation;
    }

    // Atualiza o link (href) se houver uma chave correspondente com sufixo -link
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