document.addEventListener('DOMContentLoaded', () => {

  // ===== Theme Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    }
  });

  // ===== Navbar Scroll =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== Mobile Nav Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // ===== Active Nav Highlight =====
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observerNav.observe(section));

  // ===== Typing Effect =====
  const titles = [
    'Senior .NET Developer',
    'Azure Cloud Engineer',
    'Angular Developer',
    'Camunda Workflow Engineer',
    'Microservices Architect',
    'Clean Architecture Advocate'
  ];

  const typingEl = document.getElementById('typingText');
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const current = titles[titleIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      function updateCounter() {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      }

      updateCounter();
    });
  }

  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  // ===== Skill Bars Animation =====
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-width') + '%';
          }, i * 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

  // ===== Scroll Animations (lightweight AOS alternative) =====
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  aosElements.forEach(el => aosObserver.observe(el));

  // ===== Particles =====
  const particlesContainer = document.getElementById('particles');

  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  // ===== Contact Form (submit button feedback) =====
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
  });

  // ===== Smooth Scroll for Safari =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
