const steps = Array.from(document.querySelectorAll('.step'));

if ('IntersectionObserver' in window && steps.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((step) => step.classList.remove('is-active'));
          entry.target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.6,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  steps.forEach((step) => observer.observe(step));
}

// Photo scrollytelling
const photoVisual = document.getElementById('photo-visual');
const photoSteps  = document.querySelectorAll('.photo-step');

if (photoVisual && photoSteps.length > 0) {
  const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        photoVisual.dataset.state = entry.target.dataset.visual;
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-15% 0px -15% 0px',
  });

  photoSteps.forEach((step) => photoObserver.observe(step));
}


// Legend filter
const legendItems = document.querySelectorAll('.legend-item');
const circleBtns  = document.querySelectorAll('.circle-btn');

legendItems.forEach((item) => {
  item.addEventListener('click', () => {
    const ring     = item.dataset.ring;
    const isActive = item.classList.contains('active');

    // Reset everything
    legendItems.forEach((l) => l.classList.remove('active'));
    circleBtns.forEach((btn) => btn.classList.remove('faded'));

    if (!isActive) {
      item.classList.add('active');
      circleBtns.forEach((btn) => {
        if (btn.dataset.ring !== ring) btn.classList.add('faded');
      });
    }
  });
});
