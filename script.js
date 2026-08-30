(function () {
  // ---- Preloader ----
  window.addEventListener('load', function () {
    var mark = document.getElementById('loaderMark');
    if (window.gsap) gsap.to(mark, { opacity: 1, duration: 0.5 });
    setTimeout(function () {
      document.getElementById('loader').classList.add('done');
    }, 550);
  });

  // ---- Smooth scroll (Lenis) ----
  var lenis;
  try {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  } catch (e) {}

  // ---- Custom cursor ----
  if (window.matchMedia('(hover: hover)').matches) {
    document.body.classList.add('has-cursor');
    var cursor = document.getElementById('cursor');
    window.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });
    document.querySelectorAll('[data-cursor="hover"]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('is-hover'); });
    });
  }

  // ---- Nav scroll state ----
  var nav = document.getElementById('nav');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (y > lastY && y > 200) nav.classList.add('is-hidden');
    else nav.classList.remove('is-hidden');
    lastY = y;
    document.getElementById('toTop').classList.toggle('is-on', y > 600);
  });

  document.getElementById('toTop').addEventListener('click', function () {
    if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Reveal-on-scroll ----
  var revealEls = document.querySelectorAll('.reveal-up');
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    revealEls.forEach(function (el, i) {
      ScrollTrigger.create({
        trigger: el, start: 'top 88%',
        onEnter: function () { el.classList.add('in'); }
      });
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---- Counters ----
  function animateCounter(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var start = 0, dur = 1200, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / dur, 1);
      el.textContent = Math.floor(p * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.counter');
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(function (el) { cio.observe(el); });

  // ---- Pricing toggle ----
  var toggle = document.getElementById('priceToggle');
  var thumb = document.getElementById('toggleThumb');
  var opts = toggle.querySelectorAll('.toggle__opt');
  var panels = document.querySelectorAll('.plans[data-panel]');
  function positionThumb(btn) {
    thumb.style.width = btn.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)';
  }
  function setTab(tab) {
    opts.forEach(function (o) { o.classList.toggle('is-active', o.dataset.tab === tab); if (o.dataset.tab === tab) positionThumb(o); });
    panels.forEach(function (p) {
      if (p.dataset.panel === tab) p.removeAttribute('data-hidden');
      else p.setAttribute('data-hidden', '');
    });
  }
  opts.forEach(function (o) { o.addEventListener('click', function () { setTab(o.dataset.tab); }); });
  window.addEventListener('load', function () { positionThumb(toggle.querySelector('.is-active')); });

  // ---- Theme toggle ----
  var themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', function () {
    var html = document.documentElement;
    var dark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', dark ? 'light' : 'dark');
  });

  // ---- Language Switcher ----
  function setLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(function(el) {
      var text = el.getAttribute('data-' + lang);
      if (text) el.innerHTML = text; // innerHTML to allow tags like <em> or <br>
    });
    document.querySelectorAll('.nav__lang button').forEach(function(btn) {
      btn.classList.remove('is-active');
    });
    var activeBtn = document.querySelector('.nav__lang button[data-lang="' + lang + '"]');
    if(activeBtn) activeBtn.classList.add('is-active');
  }
  
  document.querySelectorAll('.nav__lang button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(this.getAttribute('data-lang'));
    });
  });

  // ---- Contact form (Paper Rocket + FormSubmit AJAX) ----
  var form = document.getElementById('contactForm');
  var card = document.getElementById('contactCard');
  var success = document.getElementById('contactSuccess');
  var wrapper = document.querySelector('.contact__wrapper');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    wrapper.style.minHeight = card.offsetHeight + 'px';
    card.classList.add('flying');
    
    // Gather form data securely for FormSubmit
    var formData = new FormData(form);
    var object = {};
    formData.forEach(function(value, key){ object[key] = value; });
    
    // Send data to taxeaselk2026@gmail.com via FormSubmit
    fetch("https://formsubmit.co/ajax/taxeaselk2026@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            Name: object.Name,
            Email: object.Email,
            Phone: object.Phone,
            Business: object.Business,
            _subject: "New Workspace Request from TaxEaseLK Website"
        })
    });
    
    setTimeout(function() { success.classList.add('visible'); }, 500);
    
    setTimeout(function() {
      success.classList.remove('visible');
      setTimeout(function() {
        card.classList.remove('flying');
        form.reset();
        wrapper.style.minHeight = '400px';
      }, 600);
    }, 4500);
  });

  // ---- Particle Text Assembly ----
  (function() {
    var canvas = document.getElementById('canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var stage = document.getElementById('stage');
    var caption = document.getElementById('caption');
    var hint = document.getElementById('hint');
    var realtext = document.getElementById('realtext');
    var extractMockup = document.getElementById('extractMockup');
    var dpr = window.devicePixelRatio || 1;
    var lines = ['Snap a receipt.', 'Let AI do the', 'math.'];
    var particles = [];
    var playing = false;
    var done = false;
    var startTime = 0;
    var duration = 1300;
    var fontSizePx = 46;

    function getCssVar(name) {
      var c = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return c || (name === '--ink' ? '#000' : '#7c3aed');
    }

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function sizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return rect;
    }

    function buildTargets(rect) {
      var off = document.createElement('canvas');
      off.width = rect.width;
      off.height = rect.height;
      var octx = off.getContext('2d');
      fontSizePx = rect.width < 420 ? 32 : 42;
      octx.font = '700 ' + fontSizePx + 'px "Inter Tight", Arial, sans-serif';
      octx.textBaseline = 'top';
      var lineHeight = fontSizePx * 1.12;
      var totalHeight = lineHeight * lines.length;
      var startY = Math.max(4, (rect.height - totalHeight) / 2);

      var inkColor = getCssVar('--ink');
      var orangeColor = getCssVar('--orange');

      octx.fillStyle = inkColor;
      octx.fillText(lines[0], 4, startY);
      octx.fillText(lines[1], 4, startY + lineHeight);
      octx.fillStyle = orangeColor;
      octx.fillText(lines[2], 4, startY + 2 * lineHeight);

      var img = octx.getImageData(0, 0, off.width, off.height).data;
      var pts = [];
      var step = 1;
      for (var y = 0; y < off.height; y += step) {
        for (var x = 0; x < off.width; x += step) {
          var idx = (y * off.width + x) * 4;
          var alpha = img[idx + 3];
          if (alpha > 90) {
            pts.push({ 
              x: x, y: y, 
              r: img[idx], 
              g: img[idx + 1], 
              b: img[idx + 2] 
            });
          }
        }
      }
      return pts;
    }

    function initParticles(rect) {
      var targets = buildTargets(rect);
      var maxParticles = 5200;
      if (targets.length > maxParticles) {
        var stride = targets.length / maxParticles;
        var sampled = [];
        for (var i = 0; i < maxParticles; i++) {
          sampled.push(targets[Math.floor(i * stride)]);
        }
        targets = sampled;
      }
      particles = targets.map(function(t) {
        return {
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          tx: t.x,
          ty: t.y,
          sx: 0,
          sy: 0,
          delay: Math.random() * 0.15,
          r: t.r,
          g: t.g,
          b: t.b
        };
      });
    }

    function drawScattered(rect) {
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach(function(p) {
        ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';
        ctx.fillRect(p.x, p.y, 1.1, 1.1);
      });
    }

    function frame(now) {
      if (!playing) return;
      var rect = canvas.getBoundingClientRect();
      var elapsed = now - startTime;
      var globalT = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach(function(p) {
        var local = Math.min(Math.max((globalT - p.delay) / (1 - p.delay), 0), 1);
        var e = easeOutCubic(local);
        var cx = p.sx + (p.tx - p.sx) * e;
        var cy = p.sy + (p.ty - p.sy) * e;
        var size = 1.1 + e * 0.5;
        ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';
        ctx.fillRect(cx, cy, size, size);
      });
      if (globalT < 1) {
        requestAnimationFrame(frame);
      } else {
        playing = false;
        done = true;
        realtext.style.opacity = '1';
        setTimeout(function() {
          canvas.style.opacity = '0';
          canvas.style.transition = 'opacity 0.3s ease';
        }, 250);
        caption.style.opacity = '1';
        hint.style.opacity = '0';
        if (extractMockup) extractMockup.classList.add('in');
      }
    }

    function play() {
      if (playing || done) return;
      particles.forEach(function(p) {
        p.sx = p.x;
        p.sy = p.y;
      });
      playing = true;
      startTime = performance.now();
      requestAnimationFrame(frame);
    }

    function reset() {
      done = false;
      playing = false;
      realtext.style.opacity = '0';
      caption.style.opacity = '0';
      hint.style.opacity = '1';
      canvas.style.transition = 'none';
      canvas.style.opacity = '1';
      if (extractMockup) extractMockup.classList.remove('in');
      var rect = sizeCanvas();
      initParticles(rect);
      drawScattered(rect);
    }
    
    function updateParticleColors() {
      var rect = canvas.getBoundingClientRect();
      var off = document.createElement('canvas');
      off.width = rect.width;
      off.height = rect.height;
      var octx = off.getContext('2d');
      fontSizePx = rect.width < 420 ? 32 : 42;
      octx.font = '700 ' + fontSizePx + 'px "Inter Tight", Arial, sans-serif';
      octx.textBaseline = 'top';
      var lineHeight = fontSizePx * 1.12;
      var totalHeight = lineHeight * lines.length;
      var startY = Math.max(4, (rect.height - totalHeight) / 2);

      octx.fillStyle = getCssVar('--ink');
      octx.fillText(lines[0], 4, startY);
      octx.fillText(lines[1], 4, startY + lineHeight);
      octx.fillStyle = getCssVar('--orange');
      octx.fillText(lines[2], 4, startY + 2 * lineHeight);

      var img = octx.getImageData(0, 0, off.width, off.height).data;
      particles.forEach(function(p) {
        var px = Math.round(p.tx);
        var py = Math.round(p.ty);
        if (px >= 0 && px < off.width && py >= 0 && py < off.height) {
          var idx = (py * off.width + px) * 4;
          p.r = img[idx];
          p.g = img[idx + 1];
          p.b = img[idx + 2];
        }
      });
      if (!playing && !done) {
        drawScattered(rect);
      }
    }

    window.addEventListener('resize', function() {
      if (!playing) reset();
    });

    stage.addEventListener('click', function() {
      if (done) {
        reset();
      } else if (!playing) {
        play();
      }
    });

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'data-theme') {
          updateParticleColors();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    reset();
  })();

})();
