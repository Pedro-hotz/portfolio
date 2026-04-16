/**
 * main.js — Portfolio Vanilla JavaScript
 * Funcionalidades: i18n, mouse trail, custom cursor, filter, form validation, terminal
 */

/* ============================================================
   1. TRANSLATIONS (i18n)
   ============================================================ */
const translations = {
  pt: {
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "hero.greeting": "// Olá, mundo! Eu sou",
    "hero.name": "Pedro Ferreira Hotz",
    "hero.role": "Desenvolvedor Full Stack",
    "hero.subtitle": "Transformo ideias em experiências digitais com código limpo, arquitetura sólida e foco em performance.",
    "hero.cta": "Ver Projetos",
    "skills.label": "// Stack Técnica",
    "skills.desc": "Ferramentas e tecnologias que uso para construir soluções robustas e escaláveis.",
    "skills.cat.frontend": "⚡ Frontend",
    "skills.cat.backend": "🔧 Backend",
    "skills.cat.tools": "🛠 DevOps & Ferramentas",
    "projects.label": "// Portfólio",
    "projects.title.pre": "Meus ",
    "projects.title.accent": "Projetos",
    "projects.desc": "Uma seleção dos meus trabalhos mais recentes em desenvolvimento web.",
    "projects.filter.all": "Todos",
    "projects.filter.frontend": "Frontend",
    "projects.filter.backend": "Backend",
    "projects.btn.code": "Código",
    "projects.btn.demo": "Demo",
    "contact.label": "// Fale Comigo",
    "contact.title.pre": "Entre em ",
    "contact.title.accent": "Contato",
    "contact.desc": "Tem um projeto em mente? Vamos conversar!",
    "contact.name": "Nome",
    "contact.email": "E-mail",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.success": "Mensagem enviada com sucesso!",
    "contact.error.name": "Por favor, insira seu nome.",
    "contact.error.email": "Por favor, insira um e-mail válido.",
    "contact.error.message": "Por favor, insira uma mensagem.",
    "social.title": "Redes Sociais",
    "terminal.welcome": "Bem-vindo ao meu terminal! Digite 'help' para ver os comandos.",
    "terminal.help.title": "Comandos disponíveis:",
    "terminal.help.cv": "cv        — Baixar meu currículo",
    "terminal.help.socials": "socials   — Ver minhas redes sociais",
    "terminal.help.clear": "clear     — Limpar o terminal",
    "terminal.help.about": "about     — Sobre mim",
    "terminal.cv.fetching": "Fetching currículo",
    "terminal.cv.done": "✓ Download completo! Abrindo arquivo...",
    "terminal.socials.title": "🌐 Minhas Redes:",
    "terminal.about": "Desenvolvedor Full Stack apaixonado por criar soluções elegantes.",
    "terminal.unknown": "Comando não reconhecido. Digite 'help' para ver os comandos.",
    "footer.copy": "Todos os direitos reservados.",
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.greeting": "// Hello, world! I'm",
    "hero.name": "Pedro Ferreira Hotz",
    "hero.role": "Full Stack Developer",
    "hero.subtitle": "I turn ideas into digital experiences with clean code, solid architecture and a focus on performance.",
    "hero.cta": "View Projects",
    "skills.label": "// Tech Stack",
    "skills.desc": "Tools and technologies I use to build robust and scalable solutions.",
    "skills.cat.frontend": "⚡ Frontend",
    "skills.cat.backend": "🔧 Backend",
    "skills.cat.tools": "🛠 DevOps & Tools",
    "projects.label": "// Portfolio",
    "projects.title.pre": "My ",
    "projects.title.accent": "Projects",
    "projects.desc": "A selection of my most recent work in web development.",
    "projects.filter.all": "All",
    "projects.filter.frontend": "Frontend",
    "projects.filter.backend": "Backend",
    "projects.btn.code": "Code",
    "projects.btn.demo": "Demo",
    "contact.label": "// Get in Touch",
    "contact.title.pre": "Get in ",
    "contact.title.accent": "Touch",
    "contact.desc": "Have a project in mind? Let\'s talk!",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error.name": "Please enter your name.",
    "contact.error.email": "Please enter a valid email.",
    "contact.error.message": "Please enter a message.",
    "social.title": "Social Networks",
    "terminal.welcome": "Welcome to my terminal! Type 'help' to see available commands.",
    "terminal.help.title": "Available commands:",
    "terminal.help.cv": "cv        — Download my resume",
    "terminal.help.socials": "socials   — See my social networks",
    "terminal.help.clear": "clear     — Clear the terminal",
    "terminal.help.about": "about     — About me",
    "terminal.cv.fetching": "Fetching resume",
    "terminal.cv.done": "✓ Download complete! Opening file...",
    "terminal.socials.title": "🌐 My Networks:",
    "terminal.about": "Full Stack Developer passionate about creating elegant solutions.",
    "terminal.unknown": "Command not recognized. Type 'help' to see available commands.",
    "footer.copy": "All rights reserved.",
  }
};

