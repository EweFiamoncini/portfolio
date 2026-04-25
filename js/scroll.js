export function initScroll() {
  window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;

  document.getElementById('scrollBar').style.width = scrolled + '%';
}