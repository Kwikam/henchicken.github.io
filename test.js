

// Hero Slider
const heroSlides = document.querySelectorAll('.hero .slide');
const heroDots = document.querySelectorAll('.hero .dot');
const heroPrev = document.querySelector('.hero .prev');
const heroNext = document.querySelector('.hero .next');

let heroSlideIndex = 0;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  heroDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

heroPrev.addEventListener('click', () => {
  heroSlideIndex = (heroSlideIndex > 0) ? heroSlideIndex - 1 : heroSlides.length - 1;
  showHeroSlide(heroSlideIndex);
});

heroNext.addEventListener('click', () => {
  heroSlideIndex = (heroSlideIndex < heroSlides.length - 1) ? heroSlideIndex + 1 : 0;
  showHeroSlide(heroSlideIndex);
});

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    heroSlideIndex = i;
    showHeroSlide(heroSlideIndex);
  });
});

// Auto-slide for Hero Slider
setInterval(() => {
  heroSlideIndex = (heroSlideIndex < heroSlides.length - 1) ? heroSlideIndex + 1 : 0;
  showHeroSlide(heroSlideIndex);
}, 5000);

// Auto-slider for Events Section
const eventTrack = document.querySelector('.event-track');
const eventCards = document.querySelectorAll('.event-card');
let currentIndex = 0;

function slideEvents() {
  currentIndex = (currentIndex + 1) % (eventCards.length - 2); // Loop without the duplicate cards
  const offset = -currentIndex * (eventCards[0].offsetWidth + 20); // 20px for margin
  eventTrack.style.transform = `translateX(${offset}px)`;

  // Smoothly reset to the first card without backward animation
  if (currentIndex === eventCards.length - 3) { // Stop before the duplicate cards
    setTimeout(() => {
      eventTrack.style.transition = 'none';
      eventTrack.style.transform = 'translateX(0)';
      currentIndex = 0; // Reset index
      setTimeout(() => {
        eventTrack.style.transition = 'transform 0.8s ease-in-out';
      }, 50);
    }, 800); // Wait for the slide animation to finish
  }
}

setInterval(slideEvents, 5000); // Slide every 5 seconds

// Photo Gallery Slider
// Photo Gallery Slider
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');

let gallerySlideIndex = 0;
const slidesToShow = 3; // Number of images to show at once

function showGallerySlide(index) {
  const offset = -index * (100 / slidesToShow);
  galleryTrack.style.transform = `translateX(${offset}%)`;
}

galleryPrev.addEventListener('click', () => {
  gallerySlideIndex = (gallerySlideIndex > 0) ? gallerySlideIndex - 1 : gallerySlides.length - slidesToShow;
  showGallerySlide(gallerySlideIndex);
});

galleryNext.addEventListener('click', () => {
  gallerySlideIndex = (gallerySlideIndex < gallerySlides.length - slidesToShow) ? gallerySlideIndex + 1 : 0;
  showGallerySlide(gallerySlideIndex);
});

// Auto-slide for Gallery
setInterval(() => {
  gallerySlideIndex = (gallerySlideIndex < gallerySlides.length - slidesToShow) ? gallerySlideIndex + 1 : 0;
  showGallerySlide(gallerySlideIndex);
}, 5000);
// Video Controls
const video = document.getElementById('restaurantVideo');
const playButton = document.getElementById('playButton');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

// Play/Pause Button
playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playButton.style.display = 'none';
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
  }
});

playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Volume Slider
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
  if (video.volume > 0) {
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});

// Mute Button
muteBtn.addEventListener('click', () => {
  if (video.volume > 0) {
    video.volume = 0;
    volumeSlider.value = 0;
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    video.volume = 1;
    volumeSlider.value = 1;
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});

// Pause Video When Scrolled Out of View
window.addEventListener('scroll', () => {
  const videoSection = document.querySelector('.video-section');
  const videoRect = videoSection.getBoundingClientRect();

  if (videoRect.top > window.innerHeight || videoRect.bottom < 0) {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Intersection Observer for Animations
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType = entry.target.getAttribute('data-animate');
          entry.target.classList.add(`animate-${animationType}`);
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', animateOnScroll);