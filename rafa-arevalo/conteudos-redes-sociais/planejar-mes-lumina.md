# SKILL: planejar-mes-lumina

## Quando usar esta Skill

Use esta Skill sempre que o usuário pedir para planejar o calendário mensal de conteúdo de Instagram da Lumina, gerar pautas do ciclo do Funil de Confiança, ou montar a estratégia editorial do próximo ciclo de 6 semanas. Triggers típicos: "planejar o mês da Lumina", "monta o calendário do ciclo", "preciso das pautas do funil", "gera o plano editorial".

## O que esta Skill faz

Esta Skill gera um plano editorial completo de Instagram da Lumina cobrindo um ciclo de 6 semanas no modelo do Funil de Confiança. Cada semana tem um papel narrativo específico (notam → lembram → seguem → confiam → precisam → compram), e a Skill produz 3 peças por semana, totalizando 18 peças no ciclo — combinando linhas editoriais Lumina + formatos de Instagram + pauta quente fornecida pelo usuário.

## Inputs que a Skill espera

A Skill espera **dois inputs do usuário** no momento da invocação:

1. **Mês de referência do ciclo.** Ex: "junho/2026" ou "ciclo de junho a meados de julho".
2. **Pauta quente do mês** (2 a 3 tendências, notícias ou movimentos relevantes para Lumina). Ex: "início do inverno (justifica suplementação para imunidade), Maratona de Floripa em julho, Athletic Greens lançou variação no exterior".

Se o usuário não fornecer a pauta quente, a Skill pergunta antes de gerar. Não inventa pauta quente — sempre usa o input do usuário.

## Estrutura do Funil de Confiança que a Skill aplica

O ciclo de 6 semanas segue rigorosamente os 6 estágios:

- **Semana 1 — NOTAM VOCÊ.** Hook forte que faz parar o scroll. ICP pensa "quem é essa marca?". Linhas editoriais preferidas: Mitos e verdades / Cultura wellness.
- **Semana 2 — LEMBRAM DE VOCÊ.** Consistência. ICP começa a reconhecer o rosto, o tom, o estilo. Linha editorial preferida: Ciência sem palestra.
- **Semana 3 — SEGUEM VOCÊ.** Conteúdo de valor (framework, diagnóstico). ICP segue para não perder. Linhas editoriais preferidas: Ciência sem palestra / Ritual da rotina.
- **Semana 4 — CONFIAM EM VOCÊ.** Cases, provas, bastidores. ICP pensa "essa marca sabe do que tá falando". Linha editorial preferida: Bastidores Lumina.
- **Semana 5 — PRECISAM DE VOCÊ.** Conteúdo que nomeia a dor. ICP se vê no problema e sente urgência (sem coerção fabricada). Linhas editoriais preferidas: Mitos e verdades / Cultura wellness.
- **Semana 6 — COMPRAM DE VOCÊ.** ICP convencido. CTA aparece com formalidade. Linha editorial preferida: Produto em movimento.

## Estrutura do output

A Skill devolve o plano editorial em **formato de tabela markdown única**, com as 18 peças organizadas por semana e dia da semana. A tabela tem as colunas:

| Semana | Dia | Estágio do Funil | Linha Editorial | Formato | Headline / Hook | Briefing curto (2 frases) |

**Regras de preenchimento da tabela:**

- **Semana:** numeração de 1 a 6.
- **Dia:** Segunda, Quarta ou Sexta (3 publicações por semana, espaçadas).
- **Estágio do Funil:** o nome do estágio em maiúsculas (NOTAM VOCÊ, LEMBRAM DE VOCÊ, etc.).
- **Linha Editorial:** uma das 6 linhas editoriais Lumina (Ciência sem palestra, Ritual da rotina, Mitos e verdades, Bastidores Lumina, Cultura wellness, Produto em movimento).
- **Formato:** um dos 5 formatos Lumina (Carrossel educativo, Insights rápidos, Carrossel-ritual, Carrossel-ciência leve, Framework visual).
- **Headline / Hook:** a frase de abertura da peça. Já escrita no tom acolhedor experto, parando o scroll sem clichê.
- **Briefing curto:** 2 frases que descrevem o conteúdo da peça e o ângulo escolhido. Suficiente para a Bruna entender, mas não detalhado a ponto de inflar o output.

Depois da tabela, a Skill devolve um **bloco curto de observações estratégicas** (3-5 bullets) explicando como a pauta quente foi distribuída no ciclo e quais peças têm conexão direta com os produtos Lumina (pré-treino, creatina, whey).

## Regras de qualidade que a Skill respeita

1. **Distribuição de linhas editoriais.** No ciclo de 18 peças, a Skill respeita aproximadamente a distribuição da Lumina: 25% Ciência sem palestra (4-5 peças), 25% Ritual da rotina (4-5), 15% Mitos e verdades (3), 15% Bastidores (3), 10% Cultura wellness (2), 10% Produto em movimento (2).

2. **Distribuição de formatos.** Mistura os 5 formatos ao longo do ciclo. Não repete o mesmo formato em peças consecutivas da mesma semana.

3. **Pauta quente integrada.** Cada tendência fornecida pelo usuário aparece em pelo menos 1 peça do ciclo, alocada na semana onde faz mais sentido narrativo.

4. **Produtos rotacionados.** Os 3 produtos Lumina (pré-treino, creatina, whey) aparecem ao longo do ciclo de forma equilibrada — nenhum produto domina, nenhum desaparece.

5. **Tom acolhedor experto em toda headline.** Nenhuma headline usa as palavras proibidas (monstro, fera, bombar, gigante, etc.) nem promessas milagrosas.

6. **Última peça da Semana 6.** Sempre é Produto em movimento com CTA direto para a loja online ou física — é a peça que fecha o ciclo de venda.

## Output enxuto

A Skill entrega o plano direto: tabela + bloco curto de observações. Sem preâmbulo, sem explicação meta, sem repetir o que foi pedido. A Bruna é profissional ocupada — recebe o material pronto para revisar.

## Conexão com outras Skills do Project

Este plano gerado é o **input direto** da Skill `escrever-copy-lumina` (AP03). A Bruna pega uma peça específica desta tabela (geralmente da Semana 1) e usa como briefing para a Skill de copy escrever o post final.
