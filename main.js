// =========================================
// 0. PRELOADER
// =========================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 500);
  }
});

// =========================================
// 1. FLOATING PILL NAVIGATION LOGIC
// =========================================
const navPill = document.getElementById('navPill');
const menuBtn = document.getElementById('menuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeBtn = document.getElementById('closeBtn');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navPill.classList.add('scrolled');
  } else {
    navPill.classList.remove('scrolled');
  }
});

const toggleMenu = () => {
  mobileOverlay.classList.toggle('open');
  document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
};

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

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

if (mockContainer && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 20; // Increased intensity
    const rotateX = -y * 15;
    mock3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    const moveX1 = -x * 40;
    const moveY1 = -y * 30;
    floatCard1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;

    const moveX2 = -x * 60;
    const moveY2 = -y * 45;
    floatCard2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    mock3d.style.transform = 'rotateY(-12deg) rotateX(6deg)';
    floatCard1.style.transform = 'translate(0, 0)';
    floatCard2.style.transform = 'translate(0, 0)';
  });
}

// =========================================
// 3. GLOBAL SCROLL & INTERACTIVE ANIMATIONS
// =========================================
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

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

    let progressVal = (startPoint - rect.top) / (startPoint - endPoint);
    progressVal = Math.max(0, Math.min(1, progressVal));

    stepProgressLine.style.height = `${progressVal * 100}%`;
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
// 5. PRICING TOGGLE
// =========================================
const userBtn = document.getElementById('userBtn');
const auditorBtn = document.getElementById('auditorBtn');
const userPlans = document.getElementById('userPlans');
const auditorPlans = document.getElementById('auditorPlans');

if (userBtn && auditorBtn) {
  userBtn.addEventListener('click', () => {
    userPlans.classList.remove('hidden');
    auditorPlans.classList.add('hidden');
    userBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-900');
    userBtn.classList.remove('text-gray-500');
    auditorBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-900');
    auditorBtn.classList.add('text-gray-500');
  });

  auditorBtn.addEventListener('click', () => {
    auditorPlans.classList.remove('hidden');
    userPlans.classList.add('hidden');
    auditorBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-900');
    auditorBtn.classList.remove('text-gray-500');
    userBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-900');
    userBtn.classList.add('text-gray-500');
  });
}

// =========================================
// 6. AJAX CONTACT FORM SUBMISSION
// =========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    })
    .then(response => {
      if (response.ok) {
        formStatus.textContent = "Thank you! Your request has been sent to our team.";
        formStatus.classList.remove('hidden', 'text-red-500');
        formStatus.classList.add('text-green-600');
        contactForm.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      formStatus.textContent = "Oops! Something went wrong. Please email us directly.";
      formStatus.classList.remove('hidden', 'text-green-600');
      formStatus.classList.add('text-red-500');
    })
    .finally(() => {
      submitBtn.innerHTML = '<span>Send Request</span> <i class="fa-solid fa-paper-plane text-xs"></i>';
      submitBtn.disabled = false;
    });
  });
}

