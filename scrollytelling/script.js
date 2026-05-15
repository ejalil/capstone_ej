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

const peopleNav = document.querySelector('.people-nav');
const circleButtons = Array.from(document.querySelectorAll('.circle-btn[data-person]'));
const visitedCirclesKey = 'scrollytelling.visitedCircles';
const peopleNavArrow = document.querySelector('.people-nav-arrow');

let visitedCircles = new Set();

try {
  visitedCircles = new Set(JSON.parse(sessionStorage.getItem(visitedCirclesKey) || '[]'));
} catch (error) {
  visitedCircles = new Set();
}

function syncPeopleNavArrow() {
  const allVisited = circleButtons.length > 0 && circleButtons.every((button) => visitedCircles.has(button.dataset.person));

  if (peopleNav) {
    peopleNav.classList.toggle('is-unlocked', allVisited);
  }

  if (peopleNavArrow) {
    peopleNavArrow.setAttribute('aria-hidden', String(!allVisited));
    peopleNavArrow.tabIndex = allVisited ? 0 : -1;
  }
}

circleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    visitedCircles.add(button.dataset.person);

    try {
      sessionStorage.setItem(visitedCirclesKey, JSON.stringify(Array.from(visitedCircles)));
    } catch (error) {
      /* no-op */
    }

    syncPeopleNavArrow();
  });
});

syncPeopleNavArrow();


