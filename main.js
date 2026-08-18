// =========================================
// 1. FLOATING PILL NAVIGATION LOGIC
// =========================================

const navPill = document.getElementById('navPill');
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeBtn = document.getElementById('closeBtn');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Scroll — add "scrolled" style to nav
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navPill.classList.add('scrolled');
  } else {
    navPill.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const toggleMenu = () => {
  mobileOverlay.classList.toggle('open');
  document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
};

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// Scroll-Spy — highlight active nav link
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));


// =========================================
// 2. JAVASCRIPT-POWERED 3D MOCKUP ANIMATIONS
// =========================================

const heroSection = document.getElementById('hero');
const mock3d = document.getElementById('mock3d');
const mockContainer = document.getElementById('mockContainer');
const floatCard1 = document.getElementById('floatCard1');
const floatCard2 = document.getElementById('floatCard2');

// A. Mouse parallax on hero
if (mockContainer && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 15;
    const rotateX = -y * 10;
    mock3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    const moveX1 = -x * 30;
    const moveY1 = -y * 20;
    floatCard1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;

    const moveX2 = -x * 45;
    const moveY2 = -y * 30;
    floatCard2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    mock3d.style.transform = 'rotateY(-12deg) rotateX(6deg)';
    floatCard1.style.transform = 'translate(0, 0)';
    floatCard2.style.transform = 'translate(0, 0)';
  });
}

// B. Animated chart bars on load
setTimeout(() => {
  document.querySelectorAll('.mock-chart-bar').forEach((bar, index) => {
    setTimeout(() => {
      bar.style.height = bar.getAttribute('data-height');
    }, index * 150);
  });
}, 500);

// C. Document scan progress bar animation
const scanBar = document.getElementById('scanBar');
const scanText = document.getElementById('scanText');

setTimeout(() => {
  scanBar.classList.add('active');
  scanText.textContent = "Scanning T10.pdf...";
}, 1000);

setTimeout(() => {
  scanText.textContent = "Parsed 4 fields";
}, 3000);

// D. Typing animation for AI assistant
const typingText = document.getElementById('typingText');
const message = "Join with Us to experience the future of tax with TaxEase.lk";
let charIndex = 0;

function typeMessage() {
  if (charIndex < message.length) {
    typingText.textContent += message.charAt(charIndex);
    charIndex++;
    setTimeout(typeMessage, 40);
  }
}
setTimeout(typeMessage, 1500);

// E. Animate stat numbers inside mockup
const animateMockStats = () => {
  document.querySelectorAll('.mock-stat').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      current = Math.floor(target * progress);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};
setTimeout(animateMockStats, 500);


// =========================================
// 3. GLOBAL SCROLL & INTERACTIVE ANIMATIONS
// =========================================

// Scroll progress bar (top of page)
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
});

// Reveal elements on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animate main page stat numbers
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimal = parseInt(el.dataset.decimal || '0');
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        let display = decimal > 0 ? val.toFixed(decimal) : Math.floor(val).toLocaleString();
        el.textContent = display + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// Bento card spotlight effect (mouse position CSS variables)
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// How It Works — scroll-driven progress line
const howSection = document.getElementById('how');
const stepProgressLine = document.getElementById('stepProgressLine');

if (howSection && stepProgressLine) {
  const howObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', updateHowLine);
      } else {
        window.removeEventListener('scroll', updateHowLine);
      }
    });
  }, { threshold: 0.2 });
  howObserver.observe(howSection);

  function updateHowLine() {
    const rect = howSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const startPoint = windowHeight * 0.8;
    const endPoint = rect.top + rect.height * 0.5;

    let progress = (startPoint - rect.top) / (startPoint - endPoint);
    progress = Math.max(0, Math.min(1, progress));

    stepProgressLine.style.height = `${progress * 100}%`;
  }
}


// =========================================
// 4. FAQ ACCORDION
// =========================================

document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});


// =========================================
// 5. PRICING MONTHLY / ANNUAL TOGGLE
// =========================================

const monthlyBtn = document.getElementById('monthlyBtn');
const annualBtn = document.getElementById('annualBtn');

function setPricing(isAnnual) {
  // Update all price figures
  document.querySelectorAll('.price').forEach(p => {
    const val = isAnnual ? p.dataset.annual : p.dataset.monthly;
    p.textContent = parseInt(val).toLocaleString();
  });

  // Update toggle button styles
  if (isAnnual) {
    annualBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-900');
    annualBtn.classList.remove('text-gray-500');
    monthlyBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-900');
    monthlyBtn.classList.add('text-gray-500');
  } else {
    monthlyBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-900');
    monthlyBtn.classList.remove('text-gray-500');
    annualBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-900');
    annualBtn.classList.add('text-gray-500');
  }
}

monthlyBtn.addEventListener('click', () => setPricing(false));
annualBtn.addEventListener('click', () => setPricing(true));

// Default to annual pricing on load
setPricing(true);
