// ===============================
// ESTADO GLOBAL
// ===============================

// MODAL VIDEO ESTADO
const openBtn = document.getElementById("openVideoBtn");
const modal = document.getElementById("videoModal");
const closeBtn = document.getElementById("closeVideo");
const overlay = document.getElementById("overlay");
const iframe = document.getElementById("videoFrame");


// CARROSSEL ESTADO
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const carousel = document.getElementById("carousel");

let currentIndex = 0;
let startX = 0;


// ASIDE MENU ESTADO
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay2 = document.getElementById('overlay2');
const sidebarClose = document.getElementById('sidebarClose');



// ===============================
// DADOS
// ===============================

const items = [
    {
        imagem: "./assets/fotos-site/fotos-carrossel/ResumeVendas.png",
        titulo: "Controle de vendas, recargas e fluxo de caixa ",
        descricao:
            "Este é o primeiro item do carrossel. Um texto de exemplo para descrever a imagem.",
    },
    {
        imagem: "./assets/fotos-site/fotos-carrossel/Pdv.png",
        titulo: "PDV completo - alunos e colaboradores ",
        descricao: "Aqui temos o segundo item. O texto muda junto com a imagem.",
    },
    {
        imagem: "./assets/fotos-site/fotos-carrossel/Faturamento.png",
        titulo: "Terceiro Slide",
        descricao:
            "E este é o terceiro item, com outra imagem e descrição diferentes.",
    },
    {
        imagem: "./assets/fotos-site/fotos-carrossel/ControleEstoque.png",
        titulo: "Gestão de estoque",
        descricao:
            "E este é o quarto item, com outra imagem e descrição diferentes.",
    },
];

const testimonials = [
    {
        name: 'Joana Silva',
        role: 'Proprietária de Cantina',
        avatar: './assets/fotos-site/pessoas-comentarios/joana.webp',
        alt: 'Foto de Joana Silva',
        rating: 5,
        text: 'Agora consigo controlar as vendas e saber exatamente para onde o dinheiro está indo.',
        highlight: true
    },
    {
        name: 'Anderson Pereira',
        role: 'Canteineiro',
        avatar: './assets/fotos-site/pessoas-comentarios/anderson.webp',
        alt: 'Foto de Anderson Pereira',
        rating: 5,
        text: 'Facilitou as compras e acabou com a confusão no caixa. Além de diminuir muito as filas!'
    },
    {
        name: 'Luiza Barcelos',
        role: 'Proprietária de Cantina',
        avatar: './assets/fotos-site/pessoas-comentarios/luiza.webp',
        rating: 5,
        alt: 'Foto de Luiza Barcelos',
        text: 'Consigo ver vendas, estoque e faturamento de forma clara e rápida.'
    },
    {
        name: 'João Batista',
        role: 'Proprietário de Cantina',
        avatar: './assets/fotos-site/pessoas-comentarios/joao.webp',
        rating: 5,
        alt: 'Foto de João Batista',
        text: 'O PDV é simples e resolveu nosso problema de controle diário.'
    },
    {
        name: 'Angélica Moura',
        role: 'Responsável pela cantina',
        avatar: './assets/fotos-site/pessoas-comentarios/angelica.webp',
        rating: 5,
        alt: 'Foto de Angélica Moura',
        text: 'Antes era tudo manual, hoje tenho controle total do fluxo de caixa.'
    },
    {
        name: 'Marcos Ferreira',
        role: 'Proprietário de Cantina',
        avatar: './assets/fotos-site/pessoas-comentarios/marcos.webp',
        rating: 5,
        alt: 'Foto de Marcos Ferreira',
        text: 'A gestão de estoque me ajuda a evitar desperdícios e planejar melhor as compras.'
    }
]


// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    renderTestimonials();
    renderFaq();
    setupIntersectionObserver();
});



// ===============================
// MODAL VÍDEO
// ===============================

const videoUrl = "https://www.youtube.com/embed/v27HCQo5JK0?autoplay=1";

function openVideoModal() {
    modal.classList.add("active");
    iframe.src = videoUrl;
}

function closeVideoModal() {
    modal.classList.remove("active");
    iframe.src = "";
}

