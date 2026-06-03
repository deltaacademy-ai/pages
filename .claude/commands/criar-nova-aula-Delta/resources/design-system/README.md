# Design System — Tutoriais Delta Academy

Design system usado automaticamente pelo slash command `/criar-nova-aula-Delta` (definido em `.claude/commands/criar-nova-aula-Delta.md`).

## Como atualizar

1. Editar no **Claude Design** (claude.ai/design) o projeto `Tutoriais Delta Academy`
2. Exportar o bundle `.tar.gz`
3. Extrair e sobrescrever os arquivos neste diretório:
   - `palettes.css`
   - `tokens.css`
   - `templates/index.reference.html`
   - `templates/tutorial.reference.html`
   - `assets/*.png`
   - `fonts/*.otf`
4. **Atualizar `DESIGN_SYSTEM.md`** se mudou alguma regra de design (o arquivo é a fonte da verdade em linguagem natural)
5. `git commit` + `git push` — próximas aulas geradas via `/criar-nova-aula-Delta` já refletem a mudança

## Arquivos

- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — **leia primeiro.** Regras de design em linguagem natural, lidas pelo Claude antes de gerar qualquer aula
- [`palettes.css`](palettes.css) — 3 paletas (forest, dusk, **cream** default) como CSS custom properties
- [`tokens.css`](tokens.css) — brand tokens base (Aeonik, cores pine/sage/gold, scales)
- [`templates/index.reference.html`](templates/index.reference.html) — página-índice 100% renderizável (usar como base)
- [`templates/tutorial.reference.html`](templates/tutorial.reference.html) — página de tutorial 100% renderizável (usar como base)
- `assets/` — logos PNG
- `fonts/` — Aeonik (.otf/.ttf) — **não** usada no HTML gerado; presente para referência

## Paleta default: Cream

Tom creme quente com acento gold, sidebar pine escuro, cards com head verde escuro + body branco puro, blocos de prompt brancos com borda esquerda verde grossa. Foi a escolha final do Rafa após iterações no Claude Design.

Para trocar a default, edite `data-palette="cream"` no `<html>` dos templates **e** o fallback `localStorage.getItem(KEY)||"cream"` no JS do palette switcher.
