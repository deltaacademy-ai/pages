---
name: criar-nova-aula-Delta
description: "Cria e publica aulas em tutoriais.deltaacademy.ai. Usar quando professor pedir para criar aula, módulo ou aula avulsa no repositório deltaacademy-ai/pages."
---

# criar-nova-aula-Delta

Skill para professores da Delta Academy gerarem e publicarem aulas em `tutoriais.deltaacademy.ai`.

**Repositório GitHub:** `deltaacademy-ai/pages`
**URL pública (domínio customizado):** `tutoriais.deltaacademy.ai/`

---

## PASSO 0 — Carregar o Design System (OBRIGATÓRIO)

Ler na íntegra e na ordem antes de qualquer outra ação:

1. `design-system/DESIGN_SYSTEM.md`
2. `design-system/palettes.css`
3. `design-system/templates/index.reference.html`
4. `design-system/templates/tutorial.reference.html`

Todos os caminhos são relativos à raiz do projeto. Se qualquer arquivo não existir, parar imediatamente e avisar o usuário.

Após carregar, confirmar em uma linha. Exemplo:
> ✅ Design System Delta Academy carregado (paleta default: dusk).

---

## PASSO 1 — Identificar o professor

### Primeira vez usando a skill

Perguntar em uma única mensagem:

1. **Username GitHub** — ex: `ana` (será a pasta raiz no repositório)
2. **Senha do painel** — senha pessoal que protege a página de controle `dominio.com/ana` — só o professor sabe, nunca é repassada a alunos

Salvar essas informações e seguir para o Passo 2.

### Já usou antes

Perguntar apenas o username e verificar se a pasta existe no repositório:

```bash
gh api repos/deltaacademy-ai/pages/contents/{usuario} --silent && echo "existe" || echo "não encontrado"
```

- **Existe:** seguir para o Passo 2.
- **Não encontrado:** avisar o professor — *"Não encontrei sua pasta no repositório. Vamos criar do zero."* — e coletar username e senha do painel, como se fosse a primeira vez.

---

## PASSO 2 — Definir o que será criado

Perguntar em uma única mensagem:

1. **O que quer criar?**
   - (A) Módulo novo com aulas
   - (B) Aula nova em módulo existente
   - (C) Aula avulsa (sem módulo)

2. **Roteiro** — pedir que cole o conteúdo da aula agora, se ainda não colou

### Se escolher (B) — Aula em módulo existente

Consultar o repositório via GitHub API e listar as pastas dentro de `{usuario}/`:

```
Módulos encontrados:
  1. ia-para-executivos (3 aulas)
  2. growth (1 aula)
  3. Criar módulo novo

Em qual deseja adicionar?
```

### Para qualquer opção, perguntar também:

- **Nome/título** da aula ou módulo
- **Proteção por senha** — regras por tipo:
  - **Módulo novo (opção A):** perguntar "Deseja proteger este módulo com senha?". Se sim, pedir a senha (ex: `delta101`) — ela valerá para todas as aulas do módulo. Avisar: "Guarde essa senha — ela será usada em todas as aulas deste módulo." Se não, o módulo ficará aberto sem autenticação.
  - **Módulo existente (opção B):** **nunca perguntar senha**. Herdar a configuração existente do módulo via `gh api`:
    ```bash
    gh api repos/deltaacademy-ai/pages/contents/{usuario}/{slug-modulo}/index.html \
      --jq '.content' | base64 -d | grep -o 'const SENHA = "[^"]*"' | head -1
    ```
    Se retornar vazio, o módulo não tem senha — manter sem senha. Se retornar erro, perguntar ao professor.
  - **Aula avulsa (opção C):** perguntar "Deseja proteger esta aula com senha?". Se sim, pedir a senha. Se não, a aula ficará aberta sem autenticação.

> **Regra absoluta:** aulas individuais dentro de um módulo **nunca têm senha própria**. A autenticação é sempre feita uma única vez no índice do módulo (`{slug-modulo}/index.html`) e libera todas as aulas automaticamente via `localStorage`.

Confirmar slug (kebab-case, sem acentos — converter automaticamente) e título antes de gerar.

---

## PASSO 3A — Criar/atualizar página de controle do professor

O arquivo `{usuario}/index.html` é o painel pessoal do professor. **Usar `design-system/templates/index.reference.html` como base exata** — não simplificar. Criado na primeira vez e atualizado a cada nova aula ou módulo.

