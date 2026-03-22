// ===== Staggered card animation on scroll =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .mini-card, .featured-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ===== Card hover sound effect (subtle) =====
document.querySelectorAll('.card, .mini-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--hover-glow', '1');
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--hover-glow');
  });
});

// ===== Candle flicker randomization =====
document.querySelectorAll('.candle').forEach(candle => {
  const duration = 1.6 + Math.random() * 1.2;
  const delay = Math.random() * 1.5;
  candle.style.animationDuration = `${duration}s`;
  candle.style.animationDelay = `${delay}s`;
});

// ===== Eye cursor glow trail =====
const trail = [];
const TRAIL_LENGTH = 8;

for (let i = 0; i < TRAIL_LENGTH; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: ${6 - i * 0.5}px;
    height: ${6 - i * 0.5}px;
    border-radius: 50%;
    background: rgba(201, 162, 39, ${0.5 - i * 0.06});
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.05s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  let x = mouseX, y = mouseY;
  trail.forEach((dot, i) => {
    dot.el.style.left = x + 'px';
    dot.el.style.top = y + 'px';
    const prev = trail[i - 1];
    if (prev) {
      x += (prev.x - x) * 0.6;
      y += (prev.y - y) * 0.6;
    }
    dot.x = x;
    dot.y = y;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();
