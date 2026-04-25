const darkModeToggle = document.getElementById('dark-mode-toggle');

export function initTheme() {
  const theme = localStorage.getItem('theme');

  if (theme === 'light') {
    document.body.classList.add('light-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  darkModeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    if (darkModeToggle) darkModeToggle.textContent = isLight ? '🌑' : '☀️';
  });
}