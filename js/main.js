import { initMenu } from './menu.js';
import { initLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { initTyping } from './typing.js';
import { initScroll } from './scroll.js';
import { translations } from './translations.js';

function init() {
  initMenu();
  initTheme();
  initScroll();
  initTyping([]); // Inicializa vazio
  initLanguage(); // initLanguage chamará updateLanguage e setTexts com o idioma correto (local ou salvo)
}

init();