// Mobile menu toggle and smooth interaction
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  // Close mobile nav on selection for better UX
  mainNav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && window.innerWidth < 760) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll polyfill fallback for browsers that don't support CSS smooth scrolling.
// If a browser supports CSS "scroll-behavior", this is harmless redundancy.
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', link.getAttribute('href'));
    }
  });
});

// Simple front-end form validation logic
const form = document.getElementById('contact-form');
const formError = document.getElementById('form-error');
const formSuccess = document.getElementById('form-success');

if (form && formError && formSuccess) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.textContent = '';
    formSuccess.textContent = '';

    const name = form.elements['name'].value.trim();
    const business = form.elements['business'].value.trim();
    const phone = form.elements['phone'].value.trim();

    if (!name || !business || !phone) {
      formError.textContent = 'Please fill in all required fields.';
      return;
    }

    if (phone.length < 6) {
      formError.textContent = 'Provide a valid contact phone or email address.';
      return;
    }

    const toEmail = 'tylawebsolutions@gmail.com'; // Your email address
    const messageInput = form.elements['message'].value.trim();

    const subject = encodeURIComponent('Quote request from Tyla Web Solutions website');
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness: ${business}\nPhone/Email: ${phone}\nMessage:\n${messageInput}`
    );

    const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    formSuccess.textContent = 'Your email client should open; send to complete request.';
    formError.textContent = '';
    form.reset();
  });
}

// Animate sections on scroll using Intersection Observer
const animatedSections = document.querySelectorAll('[data-animate]');
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

if (animatedSections.length > 0) {
  animatedSections.forEach((section) => animationObserver.observe(section));
}

// Footer year auto-update
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}