### Comportamento da página

- Gate de senha do painel (definido no Passo 1) — oculta `#main-content` até autenticação
- Lista módulos em cards expansíveis (`.modulo-card` com `.modulo-head` clicável)
- Cada módulo mostra: nome, número de aulas, data da última atualização
- O cabeçalho do módulo (`.modulo-head`) contém **obrigatoriamente** os 3 recursos abaixo
- Cada linha de aula (`.aula-row`) contém **apenas** número + título clicável — sem ações repetidas

### Recursos obrigatórios no `.modulo-head` (cabeçalho de cada módulo)

Os 3 recursos ficam dentro de `.modulo-head-actions` com `onclick="event.stopPropagation()"` para não disparar o toggle do módulo. O chevron `▼` fica **fora** do `.modulo-head-actions`, como filho direto do `.modulo-head`, para permanecer clicável junto com o título.

**Nota sobre `{URL_MODULO}`:** estes 3 botões sempre apontam para o **índice do módulo** (`{slug-modulo}/index.html`), não para o tutorial-01. Isso garante um entry point único e estável.

```js
// Correto
const url = `https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/`;
// Errado — nunca usar
const url = `https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/tutorial-01-*.html`;
```

**1. Olho (ver/ocultar senha do módulo)**
```html
<button class="mod-icon-btn" id="eye-mod-{NN}" title="Ver senha"
  onclick="toggleSenha(this, '{SENHA_DO_MODULO}', 'senha-mod-{NN}')">
  <svg viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
</button>
<span class="mod-senha-reveal" id="senha-mod-{NN}" style="display:none">
  <span class="senha-label">Senha</span>{SENHA_DO_MODULO}
</span>
```

**2. Copiar Mensagem** (plain text + HTML para WhatsApp/e-mail)
```html
<button class="mod-action-btn"
  onclick="copyMsg(this, '{Nome do Módulo}', '{URL_MODULO}', '{SENHA_DO_MODULO}')">
  <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  Copiar Mensagem
</button>
```

**3. Copiar Link** (link do índice do módulo)
```html
<button class="mod-action-btn" onclick="copyLink(this, '{URL_MODULO}')">
  <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  Copiar link
</button>
```

### IDs únicos por módulo

Cada módulo tem seu próprio índice numérico (`{NN}` = 01, 02, 03…) nos IDs `eye-mod-{NN}` e `senha-mod-{NN}` para que os olhos funcionem independentemente.

### Funções JS obrigatórias no `<script>`

Copiar integralmente do template de referência:
- `checkPwd()` — gate de senha
- `toggleSenha(btn, senha, tagId)` — olho com `EYE_OPEN` / `EYE_CLOSE`
- `toggleModulo(head)` — expande/colapsa módulo
- `copyMsg(btn, titulo, url, senha)` — mensagem rich text + plain text
- `copyLink(btn, url)` — só o link
- `feedback(btn, msg)` — feedback visual "Copiado ✓" por 2 s
- IIFE de palette switcher com localStorage

---

## PASSO 3B — Gerar os HTMLs das aulas

### Regras absolutas do design system (preservar 100%)

1. `<html lang="pt-BR" data-palette="dusk">` — dark mode é o padrão
2. Favicon: `<link rel="icon" href="https://tutoriais.deltaacademy.ai/icon.png">` — sempre antes do link do Montserrat
3. Montserrat via Google Fonts
4. CSS inline — nunca linkar arquivos externos
5. Conteúdo integral de `palettes.css` dentro do `<style>`
6. JS inline: palette switcher + navegação/progresso/copy
7. Botão toggle de paleta fixo no top-right (`.palette-toggle`) — ícone sol quando em dusk, lua quando em cream; alterna apenas entre dusk e cream
8. Card: head escuro (card-tag-bg) + body branco com desc
9. Blocos de prompt: label verde fora + bloco branco borda verde 4px dentro
10. Section badges todas iguais (verde escuro)
11. Sidebar: grupos 0.82rem 800 creme, subitens 0.74rem 400. Logo Delta obrigatória como primeiro elemento do `.sidebar-header`:
    ```html
    <div class="sidebar-logo"><img src="../../logo_delta.png" alt="Delta Academy"></div>
    ```
    ```css
    .sidebar-logo img { max-width: 148px; height: auto; display: block; }
    ```
