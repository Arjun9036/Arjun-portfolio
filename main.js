/* ================================================================
   main.js — Portfolio interactivity
   ================================================================ */

// ---- Scroll-triggered animations ----
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children inside grids
        const parent = entry.target;
        const siblings = Array.from(
          parent.parentElement?.querySelectorAll('[data-animate]') || [parent]
        );
        const index = siblings.indexOf(parent);
        setTimeout(() => {
          parent.classList.add('in-view');
        }, index * 80);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate]').forEach((el) => {
  animateObserver.observe(el);
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id], footer');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.color = 'var(--text-primary)';
            link.style.background = 'rgba(255,255,255,0.06)';
          } else {
            link.style.color = '';
            link.style.background = '';
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('section[id]').forEach((section) => {
  sectionObserver.observe(section);
});

// ---- Nav scroll glass effect ----
const navInner = document.querySelector('.nav-inner');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navInner.style.background = 'rgba(10, 12, 18, 0.95)';
    navInner.style.borderColor = 'rgba(255,255,255,0.12)';
  } else {
    navInner.style.background = 'rgba(13, 15, 20, 0.85)';
    navInner.style.borderColor = 'rgba(255,255,255,0.1)';
  }
}, { passive: true });

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- System profile typing animation ----
function typewriterEffect() {
  const lines = document.querySelectorAll('.profile-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      line.style.opacity = '1';
    }, 600 + i * 300);
  });
}

// Trigger on page load after a brief delay
window.addEventListener('load', () => {
  setTimeout(typewriterEffect, 300);
});
