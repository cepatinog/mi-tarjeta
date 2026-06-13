// Mobile nav toggle (hamburger)
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

function closeMenu() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close the menu after choosing a destination
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close the menu with Escape or a click outside it
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) closeMenu();
  });
  document.addEventListener('click', (event) => {
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

// Theme toggle (light/dark) with persistence.
// The initial theme is set by an inline script in <head> to avoid a flash.
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
}

// Scrollspy: highlight the nav link of the section currently in view
const anchorLinks = navMenu ? navMenu.querySelectorAll('a[href^="#"]') : [];
const linkById = {};
anchorLinks.forEach((link) => {
  linkById[link.getAttribute('href').slice(1)] = link;
});

if (anchorLinks.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anchorLinks.forEach((l) => l.classList.remove('active'));
        const link = linkById[entry.target.id];
        if (link) link.classList.add('active');
      });
    },
    // Narrow band around the upper third of the viewport so only one
    // section counts as "active" at a time.
    { rootMargin: '-40% 0px -55% 0px' }
  );

  document.querySelectorAll('section[id]').forEach((section) => spy.observe(section));
}
