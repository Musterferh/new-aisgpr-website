/* ============================================================
   AFRICAN INSTITUTE FOR STRATEGIC GOVERNANCE AND POLICY RESEARCH — main.js v2
   Animations, Scroll Reveals, Particles, Counter, Tabs
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Hamburger ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(l => {
      l.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Resources Dropdown (click-based) ── */
  document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Close all other dropdowns first
      document.querySelectorAll('.nav-dropdown-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.parentElement.classList.remove('open');
      });
      // Toggle current
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.parentElement.classList.add('open');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.parentElement.classList.remove('open');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.parentElement.classList.remove('open');
      });
    }
  });

  // Prevent dropdown menu clicks from closing it
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', e => e.stopPropagation());
  });

  /* ── Active nav link ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href')?.includes(page)) a.classList.add('active');
  });

  /* ── Scroll Reveal ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => io.observe(el));

  /* ── Animated Counter ── */
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const animateCount = (el, target, dur = 2200) => {
    const start = performance.now();
    const isFloat = !Number.isInteger(target);
    const update = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const val = target * easeOut(p);
      el.textContent = isFloat
        ? val.toFixed(1)
        : Math.floor(val).toLocaleString();
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
    };
    requestAnimationFrame(update);
  };

  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseFloat(e.target.dataset.count);
        animateCount(e.target, target);
        cio.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(c => cio.observe(c));

  /* ── Hero Particles ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const count = window.innerWidth < 768 ? 10 : 20;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      const dur = Math.random() * 12 + 8;
      const del = Math.random() * 10;
      Object.assign(p.style, {
        width: size + 'px',
        height: size + 'px',
        left: Math.random() * 100 + '%',
        bottom: '-10px',
        opacity: Math.random() * 0.5 + 0.1,
        animationDuration: dur + 's',
        animationDelay: del + 's',
      });
      hero.appendChild(p);
    }
  }

  /* ── Tabs (Get Involved) ── */
  const tabs = document.querySelectorAll('.tab-pill');
  const panels = document.querySelectorAll('.tab-panel');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(id);
        if (panel) {
          panel.classList.add('active');
          panel.style.animation = 'fadeUp .4s ease both';
        }
      });
    });
  }

  /* ── Smooth text glow on hero ── */
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    setTimeout(() => heroH1.style.animation = 'none', 4000);
  }

  /* ── Contact Form ── */
  const cf = document.getElementById('contactForm');
  if (cf) {
    cf.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = cf.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      try {
        const formData = new FormData(cf);
        const res = await fetch('https://api.staticforms.dev/submit', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        if (data.success) {
          btn.innerHTML = ' Message Sent!';
          btn.style.background = '#00e676';
          btn.style.color = '#060f0a';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
            cf.reset();
          }, 4500);
        } else {
          btn.innerHTML = ' Error sending message.';
          btn.disabled = false;
          setTimeout(() => btn.innerHTML = orig, 3000);
        }
      } catch (err) {
        btn.innerHTML = ' Connection Error';
        btn.disabled = false;
        setTimeout(() => btn.innerHTML = orig, 3000);
      }
    });
  }

  /* ── Newsletter Form ── */
  const nf = document.getElementById('newsletterForm');
  if (nf) {
    nf.addEventListener('submit', e => {
      e.preventDefault();
      const btn = nf.querySelector('button');
      btn.textContent = ' Subscribed!';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; nf.reset(); }, 3500);
    });
  }

  /* ── Card 3D tilt on hover ── */
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all .4s var(--ease-smooth)';
    });
  });

  /* ── Parallax orbs on scroll ── */
  const orbs = document.querySelectorAll('.hero-orb');
  if (orbs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.15;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

});
