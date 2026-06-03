# Design System — Tutoriais Delta Academy

> **Regra de ouro:** este arquivo é a **fonte da verdade** para o visual de qualquer tutorial da Delta Academy gerado via `/criar-nova-aula-Delta`. Se algo aqui contradiz o template, **siga este arquivo**.

**Bundle original:** `claude.ai/design` (hash `semtgnrJnvCk2-PPxWDNEg`). Para atualizar o design system, re-exporte no Claude Design e sobrescreva os arquivos deste diretório.

---

## Arquivos deste diretório

| Arquivo | Papel |
|---|---|
| `DESIGN_SYSTEM.md` | **Este arquivo.** Regras em linguagem natural. |
| `palettes.css` | 2 paletas (**dusk** default / cream). Copiar inline no HTML. |
| `tokens.css` | Brand tokens (cores pine/sage/gold, type scale Aeonik, spacing, radii, shadows). Referência — **não** linkar do HTML gerado. |
| `templates/index.reference.html` | HTML completo da página-índice da aula. Usar como base. |
| `templates/tutorial.reference.html` | HTML completo de uma página de tutorial. Usar como base. |
| `assets/logo-horizontal-green.png` | Logo Delta Academy (horizontal). |
| `assets/logo-vertical-green.png` | Logo Delta Academy (vertical). |
| `fonts/Aeonik-*.otf` | Fonte oficial da marca. **Não incluir nos HTMLs** — usar Montserrat do Google Fonts como fallback. |

---

## Decisões de design (não negociáveis)

Estas decisões vieram de iterações diretas do Rafa no Claude Design. Não reinterpretar:

1. **Paleta default é `dusk`** — sempre setar `data-palette="dusk"` no `<html>`. O toggle salva a preferência em localStorage com fallback `"dusk"`.
2. **Fonte:** Montserrat (Google Fonts, pesos 400/500/600/700/800). Aeonik é a fonte da marca mas o HTML gerado usa Montserrat por portabilidade.
3. **Mono para código/prompts:** `'JetBrains Mono', 'Courier New', ui-monospace, monospace`.
4. **Card da home:** layout de 2 partes fixo:
   - **card-head** (fundo `var(--card-tag-bg)` escuro, texto `var(--card-tag-fg)` claro): `<span class="card-num">01</span>` + `<span class="card-title">Título da Aula</span>` lado a lado
   - **card-body** (fundo `#FFFFFF` puro, texto `#0E1A19`): só `<div class="card-desc">descrição</div>`
5. **Blocos de prompt:** estrutura sempre em 2 partes:
   - `<span class="copy-label">Nome do prompt</span>` **FORA** do retângulo, em verde escuro `var(--accent2)` com `border-bottom: 2px solid var(--accent2)`
   - `<div class="copy-block">` com fundo `#FFFFFF`, texto `#0E1A19`, borda esquerda 4px em `var(--accent2)`, fonte JetBrains Mono peso 500, sombra interna sutil
   - **NÃO** usar `.section-divider` acima do bloco (foi removido no design final)
6. **Sidebar (tutorial):** títulos de grupo (`Início`, `Introdução`, `Demonstração`, `Atividade Prática`) em **creme claro** `var(--sidebar-fg)`, tamanho `0.82rem`, peso `800`, uppercase — **maiores e mais fortes** que os subitens (`0.74rem`, peso `400`).
7. **Section badges (Introdução / Demonstração / Atividade Prática no main):** **todas iguais** — fundo `var(--accent2)`, texto `var(--bg)`, peso 800, `0.72rem`, letter-spacing `0.14em`. Não diferenciar por cor.
8. **Header da home:** card único com apenas o box verde escuro (`.header-bar`). H1 = título do curso em cor clara `var(--bg)`, H2 = literal **"Delta Academy"** em gold `var(--gold)`, menor, uppercase, tracking `0.1em`. **Sem** `.header-info` com metadados (professor/duração).
9. **Seção label "AULAS"** (entre header e cards): literal `<div class="section-label">AULAS</div>`, tamanho `1.15rem`, peso `800`, sage `var(--accent)`, uppercase, tracking `0.14em`. **Maior** que títulos das aulas (`0.95rem`).
10. **Botão `.palette-toggle`** fixo no top-right sempre presente em ambas as páginas — ícone sol (☀) em dusk, lua (☾) em cream. Alterna apenas entre dusk e cream. Não existe mais a paleta Forest como opção de UI.
11. **Passos da Atividade Prática usam `.step-card`** — cabeçalho escuro pinho (`var(--accent2)`) + label dourada `PASSO XX` (`var(--gold)`) + título branco. Bloco copiável, downloads, warning, feynman ficam **dentro do `.step-card-body`** do passo correspondente — nunca em seções separadas no fim da página. **Substitui** `.instructions`+`.inst` (bolinhas verdes) e qualquer outro container para passos.
12. **Downloads dentro de um passo usam `.downloads-card` verde** (não `.download-grid` em colunas). Botões `.dl-btn` ficam empilhados, com ícone de entidade HTML (📦 `.zip`, 📄 `.csv`/`.md`/`.pdf`), nome em mono, descrição curta e seta `↓` à direita.
13. **Lista de entregáveis no card "Você sai com" usa `.check-list`** (✓ verde) em vez de `<ul>` com bolinhas. Diferente da `.observation-list` (azul, para validação numérica).

