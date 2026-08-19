/* ═══════════════════════════════════════════
   PORTFOLIO – Production Optimized Script
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Throttled Navbar & Back-To-Top Scroll Handler (requestAnimationFrame) ── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  let isTicking = false;

  const handleScrollEffects = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('visible', y > 500);
    isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(handleScrollEffects);
      isTicking = true;
    }
  }, { passive: true });

  /* ── 2. Mobile Menu Toggle ── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 3. Zero-Reflow Active Navigation Tracking (IntersectionObserver) ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-section') === id);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0.1
  });

  sections.forEach(sec => navObserver.observe(sec));

  /* ── 4. Back To Top Action ── */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 5. Hardware-Accelerated Entrance Animations (Intersection Observer) ── */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  const scrollAnimObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollAnimObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  animatedEls.forEach(el => scrollAnimObserver.observe(el));

  /* ── 6. Filter Animation Optimization ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = (filter === 'all' || category === filter);

        if (shouldShow) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── 7. Optimized Image Carousels ── */
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track ? track.querySelectorAll('.project-img') : [];
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (!track || images.length <= 1) return;

    let current = 0;

    // Create dots if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goTo(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(index) {
      current = index;
      track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo(current <= 0 ? images.length - 1 : current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo(current >= images.length - 1 ? 0 : current + 1);
      });
    }

    // Touch swipe gesture for mobile
    let touchStartX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goTo(current >= images.length - 1 ? 0 : current + 1);
        } else {
          goTo(current <= 0 ? images.length - 1 : current - 1);
        }
      }
    }, { passive: true });
  });

  /* ── 8. Optimized Lightbox Modal ── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxContent = document.getElementById('lightbox-content');

  if (lightbox && lightboxImg) {
    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(images, index) {
      currentImages = images;
      currentIndex = index;
      showImage();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';

      const isSingle = images.length <= 1;
      if (lightboxPrev) lightboxPrev.classList.toggle('hidden', isSingle);
      if (lightboxNext) lightboxNext.classList.toggle('hidden', isSingle);
      if (lightboxCounter) lightboxCounter.classList.toggle('hidden', isSingle);
    }

    function showImage() {
      lightboxImg.src = currentImages[currentIndex];
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
      }
      if (lightboxContent) {
        lightboxContent.scrollTop = 0;
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = currentIndex <= 0 ? currentImages.length - 1 : currentIndex - 1;
        showImage();
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = currentIndex >= currentImages.length - 1 ? 0 : currentIndex + 1;
        showImage();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });

    // Click handler for project thumbnails
    document.querySelectorAll('.project-thumbnail .project-img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const card = img.closest('.project-card');
        if (!card) return;
        const allImgs = Array.from(card.querySelectorAll('.project-img')).map(i => i.src);
        const clickedIndex = allImgs.indexOf(img.src);
        openLightbox(allImgs, clickedIndex >= 0 ? clickedIndex : 0);
      });
    });

    // Click handler for certificate thumbnails
    document.querySelectorAll('.cert-image-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('.cert-img');
        if (img && img.src) {
          openLightbox([img.src], 0);
        }
      });
    });
  }

  /* ── 9. Smooth Scroll Anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
