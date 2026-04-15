/**
 * main.js — Vanilla JavaScript para o Portfólio
 * 
 * Funcionalidades:
 * 1. Troca de idiomas (PT/EN) via objeto JSON sem reload
 * 2. Efeito de rastro de luz seguindo o mouse
 * 3. Cursor customizado na seção Skills (aumenta nos cards)
 * 4. Toggle do menu mobile
 */

/* ============================================================
   1. SISTEMA DE INTERNACIONALIZAÇÃO (i18n)
   ============================================================ */
const translations = {
  pt: {
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "hero.greeting": "// Olá, mundo! Eu sou",
    "hero.name": "Seu Nome",
    "hero.role": "Desenvolvedor Full Stack",
    "hero.subtitle": "Transformo ideias em experiências digitais com código limpo, arquitetura sólida e foco em performance.",
    "hero.cta": "Ver Projetos",
    "skills.label": "// Stack Técnica",
    "skills.desc": "Ferramentas e tecnologias que uso para construir soluções robustas e escaláveis.",
    "skills.cat.frontend": "⚡ Frontend",
    "skills.cat.backend": "🔧 Backend",
    "skills.cat.tools": "🛠 DevOps & Ferramentas",
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.greeting": "// Hello, world! I'm",
    "hero.name": "Your Name",
    "hero.role": "Full Stack Developer",
    "hero.subtitle": "I turn ideas into digital experiences with clean code, solid architecture and a focus on performance.",
    "hero.cta": "View Projects",
    "skills.label": "// Tech Stack",
    "skills.desc": "Tools and technologies I use to build robust and scalable solutions.",
    "skills.cat.frontend": "⚡ Frontend",
    "skills.cat.backend": "🔧 Backend",
    "skills.cat.tools": "🛠 DevOps & Tools",
  },
};

let currentLang = "pt";

/** Aplica traduções em todos os elementos com data-i18n */
function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

/** Troca o idioma ativo */
function setLanguage(lang) {
  currentLang = lang;
  applyTranslations(lang);

  // Atualiza botões ativos
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang);
  });

  // Atualiza atributo lang do HTML
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
}

/* ============================================================
   2. EFEITO DE RASTRO DE LUZ (Mouse Trail)
   ============================================================ */
function initMouseTrail() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const TRAIL_COUNT = 8;
  const TRAIL_DECAY = 0.15;
  const body = document.body;
  const trails = [];

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement("div");
    dot.className = "mouse-trail";
    dot.style.width = (8 - i * 0.8) + "px";
    dot.style.height = (8 - i * 0.8) + "px";
    body.appendChild(dot);
    trails.push(dot);
  }

  const positions = trails.map(() => ({ x: 0, y: 0 }));
  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trails.forEach((t) => t.classList.add("active"));
  });

  document.addEventListener("mouseleave", () => {
    trails.forEach((t) => t.classList.remove("active"));
  });

  function animate() {
    positions[0].x += (mouseX - positions[0].x) * TRAIL_DECAY;
    positions[0].y += (mouseY - positions[0].y) * TRAIL_DECAY;

    for (let i = 1; i < TRAIL_COUNT; i++) {
      positions[i].x += (positions[i - 1].x - positions[i].x) * TRAIL_DECAY;
      positions[i].y += (positions[i - 1].y - positions[i].y) * TRAIL_DECAY;
    }

    trails.forEach((dot, i) => {
      dot.style.transform = "translate(" + (positions[i].x - 4) + "px, " + (positions[i].y - 4) + "px)";
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ============================================================
   3. CURSOR CUSTOMIZADO (Skills Section)
   ============================================================ */
function initCustomCursor() {
  const section = document.getElementById("skills");
  if (!section || window.matchMedia("(pointer: coarse)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let cursorX = 0, cursorY = 0, targetX = 0, targetY = 0;
  const ease = 0.12;

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  section.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  section.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursor.classList.remove("hovering");
  });

  // Aumentar cursor ao entrar nos cards
  section.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    card.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });

  function animate() {
    cursorX += (targetX - cursorX) * ease;
    cursorY += (targetY - cursorY) * ease;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ============================================================
   4. MENU MOBILE
   ============================================================ */
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("open");
    menu.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Fechar ao clicar em links
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================================
   5. INICIALIZAÇÃO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Idioma
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  applyTranslations(currentLang);
  initMouseTrail();
  initCustomCursor();
  initMobileMenu();
});
