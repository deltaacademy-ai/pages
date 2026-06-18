# SKILL: escrever-copy-lumina

## Quando usar esta Skill

Use esta Skill sempre que o usuário pedir para escrever a copy completa de uma peça de Instagram da Lumina a partir de um briefing (output do plano editorial gerado pela Skill `planejar-mes-lumina`). Triggers típicos: "escreve a copy desse post", "monta o carrossel da peça X", "produz a copy desse briefing", "escreve esse post no tom Lumina".

## O que esta Skill faz

Esta Skill transforma uma linha do plano editorial (uma peça do calendário) em copy completa pronta para publicar — capa, slides (quando carrossel), CTA e legenda — aplicando rigorosamente o tom acolhedor experto da Lumina, as palavras proibidas, a estrutura do formato escolhido e o estágio do Funil de Confiança correspondente.

## Inputs que a Skill espera

A Skill espera **um input do usuário** no momento da invocação:

1. **Briefing da peça** — bloco de texto com pelo menos: estágio do funil, linha editorial, formato, headline/hook e briefing curto (output direto da Skill `planejar-mes-lumina`).

Se o briefing estiver incompleto (faltando estágio ou formato), a Skill pergunta antes de gerar. Não inventa briefing.

## Estrutura do output por formato

A Skill identifica automaticamente qual dos 5 formatos Lumina foi pedido e devolve a copy na estrutura correspondente.

### Formato 1 — Carrossel Educativo

Output em 6 blocos numerados:

- **Slide 01 — Capa.** Headline já fornecida no briefing (refinada se necessário) + 1 frase de promessa do que vem.
- **Slides 02 a 04 — Desenvolvimento.** Cada slide com: título forte do tópico (1 linha) + 2-3 frases explicando o ponto + 1 frase de fechamento prático.
- **Slide 05 — Tradução para a rotina.** 2-3 frases conectando o conteúdo ao dia a dia da Mariana.
- **Slide 06 — CTA.** 1 a 2 frases, CTA suave no tom acolhedor (Salvar / Compartilhar / Link na bio / Comentar palavra-chave).
- **Legenda do post.** 4-6 linhas que complementam o carrossel — não repetem, contextualizam. Termina com até 3 hashtags estratégicas (não mais que isso, mantém o feed limpo).

### Formato 2 — Insights Rápidos

Output em 3 blocos:

- **Imagem (frase única para arte).** Frase forte de 1-2 linhas. É o que vai aparecer escrito na imagem do post.
- **Legenda do post.** 5-8 linhas no tom Lumina: frase inicial reforçando a tese, desenvolvimento curto (2-4 linhas com a implicação prática), fechamento (1 frase de conclusão inevitável).
- **Hashtags.** Até 3, estratégicas.

### Formato 3 — Carrossel-Ritual

Output em 6 blocos numerados:

- **Slide 01 — Cena que abre o ritual.** Headline curta + descrição da cena visual (para a Skill de imagem na AP04 usar como referência).
- **Slides 02 a 04 — Desdobramento do ritual.** Cada slide com 2-3 frases primeira pessoa, mostrando como o produto se encaixa no momento.
- **Slide 05 — Convite ao ritual.** 1 pergunta ou convite para a leitora compartilhar o ritual dela.
- **Slide 06 — CTA suave.** Direciona para loja online ou física.
- **Legenda do post.** 4-6 linhas, primeira pessoa, conversado.

### Formato 4 — Carrossel-Ciência Leve

Output em 6 blocos numerados:

- **Slide 01 — Pergunta ou afirmação que abre o tema.** Headline + 1 frase de contexto.
- **Slides 02 a 04 — Tradução do mecanismo.** Cada slide com: termo técnico em destaque + tradução prática + impacto na rotina.
- **Slide 05 — Aplicação no produto Lumina.** Como o ingrediente aparece no produto correspondente.
- **Slide 06 — CTA com convite a aprofundar.** Salvar para revisar / Comentar para DM.
- **Legenda do post.** 4-6 linhas técnico-acessíveis.

### Formato 5 — Framework Visual

Output em 2 blocos:

- **Descrição da imagem única.** Estrutura visual completa (título central, blocos/etapas, hierarquia, paleta Lumina). Detalhado o suficiente para a Skill de imagem na AP04 ou um designer reproduzir.
- **Legenda do post.** 6-10 linhas que complementam o infográfico: contexto/problema, explicação do framework, detalhamento de cada parte, orientação de aplicação, CTA.

## Regras de qualidade que a Skill respeita

1. **Tom acolhedor experto em 100% da copy.** Nenhuma headline, slide ou frase de legenda usa palavras proibidas (monstro, fera, bombar, gigante, "amiga vou te contar", "você merece", "compre agora!", etc.).

2. **Nunca promete transformação milagrosa.** Nenhuma copy usa "em X dias você vai", "transforme seu corpo", "perca peso". Wellness premium é processo, não milagre.

3. **Ciência sempre traduzida.** Termo técnico nunca aparece sozinho — sempre vem acompanhado da versão prática ("seu corpo aproveita melhor" em vez de "biodisponibilidade otimizada").

4. **Frases curtas, parágrafos respiráveis.** Instagram premia leitura fluida. Frase máxima de 18 palavras quando possível.

5. **Primeira pessoa quando o formato pedir.** Carrossel-ritual e legendas próximas usam "eu gosto de tomar antes de", "a gente percebe a diferença". Outros formatos podem ser segunda pessoa.

6. **CTA coerente com o estágio do funil.** Semana 1 (NOTAM VOCÊ) — CTA suave: salvar, comentar. Semana 6 (COMPRAM DE VOCÊ) — CTA mais direto: link na bio, passa na loja. Nunca usa urgência fabricada.

7. **Hashtags estratégicas, máximo 3.** Lumina prefere feed limpo. Hashtags genéricas tipo `#fitness #saude #wellness` são proibidas. Sempre 3 hashtags relevantes e específicas (ex: `#suplementacaofuncional #creatinaparamulheres #ritualdetreino`).

8. **Produto aparece apenas quando o briefing pedir.** Se o briefing não mencionar produto específico, a copy não menciona produto. Não força CTA comercial onde não cabe.

## Output enxuto

A Skill entrega a copy direto: blocos numerados na estrutura do formato + legenda + hashtags. Sem preâmbulo, sem explicação meta, sem repetir o briefing recebido. A Bruna é profissional ocupada — recebe copy pronta para revisar.

## Conexão com outras Skills do Project

A copy gerada por esta Skill é o **input direto** da Skill `gerar-imagem-lumina` (AP04). A Bruna usa a copy + descrição visual da peça para gerar a imagem correspondente e montar o post final.