---

## Estrutura esperada

### Tutorial único na raiz (uma aula avulsa)
```
tutorial-{slug}.html        ← página única
index.html                  ← card novo adicionado aqui
```

### Sub-aula (curso com múltiplas aulas) — **preferido quando há ≥ 3 módulos/atividades**
```
aula-{slug-curso}/
├── index.html              ← índice do curso (cards numerados)
├── tutorial-01-{slug}.html
├── tutorial-02-{slug}.html
└── ...
index.html                  ← card da sub-aula com href="aula-{slug-curso}/index.html"
```

**Heurística de escolha:** se o roteiro tem ≥ 3 módulos/atividades independentes → sub-aula. Caso contrário → tutorial único.

---

## Placeholders nos templates

Os arquivos em `templates/*.reference.html` são **referências funcionais** (a versão da aula "Pesquisa Profunda" 100% renderizável). Ao gerar um HTML novo, **copie o arquivo inteiro** e substitua:

### Em `index.reference.html`
- `<title>` → `{TÍTULO DO CURSO} · Delta Academy`
- `<h1>` do header-bar → título do curso
- `<h2>` do header-bar → sempre "Delta Academy" (literal, não mudar)
- `<a class="card">` — um por aula; substituir `card-num`, `card-title`, `card-desc` e `href`
- Footer: copyright e link

### Em `tutorial.reference.html`
- `<title>` → `{NN}. {TÍTULO DA AULA} · Delta Academy`
- `.sidebar-header h2` → título da aula
- `.sidebar-header p` → `Atividade NN · {NOME DO CURSO}`
- Cada `.nav-group` → um grupo (Início, Introdução, Demonstração, Atividade Prática); pode haver mais ou menos grupos
- Cada `.section` → uma seção; manter IDs `sec-home`, `sec-step1`…
- **JS:** atualizar `PKEY` (chave de localStorage) para algo único por aula, ex: `delta-tut-{slug}`; atualizar `TOTAL` para o número de seções
- Conteúdo: substituir usando os componentes abaixo

---

## Componentes disponíveis (use só estes)

### `.breadcrumb`
```html
<div class="breadcrumb">Delta Board &rsaquo; {Curso} &rsaquo; <a href="index.html">Índice</a> &rsaquo; {NN}. {Aula}</div>
```

### `.sec-title` + `.sec-desc`
```html
<div class="sec-title"><span class="snum">NN.</span> Título da seção</div>
<div class="sec-desc">Subtítulo curto</div>
```
Variantes: `.sec-title.demo` (snum azul) e `.sec-title.pratica` (snum verde).

### `.section-badge`
```html
<span class="section-badge badge-intro">Introdução</span>
<span class="section-badge badge-demo">Demonstração</span>
<span class="section-badge badge-pratica">Atividade Prática</span>
```
**Todas visualmente iguais** (verde escuro `var(--accent2)` sobre creme `var(--bg)`). Só o texto muda.

### `.lead-text`
Parágrafo de corpo. `<strong>` vira verde pinho `var(--accent2)`.

### `.overview-card` (container com H3)
```html
<div class="overview-card">
  <h3>Ficha técnica</h3>
  <p>...</p>
  <ul><li>item</li></ul>
</div>
```

### `.ficha-table` (tabela 2 colunas ou 3 colunas)
Primeira coluna em background `var(--ficha-td1-bg)`, peso 600. Headers em `var(--ficha-th-bg)` uppercase.

### `.instructions` + `.inst` (passo a passo numerado)
```html
<div class="instructions">
  <div class="inst">
    <div class="inst-num">1</div>
    <div class="inst-text"><strong>Título.</strong> <span class="time">(30 seg)</span><br>Descrição.</div>
  </div>
</div>
```

