# Identidade Visual — Lumina

> Documento de referência da identidade visual da Lumina. Consultado por toda Skill do Project que gera peças visuais (painel HTML, relatórios, infográficos) para garantir consistência estética com a marca.

**Empresa:** Lumina (wellness premium · balas de goma funcionais)
**Posicionamento:** Wellness premium fresco, sofisticado, energético sem ser agressivo.
**Inspirações de marca:** Athletic Greens · Loop · Olipop · Recess

---

## 1. Paleta de cores principal

| Cor | Hex | Uso |
|---|---|---|
| Branco quente neutro | `#FBF9F5` | Fundo principal de toda peça visual |
| Verde-musgo suave | `#5C7A5A` | Cor de marca primária · títulos · acentos |
| Coral terroso | `#C97A5A` | Cor de marca secundária · alertas suaves · destaques |
| Cinza-taupe quente | `#8A857D` | Texto secundário · linhas finas · separadores |
| Verde-claro pálido | `#D4DDC9` | Fundos de cards positivos · gráficos · backgrounds suaves |

### Cores auxiliares (uso pontual)

| Cor | Hex | Uso |
|---|---|---|
| Verde-musgo escuro | `#3D5A3B` | Texto sobre verde-claro pálido · contraste alto |
| Coral profundo | `#8C4D34` | Texto sobre coral claro · alertas críticos |
| Off-white quente | `#F5F0E8` | Variação do branco para divisões sutis |

---

## 2. Tipografia

### Família de títulos
**Fraunces** — serifada moderna com toque artesanal e wellness.
- Uso: H1, H2, H3, números em destaque
- Pesos disponíveis: Regular (400), Medium (500), Semibold (600)
- Fallback: `Georgia, serif`

### Família de corpo
**Inter** — sans-serif clean e neutra, alta legibilidade em telas.
- Uso: Parágrafos, listas, labels, dados tabulares
- Pesos disponíveis: Regular (400), Medium (500), Semibold (600), Bold (700)
- Fallback: `system-ui, sans-serif`

### Family de código (opcional)
**JetBrains Mono** — para JSONs, prompts, valores numéricos críticos.
- Fallback: `'Courier New', monospace`

---

## 3. Estilo dos relatórios e peças visuais

### Princípios fundamentais

1. **Menos é mais** — abundância de espaço negativo, hierarquia por respiração.
2. **Dados em primeiro plano** — números e gráficos são protagonistas; ornamentos são supressíveis.
3. **Linhas finas** — bordas e separadores em 1px no máximo; preferência por delimitação por cor de fundo.
4. **Ausência de grades visíveis em gráficos** — eixos sutis, sem grid de fundo.
5. **Tipografia como hierarquia** — diferenciação por peso e tamanho, não por cor agressiva.
6. **Cor com parcimônia** — uma peça raramente usa mais de 3 cores ao mesmo tempo.

### Espaçamento
- Padding generoso em cards: mínimo 24px, ideal 32-48px em hero sections
- Gap entre seções: mínimo 48px, ideal 64-96px
- Line-height confortável: 1.6 para corpo, 1.2 para títulos

### Bordas e cantos
- Border-radius padrão: 8px para cards, 12px para hero sections, 4px para botões
- Sem bordas pretas. Quando precisar de delimitação, usar `#E8E4DC` (taupe muito claro)

---

## 4. Componentes visuais padrão

### Card básico
- Fundo: branco quente `#FBF9F5`
- Border-radius: 8px
- Padding interno: 24px
- Sombra: nenhuma, ou sombra muito sutil `0 1px 2px rgba(60, 50, 40, 0.04)`

### Card de destaque positivo
- Fundo: verde-claro pálido `#D4DDC9`
- Texto: verde-musgo escuro `#3D5A3B`
- Sem borda

### Card de alerta
- Fundo: coral suavizado (`#FAEFE9`)
- Borda esquerda: coral terroso `#C97A5A` em 3px
- Texto: coral profundo `#8C4D34`

### Botão primário
- Fundo: verde-musgo `#5C7A5A`
- Texto: branco quente `#FBF9F5`
- Padding: 12px 24px
- Border-radius: 4px
- Sem sombra

### Tabela
- Cabeçalho: fundo `#F5F0E8`, texto cinza-taupe `#8A857D`, peso semibold
- Linhas alternadas: opcional, com fundo `#FBF9F5` na linha par
- Sem bordas internas pesadas — separação por background

---

## 5. Logo (descrição em texto para SVG inline)

O logo da Lumina é minimalista:

- **Símbolo:** pequeno círculo vazado (apenas contorno em 2px) na cor verde-musgo `#5C7A5A`, diâmetro ~24px, centralizado verticalmente à esquerda do texto
- **Texto:** palavra "lumina" em letras minúsculas (lowercase), tipografia Fraunces Medium, cor verde-musgo `#5C7A5A`, tamanho ~36px
- **Espaçamento:** gap de 8px entre o símbolo e o texto
- **Variações:** versão monocromática em coral terroso `#C97A5A` para peças de alerta

### Sintaxe SVG sugerida
```svg
<svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
  <circle cx="14" cy="20" r="10" fill="none" stroke="#5C7A5A" stroke-width="2"/>
  <text x="32" y="28" font-family="Fraunces, Georgia, serif" font-weight="500" font-size="22" fill="#5C7A5A">lumina</text>
</svg>
```

---

## 6. O que evitar

- ❌ Gradientes coloridos chamativos (manter sólido ou gradiente sutil entre tons da mesma família)
- ❌ Sombras pesadas (a marca é leve)
- ❌ Ícones decorativos sem função (cada ícone tem que comunicar algo)
- ❌ Mais de 3 cores numa mesma peça (exceto dados em gráficos categóricos)
- ❌ Bordas pretas (`#000000`) — sempre cinza-taupe `#8A857D` ou taupe claro `#E8E4DC`
- ❌ Texto em maiúsculas inteiras (CAPS LOCK) em mais de 3 palavras seguidas
- ❌ Emojis em peças oficiais (uso ocasional em UI interno é OK)

---

## 7. Uso pelas Skills do Project

Toda Skill que gerar uma peça visual (HTML, relatório, infográfico) deve:

1. Importar Fraunces e Inter via Google Fonts no `<head>`
2. Usar a paleta principal como CSS custom properties:
   ```css
   :root {
     --bg: #FBF9F5;
     --primary: #5C7A5A;
     --accent: #C97A5A;
     --muted: #8A857D;
     --soft: #D4DDC9;
   }
   ```
3. Aplicar os princípios de espaçamento generoso e linhas finas
4. Renderizar o logo SVG inline no cabeçalho

A Skill da AP04 (painel de divergências) é o primeiro consumidor real deste documento.
