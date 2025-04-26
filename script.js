// Toggle mobile menu open/close
const menuToggle = document.getElementById('menu-toggle');
const navMenu   = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', function() {
  // Toggle the 'open' class on the nav menu to show/hide it
  if (navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
  } else {
    navMenu.classList.add('open');
  }
});

// Hide mobile menu when a nav link is clicked (optional enhancement)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      navMenu.classList.remove('open');
    }
  });
});

// Cookie banner functionality
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptBtn = document.getElementById('cookie-accept');

cookieAcceptBtn.addEventListener('click', () => {
  // Hide the cookie banner when Accept is clicked
  cookieBanner.style.display = 'none';
  // (Optional: set a flag in localStorage to remember consent)
  // localStorage.setItem('umhc_cookies_accepted', 'true');
});

// Optional: Check localStorage on load to see if consent given
// if (localStorage.getItem('umhc_cookies_accepted') === 'true') {
//   cookieBanner.style.display = 'none';
// }