### `.copy-wrap` + `.copy-label` + `.copy-block` (blocos de prompt)
```html
<div class="copy-wrap">
  <span class="copy-label">Prompt A — busca rápida</span>
  <div class="copy-block" id="prompt-a">
    <button class="copy-btn" onclick="copyText(this, document.getElementById('prompt-a-text').textContent)">Copiar</button>
    <span id="prompt-a-text">Texto do prompt aqui.</span>
  </div>
</div>
```

### `.tip-box` (dica verde/sage)
```html
<div class="tip-box">
  <div class="tip-label">Dica</div>
  <p>Texto da dica.</p>
</div>
```

### `.warning-box` (alerta gold/warn)
```html
<div class="warning-box">
  <div class="warning-label">Importante</div>
  <p>Texto do alerta.</p>
</div>
```

### `.insight-box` (destaque escuro com acento gold)
```html
<div class="insight-box">
  <div class="insight-label">Insight</div>
  <p>Texto do insight. <strong>Palavra destacada em gold.</strong></p>
</div>
```

### `.tool-links` (grid 2 colunas de links para ferramentas)
```html
<div class="tool-links">
  <a class="tool-link" href="https://claude.ai" target="_blank">
    <div><div class="tl-name">Claude</div><div class="tl-url">claude.ai</div></div>
  </a>
</div>
```

### `.observation-list` (lista com borda esquerda azul)
```html
<ul class="observation-list">
  <li><strong>Chave.</strong> Descrição.</li>
</ul>
```

### `.step-card` (passos da Atividade Prática — **OBRIGATÓRIO**)

Cada passo do "Passo a Passo" da Atividade Prática é um card completo. Conteúdos auxiliares (bloco copiável, downloads, warning, feynman) ficam **dentro do `.step-card-body`** do passo correspondente — nunca em seções separadas no fim da página.

```html
<div class="step-card">
  <div class="step-card-head">
    <span class="step-card-num">PASSO 01</span>
    <span class="step-card-title">Título descritivo curto do passo</span>
  </div>
  <div class="step-card-body">
    <p class="step-card-desc">Instrução principal, com <strong>negritos</strong> e <code>código</code>.</p>
    <p class="step-card-desc"><strong>Detalhamento:</strong> contexto adicional opcional.</p>
    <!-- (opcional) .copy-wrap, .downloads-card, .warning-box, .feynman-box aqui -->
  </div>
</div>
```

Cabeçalho: fundo `var(--accent2)` pinho. Label `PASSO XX` em `var(--gold)` dourado. Título em branco `var(--bg)`. Body branco com `.step-card-desc` (parágrafos) onde `<strong>` vira `var(--accent2)` e `<code>` ganha background `var(--ficha-td1-bg)`. **Substitui** `.instructions`+`.inst` para passos da Atividade Prática.

### `.downloads-card` (botões de download dentro de um `.step-card-body`)

```html
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
```

Container verde (`var(--green-light)` + borda esquerda 4px `var(--green)`). Botões `.dl-btn` empilhados (sem grid), independente do número de arquivos. Ícones via entidade HTML: 📦 `&#128230;` para `.zip`, 📄 `&#128196;` para `.csv`/`.md`/`.pdf`, 📥 `&#128229;` para `.dc-head`.

### `.check-list` (entregáveis ao final da atividade)

```html
<ul class="check-list">
  <li>Item concluído <strong>com destaque</strong>.</li>
  <li>Outro item.</li>
</ul>
```

Lista com ✓ verde em vez de bolinhas. Usar dentro do `.overview-card` da seção "Você sai desta atividade com" (geralmente a última seção da aula). Distinta de `.observation-list` (que é azul, para validação numérica).

### `.nav-buttons` (rodapé da seção)
```html
<div class="nav-buttons">
  <button class="nav-btn" onclick="showSection('sec-step1')">&#8592; Anterior</button>
  <button class="nav-btn primary" onclick="showSection('sec-step3')">Próximo &#8594;</button>
</div>
```
Última seção: `<a class="nav-btn primary" href="index.html">&#8617; Voltar ao índice</a>`.

---

## Estrutura de navegação (tutorial padrão)

Padrão recomendado — **9 seções** em 4 grupos:

```
Início                       → sec-home (00. Visão Geral)
Introdução                   → sec-step1 (01. Contexto e objetivo)
Demonstração                 → sec-step2, sec-step3, sec-step4
Atividade Prática            → sec-step5, sec-step6, sec-step7, sec-step8
```

Se o roteiro pedir estrutura diferente (ex.: tutorial sem demo), adaptar o número de grupos/seções e **atualizar `TOTAL`** no JS.

---

## CSS — como embutir no HTML gerado

