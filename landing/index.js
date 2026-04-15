// ===============================
// ESTADO GLOBAL
// ===============================

const openBtn = document.getElementById("openVideoBtn");
const modal = document.getElementById("videoModal");
const closeBtn = document.getElementById("closeVideo");
const overlay = document.getElementById("overlay");
const iframe = document.getElementById("videoFrame");

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay2 = document.getElementById('overlay2');
const sidebarClose = document.getElementById('sidebarClose');

// ===============================
// DADOS
// ===============================

const recursos = [
  { icone: './assets/fotos-site/beneficio-pais/seguranca-icon.png', titulo: 'Mais tempo e segurança', descricao: 'Sem dinheiro, sem cartão. Seu filho só diz o nome e pega o lanche.', cor: 'rosa' },
  { icone: './assets/fotos-site/beneficio-pais/carteira.png', titulo: 'Limite diário de gastos', descricao: 'Estabeleça limite de quanto seu filho pode gastar por dia', cor: 'azul' },
  { icone: './assets/fotos-site/beneficio-pais/garfo2.png', titulo: 'Lancheira digital', descricao: 'Reserve antecipadamente evitando filas, e selecionando o que o seu filho vai comer', cor: 'verde' },
  { icone: './assets/fotos-site/beneficio-pais/garfo.webp', titulo: 'Restrições alimentares', descricao: 'Bloqueie o consumo de alimentos em alguns dias ou sempre', cor: 'laranja' },
  { icone: './assets/fotos-site/beneficio-pais/grafico.webp', titulo: 'Relatório de consumo', descricao: 'Acompanhe o saldo, consumo e hábitos alimentares em tempo real', cor: 'roxo' },
  { icone: './assets/fotos-site/beneficio-pais/clube-bubbe.png', titulo: 'Clube Bubbe', descricao: 'Milhares de descontos e cursos gratuitos para você e seu filho.', cor: 'amarelo' }
];

const testimonials = [
  { name: 'Ana Paula Silva', role: 'Mãe do Pedro, 7 anos', avatar: './assets/fotos-site/pessoas-comentarios/ana.webp', rating: 5, text: 'Tirou minha dor de cabeça de ter que dar dinheiro. Consigo ver o que ela está consumindo.', alt: 'Foto de Ana Paula Silva', highlight: true },
  { name: 'Carlos Eduardo', role: 'Pai da Maria, 5 anos', avatar: './assets/fotos-site/pessoas-comentarios/carlos.webp', rating: 5, alt: 'Foto de Carlos Eduardo', text: 'Resolveu um problemão. Restringi os dias que ele pode consumir doces.' },
  { name: 'Mariana Costa', role: 'Mãe do Lucas, 6 anos', avatar: './assets/fotos-site/pessoas-comentarios/mariana.webp', rating: 5, alt: 'Foto de Mariana Costa', text: 'Facilitou a minha vida. Gostei!' },
  { name: 'Roberto Almeida', role: 'Pai da Sofia, 4 anos', avatar: './assets/fotos-site/pessoas-comentarios/roberto.webp', rating: 5, alt: 'Foto de Roberto Almeida', text: 'Aplicativo bom, prático, fácil manuseio...' },
  { name: 'Fernanda Lima', role: 'Mãe do Gabriel, 8 anos', avatar: './assets/fotos-site/pessoas-comentarios/fernanda.webp', rating: 5, alt: 'Foto de Fernanda Lima', text: 'Gostei. Meu filho tem mais tempo no recreio pra curtir com os amigos.' },
  { name: 'Diego Santos', role: 'Pai da Júlia, 5 anos', avatar: './assets/fotos-site/pessoas-comentarios/diego.webp', rating: 5, alt: 'Foto de Diego Santos', text: 'Ótimo para controlar os gastos e o que minha filha está comendo.' }
];

// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupVideoModal();
  setupFaq();
  setupIntersectionObserver();
  modalIndicacao();
  lazyRenderSections();
  setupFormIndicacao();
});

// ===============================
// LAZY RENDER — só renderiza quando a seção entra na viewport
// ===============================
function lazyRenderSections() {
  const recursosEl = document.getElementById("recursosContainer");
  const testimonialsEl = document.getElementById("testimonialsContainer");

  let recursosRendered = false;
  let testimonialsRendered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      if (entry.target === recursosEl && !recursosRendered) {
        recursosRendered = true;
        renderRecursos(recursosEl);
        observer.unobserve(entry.target);
      }

      if (entry.target === testimonialsEl && !testimonialsRendered) {
        testimonialsRendered = true;
        renderTestimonials(testimonialsEl);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });

  if (recursosEl) observer.observe(recursosEl);
  if (testimonialsEl) observer.observe(testimonialsEl);
}

// ===============================
// MENU
// ===============================
function setupMenu() {
  function openMenu() {
    sidebar.classList.add('active');
    overlay2.classList.add('active');
    menuToggle.classList.add('active');
  }

  function closeMenu() {
    sidebar.classList.remove('active');
    overlay2.classList.remove('active');
    menuToggle.classList.remove('active');
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('active') ? closeMenu() : openMenu();
  });

  sidebarClose.addEventListener('click', closeMenu);
  overlay2.addEventListener('click', closeMenu);

  sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

