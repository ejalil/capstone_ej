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