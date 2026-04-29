const darkModeToggle = document.getElementById('dark-mode-toggle');

export function initTheme() {
  const getSettings = () => JSON.parse(localStorage.getItem('portfolio-settings') || '{}');
  const theme = getSettings().theme;

  if (theme === 'light') {
    document.body.classList.add('light-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  darkModeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    
    const settings = getSettings();
    settings.theme = isLight ? 'light' : 'dark';
    localStorage.setItem('portfolio-settings', JSON.stringify(settings));

    if (darkModeToggle) darkModeToggle.textContent = isLight ? '🌑' : '☀️';
  });
}