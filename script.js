// script.js

// Mobile menu toggle + a11y
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});
// Close menu on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('umhc_theme') || 'light';
root.setAttribute('data-theme', savedTheme);
darkToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
darkToggle.addEventListener('click', () => {
  const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('umhc_theme', newTheme);
  darkToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Countdown Timer
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const targetDate = new Date("April 5, 2027 09:00:00").getTime();
  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff < 0) {
      countdownEl.textContent = "The conference has started!";
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs = Math.floor((diff % (1000*60)) / 1000);
    countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Animate on scroll
const animatedElems = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
animatedElems.forEach(elem => observer.observe(elem));

// Scroll-to-top
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 300);
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Cookie consent
const banner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('cookie-accept');
const declineBtn = document.getElementById('cookie-decline');
if (localStorage.getItem('umhc_cookies') === 'accepted') {
  banner.classList.add('hidden');
} else if (localStorage.getItem('umhc_cookies') === 'declined') {
  banner.classList.add('hidden');
}
acceptBtn.addEventListener('click', () => {
  localStorage.setItem('umhc_cookies', 'accepted');
  banner.classList.add('hidden');
});
declineBtn.addEventListener('click', () => {
  localStorage.setItem('umhc_cookies', 'declined');
  banner.classList.add('hidden');
});
