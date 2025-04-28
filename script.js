/// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Countdown Timer
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const targetDate = new Date("April 5, 2027 09:00:00").getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
      countdownEl.textContent = "The conference has started!";
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Cookie Consent
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptBtn = document.getElementById('cookie-accept');

if (cookieBanner) {
  if (localStorage.getItem('umhc_cookies_accepted') === 'true') {
    cookieBanner.style.display = 'none';
  }
  
  cookieAcceptBtn.addEventListener('click', () => {
    cookieBanner.style.display = 'none';
    localStorage.setItem('umhc_cookies_accepted', 'true');
  });
}

// Scroll Animations
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
