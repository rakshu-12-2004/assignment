/**
 * Mangalam HDPE Pipes - JavaScript
 * Handles: Sticky Header, Image Carousel with Zoom, FAQ Accordion, Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. STICKY HEADER - appears when scrolling
  //    past the first fold, hides on scroll up
  // ============================================
  const stickyHeader = document.getElementById('stickyHeader');
  const heroSection = document.getElementById('heroSection');
  const mainNavbar = document.getElementById('mainNavbar');
  let lastScrollY = 0;
  let heroBottom = 0;

  function updateHeroBottom() {
    if (heroSection) {
      heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    }
  }
  updateHeroBottom();
  window.addEventListener('resize', updateHeroBottom);

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show sticky header only when scrolled past the hero section
    if (currentScrollY > heroBottom) {
      // Scrolling down - show the sticky header
      if (currentScrollY > lastScrollY) {
        stickyHeader.classList.add('visible');
      }
      // Scrolling up - hide the sticky header
      else {
        stickyHeader.classList.remove('visible');
      }
    } else {
      // Still in hero area - always hide sticky header
      stickyHeader.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // ============================================
  // 2. IMAGE CAROUSEL WITH ZOOM
  // ============================================
  const carouselImages = [
    'images/hero-1.jpg',
    'images/hero-2.jpg',
    'images/hero-3.jpg',
    'images/hero-4.jpg',
    'images/hero-5.jpg',
    'images/hero-6.jpg'
  ];
  let currentIndex = 0;

  const carouselMain = document.getElementById('carouselMain');
  const carouselImage = document.getElementById('carouselImage');
  const zoomLens = document.getElementById('zoomLens');
  const zoomPreview = document.getElementById('zoomPreview');
  const zoomPreviewImg = document.getElementById('zoomPreviewImg');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const thumbsContainer = document.getElementById('carouselThumbs');

  /** Updates the main carousel image and active thumbnail */
  function setCarouselImage(index) {
    currentIndex = index;
    carouselImage.src = carouselImages[index];
    zoomPreviewImg.src = carouselImages[index];
    
    // Update active thumbnail
    const thumbs = thumbsContainer.querySelectorAll('.carousel__thumb');
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('carousel__thumb--active', i === index);
    });
  }

  // Previous/Next button handlers
  prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    setCarouselImage(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % carouselImages.length;
    setCarouselImage(newIndex);
  });

  // Thumbnail click handlers
  thumbsContainer.addEventListener('click', (e) => {
    const thumb = e.target.closest('.carousel__thumb');
    if (thumb) {
      const index = parseInt(thumb.dataset.index, 10);
      setCarouselImage(index);
    }
  });

  // --- ZOOM FUNCTIONALITY ---
  // On hovering over the main carousel image, show a zoom lens
  // and display a magnified preview to the right

  const ZOOM_FACTOR = 2.5; // How much to magnify
  const LENS_SIZE = 150;   // Size of the zoom lens in pixels

  carouselMain.addEventListener('mouseenter', () => {
    zoomPreview.classList.add('active');
    zoomLens.style.opacity = '1';
  });

  carouselMain.addEventListener('mouseleave', () => {
    zoomPreview.classList.remove('active');
    zoomLens.style.opacity = '0';
  });

  carouselMain.addEventListener('mousemove', (e) => {
    const rect = carouselMain.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imgW = rect.width;
    const imgH = rect.height;

    // Position the lens (centered on cursor)
    const lensX = Math.max(0, Math.min(x - LENS_SIZE / 2, imgW - LENS_SIZE));
    const lensY = Math.max(0, Math.min(y - LENS_SIZE / 2, imgH - LENS_SIZE));
    zoomLens.style.left = lensX + 'px';
    zoomLens.style.top = lensY + 'px';
    zoomLens.style.width = LENS_SIZE + 'px';
    zoomLens.style.height = LENS_SIZE + 'px';

    // Calculate the position in the zoomed image
    // The zoom preview shows a magnified portion of the image
    const previewW = zoomPreview.offsetWidth;
    const previewH = zoomPreview.offsetHeight;

    // Scale the zoom image to be ZOOM_FACTOR times larger
    zoomPreviewImg.style.width = (imgW * ZOOM_FACTOR) + 'px';
    zoomPreviewImg.style.height = (imgH * ZOOM_FACTOR) + 'px';

    // Position the zoomed image so the area under the lens is centered in preview
    const zoomX = -(x * ZOOM_FACTOR - previewW / 2);
    const zoomY = -(y * ZOOM_FACTOR - previewH / 2);

    // Clamp values to prevent showing empty space
    const maxX = 0;
    const maxY = 0;
    const minX = -(imgW * ZOOM_FACTOR - previewW);
    const minY = -(imgH * ZOOM_FACTOR - previewH);

    zoomPreviewImg.style.transform = `translate(${Math.min(maxX, Math.max(minX, zoomX))}px, ${Math.min(maxY, Math.max(minY, zoomY))}px)`;
  });

  // ============================================
  // 3. FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============================================
  // 4. MOBILE NAVIGATION TOGGLE
  // ============================================
  const hamburgerMain = document.getElementById('hamburgerMain');
  const navLinks = document.getElementById('navLinks');
  const stickyHamburger = document.getElementById('stickyHamburger');
  const stickyNav = document.getElementById('stickyNav');

  if (hamburgerMain) {
    hamburgerMain.addEventListener('click', () => {
      hamburgerMain.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  if (stickyHamburger) {
    stickyHamburger.addEventListener('click', () => {
      stickyHamburger.classList.toggle('active');
      stickyNav.classList.toggle('open');
    });
  }

  // ============================================
  // 5. SPECS TAB SWITCHING
  // ============================================
  const specsTabs = document.querySelectorAll('.specs__tab');
  specsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      specsTabs.forEach(t => t.classList.remove('specs__tab--active'));
      tab.classList.add('specs__tab--active');
    });
  });

  // ============================================
  // 6. PROCESS TAB SWITCHING
  // ============================================
  const processTabs = document.querySelectorAll('.process__tab');
  processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      processTabs.forEach(t => t.classList.remove('process__tab--active'));
      tab.classList.add('process__tab--active');
    });
  });

  // ============================================
  // 7. KEYBOARD NAVIGATION FOR CAROUSEL
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Only handle arrow keys when carousel is in viewport
    const rect = carouselMain.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      }
    }
  });
});
