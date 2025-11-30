import { initLanguageSwitcher } from './language.js';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath ||
        (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html') ||
        (currentPath.endsWith('index.html') && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');

      const whatsappMessage = encodeURIComponent(
        `Hello, I'm ${name}.\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
      );

      window.open(`https://wa.me/4915157377377?text=${whatsappMessage}`, '_blank');

      contactForm.reset();
      alert('Redirecting to WhatsApp...');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
