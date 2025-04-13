---
sidebar_position: 1
---

# HTTP Status Codes

Este documento define diretrizes de uso para os principais códigos de status HTTP no contexto de APIs RESTful da Guardia. O objetivo é promover consistência entre os times e evitar ambiguidades em integrações, garantindo uma experiência previsível para consumidores internos e externos.

Essas diretrizes devem ser aplicadas em todos os módulos e serviços da Guardia, seja na camada de API pública ou em integrações internas. Consistência nos códigos de status melhora a rastreabilidade, reduz erros de consumo e facilita diagnósticos.

Cada código possui duas seções:
- **Quando usar**: casos apropriados para aplicar o código.
- **Quando não usar**: armadilhas comuns ou situações onde o uso seria inadequado.

## 2xx - Respostas de Sucesso

### 200 OK

**Quando usar:**
- Requisição processada com sucesso.
- Resposta inclui dados ou confirmação da operação.

**Quando não usar:**
- Quando uma nova entidade foi criada (use `201`).
- Quando o processamento ainda está pendente (use `202`).
- Quando não há conteúdo relevante para retornar (use `204`).

### 201 Created

**Quando usar:**
- Uma nova entidade foi criada com sucesso.
- Requisição do tipo `POST` ou `PUT` resultou na criação de recurso.

**Quando não usar:**
- Quando o recurso já existia e apenas foi atualizado.
- Quando o processo de criação ainda não terminou (use `202`).

### 202 Accepted

**Quando usar:**
- A requisição foi aceita, mas o processamento ocorrerá de forma assíncrona.
- O resultado final será notificado posteriormente ou estará disponível em outro endpoint.

**Quando não usar:**
- Quando o resultado da operação já está disponível.
- Quando não há intenção de processar a requisição.

### 204 No Content

**Quando usar:**
- Operação foi concluída com sucesso, mas não há conteúdo a retornar.
- Casos como deleção, confirmação de update, ou resposta vazia de consulta.

**Quando não usar:**
- Quando é esperado retorno de conteúdo.
- Quando a ausência de

## 3xx - Redirecionamentos

### 301 Moved Permanently

**Quando usar:**
- Quando um endpoint ou recurso foi movido permanentemente para uma nova URL.
- Deve ser usado em APIs que estão em processo de descontinuação de rotas antigas.

**Quando não usar:**
- Quando a mudança de rota é temporária (use 307).
- Quando o cliente ainda deve utilizar a URL atual.

### 304 Not Modified

**Quando usar:**
- Quando o recurso solicitado não mudou desde a última requisição com cache (usando If-Modified-Since ou ETag).
- Útil para otimizar consumo de rede em APIs com cache forte.

**Quando não usar:**
- Quando a resposta não utiliza mecanismos de cache ou controle de versão.
- Quando o conteúdo do recurso foi alterado e precisa ser retornado (use 200).

### 307 Temporary Redirect

**Quando usar:**
- Quando um recurso está temporariamente acessível em outra URL.
- O método HTTP e o corpo da requisição original devem ser preservados.
- Casos de redirecionamento temporário após autenticação ou delegação.

**Quando não usar:**
- Quando a mudança é permanente (use 301).
- Quando a intenção é forçar o cliente a mudar a URL de forma definitiva.
- Quando o método deve ser convertido para GET (nunca use 307 nesse caso).


## 4xx - Erros do Cliente

### 400 Bad Request

**Quando usar:**
- Requisição malformada ou com dados inválidos.
- Falha de validação sintática ou semântica simples.

**Quando não usar:**
- Quando os dados estão corretos, mas não fazem sentido no contexto (use `422`).

### 401 Unauthorized

**Quando usar:**
- Autenticação obrigatória não fornecida ou token inválido.

**Quando não usar:**
- Quando o cliente está autenticado, mas não tem permissão (use `403`).

### 402 Payment Required

**Quando usar:**
- Acesso ao recurso condicionado a pagamento ou assinatura ativa.

**Quando não usar:**
- Quando o problema está relacionado a permissões (use `403`).
- Quando não há relação com cobrança ou planos.

### 403 Forbidden

**Quando usar:**
- Cliente está autenticado, mas não tem autorização para o recurso.

**Quando não usar:**
- Quando o usuário não está autenticado (use `401`).

### 404 Not Found

**Quando usar:**
- O recurso solicitado não foi encontrado.
- O ID fornecido não corresponde a nenhum item conhecido.

**Quando não usar:**
- Quando o recurso existe, mas o acesso é restrito (use `403`).

### 408 Request Timeout

**Quando usar:**
- Cliente demorou para enviar a requisição completa.

**Quando não usar:**
- Quando o timeout ocorreu entre servidores (use `504`).

### 409 Conflict

**Quando usar:**
- Conflito com o estado atual do recurso (ex: duplicidade, versão desatualizada).

**Quando não usar:**
- Quando o erro é de validação (use `400` ou `422`).

### 422 Unprocessable Entity

**Quando usar:**
- Dados sintaticamente corretos, mas semanticamente inválidos (ex: CPF inválido, saldo insuficiente).

**Quando não usar:**
- Quando o problema é de formatação ou falta de campos (use `400`).

### 429 Too Many Requests

**Quando usar:**
- O cliente excedeu limites de requisições por tempo (rate limit).

**Quando não usar:**
- Quando o erro não está relacionado a volume ou limite de uso.

## 5xx - Erros do Servidor

### 500 Internal Server Error

**Quando usar:**
- Falhas inesperadas ou exceções não tratadas.
- Problemas internos do sistema.

**Quando não usar:**
- Quando o erro é previsível ou tratável pelo cliente.

### 501 Not Implemented

**Quando usar:**
- Método HTTP válido mas não suportado.
- Funcionalidade ainda não implementada.

**Quando não usar:**
- Quando o recurso existe mas há falha interna ao processar (use `500`).

### 502 Bad Gateway

**Quando usar:**
- Gateway recebeu resposta inválida de outro servidor.

**Quando não usar:**
- Quando o erro está no próprio serviço e não no intermediário (use `500`).

### 503 Service Unavailable

**Quando usar:**
- Serviço temporariamente indisponível por manutenção ou sobrecarga.

**Quando não usar:**
- Quando o serviço está ativo mas falhou internamente (use `500`).

### 504 Gateway Timeout

**Quando usar:**
- Gateway ou proxy não recebeu resposta a tempo de outro servidor.

**Quando não usar:**
- Quando o timeout ocorreu do cliente para o servidor (use `408`).

## Referências

- [RFC 9110 – HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110#name-status-codes)
- [Códigos de status de respostas HTTP - HTTP | MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status)