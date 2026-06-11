# Política de Conciliação de NFs — Lumina

> Manual de regras que governa a conciliação automática de notas fiscais contra pedidos e extrato bancário no Project Contas a Pagar — Lumina. Consultada por toda Skill que toma decisão de "conciliar" ou "marcar como exceção".

**Empresa:** Lumina (wellness premium · balas de goma funcionais)
**Vigência:** Outubro/2025 em diante
**Aprovado por:** Controller Lumina

---

## Princípio geral

**O Claude extrai e estrutura. O código (code execution) calcula e compara.**

Toda comparação numérica entre NF e pedido deve ser feita via code execution dentro do Claude, nunca por estimativa textual. Isso elimina o risco de erro decimal típico de LLMs em operações aritméticas.

---

## 1. Tolerância de valor

### Regra 1.1 — Conciliação automática
A NF é conciliada automaticamente com o pedido quando a diferença absoluta entre o valor total da NF e o valor do pedido é **menor ou igual a 1%** do valor do pedido.

**Exemplo:**
- Pedido: R$ 10.000,00
- NF: R$ 10.085,00
- Diferença: R$ 85,00 (0,85%)
- **Resultado:** Conciliado automaticamente.

### Regra 1.2 — Exceção por divergência de valor
Quando a diferença ultrapassa 1%, a NF é marcada como **exceção de valor** e enviada para análise manual.

**Exemplo:**
- Pedido: R$ 10.000,00
- NF: R$ 10.250,00
- Diferença: R$ 250,00 (2,5%)
- **Resultado:** Exceção. Não pagar até revisão.

### Regra 1.3 — Escalada urgente
Divergências de valor acima de **R$ 5.000,00 em valor absoluto** são escaladas como **prioridade alta** para a controller, independentemente do percentual.

---

## 2. Tolerância de prazo

### Regra 2.1 — Prazo aceito
A NF é aceita quando emitida em data igual ou até **5 dias úteis após** a data prevista no pedido.

### Regra 2.2 — Exceção por atraso
NF emitida com mais de 5 dias úteis de atraso em relação ao previsto é marcada como **exceção de prazo**. O pagamento pode ser processado mesmo assim, mas o fornecedor entra em alerta de performance.

### Regra 2.3 — Antecipação
NF emitida ANTES da data prevista no pedido é aceita sem ressalva (não é exceção).

---

## 3. NFs sem pedido prévio

### Regra 3.1 — Compras avulsas até R$ 2.000,00
NFs sem pedido prévio até R$ 2.000,00 podem ser aprovadas automaticamente, desde que:
- O CNPJ esteja cadastrado no plano de fornecedores
- A categoria seja "Marketing", "Administrativo" ou "Frete e Logística"

### Regra 3.2 — Compras avulsas acima de R$ 2.000,00
NFs sem pedido prévio acima de R$ 2.000,00 são automaticamente marcadas como **exceção** e exigem pedido retroativo emitido pelo solicitante antes do pagamento.

### Regra 3.3 — Categorias críticas
Para "Matéria-Prima" e "Embalagem", **toda NF exige pedido prévio**, independentemente do valor. Sem pedido, vira exceção.

---

## 4. Detecção de pagamento em duplicidade

### Regra 4.1 — Identificadores de duplicidade
Considera-se possível duplicidade quando, dentro de uma janela de **30 dias**, há combinação idêntica de:
- Mesmo CNPJ do fornecedor
- Mesmo número de NF
- Mesmo valor total (com tolerância de R$ 0,01)

### Regra 4.2 — Bloqueio automático
Ao detectar duplicidade, a Skill **bloqueia o pagamento** e gera alerta vermelho no painel de divergências.

### Regra 4.3 — Falso positivo
Notas com mesmo número mas CNPJs diferentes NÃO são duplicidade (numeração de NF é por emissor). O critério dos três campos juntos elimina falso positivo.

---

## 5. Tratamento de frete na NF

### Regra 5.1 — Frete destacado
Quando a NF tem valor de frete destacado em campo próprio, esse valor é classificado em "Frete e Logística", separado do valor dos produtos.

### Regra 5.2 — Frete embutido
Quando a NF não destaca frete (frete embutido no preço do produto), o valor total fica na categoria do produto (Matéria-Prima, Embalagem, etc.).

### Regra 5.3 — CIF vs FOB
NFs com modalidade **CIF** (frete por conta do remetente, geralmente já incluso) → não destacar frete.
NFs com modalidade **FOB** (frete por conta do destinatário, separado) → destacar e classificar em "Frete e Logística".

---

## 6. Devoluções e notas de crédito

### Regra 6.1 — Nota de devolução total
NF de devolução total cancela a NF original. Skill registra ambas e marca como "Pagamento não devido".

### Regra 6.2 — Nota de crédito parcial
Nota de crédito parcial (ajuste de valor) é abatida do valor da NF original na hora do pagamento. Skill registra a NF de crédito vinculada à NF original.

### Regra 6.3 — Validação de devolução
Toda devolução exige documento de comprovação (e-mail do fornecedor ou termo assinado) anexado ao pedido original.

---

## 7. Critérios de escalada de exceção

A Skill de conciliação envia para análise da controller (escalada prioridade alta) quando:

1. **Divergência de valor acima de R$ 5.000,00**
2. **Pagamento suspeito de duplicidade** (Regra 4.1 acionada)
3. **Fornecedor não cadastrado** no plano de fornecedores
4. **Categoria crítica sem pedido prévio** (Matéria-Prima ou Embalagem)
5. **Mesma NF entrou em exceção 3 vezes seguidas** (problema recorrente com fornecedor)

Todas as outras exceções vão para fila do analista de contas a pagar (prioridade normal).

---

## 8. Saídas esperadas da Skill de conciliação

Para cada NF processada, a Skill devolve uma das seguintes classificações:

- ✅ **Conciliado** — NF dentro de todas as tolerâncias, pagamento liberado
- ⚠️ **Exceção de valor** — diferença acima de 1%
- ⚠️ **Exceção de prazo** — atraso acima de 5 dias úteis
- ⚠️ **Exceção sem pedido** — NF sem pedido prévio (acima de R$ 2.000 ou categoria crítica)
- ⚠️ **Fornecedor não cadastrado** — CNPJ não está no plano de fornecedores
- 🔴 **Bloqueio por duplicidade** — possível pagamento em duplicidade
- 🔴 **Escalada urgente** — divergência acima de R$ 5.000 ou pagamento duplicado

Cada classificação aciona um fluxo diferente no painel de divergências da AP04.
