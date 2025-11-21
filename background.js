// Galaxy Background with Shooting Stars and Cursor Glow Effects

// Canvas setup
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Stars array
const stars = [];
const starCount = 200;

// Create stars
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    opacity: Math.random(),
    twinkleSpeed: Math.random() * 0.02 + 0.01,
    growing: Math.random() > 0.5
  });
}

// Shooting stars array
const shootingStars = [];

// Create shooting star
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5, // Upper half of screen
    length: Math.random() * 80 + 40,
    speed: Math.random() * 3 + 2,
    opacity: 1,
    angle: Math.PI / 4 // 45 degrees slant
  });
}

// Initial shooting star
createShootingStar();

// Animation function
function animate() {
  // Clear canvas with slight fade for trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw and update stars
  stars.forEach(star => {
    // Twinkling effect
    if (star.growing) {
      star.opacity += star.twinkleSpeed;
      if (star.opacity >= 1) {
        star.growing = false;
      }
    } else {
      star.opacity -= star.twinkleSpeed;
      if (star.opacity <= 0.2) {
        star.growing = true;
      }
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
    ctx.closePath();
  });

  // Draw and update shooting stars
  shootingStars.forEach((star, index) => {
    // Draw shooting star trail
    const gradient = ctx.createLinearGradient(
      star.x,
      star.y,
      star.x - Math.cos(star.angle) * star.length,
      star.y - Math.sin(star.angle) * star.length
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
    gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.5})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x - Math.cos(star.angle) * star.length,
      star.y - Math.sin(star.angle) * star.length
    );
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Update position
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    star.opacity -= 0.005;

    // Remove if off screen or faded
    if (star.x > canvas.width || star.y > canvas.height || star.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });

  // Randomly create new shooting stars
  if (Math.random() < 0.005) {
    createShootingStar();
  }

  requestAnimationFrame(animate);
}

animate();

// ============================================
// CURSOR GLOW EFFECT (PETS-LIKE INTERACTION)
// ============================================

// Create cursor glow element
const cursorGlow = document.createElement('div');
cursorGlow.id = 'cursor-glow';
cursorGlow.style.cssText = `
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(110, 234, 255, 0.8), rgba(110, 234, 255, 0.2), transparent);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: width 0.2s, height 0.2s, opacity 0.2s;
  opacity: 0;
`;
document.body.appendChild(cursorGlow);

// Track mouse position
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursorGlow.style.left = mouseX + 'px';
  cursorGlow.style.top = mouseY + 'px';
  cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

// ============================================
// HOVER GLOW EFFECTS ON ELEMENTS
// ============================================

// Add glow styles
const glowStyle = document.createElement('style');
glowStyle.textContent = `
  .glow-hover {
    transition: all 0.3s ease;
  }
  
  .glow-hover:hover {
    text-shadow: 0 0 20px rgba(110, 234, 255, 0.8),
                 0 0 30px rgba(110, 234, 255, 0.6),
                 0 0 40px rgba(110, 234, 255, 0.4);
    transform: scale(1.02);
  }
  
  .card-glow:hover {
    box-shadow: 0 0 30px rgba(110, 234, 255, 0.6),
                0 0 50px rgba(110, 234, 255, 0.4),
                inset 0 0 20px rgba(110, 234, 255, 0.2);
    border-color: #6eeaff !important;
  }
  
  .cursor-trail {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(110, 234, 255, 0.6);
    pointer-events: none;
    animation: fade-out 0.5s ease-out forwards;
    z-index: 9998;
  }
  
  @keyframes fade-out {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;
document.head.appendChild(glowStyle);

// Add glow class to text elements
function addGlowToElements() {
  // Add glow to headings
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(heading => {
    if (!heading.classList.contains('glow-hover')) {
      heading.classList.add('glow-hover');
    }
  });

  // Add glow to paragraphs
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    if (!p.classList.contains('glow-hover')) {
      p.classList.add('glow-hover');
    }
  });

  // Add glow to cards
  const cards = document.querySelectorAll('.edu-card, .timeline-item, .achievement-card');
  cards.forEach(card => {
    if (!card.classList.contains('card-glow')) {
      card.classList.add('card-glow');
    }
  });

  // Add glow to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (!link.classList.contains('glow-hover')) {
      link.classList.add('glow-hover');
    }
  });
}

// Run on page load
addGlowToElements();

// Re-run when DOM changes (for dynamic content)
const observer = new MutationObserver(addGlowToElements);
observer.observe(document.body, { childList: true, subtree: true });

// ============================================
// CURSOR TRAIL EFFECT (PETS)
// ============================================

let lastTrailTime = 0;
const trailInterval = 50; // milliseconds between trail particles

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  
  if (currentTime - lastTrailTime > trailInterval) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    // Remove trail after animation
    setTimeout(() => {
      trail.remove();
    }, 500);
    
    lastTrailTime = currentTime;
  }
});

// Enlarge cursor glow on hover over interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.matches('a, button, .btn, .edu-card, .timeline-item, .achievement-card')) {
    cursorGlow.style.width = '60px';
    cursorGlow.style.height = '60px';
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.matches('a, button, .btn, .edu-card, .timeline-item, .achievement-card')) {
    cursorGlow.style.width = '30px';
    cursorGlow.style.height = '30px';
  }
});