openBtn.addEventListener("click", openVideoModal);
closeBtn.addEventListener("click", closeVideoModal);
overlay.addEventListener("click", closeVideoModal);


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
    }

    else if (response == "invalido") {
        Swal.fire({
            title: 'Contato inválido!',
            text: 'Por favor, insira um contato válido.',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
    else {
        Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao enviar sua solicitação.',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}


// ===============================
// LEAD
// ===============================

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    const formData = {
        name: name,
        email: email
    };

    if (!name || !email) {
        mostrarAlerta("invalido");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email) && !/^\d{10,}$/.test(formData.email)) {
        mostrarAlerta("invalido");
        return;
    }

    // if (!validateEmail(formData.email)) {
    //     mostrarAlerta("email");
    //     return;
    // }

    submitBtn.disabled = true;
    submitBtn.innerText = "Enviando...";

    try {

        axios.post("https://www.bubbe.com.br/api/public/send-lead", formData, {
            headers: { 'Content-Type': 'application/json' }
        });

        mostrarAlerta("success");
        form.reset();

    } catch (err) {

        console.error(err);
        mostrarAlerta("error");

    } finally {

        submitBtn.disabled = false;
        submitBtn.innerText = "Enviar";

    }

});


// function validateEmail(email) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }



// =========================
// ASIDE MENU
// ==========================



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

menuToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

sidebarClose.addEventListener('click', closeMenu);
overlay2.addEventListener('click', closeMenu);

// Fecha menu ao clicar em links
sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
});



// ===============================
//  CARROSSEL FUNCIONALIDADES
// ===============================

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    indicators.forEach(indicator => {
        indicator.classList.remove("active");
    });

    slides[index].classList.add("active");
    indicators[index].classList.add("active");

}

function nextImage() {

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);

}

function prevImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    showSlide(currentIndex);

}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

indicators.forEach((indicator) => {

    indicator.addEventListener("click", function () {

        const index = parseInt(this.getAttribute("data-slide"));
        currentIndex = index;
        showSlide(currentIndex);

    });

});

carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {

    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        nextImage();
    }

    if (endX - startX > 50) {
        prevImage();
    }

});



// ===============================
// TAKE STARS
// ===============================

function getStars(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += `
        <svg class="star" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 
                     1.18 6.88L12 17.77l-6.18 3.25L7 
                     14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        `;
    }
    return stars;
}



// ===============================
// RENDERIZAÇÃO
// ===============================
function renderTestimonials() {

    const container = document.getElementById("testimonialsContainer");

    testimonials.forEach((t, i) => {

        const card = document.createElement("div");

        card.className = "testimonial-card animate-fade-in-up";

        // Highlight
        if (t.highlight) {
            card.classList.add("highlight");
        }

        // Animation delay (mantém seu efeito CSS)
        card.style.animationDelay = `${i * 0.1}s`;

        card.innerHTML = `
            ${t.highlight ? `<span class="highlight-badge">Destaque</span>` : ""}

            <div class="stars">
                ${getStars(t.rating)}
            </div>

            <p class="testimonial-text">"${t.text}"</p>

            <div class="author">
                <div class="avatar">
                    <img src="${t.avatar}" alt="${t.alt}" />
                </div>
                <div class="author-info">
                    <span>${t.name}</span>
                    <p>${t.role}</p>
                </div>
            </div>

            <div class="card-overlay"></div>
        `;

        container.appendChild(card);
    });
}




// ===============================
// FAQ TESTIMONIALS
// ===============================

function renderFaq() {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {

        const trigger = item.querySelector(".accordion-trigger");
        const content = item.querySelector(".accordion-content");

        trigger.addEventListener("click", function () {

            const isOpen = item.classList.contains("open");

            // Fecha todos (comportamento tipo FAQ profissional)
            accordionItems.forEach(i => {
                i.classList.remove("open");
                i.querySelector(".accordion-content").style.maxHeight = null;
            });

            // Se não estava aberto, abre
            if (!isOpen) {
                item.classList.add("open");
                content.style.maxHeight = content.scrollHeight + "px";
            }

        });
    });
}

// ===============================
// NAVEGAÇÃO
// ===============================

function goTo(route) {

    if (route == "entrar") {
        window.location.href = "https://www.bubbe.com.br/login";
    } else if (route == "cadastrar") {
        window.location.href = "https://www.bubbe.com.br/pai/cadastro";
    } else if (route == "faq") {
        document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
    } else if (route == "video") {
        document.getElementById("video").scrollIntoView({ behavior: "smooth" });
    } else {
        window.location.href = route + ".html";
    }
}

// ===============================
// INTERSECTION OBSERVER
// ===============================
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".flow-step, .alt-step")
        .forEach(el => observer.observe(el));
}