12. PKEY único por aula, TOTAL reflete número real de seções
13. Nenhum emoji que não estava no roteiro original
14. CSS do `.header-bar` — sempre usar `color:var(--bg)` sem opacidade:
    ```css
    .header-bar { background:var(--accent2); border-radius:14px; padding:26px 28px 22px; }
    .header-bar .label { font-size:0.73rem; color:var(--bg); text-transform:uppercase;
      letter-spacing:0.12em; font-weight:800; margin-bottom:8px; }
    .header-bar h1 { font-size:1.35rem; font-weight:800; color:var(--bg); letter-spacing:0.01em; }
    .header-bar p  { font-size:0.8rem; color:var(--bg); margin-top:6px; font-weight:700; }
    ```
    > Nunca usar `opacity` em texto de `.header-bar`. Nunca usar `var(--gold)` como `color` no header — em dusk `--accent2 == --gold`, tornando o texto invisível. Usar sempre `color:var(--bg)` sem opacidade.

> **Isolamento de alunos:** Páginas acessadas por alunos (`{modulo}/index.html` e todos os `tutorial-*.html`) **nunca** devem conter link, botão, breadcrumb ou qualquer texto que referencie o painel do professor (`{usuario}/index.html`). O painel é uma URL privada — alunos não devem saber que existe.

### Proteção por senha — autenticação por módulo

O gate de senha fica **somente no `{modulo}/index.html`**. Após autenticar, o acesso é salvo em `localStorage` e todos os tutoriais do módulo ficam desbloqueados automaticamente. **As aulas individuais nunca têm gate próprio.**

**Se o módulo tiver senha — `{modulo}/index.html`:**
```js
const MOD_KEY = "delta-mod-{slug-modulo}";
const SENHA   = "{SENHA_DO_MODULO}";
function checkPwd() {
  if (document.getElementById('pwd').value === SENHA) {
    localStorage.setItem(MOD_KEY, '1');
    unlock();
  } else {
    document.getElementById('pwd-error').style.display = 'block';
    document.getElementById('pwd').value = '';
    document.getElementById('pwd').focus();
  }
}
function unlock() {
  document.getElementById('gate').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
}
if (localStorage.getItem(MOD_KEY) === '1') unlock();
```

**Se o módulo tiver senha — `tutorial-NN-*.html`:** sem gate HTML, `#main-content` sem `display:none`. Primeira linha do `<script>`:
```js
if (localStorage.getItem('delta-mod-{slug-modulo}') !== '1') {
  window.location.replace('index.html');
}
```

**Se o módulo não tiver senha:** nem o `{modulo}/index.html` nem os `tutorial-NN-*.html` incluem gate ou verificação de localStorage. O `#main-content` fica visível diretamente, sem nenhuma lógica de autenticação.

O gate do painel do professor (`{usuario}/index.html`) segue o mesmo padrão, copiado de `design-system/templates/index.reference.html`, com título fixo **"Painel do Professor"** e `const SENHA = "{SENHA_DO_PAINEL}"` (senha do painel, não do módulo).

**Aula avulsa com senha — `avulsos/tutorial-{slug}.html`:** gate diretamente na página, sem `localStorage`, sem redirect:
```js
const SENHA = "{SENHA_DA_AULA}";
function checkPwd() {
  if (document.getElementById('pwd').value === SENHA) {
    document.getElementById('gate').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  } else {
    document.getElementById('pwd-error').style.display = 'block';
    document.getElementById('pwd').value = '';
    document.getElementById('pwd').focus();
  }
}
```
O `<div id="main-content">` começa com `display:none` e é revelado após autenticação.

**Aula avulsa sem senha:** sem gate, sem `localStorage`. O `#main-content` fica visível diretamente.

### Estrutura de pastas no repositório

**Módulo com aulas:**
```
{usuario}/
├── index.html                          ← painel do professor (sempre atualizado)
└── {slug-modulo}/
    ├── index.html                      ← índice do módulo (protegido por senha)
    ├── tutorial-01-{slug-aula}.html
    ├── tutorial-02-{slug-aula}.html
    └── ...
```

**Aula avulsa:**
```
{usuario}/
├── index.html
└── avulsos/
    └── tutorial-{slug}.html
```