// =========================================
// 7. TRILINGUAL LANGUAGE SYSTEM (i18n)
// =========================================
const translations = {
  en: {
    nav_features: "Features", nav_how: "How it Works", nav_pricing: "Pricing", nav_contact: "Contact", nav_cta: "Get Started",
    hero_badge: "Corporate Tax Document Platform",
    hero_title_1: "Collect clearly.", hero_title_2: "Review confidently.", hero_title_3: "Move forward.",
    hero_sub: "A trusted workspace for Sri Lankan Pvt Ltd companies to collect, organize, and hand off corporate tax documents to auditors without the email chaos.",
    hero_cta_1: "Start Free Trial", hero_cta_2: "How it Works",
    stat_1: "For Business & Auditor", stat_2: "Audit Trail Tracked", stat_3: "Sinhala, Tamil, English", stat_4: "MVP Delivery Horizon",
    features_eyebrow: "Core Modules", features_title: "Everything for a controlled handoff.", features_sub: "V1 is focused purely on document workflow and auditor collaboration—no tax engine, just clarity.",
    feat_1_title: "Financial Year Workspace", feat_1_desc: "One controlled place for a company, financial year, document checklist, review status, and history. Replaces scattered email threads and shared folders.",
    feat_2_title: "Completeness Gate", feat_2_desc: "A pre-submission view that highlights missing, unreadable, duplicate, or incomplete items before the package is sent to the auditor.",
    feat_3_title: "Auditor Review Queue", feat_3_desc: "Auditors get a clean view of assigned companies, pending packages, open requests, and review progress. No more chasing files via email.",
    feat_4_title: "Requests & Responses", feat_4_desc: "Auditor creates a request linked to a specific document. Business responds with a file or comment. Auditor re-reviews and accepts. Every step is tracked.",
    feat_4_stat_1: "Workflow Steps", feat_4_stat_2: "Tracked History",
    feat_5_title: "Audit History", feat_5_desc: "Immutable event trail for uploads, replacements, submissions, requests, responses, and acceptance. One shared source of truth.",
    how_eyebrow: "Exact Workflow", how_title: "A controlled handoff from business to auditor.", how_sub: "Every document and every request has a status, an owner, and a history.",
    step_1_title: "Upload & Organize", step_1_desc: "Business uploads required documents and organizes them by category within the workspace.",
    step_2_title: "Checklist & Completeness", step_2_desc: "Business uses the checklist to identify missing or incomplete items before sending.",
    step_3_title: "Send Package", step_3_desc: "Business sends the package to the assigned auditor when ready for review.",
    step_4_title: "Auditor Reviews", step_4_desc: "Auditor reviews submitted files, adds comments, and checks checklist items.",
    step_5_title: "Request & Respond", step_5_desc: "Auditor requests missing/corrected docs. Business uploads response and replies.",
    step_6_title: "Re-review & Accept", step_6_desc: "Auditor re-reviews the response and accepts the package when complete.",
    price_eyebrow: "Pricing Model", price_title: "Aligned to value and ownership.", price_sub: "Two subscriptions because the business and the auditor receive different value.",
    price_toggle_1: "Business", price_toggle_2: "Auditor",
    price_business_badge: "FOR COMPANIES", price_business_name: "TaxEase Business",
    price_business_desc: "For Sri Lankan Pvt Ltd companies to prepare and control document packages.",
    price_business_f1: "Company workspace & document library", price_business_f2: "Required document checklist",
    price_business_f3: "Completeness gate & submission", price_business_f4: "Requests, responses & history",
    price_auditor_badge: "FOR FIRMS", price_auditor_name: "TaxEase Auditor",
    price_auditor_desc: "For auditors, accounting firms, and tax professionals managing review work.",
    price_auditor_f1: "Client workspace access", price_auditor_f2: "Review queue & document review",
    price_auditor_f3: "Requests, re-review & acceptance", price_auditor_f4: "Team access & audit history",
    price_cta: "Get Started",
    faq_eyebrow: "FAQ", faq_title: "Boundaries, answered.",
    faq_q1: "Does V1 calculate my corporate tax?", faq_a1: "No. V1 is deliberately not a tax engine. It focuses on collecting, organizing, and reviewing the documents required for tax work. Tax calculation is on the V2 roadmap.",
    faq_q2: "Can I submit returns to the IRD through TaxEaseLK?", faq_a2: "No, return generation and e-filing are explicitly out of scope for V1. The platform stops at auditor acceptance of the document package.",
    faq_q3: "How does the auditor collaboration work?", faq_a3: "You submit a complete package, the auditor reviews it, requests missing or corrected docs if needed via the request-response loop, and accepts the package when complete. Everything is tracked in history.",
    faq_q4: "Are other tax types supported?", faq_a4: "No. V1 handles only the corporate tax document workflow for Pvt Ltd companies. VAT, PAYE, and other taxes are not supported in this version.",
    contact_eyebrow: "Contact Us", contact_title: "Ready to organize your tax workflow?", contact_sub: "Fill out the form, and our team will reach out to set up your workspace and get your auditor connected.",
    contact_location: "Colombo, Sri Lanka",
    form_name: "Name", form_email: "Email", form_phone: "Phone Number", form_business: "Business Name (Optional)", form_submit: "Send Request",
    footer_tagline: "Corporate Tax Document & Auditor Collaboration Platform.",
    footer_product: "Product", footer_resources: "Resources", footer_company: "Company",
    footer_docs: "Documentation", footer_help: "Help Center", footer_terms: "Terms of Service", footer_support: "Contact Support",
    mock_overview: "Overview", mock_documents: "Documents", mock_checklist: "Checklist", mock_auditor: "Auditor Review", mock_discussion: "Discussion",
    mock_alert_title: "FY 2025/26", mock_alert_body: "Workspace Active",
    mock_workspace: "FY 2025/26 Workspace", mock_status: "In Review", mock_completeness: "Completeness", mock_documents_cap: "Documents", mock_requests: "Open Requests",
    mock_required_docs: "REQUIRED DOCUMENT CHECKLIST", mock_doc_1: "Bank Statements", mock_doc_2: "General Ledger Export", mock_doc_3: "Payroll Summary",
    mock_received: "Received", mock_missing: "Missing", mock_correction: "Needs Correction",
    float_card_1_title: "Package Accepted", float_card_1_sub: "Auditor approved FY25/26",
    float_card_2_title: "New Request", float_card_2_sub: "Please upload GL Export"
  },
  si: {
    nav_features: "විශේෂාංග", nav_how: "ක්‍රියාත්මක වන ආකාරය", nav_pricing: "මිල ගණන්", nav_contact: "සම්බන්ධ වන්න", nav_cta: "ආරම්භ කරන්න",
    hero_badge: "සංස්ථාපිත බදු ලේඛන වේදිකාව",
    hero_title_1: "පැහැදිලිව රැස් කරන්න.", hero_title_2: "විශ්වාසයෙන් සමාලෝචනය කරන්න.", hero_title_3: "ඉදිරියට යන්න.",
    hero_sub: "ශ්‍රී ලාංකේය පෞද්ගලික සමාගම් සඳහා ඊමේල් අවුල් නොමැතිව බදු ලේඛන රැස් කිරීමට සහ විධිමත් කිරීමට විශ්වාසදායක ස්ථානයකි.",
    hero_cta_1: "නොමිලේ අත්හදා බලන්න", hero_cta_2: "ක්‍රියාත්මක වන ආකාරය",
    stat_1: "ව්‍යාපාර සහ විගණකයන් සඳහා", stat_2: "සියලු ලොග සටහන්", stat_3: "සිංහල, දෙමළ, ඉංග්‍රීසි", stat_4: "MVP සපයන කාලය",
    features_eyebrow: "මූලික මොඩියුල", features_title: "පාලිත භාරදීමක් සඳහා සියල්ල.", features_sub: "V1 යනු ලේඛන ක්‍රියාවලිය සහ විගණක සහයෝගිතාව පමණි.",
    feat_1_title: "මූල්‍ය වර්ෂ වැඩබිම", feat_1_desc: "සමාගමක්, මූල්‍ය වර්ෂයක්, ලේඛන පරීක්ෂාව සහ ඉතිහාසය සඳහා එක් පාලිත ස්ථානයකි.",
    feat_2_title: "සම්පූර්ණත්ව ද්වාරය", feat_2_desc: "පැකේජය විගණකයා වෙත යැවීමට පෙර අස්ථානගත නොමැකි අයිතම හයිලයිට් කරයි.",
    feat_3_title: "විගණක සමාලෝචන පෝලිම", feat_3_desc: "විගණකයන්ට සිය සේවාදායකයන් පිළිබඳ පිරිසිදු දැක්මක් ලැබේ.",
    feat_4_title: "ඉල්ලීම් සහ ප්‍රතිචාර", feat_4_desc: "විගණකයෙක් ඉල්ලීමක් සාදයි. ව්‍යාපාරය ප්‍රතිචාර දක්වයි. සියල්ල සටහන් වේ.",
    feat_4_stat_1: "පියවර", feat_4_stat_2: "සටහන්",
    feat_5_title: "විගණන ඉතිහාසය", feat_5_desc: "අතිශය පැහැදිලි සිදුවීම් මාලාවකි. එක් සත්‍ය මූලාශ්‍රයකි.",
    how_eyebrow: "නිශ්චිත ක්‍රියාවලිය", how_title: "ව්‍යාපාරයේ සිට විගණකයා දක්වා පාලිත භාරදීමකි.", how_sub: "සෑම ලේඛනයකටම තත්ත්වයක්, හිමිකරුවෙක් සහ ඉතිහාසයක් ඇත.",
    step_1_title: "උඩුගත කර සංවිධානය කරන්න", step_1_desc: "ව්‍යාපාරය අවශ්‍ය ලේඛන උඩුගත කර ප්‍රවර්ග අනුව සංවිධානය කරයි.",
    step_2_title: "ලේඛන පරීක්ෂාව", step_2_desc: "අස්ථානගත අයිතම හඳුනා ගැනීමට ලේඛන පරීක්ෂාව භාවිතා කරයි.",
    step_3_title: "පැකේජය යවන්න", step_3_desc: "ව්‍යාපාරය සමාලෝචනයට සූදානම් වූ විට පැකේජය විගණකයා වෙත යවයි.",
    step_4_title: "විගණක සමාලෝචනය", step_4_desc: "විගණකයා ලේඛන සමාලෝචනය කර අදහස් එකතු කරයි.",
    step_5_title: "ඉල්ලීම සහ ප්‍රතිචාරය", step_5_desc: "විගණකයා අස්ථානගත ලේඛන ඉල්ලයි. ව්‍යාපාරය ප්‍රතිචාර දක්වයි.",
    step_6_title: "නැවත සමාලෝචනය සහ පිළිගැනීම", step_6_desc: "විගණකයා ප්‍රතිචාරය නැවත සමාලෝචනය කර පැකේජය පිළිගනී.",
    price_eyebrow: "මිල ගණන් ආකෘතිය", price_title: "වටිනාකමට ගැළපේ.", price_sub: "ව්‍යාපාරයට සහ විගණකයාට වෙනස් වටිනාකම් ලැබේ.",
    price_toggle_1: "ව්‍යාපාර", price_toggle_2: "විගණක",
    price_business_badge: "සමාගම් සඳහා", price_business_name: "TaxEase Business",
    price_business_desc: "ලේඛන පැකේජ සැකසීමට ශ්‍රී ලාංකේය පෞද්ගලික සමාගම් සඳහා.",
    price_business_f1: "සමාගම් වැඩබිම", price_business_f2: "ලේඛන පරීක්ෂාව", price_business_f3: "සම්පූර්ණත්වය", price_business_f4: "ඉල්ලීම් සහ ඉතිහාසය",
    price_auditor_badge: "සමාගම් සඳහා", price_auditor_name: "TaxEase Auditor",
    price_auditor_desc: "සමාලෝචන කටයුතු කළමනාකරණය කරන විගණකයන් සඳහා.",
    price_auditor_f1: "සේවාදායක ප්‍රවේශය", price_auditor_f2: "සමාලෝචන පෝලිම", price_auditor_f3: "ඉල්ලීම් සහ පිළිගැනීම", price_auditor_f4: "කණ්ඩායම් ප්‍රවේශය",
    price_cta: "ආරම්භ කරන්න",
    faq_eyebrow: "නිතර අසන පැන", faq_title: "සීමාවන් පැහැදිලිය.",
    faq_q1: "V1 මගින් බදු ගණනය කරයිද?", faq_a1: "නැත. V1 යනු බදු ගණනය කිරීමේ යන්ත්‍රයක් නොවේ. එය ලේඛන රැස් කිරීම සහ සමාලෝචනය කිරීම කෙරෙහි පමණක් අවධානය යොමු කරයි.",
    faq_q2: "IRD වෙත ආපසු යැවිය හැකිද?", faq_a2: "නැත, ආපසු යැවීම V1 හි වියාකල්‍ය නොවේ.",
    faq_q3: "විගණක සහයෝගිතාව ක්‍රියාත්මක වන්නේ කෙසේද?", faq_a3: "ඔබ සම්පූර්ණ පැකේජයක් යවන්නේය, විගණකයා එය සමාලෝචනය කරයි, අවශ්‍ය නම් ලේඛන ඉල්ලයි.",
    faq_q4: "වෙනත් බදු වර්ග සඳහා සහාය ඇතිද?", faq_a4: "නැත. V1 මගින් පෞද්ගලික සමාගම් සඳහා පුද්ගලික බදු ලේඛන ක්‍රියාවලිය පමණක් හසුරුවයි.",
    contact_eyebrow: "අප අමතන්න", contact_title: "ඔබේ බදු ක්‍රියාවලිය සංවිධානය කිරීමට සූදානම්ද?", contact_sub: "පෝරමය පුරවන්න, අපගේ කණ්ඩායම ඔබේ වැඩබිම සැකසීමට සම්බන්ධ වනු ඇත.",
    contact_location: "කොළඹ, ශ්‍රී ලංකාව",
    form_name: "නම", form_email: "ඊමේල්", form_phone: "දුරකථන අංකය", form_business: "ව්‍යාපාරයේ නම (අත්‍යවශ්‍ය නොවේ)", form_submit: "ඉල්ලීම යවන්න",
    footer_tagline: "සංස්ථාපිත බදු ලේඛන සහ විගණක සහයෝගිතා වේදිකාව.",
    footer_product: "නිෂ්පාදන", footer_resources: "සම්පත්", footer_company: "සමාගම",
    footer_docs: "ලේඛන", footer_help: "උදව් මධ්‍යස්ථානය", footer_terms: "සේවා කොන්දේසි", footer_support: "සහාය අමතන්න",
    mock_overview: "දළ විශ්ලේෂණය", mock_documents: "ලේඛන", mock_checklist: "ලැයිස්තුව", mock_auditor: "විගණක", mock_discussion: "සාකච්ඡාව",
    mock_alert_title: "මූල්‍ය 2025/26", mock_alert_body: "සක්‍රීයයි",
    mock_workspace: "මූල්‍ය 2025/26 වැඩබිම", mock_status: "සමාලෝචනයේ", mock_completeness: "සම්පූර්ණත්වය", mock_documents_cap: "ලේඛන", mock_requests: "විවෘත ඉල්ලීම්",
    mock_required_docs: "අවශ්‍ය ලේඛන ලැයිස්තුව", mock_doc_1: "බැංකු ප්‍රකාශ", mock_doc_2: "පොත් පිටපත්", mock_doc_3: "වැටුප් සාරාංශය",
    mock_received: "ලැබී ඇත", mock_missing: "අස්ථානගතයි", mock_correction: "නිවැරදි කළ යුතුය",
    float_card_1_title: "පැකේජය පිළිගත්තා", float_card_1_sub: "විගණක අනුමත කරයි",
    float_card_2_title: "නව ඉල්ලීමක්", float_card_2_sub: "කරුණාකර ලේඛන යවන්න"
  },
  ta: {
    nav_features: "அம்சங்கள்", nav_how: "எப்படி வேலை செய்கிறது", nav_pricing: "விலை நிர்ணயம்", nav_contact: "தொடர்பு கொள்ள", nav_cta: "தொடங்கவும்",
    hero_badge: "நிறுவன வரி ஆவண தளம்",
    hero_title_1: "தெளிவாக சேகரிக்கவும்.", hero_title_2: "நம்பிக்கையுடன் மதிப்பாய்வு செய்யவும்.", hero_title_3: "முன்னேறவும்.",
    hero_sub: "இலங்கை தனியார் நிறுவனங்களுக்கு வரி ஆவணங்களை மின்னஞ்சல் குழப்பம் இல்லாமல் சேகரிக்க நம்பகமான இடம்.",
    hero_cta_1: "இலவச சோதனையைத் தொடங்கவும்", hero_cta_2: "எப்படி வேலை செய்கிறது",
    stat_1: "வணிகம் & தணிக்கையாளருக்கு", stat_2: "அனைத்து பதிவுகளும்", stat_3: "சிங்களம், தமிழ், ஆங்கிலம்", stat_4: "MVP காலக்கெடு",
    features_eyebrow: "முக்கிய தொகுதிகள்", features_title: "கட்டுப்படுத்தப்பட்ட ஒப்படைப்புக்கு அனைத்தும்.", features_sub: "V1 ஆவண பணிப்பாய்வு மற்றும் தணிக்கையாளர் ஒத்துழைப்பில் மட்டுமே கவனம் செலுத்துகிறது.",
    feat_1_title: "நிதி ஆண்டு பணியிடம்", feat_1_desc: "நிறுவனம், நிதி ஆண்டு, ஆவண சரிபார்ப்பு பட்டியல் மற்றும் வரலாற்றிற்கான ஒரே கட்டுப்படுத்தப்பட்ட இடம்.",
    feat_2_title: "முழுமை நுழைவாயில்", feat_2_desc: "பேக்கேஜ் அனுப்புவதற்கு முன் விடுபட்ட அல்லது முழுமையடையாத பொருட்களை இது எடுத்துக்காட்டுகிறது.",
    feat_3_title: "தணிக்கையாளர் மதிப்பாய்வு வரிசை", feat_3_desc: "தணிக்கையாளர்களுக்கு ஒதுக்கப்பட்ட நிறுவனங்கள் மற்றும் நிலுவையில் உள்ள பேக்கேஜ்கள் பற்றிய தெளிவான காட்சி கிடைக்கிறது.",
    feat_4_title: "கோரிக்கைகள் & பதில்கள்", feat_4_desc: "தணிக்கையாளர் ஒரு கோரிக்கையை உருவாக்குகிறார். வணிகம் பதிலளிக்கிறது. ஒவ்வொரு படியும் கண்காணிக்கப்படுகிறது.",
    feat_4_stat_1: "படிகள்", feat_4_stat_2: "பதிவுகள்",
    feat_5_title: "தணிக்கை வரலாறு", feat_5_desc: "மாற்றமுடியாத நிகழ்வு சுவடு. ஒரே உண்மையான மூலம்.",
    how_eyebrow: "சரியான பணிப்பாய்வு", how_title: "வணிகத்திலிருந்து தணிக்கையாளருக்கு கட்டுப்படுத்தப்பட்ட ஒப்படைப்பு.", how_sub: "ஒவ்வொரு ஆவணத்திற்கும் ஒரு நிலை, உரிமையாளர் மற்றும் வரலாறு உள்ளது.",
    step_1_title: "பதிவேற்றம் & ஒழுங்கமைத்தல்", step_1_desc: "வணிகம் தேவையான ஆவணங்களை பதிவேற்றி ஒழுங்கமைக்கிறது.",
    step_2_title: "சரிபார்ப்பு பட்டியல்", step_2_desc: "விடுபட்ட பொருட்களை அடையாளம் காண சரிபார்ப்பு பட்டியலைப் பயன்படுத்துகிறது.",
    step_3_title: "பேக்கேஜ் அனுப்பவும்", step_3_desc: "வணிகம் தணிக்கையாளருக்கு பேக்கேஜை அனுப்புகிறது.",
    step_4_title: "தணிக்கையாளர் மதிப்பாய்வு", step_4_desc: "தணிக்கையாளர் ஆவணங்களை மதிப்பாய்வு செய்து கருத்துக்களைச் சேர்க்கிறார்.",
    step_5_title: "கோரிக்கை & பதில்", step_5_desc: "தணிக்கையாளர் விடுபட்ட ஆவணங்களைக் கோருகிறார். வணிகம் பதிலளிக்கிறது.",
    step_6_title: "மறு மதிப்பாய்வு & ஏற்றுக்கொள்ளுதல்", step_6_desc: "தணிக்கையாளர் பதிலை மறு மதிப்பாய்வு செய்து பேக்கேஜை ஏற்றுக்கொள்கிறார்.",
    price_eyebrow: "விலை நிர்ணய மாதிரி", price_title: "மதிப்புக்கு ஏற்றவாறு.", price_sub: "இரண்டு சந்தாக்கள் ஏனெனில் வணிகம் மற்றும் தணிக்கையாளர் வெவ்வேறு மதிப்பைப் பெறுகிறார்கள்.",
    price_toggle_1: "வணிகம்", price_toggle_2: "தணிக்கையாளர்",
    price_business_badge: "நிறுவனங்களுக்கு", price_business_name: "TaxEase Business",
    price_business_desc: "இலங்கை தனியார் நிறுவனங்களுக்கு ஆவண பேக்கேஜ்களை தயாரிக்க.",
    price_business_f1: "நிறுவன பணியிடம்", price_business_f2: "ஆவண சரிபார்ப்பு", price_business_f3: "முழுமை", price_business_f4: "கோரிக்கைகள் & வரலாறு",
    price_auditor_badge: "நிறுவனங்களுக்கு", price_auditor_name: "TaxEase Auditor",
    price_auditor_desc: "தணிக்கை பணிகளை நிர்வகிக்கும் தணிக்கையாளர்களுக்கு.",
    price_auditor_f1: "வாடிக்கையாளர் அணுகல்", price_auditor_f2: "மதிப்பாய்வு வரிசை", price_auditor_f3: "கோரிக்கைகள் & ஏற்றுக்கொள்ளுதல்", price_auditor_f4: "குழு அணுகல்",
    price_cta: "தொடங்கவும்",
    faq_eyebrow: "அடிக்கடி கேட்கப்படும் கேள்விகள்", faq_title: "எல்லைகள், விளக்கப்பட்டது.",
    faq_q1: "V1 எனது வரியை கணக்கிடுகிறதா?", faq_a1: "இல்லை. V1 ஒரு வரி இயந்திரம் அல்ல. இது ஆவணங்களை சேகரிப்பதிலும் மதிப்பாய்வு செய்வதிலும் மட்டுமே கவனம் செலுத்துகிறது.",
    faq_q2: "IRD க்கு ஆவணங்களை அனுப்ப முடியுமா?", faq_a2: "இல்லை, ஆவணங்களை அனுப்புவது V1 இல் சேர்க்கப்படவில்லை.",
    faq_q3: "தணிக்கையாளர் ஒத்துழைப்பு எவ்வாறு செயல்படுகிறது?", faq_a3: "நீங்கள் ஒரு முழு பேக்கேஜை அனுப்புகிறீர்கள், தணிக்கையாளர் அதை மதிப்பாய்வு செய்கிறார்.",
    faq_q4: "பிற வரி வகைகளுக்கு ஆதரவு உள்ளதா?", faq_a4: "இல்லை. V1 தனியார் நிறுவனங்களுக்கான வரி ஆவண பணிப்பாய்வை மட்டுமே கையாள்கிறது.",
    contact_eyebrow: "எங்களை தொடர்பு கொள்ள", contact_title: "உங்கள் வரி பணிப்பாய்வை ஒழுங்கமைக்க தயாரா?", contact_sub: "படிவத்தை நிரப்புங்கள், எங்கள் குழு உங்கள் பணியிடத்தை அமைக்க தொடர்பு கொள்ளும்.",
    contact_location: "கொழும்பு, இலங்கை",
    form_name: "பெயர்", form_email: "மின்னஞ்சல்", form_phone: "தொலைபேசி எண்", form_business: "வணிகப் பெயர் (விரும்பினால்)", form_submit: "கோரிக்கையை அனுப்பவும்",
    footer_tagline: "நிறுவன வரி ஆவணம் & தணிக்கையாளர் ஒத்துழைப்பு தளம்.",
    footer_product: "தயாரிப்பு", footer_resources: "வளங்கள்", footer_company: "நிறுவனம்",
    footer_docs: "ஆவணங்கள்", footer_help: "உதவி மையம்", footer_terms: "சேவை விதிமுறைகள்", footer_support: "ஆதரவை தொடர்பு கொள்ள",
    mock_overview: "கண்ணோட்டம்", mock_documents: "ஆவணங்கள்", mock_checklist: "பட்டியல்", mock_auditor: "தணிக்கை", mock_discussion: "விவாதம்",
    mock_alert_title: "நிதி 2025/26", mock_alert_body: "செயலில்",
    mock_workspace: "நிதி 2025/26 பணியிடம்", mock_status: "மதிப்பாய்வில்", mock_completeness: "முழுமை", mock_documents_cap: "ஆவணங்கள்", mock_requests: "கோரிக்கைகள்",
    mock_required_docs: "தேவையான ஆவணங்கள்", mock_doc_1: "வங்கி அறிக்கைகள்", mock_doc_2: "பொது பேரேடு", mock_doc_3: "சம்பள சுருக்கம்",
    mock_received: "பெறப்பட்டது", mock_missing: "விடுபட்டது", mock_correction: "திருத்தம் தேவை",
    float_card_1_title: "பேக்கேஜ் ஏற்கப்பட்டது", float_card_1_sub: "தணிக்கையாளர் ஒப்புக்கொண்டார்",
    float_card_2_title: "புதிய கோரிக்கை", float_card_2_sub: "ஆவணங்களை பதிவேற்றவும்"
  }
};

function setLanguage(lang) {
  if (!translations[lang]) return;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update lang attribute for proper font rendering
  document.documentElement.lang = lang;
  localStorage.setItem('taxease_lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Set default language
const savedLang = localStorage.getItem('taxease_lang') || 'en';
setLanguage(savedLang);