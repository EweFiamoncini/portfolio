const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
let menuTimeout;

export function closeMenu() {
  navLinks?.classList.remove('show');
  menuToggle?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  clearTimeout(menuTimeout);
}

export function initMenu() {
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('show');
    menuToggle?.setAttribute('aria-expanded', String(isOpen));
    menuToggle?.classList.toggle('open', !!isOpen);

    clearTimeout(menuTimeout);
    if (isOpen) {
      menuTimeout = setTimeout(closeMenu, 5000);
    }
  });

  navLinks?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
      closeMenu();
    }
  });
}