Todos os links internos (breadcrumbs, sidebar, nav-buttons) usam caminhos relativos corretos.

### Numeração automática

Ao adicionar aula em módulo existente, consultar o repositório para saber quantas aulas já existem e numerar corretamente a nova. Ex: se já há `tutorial-01` e `tutorial-02`, a nova é `tutorial-03`.

---

## PASSO 3C — Padrão obrigatório do "Passo a Passo" da Atividade Prática

> **Regra absoluta:** sempre que a aula tiver uma seção de **"Passo a Passo"** dentro da **Atividade Prática**, ela DEVE usar o padrão `.step-card` abaixo. Não usar `.instructions`+`.inst` (bolinhas verdes), `.step-header` (borda inferior) ou qualquer outro formato alternativo para a lista de passos da Atividade Prática.

### Por que existe esse padrão

Cada passo vira um **card completo** com cabeçalho escuro pinho (`var(--accent2)`) + label dourada `PASSO XX` (`var(--gold)`) + título branco. Conteúdos auxiliares — bloco copiável, downloads, warning, conceito-chave — ficam **dentro do `.step-card-body`** do passo correspondente, e não em seções separadas no fim da página. Isso mantém o aluno em fluxo linear sem perder contexto.

### CSS obrigatório (adicionar ao `<style>` da aula, antes do `@media`)

```css
/* Step-card pattern (Passo a Passo da Atividade Prática) */
.step-card{background:var(--white);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:16px;box-shadow:var(--shadow-sm)}
.step-card-head{background:var(--accent2);padding:10px 16px;display:flex;align-items:center;gap:12px}
.step-card-num{background:var(--gold);color:var(--accent2);font-size:0.72rem;font-weight:800;letter-spacing:0.1em;padding:3px 9px;border-radius:3px;text-transform:uppercase;flex-shrink:0}
.step-card-title{color:var(--bg);font-size:0.95rem;font-weight:600;line-height:1.3}
.step-card-body{padding:16px 18px}
.step-card-desc{font-size:0.84rem;color:var(--text);line-height:1.6;margin:0 0 12px}
.step-card-desc:last-child{margin-bottom:0}
.step-card-desc strong{color:var(--accent2);font-weight:700}
.step-card-desc code{font-family:'JetBrains Mono','Courier New',ui-monospace,monospace;font-size:0.86em;background:var(--ficha-td1-bg);padding:1px 5px;border-radius:3px;color:var(--accent2)}
.step-card-desc em{color:var(--text2);font-style:italic}

/* Downloads-card (verde, embutido em step-card que precisa de downloads) */
.downloads-card{background:var(--green-light);border:1px solid var(--green-border);border-left:4px solid var(--green);border-radius:8px;padding:14px 16px;margin:14px 0 4px}
.downloads-card .dc-head{font-size:0.7rem;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:var(--green-text);margin-bottom:12px}
.downloads-card .dl-btn{display:flex;align-items:center;gap:12px;background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:8px;text-decoration:none;color:var(--text);transition:all 0.15s}
.downloads-card .dl-btn:hover{border-color:var(--accent);background:var(--accent-lighter);transform:translateX(2px)}
.downloads-card .dl-btn:last-child{margin-bottom:0}
.downloads-card .dl-btn .dl-icon{font-size:1.1rem;flex-shrink:0;width:32px;height:32px;border-radius:6px;background:var(--green-light);color:var(--green-text);display:flex;align-items:center;justify-content:center}
.downloads-card .dl-btn .dl-meta{flex:1;min-width:0}
.downloads-card .dl-btn .dl-name{font-family:'JetBrains Mono','Courier New',ui-monospace,monospace;font-size:0.72rem;font-weight:600;color:var(--accent2);margin-bottom:2px;word-break:break-all}
.downloads-card .dl-btn .dl-desc{font-size:0.68rem;color:var(--text2);line-height:1.4}
.downloads-card .dl-btn .dl-arrow{font-size:0.86rem;color:var(--accent);flex-shrink:0;font-weight:800}

/* Check-list (entregáveis ao final — usar no overview-card "Você sai com") */
.check-list{list-style:none;margin:10px 0}
.check-list li{padding:6px 0 6px 22px;position:relative;font-size:0.78rem;color:var(--text);line-height:1.55}
.check-list li::before{content:'\2713';position:absolute;left:0;top:6px;color:var(--accent);font-weight:800;font-size:0.86rem}
.check-list li strong{color:var(--accent2);font-weight:700}
```

