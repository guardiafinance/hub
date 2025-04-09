---
sidebar_position: 2
---

# gRPC Status Code

Este documento define diretrizes de uso para os principais códigos de status gRPC no contexto da Guardia. O objetivo é garantir consistência e clareza entre equipes de desenvolvimento e parceiros integradores ao lidar com falhas e respostas em chamadas RPC.

Cada código é apresentado com:
- **Quando usar**: situações recomendadas para aplicar o status.
- **Quando não usar**: usos incorretos ou ambiguidades a evitar.

## Sucesso (0)

### OK (0)

**Quando usar:**
- Quando a operação foi concluída com sucesso sem falhas ou exceções.

**Quando não usar:**
- Quando há erro lógico ou técnico, mesmo que a operação tenha sido executada parcialmente.

## Erros do Cliente (1–11)

### CANCELLED (1)

**Quando usar:**
- Quando o cliente cancela a requisição antes da conclusão da operação.

**Quando não usar:**
- Quando o cancelamento é interno ao servidor (use `ABORTED`).

### INVALID_ARGUMENT (3)

**Quando usar:**
- Argumentos fornecidos pelo cliente são inválidos (ex: campos obrigatórios vazios, formatos incorretos).

**Quando não usar:**
- Quando o argumento é válido, mas fora de um intervalo permitido (use `OUT_OF_RANGE`).

### DEADLINE_EXCEEDED (4)

**Quando usar:**
- Quando o tempo limite de execução (deadline) da chamada foi atingido.

**Quando não usar:**
- Quando a falha ocorreu por indisponibilidade do serviço (use `UNAVAILABLE`).

### NOT_FOUND (5)

**Quando usar:**
- Quando o recurso solicitado não existe ou foi removido.

**Quando não usar:**
- Quando o recurso existe, mas o cliente não tem permissão de acesso (use `PERMISSION_DENIED`).

### ALREADY_EXISTS (6)

**Quando usar:**
- Quando o cliente tenta criar um recurso que já existe.

**Quando não usar:**
- Quando há conflito de estado (use `FAILED_PRECONDITION` ou `ABORTED`).

### PERMISSION_DENIED (7)

**Quando usar:**
- Cliente autenticado, mas sem permissão para executar a ação.

**Quando não usar:**
- Quando o cliente não está autenticado (use `UNAUTHENTICATED`).

### RESOURCE_EXHAUSTED (8)

**Quando usar:**
- Quando há limitação de uso de recursos, como limite de requisições ou cota atingida.

**Quando não usar:**
- Quando a operação falha por erro lógico (use `FAILED_PRECONDITION`).

### FAILED_PRECONDITION (9)

**Quando usar:**
- O sistema está em um estado inválido para processar a requisição (ex: diretório não está vazio).

**Quando não usar:**
- Quando a falha é de concorrência (use `ABORTED`).

### ABORTED (10)

**Quando usar:**
- Conflitos concorrenciais ou falhas de transação que exigem retry em nível superior.

**Quando não usar:**
- Quando a operação é cancelada diretamente pelo cliente (use `CANCELLED`).

### OUT_OF_RANGE (11)

**Quando usar:**
- Entrada válida fora de um intervalo permitido (ex: índice negativo).

**Quando não usar:**
- Quando o erro está na validade lógica ou estrutural do argumento (use `INVALID_ARGUMENT`).

## Erros do Servidor (12–16)

### UNIMPLEMENTED (12)

**Quando usar:**
- Método chamado não está implementado no servidor.

**Quando não usar:**
- Quando há falha interna ao tentar executar um método válido (use `INTERNAL`).

### INTERNAL (13)

**Quando usar:**
- Erros não esperados no backend, como falha em invariantes ou exceções sem captura.

**Quando não usar:**
- Quando é possível representar o erro com códigos mais específicos.

### UNAVAILABLE (14)

**Quando usar:**
- Quando o serviço está temporariamente indisponível ou em manutenção.
- Quando o cliente pode repetir a requisição com backoff.

**Quando não usar:**
- Quando o erro é permanente (use `INTERNAL`, `UNIMPLEMENTED` ou outro mais apropriado).

### DATA_LOSS (15)

**Quando usar:**
- Quando há corrupção de dados ou perda irrecuperável de informação.

**Quando não usar:**
- Para falhas de leitura ou escrita temporárias (use `UNAVAILABLE`).

### UNAUTHENTICATED (16)

**Quando usar:**
- Quando a requisição não contém autenticação válida ou não está autenticada.

**Quando não usar:**
- Quando a identidade está confirmada, mas não autorizada (use `PERMISSION_DENIED`).

## Considerações Finais

Essas diretrizes devem ser aplicadas a todos os serviços gRPC da Guardia, especialmente em contextos que exigem rastreabilidade, resiliência e segurança em APIs e sistemas distribuídos.

## Referências

[GRPC - Status Codes](https://grpc.io/docs/guides/status-codes)