# 🍎 Bubbe — Plataforma de Gestão para Cantinas Escolares

> Site institucional da Bubbe: solução digital que conecta pais, cantinas e escolas em um único ecossistema, eliminando dinheiro físico, reduzindo filas e oferecendo controle total sobre o consumo dos alunos.

[![Deploy](https://img.shields.io/badge/deploy-AWS%20S3%20%2B%20CloudFront-orange)](https://bubbe.com.br)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Descrição

A **Bubbe** é uma plataforma web institucional com duas páginas principais, cada uma voltada a um público distinto:

- **`index.html`** — Página para **pais e responsáveis**: apresenta o app mobile, benefícios, fluxo de uso, depoimentos e FAQ
- **`cantinas-escolas.html`** — Página para **cantinas e escolas**: apresenta o sistema de gestão, benefícios financeiros, carrossel de funcionalidades, formulário de captação de leads e depoimentos de cantineiros

### Problema que resolve

| Público | Dor | Solução |
|---|---|---|
| Pais | Dinheiro perdido, sem controle do consumo | Carteira virtual, limites diários, restrições alimentares |
| Cantinas | Filas, falta de troco, gestão manual | PDV digital, reserva antecipada, totem de autoatendimento |
| Escolas | Recreio curto, insegurança | Fluxo ágil, sem dinheiro físico circulando |

---

## 🎬 Fluxos de Uso

**Fluxo padrão:**
```
Pai faz recarga → Aluno vai ao totem → Seleciona produtos → Retira na cantina
```

**Fluxo com lancheira digital (reserva antecipada):**
```
Pai reserva no app → Cantina prepara → Aluno retira direto (sem fila)
```

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Markup | HTML5 semântico |
| Estilo | CSS3 com variáveis customizadas |
| Lógica | JavaScript Vanilla (ES6+) |
| HTTP | [Axios](https://axios-http.com/) |
| Alertas | [SweetAlert2](https://sweetalert2.github.io/) |
| Tipografia | Google Fonts — Nunito |
| Infra | AWS S3 + CloudFront |
| Build | Node.js (scripts de sitemap e CSS) |

---

## 📁 Estrutura do Projeto

```
bubbe-website/
├── assets/
│   ├── css/
│   │   ├── style.css               # Estilos da página de pais (minificado)
│   │   └── cantinas-escolas.css    # Estilos da página de cantinas
│   └── fotos-site/
│       ├── beneficio-pais/         # Ícones dos cards de benefícios (pais)
│       ├── beneficios/             # Ícones dos cards de benefícios (cantinas)
│       ├── fotos-carrossel/        # Screenshots do sistema (carrossel)
│       ├── pessoas-comentarios/    # Avatares dos depoimentos
│       ├── rede-parceirias/        # Logos da rede de parceiros
│       └── totem/                  # Imagens do fluxo de uso do totem
│
├── script/
│   ├── generate-sitemap.js         # Gera sitemap.xml automaticamente
│   ├── clean-css.ps1               # Remove CSS não utilizado (passo 1)
│   ├── clean-css2.ps1              # Remove CSS não utilizado (passo 2)
│   ├── minify-css.ps1              # Minifica style.css
│   └── minify-inline-css.ps1      # Minifica CSS inline do <head>
│
├── index.html                      # Página: Pais e Alunos
├── index.js                        # Lógica da página de pais
├── cantinas-escolas.html           # Página: Cantinas e Escolas
├── cantinas-escolas.js             # Lógica da página de cantinas
│
├── sitemap.xml                     # Gerado via script (não editar manualmente)
├── robots.txt                      # Instruções para crawlers
├── favicon.ico
├── taks.md                         # Backlog de melhorias técnicas
└── README.md
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

- Node.js v14+ (apenas para scripts de build)
- Qualquer servidor HTTP local

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/bubbetecnologia/bubbe-landing-page.git
cd bubbe-website

# 2. Suba um servidor local (escolha uma opção)
npx http-server -p 8000
# ou
python -m http.server 8000

# 3. Acesse
# http://localhost:8000
```

> Não há `npm install` necessário para rodar o site. O Node.js é usado apenas para os scripts de build.

---

## ⚙️ Configuração

O projeto não usa `.env`. As configurações estão nos arquivos JS:

```javascript
// Endpoints da API (index.js / cantinas-escolas.js)
POST https://www.bubbe.com.br/api/public/send-indicacao  // indicação de escola
POST https://www.bubbe.com.br/api/public/send-lead       // captação de leads

// Vídeo institucional
https://www.youtube.com/embed/v27HCQo5JK0?autoplay=1
```

---

## 📜 Scripts

### `node script/generate-sitemap.js`

Varre a raiz do projeto, encontra todos os `.html` e gera o `sitemap.xml` com URLs, datas e prioridades.

```bash
node script/generate-sitemap.js
# ✅ Sitemap gerado!
```

### Scripts PowerShell (CSS)

| Script | Função |
|---|---|
| `clean-css.ps1` | Remove blocos CSS exclusivos de `cantinas-escolas.html` do `style.css` |
| `clean-css2.ps1` | Segunda passagem de limpeza de CSS morto |
| `minify-css.ps1` | Minifica `style.css` |
| `minify-inline-css.ps1` | Minifica o CSS inline do `<head>` do `index.html` |

---

## 🌐 Deploy

### Fluxo atual (AWS S3 + CloudFront)

```bash
# 1. Antes de commitar na main, sempre gerar o sitemap
node script/generate-sitemap.js

# 2. Commit e push
git add .
git commit -m "feat: descrição da mudança"
git push origin main
```

O push para `main` dispara o deploy automático.

### Deploy manual via AWS CLI

```bash
# Sincronizar arquivos com o bucket S3
aws s3 sync . s3://seu-bucket \
  --exclude ".git/*" \
  --exclude "script/*" \
  --exclude "*.md" \
  --cache-control "public, max-age=31536000"

# Invalidar cache do CloudFront
aws cloudfront create-invalidation \
  --distribution-id SEU_DISTRIBUTION_ID \
  --paths "/*"
```

---

## 🎨 Boas Práticas

### Performance (Lighthouse)

- CSS separado por página (`style.css` vs `cantinas-escolas.css`) para evitar CSS não utilizado
- CSS crítico inline no `<head>` (header/nav), restante carregado com `preload`
- Imagens com `loading="lazy"` abaixo do fold e `fetchpriority="high"` no LCP
- `IntersectionObserver` para lazy render de cards e depoimentos (só renderiza ao entrar na viewport)
- `DocumentFragment` nos renders de lista para evitar reflows em loop
- `will-change: transform, opacity` e `contain: layout style` nos elementos animados
- Scripts carregados com `defer`

### SEO

- Schema.org (JSON-LD) para rich snippets
- Meta tags Open Graph completas
- `sitemap.xml` gerado automaticamente
- Tags canônicas em todas as páginas

### Acessibilidade

- `aria-label` em todos os botões e links interativos
- Atributos `alt` descritivos em todas as imagens
- Estrutura semântica com `<header>`, `<main>`, `<section>`, `<nav>`, `<aside>`

### Organização do JS

Cada arquivo JS segue a mesma estrutura de seções comentadas:

```
// ESTADO GLOBAL → // DADOS → // INICIALIZAÇÃO → // FUNÇÕES
```

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit seguindo Conventional Commits:
   - `feat:` nova funcionalidade
   - `fix:` correção de bug
   - `perf:` melhoria de performance
   - `docs:` documentação
4. Antes do PR, rode: `node script/generate-sitemap.js`
5. Abra o Pull Request

---

## 📋 Backlog Técnico

Itens pendentes documentados em [`taks.md`](taks.md):

- [ ] Testar rotas `/termo-de-uso` e `/politica-privacidade`
- [ ] Rate limiting no backend (Go): `rate.NewLimiter(5, 10)`
- [ ] Validação de tamanho de campos no backend
- [ ] Restringir CORS para `https://bubbe.com.br` (remover wildcard `*`)

---

## 📄 Licença

MIT © [Bubbe Tecnologia](https://bubbe.com.br)

---

## 📞 Contato

- 🌐 [bubbe.com.br](https://bubbe.com.br)
- 📧 atendimento@bubbe.com.br
- 📱 WhatsApp: +55 11 91566-1190

---

<div align="center">Feito com ❤️ pela equipe Bubbe — <a href="#-bubbe--plataforma-de-gestão-para-cantinas-escolares">⬆ voltar ao topo</a></div>