### Skeleton HTML do passo

Cada passo segue **exatamente** esta estrutura. Os blocos opcionais (feynman/copy/downloads/warning) ficam **dentro do `.step-card-body`**, na ordem que fizer sentido didático.

```html
<div class="step-card">
  <div class="step-card-head">
    <span class="step-card-num">PASSO 01</span>
    <span class="step-card-title">Título descritivo curto do passo</span>
  </div>
  <div class="step-card-body">
    <!-- (opcional) feynman-box — conceito-chave didático -->
    <div class="feynman-box">
      <div class="feynman-label">&#128172; Conceito-chave deste passo</div>
      <p><strong>Termo:</strong> definição Feynman curta + aplicação.</p>
    </div>

    <!-- Instrução principal -->
    <p class="step-card-desc">Texto principal do passo, com <strong>negritos</strong>, <code>código</code> e <em>itálico</em>.</p>

    <!-- (opcional) Detalhamento — sempre como 2º parágrafo, prefixado com "Detalhamento:" -->
    <p class="step-card-desc"><strong>Detalhamento:</strong> contexto adicional, validação ou nuance.</p>

    <!-- (opcional) Bloco copiável -->
    <div class="copy-wrap">
      <span class="copy-label">Label do bloco</span>
      <div class="copy-block" id="prompt-id">
<button class="copy-btn" onclick="copyText(this, document.getElementById('prompt-id-text').textContent)">Copiar</button>
<span id="prompt-id-text">Conteúdo do prompt.</span></div>
    </div>

    <!-- (opcional) Downloads-card -->
    <div class="downloads-card">
      <div class="dc-head">&#128229; Material da APXX</div>
      <a class="dl-btn" href="arquivo.ext" download>
        <span class="dl-icon">&#128196;</span>
        <span class="dl-meta">
          <span class="dl-name">arquivo.ext</span>
          <span class="dl-desc">Descrição curta do arquivo</span>
        </span>
        <span class="dl-arrow">&darr;</span>
      </a>
    </div>

    <!-- (opcional) Warning-box -->
    <div class="warning-box">
      <div class="warning-label">Importante</div>
      <p>Aviso ou checkpoint.</p>
    </div>
  </div>
</div>
```

### Regras de uso

1. **Sempre `.step-card` para os passos da Atividade Prática.** Nada de `.instructions`+`.inst` com bolinhas verdes, nada de `.step-header` com borda inferior, nada de `<h3>` solto.
2. **Conteúdos auxiliares vão DENTRO do `.step-card-body`** do passo a que pertencem — não em seções separadas no fim. Isso vale para bloco copiável, downloads, warning, feynman, listas.
3. **`.downloads-card` (verde) substitui qualquer `.download-grid` com `.dl-card` em colunas.** Os botões `.dl-btn` ficam empilhados, sem grid, independente do número de arquivos (1, 2, 3, 4+).
4. **Ícones dos botões de download:** usar entidades HTML — 📦 `&#128230;` para `.zip`, 📄 `&#128196;` para `.csv`/`.md`/`.pdf`, 📥 `&#128229;` no cabeçalho `.dc-head`. NÃO usar SVG inline pesado aqui.
5. **`.check-list` no card "Você sai desta atividade com"** (geralmente a última seção da aula). Pontos com ✓ verde em vez de bolinhas.
6. **Listas de validação numérica** (ex: "Gasto Meta ≈ R$ X" para conferir output de uma Skill) usam `.observation-list` (azul, lateral) — distintas da `.check-list`.
7. **Padrão didático do `.step-card-body`:** quando o passo tem conceito-chave, usar `.feynman-box` no topo, depois `.step-card-desc` para instrução principal, e um segundo `.step-card-desc` opcional prefixado com `<strong>Detalhamento:</strong>` para texto secundário.

### Quando NÃO usar `.step-card`

- Listas curtas inline dentro de uma seção qualquer (ex: "5 sub-passos rápidos" como contexto, sem ser um passo a passo principal) — pode usar `.instructions`+`.inst` aqui.
- Seções de Demonstração ou Introdução — apenas Atividade Prática usa step-card para passos.

