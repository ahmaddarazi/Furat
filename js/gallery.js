document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initLightbox();
});

function initCarousels() {
  const carouselContainers = document.querySelectorAll('.carousel-container');

  carouselContainers.forEach(container => {
    const images = container.querySelectorAll('.carousel-image');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    const dotsContainer = container.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalImages = images.length;

    for (let i = 0; i < totalImages; i++) {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = container.querySelectorAll('.carousel-dot');

    function updateCarousel() {
      images.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
    }

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });

    images.forEach((image, index) => {
      const imgElement = image.querySelector('img');
      if (imgElement) {
        imgElement.addEventListener('click', () => {
          openLightbox(container, index);
        });
      }
    });

    let startX = 0;
    let isDragging = false;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    });

    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
    });

    container.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      startX = e.clientX;
      isDragging = true;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
    });

    container.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      const endX = e.clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentCarousel = null;
  let currentImageIndex = 0;
  let allImages = [];

  window.openLightbox = function(carouselContainer, startIndex) {
    currentCarousel = carouselContainer;
    currentImageIndex = startIndex;

    allImages = Array.from(carouselContainer.querySelectorAll('.carousel-image img')).filter(img => img.src);

    if (allImages.length === 0) return;

    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function updateLightboxImage() {
    if (allImages.length === 0) return;

    const currentImg = allImages[currentImageIndex];
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt || 'Product Image';

    const productCard = currentCarousel.closest('.product-gallery-card');
    const productTitle = productCard ? productCard.querySelector('.product-gallery-header h3').textContent : '';

    lightboxCaption.textContent = productTitle;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentCarousel = null;
    allImages = [];
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateLightboxImage();
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateLightboxImage();
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });
}
