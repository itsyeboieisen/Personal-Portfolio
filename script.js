/* ═══════════════════════════════════════════
   PORTFOLIO – Main Script
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backToTop.classList.toggle('visible', y > 600);
  });

  /* ── Mobile menu toggle ── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink);

  /* ── Back to top ── */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Scroll animations (Intersection Observer) ── */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children slightly
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  /* ── Project filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.45s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── Image Carousels ── */
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('.project-img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (images.length <= 1) return; // No carousel needed for single image

    let current = 0;

    // Create dots
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(current <= 0 ? images.length - 1 : current - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(current >= images.length - 1 ? 0 : current + 1);
    });
  });

  /* ── Lightbox ── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxContent = document.getElementById('lightbox-content');

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    showImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Show/hide nav if only 1 image
    if (images.length <= 1) {
      lightboxPrev.classList.add('hidden');
      lightboxNext.classList.add('hidden');
      lightboxCounter.classList.add('hidden');
    } else {
      lightboxPrev.classList.remove('hidden');
      lightboxNext.classList.remove('hidden');
      lightboxCounter.classList.remove('hidden');
    }
  }

  function showImage() {
    lightboxImg.style.animation = 'none';
    lightboxImg.offsetHeight; // trigger reflow
    lightboxImg.style.animation = '';
    lightboxImg.src = currentImages[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    lightboxContent.scrollTop = 0;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', () => {
    currentIndex = currentIndex <= 0 ? currentImages.length - 1 : currentIndex - 1;
    showImage();
  });

  lightboxNext.addEventListener('click', () => {
    currentIndex = currentIndex >= currentImages.length - 1 ? 0 : currentIndex + 1;
    showImage();
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  // Click image to open lightbox with all images from that project
  document.querySelectorAll('.project-thumbnail .project-img').forEach(img => {
    img.style.cursor = 'pointer';
    img.style.pointerEvents = 'auto';
    img.addEventListener('click', () => {
      const card = img.closest('.project-card');
      const allImgs = Array.from(card.querySelectorAll('.project-img')).map(i => i.src);
      const clickedIndex = allImgs.indexOf(img.src);
      openLightbox(allImgs, clickedIndex >= 0 ? clickedIndex : 0);
    });
  });

  /* ── Smooth anchor scrolling fallback ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

/* Fade-in-up keyframe for filter animation */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(20px); }
    to { opacity:1; transform:translateY(0); }
  }
`;
document.head.appendChild(style);
