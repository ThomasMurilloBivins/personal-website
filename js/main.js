/* ── Data ── */
const projects = [
  {
    icon: "🌐",
    title: "Personal Website",
    description: "Built and designed this portfolio from scratch using HTML, CSS, and vanilla JavaScript — featuring a particle canvas, scroll animations, and a fully responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    icon: "🏆",
    title: "NCL — Fall 2025",
    description: "Individual CTF competition assessing real-world cybersecurity skills aligned to the NIST NICE Framework. Achieved Top 2% nationally with 2,440 points.",
    tech: ["Cryptography", "Log Analysis", "Recon"]
  },
  {
    icon: "🏆",
    title: "NCL — Spring 2025",
    description: "Individual CTF competition with national rank 234 out of 8,573 competitors (Top 2%). Hands-on work across cryptography, forensics, password cracking, and web exploitation.",
    tech: ["Log Analysis", "OSINT", "Web Exploitation"]
  },
  {
    icon: "🤖",
    title: "AI Cybersecurity Research",
    description: "Original research on AI-driven attack surfaces and adversarial AI capabilities. Published at RAITE Symposium 2025 and the Georgia Undergraduate Research Conference 2025.",
    tech: ["Adversarial AI", "LLMs", "Security Research"]
  }
];

const honors = [
  { icon: "📋", title: "President's List — Fall 2025", detail: "4.0 GPA · University of North Georgia" },
  { icon: "🏅", title: "National Cyber Scholar with Honors", detail: "$9,000 National Cyber Scholarship Foundation" },
  { icon: "🥇", title: "1st Place — Georgia Cyber Center CTF", detail: "Top finish in regional competition" },
  { icon: "🥈", title: "2nd Place — TechNet CTF", detail: "Runner-up in regional competition" },
  { icon: "🎓", title: "UNG Presidential Scholarship", detail: "Merit-based academic scholarship" },
  { icon: "🎓", title: "Zell Miller Scholarship", detail: "Georgia merit scholarship" },
  { icon: "🎓", title: "Watson-Brown Scholarship", detail: "Competitive regional scholarship" },
  { icon: "🎓", title: "CyberStart Scholarship", detail: "Awarded for cybersecurity aptitude" },
  { icon: "🌐", title: "National Cyber Scholar — 2× Honoree", detail: "2024 & 2025 cohorts" },
  { icon: "🔬", title: "Honors Program — UNG", detail: "Selective academic honors cohort" },
  { icon: "🛡️", title: "CLDP — Cyber Leadership Development Program", detail: "University of North Georgia" },
  { icon: "📖", title: "Published Researcher", detail: "RAITE Symposium 2025 · GURC 2025" },
  { icon: "👤", title: "First-Generation College Student Recognition", detail: "Recognized by university" },
  { icon: "🎖️", title: "Top 3 High School Graduate — Class of 2025", detail: "4.0 GPA throughout high school" }
];

/* ── Render Projects ── */
const projectsGrid = document.getElementById("projects-grid");
projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.style.transitionDelay = `${i * 80}ms`;
  card.innerHTML = `
    <div class="project-card-header">
      <span class="project-icon">${p.icon}</span>
    </div>
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="project-tech">
      ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
    </div>
  `;
  projectsGrid.appendChild(card);
});

/* ── Render Honors ── */
const honorsGrid = document.getElementById("honors-grid");
honors.forEach((h, i) => {
  const card = document.createElement("div");
  card.className = "honor-card";
  card.style.transitionDelay = `${i * 50}ms`;
  card.innerHTML = `
    <span class="honor-icon">${h.icon}</span>
    <div class="honor-body">
      <h3>${h.title}</h3>
      <p>${h.detail}</p>
    </div>
  `;
  honorsGrid.appendChild(card);
});

/* ── Footer Year ── */
document.getElementById("footer-year").textContent = new Date().getFullYear();

/* ── Header Scroll State ── */
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ── Mobile Nav ── */
const hamburger = document.getElementById("nav-hamburger");
const navLinks  = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal, .project-card, .honor-card").forEach(el => {
  revealObserver.observe(el);
});

/* ── Hero Particle Canvas ── */
(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles;
  const PARTICLE_COUNT = 70;
  const CONNECT_DIST   = 130;
  const ACCENT         = "0, 212, 255";

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randomParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.5 + 0.5
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move & wrap
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT}, 0.5)`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  }, { passive: true });

  init();
  draw();
})();