// ===============================
// NAVEGAÇÃO
// ===============================
function goTo(route) {
  if (route === "entrar") {
    window.location.href = "https://www.bubbe.com.br/login";
  } else if (route === "cadastrar") {
    window.location.href = "https://www.bubbe.com.br/pai/cadastro";
  } else if (route === "faq") {
    document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = route + ".html";
  }
}

// ===============================
// MODAL INDICAÇÃO
// ===============================
function modalIndicacao() {
  const balloon = document.getElementById("balloon");
  const closeBalloonBtn = document.getElementById("closeBalloonBtn");
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("modalIndicacao");
  const closeModalBtn = document.getElementById("closeModalBtn");

  closeBalloonBtn.addEventListener("click", () => {
    balloon.style.display = "none";
    closeBalloonBtn.style.display = "none";
    setTimeout(() => {
      balloon.style.display = "block";
      closeBalloonBtn.style.display = "block";
    }, 10000);
  });

  openModalBtn.addEventListener("click", () => modal.classList.add("show"));
  closeModalBtn.addEventListener("click", () => goTo("index"));

  modal.addEventListener("click", e => {
    if (e.target === modal) goTo("index");
  });
}

function setupFormIndicacao() {
  document.getElementById("formIndicacao").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = {
      nameEscola: document.getElementById("nomeEscola").value,
      contatoEscola: document.getElementById("contatoEscola").value
    };

    if (!formData.nameEscola || !formData.contatoEscola) {
      mostrarAlerta("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.contatoEscola) && !/^\d{10,}$/.test(formData.contatoEscola)) {
      mostrarAlerta("invalido");
      return;
    }

    if (formData.contatoEscola.length >= 10 && /^\d{10,}$/.test(formData.contatoEscola)) {
      formData.contatoEscola = formData.contatoEscola.replace(/\D/g, '');
    }


    axios.post("https://www.bubbe.com.br/api/public/send-indicacao", formData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        mostrarAlerta("success");
        setTimeout(() => goTo("index"), 2000);
      })
      .catch(error => {
        mostrarAlerta("error");
        console.error(error);
      });
  });
}


// ===============================
// ALERT 
// ===============================
function mostrarAlerta(response) {
  if (response == 'success') {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Sua mensagem foi enviada.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
  } else if (response == "invalido") {
    Swal.fire({
      title: 'Contato inválido!',
      text: 'Por favor, insira um contato válido.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  } else {
    Swal.fire({
      title: 'Erro!',
      text: 'Ocorreu um erro ao enviar sua solicitação.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}

// ===============================
// MODAL VÍDEO
// ===============================
function setupVideoModal() {
  const videoUrl = "https://www.youtube.com/embed/v27HCQo5JK0?autoplay=1";

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    iframe.src = videoUrl;
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    iframe.src = "";
  });

  overlay.addEventListener("click", () => {
    modal.classList.remove("active");
    iframe.src = "";
  });
}

// ===============================
// INTERSECTION OBSERVER — animação de entrada
// ===============================
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // para de observar após animar
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".flow-step, .alt-step")
    .forEach(el => observer.observe(el));
}

// ===============================
// RENDER RECURSOS — usa DocumentFragment para evitar reflows
// ===============================
function renderRecursos(container) {
  const fragment = document.createDocumentFragment();

  recursos.forEach(item => {
    const card = document.createElement("div");
    card.className = `card ${item.cor}`;
    card.innerHTML = `
      <div class="icone"><img src="${item.icone}" alt="${item.titulo}" loading="lazy" width="28" height="28"/></div>
      <div class="texto-test"><span>${item.titulo}</span><p>${item.descricao}</p></div>
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// ===============================
// RENDER TESTIMONIALS — usa DocumentFragment
// ===============================
function getStars(rating) {
  return '<svg class="star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'.repeat(rating);
}

function renderTestimonials(container) {
  const fragment = document.createDocumentFragment();

  testimonials.forEach((t, i) => {
    const card = document.createElement("div");
    card.className = "testimonial-card animate-fade-in-up" + (t.highlight ? " highlight" : "");
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      ${t.highlight ? '<span class="highlight-badge">Destaque</span>' : ""}
      <div class="stars">${getStars(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="author">
        <div class="avatar"><img src="${t.avatar}" alt="${t.alt}" loading="lazy" width="48" height="48"/></div>
        <div class="author-info"><span>${t.name}</span><p>${t.role}</p></div>
      </div>
      <div class="card-overlay"></div>
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// ===============================
// FAQ
// ===============================
function setupFaq() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  // Pré-calcula scrollHeight de todos os itens uma única vez para evitar reflow por clique
  const heights = new Map();
  // Usa requestAnimationFrame para não bloquear a thread no carregamento
  requestAnimationFrame(() => {
    accordionItems.forEach(item => {
      const content = item.querySelector(".accordion-content");
      // Abre temporariamente para medir, sem causar reflow visível
      content.style.maxHeight = 'none';
      heights.set(item, content.scrollHeight);
      content.style.maxHeight = null;
    });
  });

  accordionItems.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      accordionItems.forEach(i => {
        i.classList.remove("open");
        i.querySelector(".accordion-content").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        // Usa o valor pré-calculado se disponível, senão mede na hora
        content.style.maxHeight = (heights.get(item) || content.scrollHeight) + "px";
      }
    });
  });
}
