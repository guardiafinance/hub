---
sidebar_position: 0
---

# Status Codes

Esta especificação define os códigos de status que DEVEM ser utilizados nas interfaces da Guardia, incluindo APIs RESTful (HTTP) e serviços gRPC. Seu propósito é garantir padronização nas respostas, promovendo interoperabilidade, rastreabilidade e clareza para consumidores internos e externos.

A Guardia segue os padrões oficiais de cada protocolo, conforme especificado nas documentações de HTTP e gRPC, e possíveis ambiguidades são esclarecidas na documentação de cada protocolo.

A adoção de status codes padronizados facilita o tratamento automatizado de erros, otimiza o suporte técnico e está alinhada aos princípios de **Compliance by Design**, como *transparência*, *auditabilidade* e *resposta consistente a falhas*.

## Para APIs RESTful (HTTP)

### 2xx - Respostas de Sucesso
- `200 OK`: Requisição processada com sucesso
- `201 Created`: Entidade criada com sucesso
- `202 Accepted`: Requisição aceita para processamento assíncrono
- `204 No Content`: Requisição sem conteúdo de retorno

### 3xx - Redirecionamentos
- `301 Moved Permanently`: Recurso movido permanentemente
- `304 Not Modified`: Recurso não modificado desde última requisição
- `307 Temporary Redirect`: Redirecionamento temporário

### 4xx - Erros do Cliente
- `400 Bad Request`: Erro de validação ou requisição malformada
- `401 Unauthorized`: Cliente não está autenticado
- `402 Payment Required`: Acesso ao recurso está condicionado a pagamento
- `403 Forbidden`: Cliente não tem permissão para acessar o recurso
- `404 Not Found`: Recurso não encontrado
- `408 Request Timeout`: Timeout na requisição
- `409 Conflict`: Conflito de estado da entidade
- `422 Unprocessable Entity`: Erros de negócio ou validação
- `429 Too Many Requests`: Limite de requisições excedido

### 5xx - Erros do Servidor
- `500 Internal Server Error`: Erro interno inesperado
- `501 Not Implemented`: Funcionalidade não implementada
- `502 Bad Gateway`: Erro em gateway ou proxy
- `503 Service Unavailable`: Sistema temporariamente indisponível
- `504 Gateway Timeout`: Timeout em gateway ou proxy

Para entender quando utilizar cada código de status code, veja a [documentação de códigos de status HTTP](./restful-status-code.md).

## Para Serviços gRPC

### Sucesso
- `OK (0)`: Operação concluída com sucesso

### Erros do Cliente (1-11)
- `CANCELLED (1)`: Cliente cancelou a requisição
- `INVALID_ARGUMENT (3)`: Argumentos inválidos fornecidos
- `DEADLINE_EXCEEDED (4)`: Tempo limite de execução atingido
- `NOT_FOUND (5)`: Recurso não encontrado
- `ALREADY_EXISTS (6)`: Recurso já existe
- `PERMISSION_DENIED (7)`: Cliente não tem permissão
- `RESOURCE_EXHAUSTED (8)`: Limite de recursos atingido
- `FAILED_PRECONDITION (9)`: Estado inválido para processar
- `ABORTED (10)`: Conflito concorrencial
- `OUT_OF_RANGE (11)`: Valor fora do intervalo permitido

### Erros do Servidor (12-16)
- `UNIMPLEMENTED (12)`: Método não implementado
- `INTERNAL (13)`: Erro interno inesperado
- `UNAVAILABLE (14)`: Serviço temporariamente indisponível
- `DATA_LOSS (15)`: Corrupção ou perda de dados
- `UNAUTHENTICATED (16)`: Cliente não autenticado

Para entender quando utilizar cada código de status gRPC, veja a [documentação de códigos de status gRPC](./grpc-status-code.md).

## Boas Práticas Transversais
- Toda resposta DEVE conter um corpo com a estrutura padronizada de resposta definida na [Especificação de Respostas da Guardia](../response-payload.md).
- Toda resposta de erro DEVE conter um corpo com a estrutura padronizada de erro definida na [Especificação de Erros da Guardia](../response-payload.md#Payload-em-casos-de-erro).

1. Quando aplicar
- Esta especificação DEVE ser adotada por todos os serviços RESTful e gRPC expostos pela Guardia.
- É RECOMENDADO que todos os sistemas, incluindo sistemas internos e pipelines de dados, sigam a convenção para facilitar diagnósticos e integrações.

### Notas Adicionais
- Em cenários híbridos (ex: REST + gRPC + Event Streams), a codificação de falhas DEVE ser compatível com o canal e documentada no contrato da interface.
- Para sistemas que retornam múltiplos resultados, erros parciais PODEM ser descritos em campo separado no payload de resposta.


