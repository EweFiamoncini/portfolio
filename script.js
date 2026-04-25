/* script.js - Manages menu behavior, language switching, dark mode, and typing animation. */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
let menuTimeout;

/* Closes the menu, resets the icon, and clears the timer. */
function closeMenu() {
  navLinks?.classList.remove('show');
  menuToggle?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  clearTimeout(menuTimeout);
}

// Toggle Menu
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('show');
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  menuToggle?.classList.toggle('open', !!isOpen);

  clearTimeout(menuTimeout);
  if (isOpen) {
    // Automatically closes the menu after 5 seconds of inactivity
    menuTimeout = setTimeout(closeMenu, 5000);
  }
});

// Close Menu
navLinks?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
    closeMenu();
  }
});

// Internationalization (i18n)
const translations = {
  pt: {
    'nav-home': 'Home',
    'nav-about': 'Sobre',
    'nav-skills': 'Habilidades',
    'nav-projects': 'Projetos',
    'hero-greeting':
      'Olá, meu nome é <br /><span class="name">Ewerton</span><span class="surname"> Fiamoncini Anssini</span>',
    'btn-resume': 'Currículo',
    'about-title': 'Sobre Mim',
    'about-text':
      'Me chamo Ewerton Fiamoncini Anssini, tenho 26 anos de idade. <br /> Atualmente estou cursando Engenharia de Software, foco meus estudos na criação de interfaces modernas e funcionais. <br />No momento, estou expandindo meus estudos do Front-end para o Back-end através do <strong>Java</strong>.',
    'skills-title': 'Minhas Techs',
    'projects-title': 'Projetos Recentes',
    'project-1-title': 'Landpage de PetShop',
    'project-1-desc':
      'O <strong>PetShop Conectado</strong> é uma aplicação web desenvolvida para modernizar a interação entre pet shops e seus clientes. O projeto oferece uma interface intuitiva e responsiva, facilitando a visualização de serviços e o contato com tutores de pets.',
    'project-2-title': 'Controle Financeiro Pessoal',
    'project-2-desc':
      'Muitas pessoas perdem o controle de suas finanças por utilizarem métodos arcaicos ou planilhas confusas. O <strong>Finanças P. Pro</strong> centraliza o fluxo de caixa, permitindo que o usuário identifique rapidamente "ralos financeiros" e planeje suas economias com base em dados reais.',
    'view-repo': 'Ver Repositório',
    'view-online': 'Ver Online',
    'footer-text':
      '&copy;2026 - Desenvolvido por <strong>Ewerton Fiamoncini Anssini</strong>',
    'typing-texts': [
      'Engenheiro de Software | Apaixonado por café e código.',
      'Seja bem vindo(a) ao meu portfólio, é um prazer ter você aqui!',
    ],
  },
  en: {
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-skills': 'Skills',
    'nav-projects': 'Projects',
    'hero-greeting':
      'Hi, my name is <br /><span class="name">Ewerton</span><span class="surname"> Fiamoncini Anssini</span>',
    'btn-resume': 'Resume',
    'about-title': 'About Me',
    'about-text':
      'My name is Ewerton Fiamoncini Anssini, I am 26 years old. <br /> Currently studying Software Engineering, I focus my studies on creating modern and functional interfaces. <br />Right now, I am expanding my horizons from Front-end to Back-end through <strong>Java</strong>.',
    'skills-title': 'My Techs',
    'projects-title': 'Recent Projects',
    'project-1-title': 'PetShop Landing Page',
    'project-1-desc':
      '<strong>PetShop Connected</strong> is a web application developed to modernize the interaction between pet shops and their customers. The project offers an intuitive and responsive interface, making it easier to view services and contact pet owners.',
    'project-2-title': 'Personal Financial Control',
    'project-2-desc':
      'Many people lose control of their finances by using archaic methods or confusing spreadsheets. <strong>Finanças P. Pro</strong> centralizes cash flow, allowing users to quickly identify "financial drains" and plan savings based on real data.',
    'view-repo': 'View Repository',
    'view-online': 'View Online',
    'footer-text':
      '&copy;2026 - Developed by <strong>Ewerton Fiamoncini Anssini</strong>',
    'typing-texts': [
      'Software Engineer | Passionate about coffee and code.',
      "Welcome to my portfolio, it's a pleasure to have you here!",
    ],
  },
};

// Internationalization (i18n)
let currentLanguage = 'pt';
const langToggle = document.getElementById('language-toggle');

// Update language
function updateLanguage(lang) {
  currentLanguage = lang;

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Update toggle button text
  if (langToggle) langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';

  // Reset and update typing animation
  texts = translations[lang]['typing-texts'];
  resetTyping();
}

// Initialize language on page load
langToggle?.addEventListener('click', () => {
  const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
  updateLanguage(newLang);
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const theme = localStorage.getItem('theme');

// Applies the theme saved in localStorage
if (theme === 'light') {
  document.body.classList.add('light-mode');
  if (darkModeToggle) darkModeToggle.textContent = '☀️';
}

/* Toggles between light and dark modes, saving the preference in localStorage. */
darkModeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  if (darkModeToggle) darkModeToggle.textContent = isLight ? '🌑' : '☀️';
});

// Typing animation
let texts = translations[currentLanguage]['typing-texts'];

let currentTextIndex = 0;
let currentCharIndex = texts[0].length;
const typingText = document.getElementById('typing-text');
let typingTimeout;

// Start typing
function typeWriter() {
  clearTimeout(typingTimeout);
  if (currentCharIndex < texts[currentTextIndex].length) {
    typingText.textContent += texts[currentTextIndex].charAt(currentCharIndex);
    currentCharIndex++;
    typingTimeout = setTimeout(typeWriter, 100);
  } else {
    typingTimeout = setTimeout(deleteText, 2000);
  }
}

// Delete text
function deleteText() {
  clearTimeout(typingTimeout);
  if (currentCharIndex > 0) {
    typingText.textContent = texts[currentTextIndex].substring(
      0,
      currentCharIndex - 1,
    );
    currentCharIndex--;
    typingTimeout = setTimeout(deleteText, 50);
  } else {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    typingTimeout = setTimeout(typeWriter, 500);
  }
}

// Reset typing
function resetTyping() {
  clearTimeout(typingTimeout);
  currentTextIndex = 0;
  currentCharIndex = texts[0].length;
  if (typingText) {
    typingText.textContent = texts[0];
    typingTimeout = setTimeout(deleteText, 2000);
  }
}

// Start initial animation
typingTimeout = setTimeout(deleteText, 2000);

// Scroll progress bar
window.onscroll = function () {
  updateScrollProgress();
};

// Updates the scroll progress bar
function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  document.getElementById('scrollBar').style.width = scrolled + '%';
}
