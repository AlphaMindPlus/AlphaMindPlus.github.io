import './jobs.js';

const THEME_STORAGE_KEY = 'alphamindplus-theme';
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const applyTheme = (theme) => {
  body.classList.toggle('theme-light', theme === 'light');
  body.classList.toggle('theme-dark', theme === 'dark');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? 'Dark mode' : 'Light mode';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  }
};

const getPreferredTheme = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initTheme = () => {
  applyTheme(getPreferredTheme());
};

const toggleTheme = () => {
  const nextTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
};

const setupThemeToggle = () => {
  if (!themeToggle) return;
  themeToggle.addEventListener('click', toggleTheme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
};

const setupMobileMenu = () => {
  const mtButtons = document.querySelectorAll('#mobileToggle');
  mtButtons.forEach((mt) => {
    mt.addEventListener('click', () => {
      const header = mt.closest('.nav');
      const expanded = mt.getAttribute('aria-expanded') === 'true';
      mt.setAttribute('aria-expanded', String(!expanded));
      if (header) {
        header.classList.toggle('open');
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav.open').forEach((nav) => nav.classList.remove('open'));
      document.querySelectorAll('#mobileToggle').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    }
  });
};

const initLoader = () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader && loader.remove(), 600);
};

const animateCounters = () => {
  document.querySelectorAll('.num').forEach((el) => {
    const target = Number(el.getAttribute('data-target')) || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const update = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(update);
      }
    };
    update();
  });
};

const setupParticles = () => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const particles = [];

  const resize = () => {
    width = canvas.width = canvas.clientWidth;
    height = canvas.height = canvas.clientHeight;
  };

  const createParticles = () => {
    particles.length = 0;
    for (let i = 0; i < 70; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.8,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach((particle) => {
      particle.x += particle.dx;
      particle.y += particle.dy;
      if (particle.x < 0 || particle.x > width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > height) particle.dy *= -1;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,212,255,0.08)';
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };

  resize();
  createParticles();
  window.addEventListener('resize', resize);
  draw();
};

const setupReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

const setupEmailCopy = () => {
  const copyButton = document.getElementById('copyEmail');
  const message = document.getElementById('copyMessage');
  if (!copyButton) return;
  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      if (message) message.textContent = 'Email copied to clipboard.';
      copyButton.textContent = 'Copied';
      setTimeout(() => {
        copyButton.textContent = 'Copy email';
        if (message) message.textContent = '';
      }, 1800);
    } catch (error) {
      if (message) message.textContent = 'Copy failed. Please use the email link.';
    }
  });
};

const setYear = () => {
  document.querySelectorAll('#year,#year2,#year3').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupThemeToggle();
  setupMobileMenu();
  initLoader();
  setYear();
  animateCounters();
  setupParticles();
  setupReveal();
  setupEmailCopy();
});