let currentLang = localStorage.getItem("portfolio-lang") || "pt";

/* Aplicar traduções a todos elementos com data-i18n */
function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key && translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

/* Trocar idioma */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("portfolio-lang", lang);
  applyTranslations(lang);
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang);
  });
  /* Update terminal welcome on lang change */
  const termBody = document.getElementById("terminal-body");
  if (termBody && termBody.children.length === 1) {
    termBody.querySelector(".terminal-line .info").textContent = translations[lang]["terminal.welcome"];
  }
}

/* ============================================================
   2. MOUSE TRAIL
   ============================================================ */
function initMouseTrail() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const TRAIL_COUNT = 8;
  const TRAIL_DECAY = 0.15;
  const container = document.querySelector(".portfolio-root");
  const trails = [];

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement("div");
    dot.className = "mouse-trail";
    dot.style.width = (8 - i * 0.8) + "px";
    dot.style.height = (8 - i * 0.8) + "px";
    container.appendChild(dot);
    trails.push(dot);
  }

  const positions = trails.map(() => ({ x: 0, y: 0 }));
  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX; mouseY = e.clientY;
    trails.forEach(t => t.classList.add("active"));
  });
  document.addEventListener("mouseleave", () => {
    trails.forEach(t => t.classList.remove("active"));
  });

  function animate() {
    positions[0].x += (mouseX - positions[0].x) * TRAIL_DECAY;
    positions[0].y += (mouseY - positions[0].y) * TRAIL_DECAY;
    for (let i = 1; i < TRAIL_COUNT; i++) {
      positions[i].x += (positions[i - 1].x - positions[i].x) * TRAIL_DECAY;
      positions[i].y += (positions[i - 1].y - positions[i].y) * TRAIL_DECAY;
    }
    trails.forEach((dot, i) => {
      dot.style.transform = `translate(${positions[i].x - 4}px, ${positions[i].y - 4}px)`;
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ============================================================
   3. CUSTOM CURSOR (Skills Section)
   ============================================================ */
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const section = document.getElementById("skills");
  if (!section) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let cursorX = 0, cursorY = 0, targetX = 0, targetY = 0;
  const ease = 0.12;

  document.addEventListener("mousemove", e => { targetX = e.clientX; targetY = e.clientY; });
  section.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
  section.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; cursor.classList.remove("hovering"); });

  section.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    card.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });

  cursor.style.opacity = "0";
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
   4. PROJECT FILTERS
   ============================================================ */
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === "all" || cat === filter || cat === "fullstack";
        if (show) {
          card.classList.remove("hidden");
          card.classList.add("fade-in");
        } else {
          card.classList.add("hidden");
          card.classList.remove("fade-in");
        }
      });
    });
  });
}

