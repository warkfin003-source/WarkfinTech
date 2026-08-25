const currentYear = document.getElementById('currentYear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const navigationLabels = {
    'about.html': 'Company', '#about': 'Company', '#about-me': 'Founder',
    'services.html': 'Solutions', '#services': 'Solutions',
    'portfolio.html': 'Projects', '#portfolio': 'Projects',
    'training.html': 'Academy', '#training': 'Academy',
    'blog.html': 'Insights', '#blog': 'Insights'
};
document.querySelectorAll('.nav-link').forEach(link => {
    const label = navigationLabels[link.getAttribute('href')];
    if (label) link.textContent = label;
});
document.querySelectorAll('.navbar .btn-primary-custom').forEach(button => {
    if (button.textContent.trim() === 'Get Quote') button.textContent = 'Request a Quote';
});

// Initialize Animate On Scroll (AOS)
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
}

// Navigation shadow and back-to-top button
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Counter animation (if any)
const counters = document.querySelectorAll('.counter');
const speed = 200;
const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target + '+';
        }
    });
};
const counterSection = document.querySelector('.counter-section');
let counted = false;
window.addEventListener('scroll', function() {
    if (!counted && counterSection && counterSection.getBoundingClientRect().top < window.innerHeight) {
        animateCounters();
        counted = true;
    }
});

// Highlight active nav link based on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ===== Fast, non-blocking preloader ===== */
(function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Keep the welcome screen brief; it should never delay access to the site.
  const displayDuration = 280;
  const removeDelay = 180;

  const hide = () => {
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, removeDelay);
    }, displayDuration);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hide, { once: true });
  } else {
    hide();
  }
})();

// Global WhatsApp contact shortcut.
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('warkfinWhatsAppFloat')) {
    const wa = document.createElement('a');
    wa.id = 'warkfinWhatsAppFloat';
    wa.className = 'whatsapp-float';
    wa.href = 'https://wa.me/2348166017588';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Chat with Warkfin Tech on WhatsApp');
    wa.title = 'Chat with us on WhatsApp';
    wa.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
    document.body.appendChild(wa);
  }
});