---

## PASSO 4 — Publicar via GitHub

Executar os comandos abaixo no terminal (ou via Claude Code):

**Novo módulo:**
```bash
git add {usuario}/{slug-modulo}/ {usuario}/index.html
git commit -m "Add módulo: {Nome do Módulo} [{usuario}]"
git push origin main
```

**Nova aula em módulo existente:**
```bash
git add {usuario}/{slug-modulo}/tutorial-{NN}-{slug}.html {usuario}/{slug-modulo}/index.html {usuario}/index.html
git commit -m "Add aula: {Título} em {slug-modulo} [{usuario}]"
git push origin main
```

**Aula avulsa:**
```bash
git add {usuario}/avulsos/tutorial-{slug}.html {usuario}/index.html
git commit -m "Add aula avulsa: {Título} [{usuario}]"
git push origin main
```

Só entregar URLs após push retornar sucesso. Se der erro, reportar sem entregar URL.

---

## PASSO 5 — Entregar ao usuário

Após push bem-sucedido, retornar com todos os placeholders substituídos. Usar o template correspondente ao tipo de criação:

**Opção A — Módulo novo com senha:**
```
✅ Publicado com sucesso!

📋 Seu painel:
   https://tutoriais.deltaacademy.ai/{usuario}/
   🔑 Senha do painel: (você já sabe)

🔗 Link para compartilhar com os alunos:
   https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/

🔑 Senha do módulo: {SENHA_DO_MODULO}

⏱ Aguarde 30–60 segundos antes de abrir (GitHub Pages leva alguns segundos).
🎨 Paleta default: Dusk (modo escuro). Ícone no canto superior direito alterna para Cream.
```

**Opção A — Módulo novo sem senha:**
```
✅ Publicado com sucesso!

📋 Seu painel:
   https://tutoriais.deltaacademy.ai/{usuario}/
   🔑 Senha do painel: (você já sabe)

🔗 Link para compartilhar com os alunos:
   https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/

⏱ Aguarde 30–60 segundos antes de abrir (GitHub Pages leva alguns segundos).
🎨 Paleta default: Dusk (modo escuro). Ícone no canto superior direito alterna para Cream.
```

**Opção B — Aula em módulo existente com senha:**
```
✅ Publicado com sucesso!

📋 Seu painel:
   https://tutoriais.deltaacademy.ai/{usuario}/

🔗 Link do módulo (entrada para os alunos):
   https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/

🆕 Nova aula adicionada:
   https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/tutorial-{NN}-{slug-aula}.html

🔑 Senha do módulo: {SENHA_DO_MODULO} (a mesma de sempre)

⏱ Aguarde 30–60 segundos antes de abrir (GitHub Pages leva alguns segundos).
```

**Opção B — Aula em módulo existente sem senha:**
```
✅ Publicado com sucesso!

📋 Seu painel:
   https://tutoriais.deltaacademy.ai/{usuario}/

🔗 Link do módulo (entrada para os alunos):
   https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/

🆕 Nova aula adicionada:
   https://tutoriais.deltaacademy.ai/{usuario}/{slug-modulo}/tutorial-{NN}-{slug-aula}.html

⏱ Aguarde 30–60 segundos antes de abrir (GitHub Pages leva alguns segundos).
```

**Opção C — Aula avulsa com senha:**
```
✅ Publicado com sucesso!

📋 Seu painel:
   https://tutoriais.deltaacademy.ai/{usuario}/

🔗 Link para compartilhar com os alunos:
   https://tutoriais.deltaacademy.ai/{usuario}/avulsos/tutorial-{slug-aula}.html

🔑 Senha da aula: {SENHA_DA_AULA}

⏱ Aguarde 30–60 segundos antes de abrir (GitHub Pages leva alguns segundos).
🎨 Paleta default: Dusk (modo escuro). Ícone no canto superior direito alterna para Cream.
```

**Opção C — Aula avulsa sem senha:**
```
✅ Publicado com sucesso!

📋 Seu painel:
   https://tutoriais.deltaacademy.ai/{usuario}/

🔗 Link para compartilhar com os alunos:
   https://tutoriais.deltaacademy.ai/{usuario}/avulsos/tutorial-{slug-aula}.html

⏱ Aguarde 30–60 segundos antes de abrir (GitHub Pages leva alguns segundos).
🎨 Paleta default: Dusk (modo escuro). Ícone no canto superior direito alterna para Cream.
```

