/* ========== ТЁМНАЯ ТЕМА (Задание 1) ========== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
const html = document.documentElement;

// Автоопределение темы системы
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

setTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ========== БУРГЕР-МЕНЮ (Задание 2) ========== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function openMenu() {
  burger.classList.add('is-open');
  burger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
}
function closeMenu() {
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

burger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ========== АНИМАЦИИ ПРИ СКРОЛЛЕ (Задание 3) ========== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========== ПРОГРЕСС-БАР ========== */
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ========== ПАРАЛЛАКС ДЛЯ HERO ========== */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const offset = window.scrollY;
  if (offset < 600) {
    hero.style.backgroundPosition = `center ${offset * 0.3}px`;
  }
});