**Sempre inline, nunca linkar arquivos externos**, exceto:
- Google Fonts Montserrat via `<link>`
- `palettes.css` linkado **inline também** (cole o conteúdo inteiro dentro de `<style>`)

O HTML final é **auto-contido e copiável para qualquer lugar**. Nenhum `<link rel="stylesheet" href="palettes.css">` no output — sempre inline.

### Ordem obrigatória dentro do `<style>`:

1. Reset: `*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}`
2. Conteúdo completo de `palettes.css` (paletas dusk e cream + estilos `.palette-toggle`)
3. Estilos da página (copiar do template de referência)

---

## JavaScript — sempre incluir 2 blocos

### Bloco A — palette toggle (idêntico nas duas páginas)
```javascript
(function(){
  const KEY="delta-tut-palette";
  const SUN='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  const MOON='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  function apply(p){
    document.documentElement.setAttribute("data-palette",p);
    localStorage.setItem(KEY,p);
    const icon=document.getElementById("palette-icon");
    if(icon)icon.innerHTML=p==="dusk"?SUN:MOON;
    const btn=document.getElementById("palette-toggle");
    if(btn)btn.title=p==="dusk"?"Modo claro":"Modo escuro";
  }
  window.togglePalette=function(){
    apply(document.documentElement.getAttribute("data-palette")==="dusk"?"cream":"dusk");
  };
  apply(localStorage.getItem(KEY)||"dusk");
})();
```

### Bloco B — só no tutorial: navegação + progresso + copy
```javascript
const PKEY = "delta-tut-{SLUG-UNICO-DA-AULA}";
const completed = new Set(JSON.parse(localStorage.getItem(PKEY) || "[]"));
const TOTAL = 9; // ← ajustar

function renderProgress() {
  document.querySelectorAll(".nav-item").forEach(ni => {
    ni.classList.toggle("completed", completed.has(ni.dataset.section));
  });
  const pct = Math.round((completed.size / TOTAL) * 100);
  document.getElementById("pct").textContent = pct;
  document.getElementById("sp-fill").style.width = pct + "%";
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add("active");
  const nav = document.querySelector(`.nav-item[data-section="${id}"]`);
  if (nav) nav.classList.add("active");
  completed.add(id);
  localStorage.setItem(PKEY, JSON.stringify([...completed]));
  renderProgress();
  window.scrollTo({top:0, behavior:"smooth"});
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const old = btn.textContent;
    btn.textContent = "Copiado ✓";
    setTimeout(() => btn.textContent = old, 1600);
  });
}

(function init(){
  const last = localStorage.getItem(PKEY + ":last") || "sec-home";
  completed.add("sec-home");
  renderProgress();
  const origShow = showSection;
  window.showSection = function(id){ origShow(id); localStorage.setItem(PKEY + ":last", id); };
  if (last !== "sec-home") window.showSection(last);
})();
```

---

## Checklist de validação (antes de commitar qualquer HTML gerado)

- [ ] `<html lang="pt-BR" data-palette="dusk">` (dark mode padrão)
- [ ] Favicon: `<link rel="icon" href="https://tutoriais.deltaacademy.ai/icon.png">`
- [ ] Montserrat importado do Google Fonts
- [ ] Conteúdo de `palettes.css` inline dentro de `<style>` (paletas dusk e cream)
- [ ] `.palette-toggle` fixo no top-right — ícone sol (dusk) ou lua (cream), alterna entre os dois modos
- [ ] Card da home: head escuro com num+title, body branco com desc
- [ ] Prompt: label verde **fora**, bloco branco com borda verde 4px **dentro**
- [ ] Section badges todas iguais (verde escuro)
- [ ] Sidebar: títulos de grupo em creme 0.82rem 800; subitens 0.74rem 400
- [ ] JS: `PKEY` único por aula, `TOTAL` reflete número real de seções
- [ ] Nenhum `<link href="palettes.css">` ou `<link href="tokens.css">` — tudo inline
- [ ] Nenhuma emoji inserida que não estivesse no roteiro
- [ ] **Passo a passo da Atividade Prática:** usa `.step-card` (cabeçalho escuro + label dourada `PASSO XX`); auxiliares (`.copy-wrap`, `.downloads-card`, `.warning-box`, `.feynman-box`) ficam dentro do `.step-card-body` do passo correspondente
- [ ] **Downloads dentro de um passo:** usam `.downloads-card` verde com `.dl-btn` empilhados — não `.download-grid` em colunas
- [ ] **Card "Você sai com" usa `.check-list`** (✓ verde) — não `<ul>` com bolinhas