/* ============================================================
   5. CONTACT FORM (Float Label + Regex Validation)
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const emailInput = document.getElementById("contact-email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* Validação em tempo real do email */
  emailInput.addEventListener("input", () => {
    const val = emailInput.value;
    emailInput.classList.remove("valid", "invalid");
    if (val.length === 0) return;
    emailInput.classList.add(emailRegex.test(val) ? "valid" : "invalid");
  });

  /* Submit */
  form.addEventListener("submit", e => {
    e.preventDefault();
    const t = translations[currentLang];
    const nameInput = document.getElementById("contact-name");
    const msgInput = document.getElementById("contact-message");
    let hasError = false;

    /* Clear errors */
    form.querySelectorAll(".form-error").forEach(el => el.classList.remove("visible"));

    if (!nameInput.value.trim()) {
      nameInput.nextElementSibling.nextElementSibling.textContent = t["contact.error.name"];
      nameInput.nextElementSibling.nextElementSibling.classList.add("visible");
      hasError = true;
    }
    if (!emailRegex.test(emailInput.value)) {
      emailInput.nextElementSibling.nextElementSibling.textContent = t["contact.error.email"];
      emailInput.nextElementSibling.nextElementSibling.classList.add("visible");
      hasError = true;
    }
    if (!msgInput.value.trim()) {
      msgInput.nextElementSibling.nextElementSibling.textContent = t["contact.error.message"];
      msgInput.nextElementSibling.nextElementSibling.classList.add("visible");
      hasError = true;
    }

    if (hasError) return;

    const btn = form.querySelector(".btn-submit");
    btn.disabled = true;
    btn.querySelector("span:first-child").textContent = t["contact.sending"];

    setTimeout(() => {
      btn.disabled = false;
      btn.querySelector("span:first-child").textContent = t["contact.send"];
      form.reset();
      emailInput.classList.remove("valid", "invalid");
      const success = form.querySelector(".form-success");
      success.textContent = t["contact.success"];
      success.classList.add("visible");
      setTimeout(() => success.classList.remove("visible"), 4000);
    }, 1500);
  });
}

/* ============================================================
   6. TERMINAL EASTER EGG
   ============================================================ */
function initTerminal() {
  const body = document.getElementById("terminal-body");
  const input = document.getElementById("terminal-input");
  if (!body || !input) return;

  const socials = [
    { label: "GitHub", handle: "@seuusuario" },
    { label: "LinkedIn", handle: "@seuusuario" },
    { label: "WhatsApp", handle: "+55 11 99999-9999" },
    { label: "E-mail", handle: "seu@email.com" },
    { label: "Instagram", handle: "@seuusuario" },
  ];

  function addLine(type, text) {
    const div = document.createElement("div");
    div.className = "terminal-line";
    if (type === "prompt") {
      div.innerHTML = '<span class="prompt">❯</span><span class="cmd-text">' + escapeHtml(text) + '</span>';
    } else {
      div.innerHTML = '<span class="' + type + '">' + escapeHtml(text) + '</span>';
    }
    body.insertBefore(div, body.lastElementChild);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function escapeHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function runCv() {
    const t = translations[currentLang];
    const fetchText = t["terminal.cv.fetching"];
    const line = addLine("progress", fetchText + " [----------] 0%");
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;
      const filled = Math.floor(progress / 10);
      const bar = "#".repeat(filled) + "-".repeat(10 - filled);
      line.querySelector("span").textContent = fetchText + " [" + bar + "] " + progress + "%";
      body.scrollTop = body.scrollHeight;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          addLine("success", t["terminal.cv.done"]);
          /* Aqui dispararia o download real: window.open("./assets/curriculo.pdf") */
        }, 300);
      }
    }, 200);
  }

  /* Welcome message */
  addLine("info", translations[currentLang]["terminal.welcome"]);

  input.addEventListener("keydown", e => {
    if (e.key !== "Enter" || !input.value.trim()) return;
    const cmd = input.value.trim();
    const trimmed = cmd.toLowerCase();
    input.value = "";

    addLine("prompt", cmd);
    const t = translations[currentLang];

    switch (trimmed) {
      case "help":
        addLine("info", t["terminal.help.title"]);
        addLine("output", t["terminal.help.cv"]);
        addLine("output", t["terminal.help.socials"]);
        addLine("output", t["terminal.help.clear"]);
        addLine("output", t["terminal.help.about"]);
        break;
      case "cv":
        runCv();
        break;
      case "socials":
        addLine("info", t["terminal.socials.title"]);
        socials.forEach(s => addLine("output", "  " + s.label + ": " + s.handle));
        break;
      case "clear":
        /* Remove tudo exceto input line */
        while (body.children.length > 1) body.removeChild(body.firstChild);
        break;
      case "about":
        addLine("info", t["terminal.about"]);
        break;
      default:
        addLine("error", t["terminal.unknown"]);
    }
  });

  body.addEventListener("click", () => input.focus());
}

/* ============================================================
   7. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      toggle.classList.remove("open");
      menu.classList.remove("open");
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations(currentLang);
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.dataset.lang === currentLang) btn.classList.add("active");
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  initMouseTrail();
  initCustomCursor();
  initFilters();
  initContactForm();
  initTerminal();
  initMobileMenu();
});