---

## CHECKLIST DE VALIDAÇÃO (antes de qualquer commit)

**HTML das aulas (tutorial):**
- [ ] `<html lang="pt-BR" data-palette="dusk">` (dark mode padrão)
- [ ] Favicon presente: `<link rel="icon" href="https://tutoriais.deltaacademy.ai/icon.png">`
- [ ] Montserrat importado do Google Fonts — única exceção ao CSS inline (além do favicon)
- [ ] CSS de paletas inline: apenas dusk e cream (não Forest)
- [ ] Conteúdo de `palettes.css` inline dentro de `<style>` (paletas dusk e cream)
- [ ] Nenhum `<link href="palettes.css">` ou qualquer outro CSS externo
- [ ] `.palette-toggle` fixo no top-right — ícone sol (dusk) ou lua (cream), alterna apenas entre os dois modos
- [ ] `{modulo}/index.html` tem gate de senha com `MOD_KEY`, `checkPwd()` e `unlock()` corretos
- [ ] `tutorial-NN-*.html` sem gate — `#main-content` sem `display:none`, primeira linha do script redireciona para `index.html` se não autenticado
- [ ] Prompt: label verde fora, bloco branco borda verde 4px dentro
- [ ] Section badges todas iguais (verde escuro `var(--accent2)`)
- [ ] Sidebar: grupos 0.82rem 800, subitens 0.74rem 400
- [ ] PKEY único por aula, TOTAL reflete número real de seções
- [ ] Nenhuma emoji que não estava no roteiro

**Passo a Passo da Atividade Prática (PASSO 3C):**
- [ ] Cada passo usa `.step-card` com `.step-card-head` (escuro pinho) + `.step-card-num` (label dourada `PASSO XX`) + `.step-card-title` (branco)
- [ ] CSS de `.step-card`/`.step-card-*` inline dentro de `<style>`
- [ ] Bloco copiável, downloads, warning, feynman ficam DENTRO do `.step-card-body` do passo correspondente — nada em seção separada no fim da página
- [ ] Downloads usam `.downloads-card` verde com `.dl-btn` (empilhado, sem grid) — não `.download-grid` com `.dl-card`
- [ ] Ícones de download via entidade HTML (📦 zip, 📄 csv/md/pdf, 📥 cabeçalho `.dc-head`) — não SVG inline
- [ ] Lista de "Você sai desta atividade com" usa `.check-list` (✓ verde) — não `<ul>` com bolinhas
- [ ] Nenhum `.instructions`+`.inst` nem `.step-header` usado como container de passos da Atividade Prática

**Painel do professor (index.html):**
- [ ] Gate de senha com `const SENHA = "{SENHA_DO_PAINEL}"` correta
- [ ] Cada `.modulo-head` tem dentro de `.modulo-head-actions`: olho (`toggleSenha`), tag senha, "Copiar Mensagem" (`copyMsg`), "Copiar link" (`copyLink`)
- [ ] `.aula-row` contém apenas `.aula-top` (número + título clicável) — sem botões de ação
- [ ] IDs únicos por módulo: `eye-mod-{NN}`, `senha-mod-{NN}`
- [ ] Funções JS: `toggleSenha`, `toggleModulo`, `copyMsg`, `copyLink`, `feedback`, palette IIFE
- [ ] URLs das aulas usando domínio `tutoriais.deltaacademy.ai/{usuario}/...`

**Repositório:**
- [ ] Estrutura de pastas: `{usuario}/{slug-modulo}/tutorial-{NN}-{slug}.html`
- [ ] Painel do professor (`{usuario}/index.html`) atualizado com nova aula
- [ ] Push feito para `deltaacademy-ai/pages` na branch `main`

---

## REGRAS OPERACIONAIS

- Nunca usar caminhos absolutos (`/Users/...`)
- Nunca expor nome completo, senha do painel ou qualquer dado pessoal do professor em páginas acessadas por alunos
- Todos os caminhos são relativos ao repositório
- Se surgir dúvida entre roteiro e design system, perguntar antes de decidir
- O design system é relido a cada execução — nunca assumir que está em cache
- Não existe índice raiz global — cada professor tem apenas seu próprio painel (`{usuario}/index.html`)
