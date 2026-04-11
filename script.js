const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.classList.toggle('open', isOpen);
});

// Fecha o menu quando clica em um item (útil em telas pequenas)
navLinks?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Typing animation
const texts = [
    "Engenheiro de Software | Apaixonado por café e código.",
    "Seja bem vindo(a) ao meu portfólio, é um prazer ter você aqui!"
];

let currentTextIndex = 0;
let currentCharIndex = texts[0].length; // Start with full first text
const typingText = document.getElementById('typing-text');

function typeWriter() {
    if (currentCharIndex < texts[currentTextIndex].length) {
        typingText.textContent += texts[currentTextIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeWriter, 100);
    } else {
        // Finished typing, wait then delete
        setTimeout(deleteText, 2000);
    }
}

function deleteText() {
    if (currentCharIndex > 0) {
        typingText.textContent = texts[currentTextIndex].substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(deleteText, 50);
    } else {
        // Finished deleting, switch to next text
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeWriter, 500);
    }
}

// Start the animation by deleting the first text after 2 seconds
setTimeout(deleteText, 2000);

// Scroll progress bar
window.onscroll = function () {
  updateScrollProgress();
};

function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  document.getElementById('scrollBar').style.width = scrolled + '%';
}
