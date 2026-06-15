/* ═══════════════════════════════════════════
   PORTFOLIO – Main Script (Performance Optimised)
   ═══════════════════════════════════════════ */

/* ── Inject keyframes ── */
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes lightboxFadeIn {
    from { opacity:0; transform:scale(0.95); }
    to   { opacity:1; transform:scale(1); }
  }
`;
document.head.appendChild(styleEl);

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════════
     1. NAVBAR + BACK-TO-TOP (passive scroll)
     ════════════════════════════════════════════ */
  const navbar    = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 50);
        backToTop.classList.toggle('visible', y > 600);
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ════════════════════════════════════════════
     2. MOBILE MENU
     ════════════════════════════════════════════ */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  /* ════════════════════════════════════════════
     3. ACTIVE NAV LINK
     ════════════════════════════════════════════ */
  const sections    = document.querySelectorAll('section[id]');
  const navLinkEls  = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  /* ════════════════════════════════════════════
     4. SCROLL-IN ANIMATIONS (Intersection Observer)
     ════════════════════════════════════════════ */
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => animObserver.observe(el));

  /* ════════════════════════════════════════════
     5. PROJECT FILTER
     ════════════════════════════════════════════ */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ════════════════════════════════════════════
     6. LAZY-LOADING CAROUSEL
     — Images stored in data-images / data-alts
     — Only the first image loads immediately.
     — Remaining images are injected as <img>
       elements with loading="lazy" when the
       carousel is first interacted with OR when
       it enters the viewport.
     ════════════════════════════════════════════ */

  function buildCarousel(carousel) {
    const track    = carousel.querySelector('.carousel-track');
    const dotsEl   = carousel.querySelector('.carousel-dots');
    const prevBtn  = carousel.querySelector('.carousel-prev');
    const nextBtn  = carousel.querySelector('.carousel-next');

    let images, alts;
    try {
      images = JSON.parse(carousel.dataset.images || '[]');
      alts   = JSON.parse(carousel.dataset.alts   || '[]');
    } catch { images = []; alts = []; }

    if (!images.length) return;

    let current      = 0;
    let fullyLoaded  = false;

    /* Build first slide immediately */
    const firstImg = document.createElement('img');
    firstImg.src             = images[0];
    firstImg.alt             = alts[0] || '';
    firstImg.className       = 'project-img';
    firstImg.decoding        = 'async';
    firstImg.style.cursor    = 'pointer';
    track.appendChild(firstImg);

    /* Lazy-load remaining slides */
    function loadAllSlides() {
      if (fullyLoaded) return;
      fullyLoaded = true;
      for (let i = 1; i < images.length; i++) {
        const img        = document.createElement('img');
        img.src          = images[i];
        img.alt          = alts[i] || '';
        img.className    = 'project-img';
        img.loading      = 'lazy';
        img.decoding     = 'async';
        img.style.cursor = 'pointer';
        track.appendChild(img);
      }
      bindLightboxToImages();
    }

    /* Single-image – no controls needed */
    if (images.length === 1) {
      bindLightboxToImages();
      return;
    }

    /* Build dots */
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    });

    function goTo(index) {
      current = (index + images.length) % images.length;
      /* GPU-accelerated translate — no layout reflow */
      track.style.transform = `translate3d(-${current * 100}%,0,0)`;
      dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }

    prevBtn.addEventListener('click', e => {
      e.stopPropagation();
      loadAllSlides();
      goTo(current - 1);
    });
    nextBtn.addEventListener('click', e => {
      e.stopPropagation();
      loadAllSlides();
      goTo(current + 1);
    });

    /* Auto-slide pauses when user interacts */
    let autoTimer = null;
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }
    function stopAuto() { clearInterval(autoTimer); }

    /* Bind lightbox clicks on all project-imgs in track */
    function bindLightboxToImages() {
      track.querySelectorAll('.project-img').forEach(img => {
        img.addEventListener('click', () => {
          const card    = img.closest('.project-card');
          const allSrcs = images;            // use data-images (no DOM scraping)
          const idx     = Array.from(track.querySelectorAll('.project-img')).indexOf(img);
          openLightbox(allSrcs, idx >= 0 ? idx : 0);
        });
      });
    }

    /* Viewport observer – load rest + start auto when card visible */
    const cardObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadAllSlides();
          startAuto();
        } else {
          stopAuto();
        }
      });
    }, { threshold: 0.3 });
    cardObserver.observe(carousel.closest('.project-card'));

    bindLightboxToImages();
  }

  /* Init all carousels */
  document.querySelectorAll('.carousel[data-images]').forEach(buildCarousel);

  /* ════════════════════════════════════════════
     7. LIGHTBOX
     ════════════════════════════════════════════ */
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxPrev    = document.getElementById('lightbox-prev');
  const lightboxNext    = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxBack    = document.getElementById('lightbox-backdrop');

  let lbImages = [];
  let lbIndex  = 0;

  function openLightbox(imgs, index) {
    lbImages = imgs;
    lbIndex  = index;
    showLBImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    const single = imgs.length <= 1;
    lightboxPrev.classList.toggle('hidden', single);
    lightboxNext.classList.toggle('hidden', single);
    lightboxCounter.classList.toggle('hidden', single);
  }

  function showLBImage() {
    lightboxImg.style.animation = 'none';
    void lightboxImg.offsetWidth; // force reflow
    lightboxImg.style.animation = 'lightboxFadeIn 0.3s ease';
    lightboxImg.src = lbImages[lbIndex];
    lightboxCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';          // free memory
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBack.addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', () => {
    lbIndex = lbIndex <= 0 ? lbImages.length - 1 : lbIndex - 1;
    showLBImage();
  });
  lightboxNext.addEventListener('click', () => {
    lbIndex = lbIndex >= lbImages.length - 1 ? 0 : lbIndex + 1;
    showLBImage();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   lightboxPrev.click();
    if (e.key === 'ArrowRight')  lightboxNext.click();
  });

  /* ════════════════════════════════════════════
     8. SMOOTH ANCHOR SCROLLING
     ════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
