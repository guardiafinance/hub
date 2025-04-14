---
sidebar_position: 3
---

# Idempotência

A idempotência é uma propriedade fundamental em sistemas distribuídos que garante que operações repetidas com os mesmos parâmetros produzem sempre o mesmo resultado e não causam efeitos colaterais adicionais.

No contexto da Guardia, a idempotência é essencial para preservar a consistência de dados e garantir a confiabilidade de interações em APIs e no processamento de eventos — especialmente em ambientes sujeitos a falhas de rede, timeouts ou políticas de retry automáticas. Essa prática mitiga riscos como duplicação de transações, inconsistências de estado e efeitos colaterais indesejados.

---

## Regras Gerais

### Princípios Fundamentais

- Operações idempotentes DEVEM produzir o mesmo resultado para múltiplas execuções com os mesmos parâmetros.
- A verificação de idempotência NÃO DEVE depender exclusivamente da chave de idempotência.
- O controle DEVE considerar a combinação da chave e o hash do payload da requisição ou evento.
- A chave de idempotência:
  - DEVE ser fornecida pelo cliente.
  - DEVE ser única por operação e escopo de rota.
  - DEVE seguir o formato UUID, conforme [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).
- O hash deve ser gerado com algoritmo `SHA-256`.

### Armazenamento e Validação

- O estado de idempotência DEVE ser armazenado em sistema de cache distribuído e resiliente.
- O tempo de retenção DO estado DEVE ser de no mínimo 2 horas e no máximo 24 horas.
- O sistema DEVE validar:
  - Se a chave foi usada.
  - Se o hash do payload coincide com a execução anterior.

### Segurança e Compliance

- O estado de idempotência DEVE ser armazenado de forma segura, em conformidade com políticas de proteção de dados.
- O acesso a esses dados DEVE ser auditável.
- Tentativas maliciosas de repetição com a mesma chave DEVEM ser monitoradas e mitigadas.
- Logs de operações idempotentes DEVEM conter identificadores rastreáveis para análise posterior.

### Dependências Técnicas

- Armazenamento distribuído para persistência temporária do estado da operação.
- Cache resiliente para respostas rápidas e deduplicação.
- Mecanismos de auditoria e monitoramento contínuo.

---

## Implementação em APIs

- Endpoints que modificam estado (ex: `POST`, `PUT`, `PATCH`) DEVEM ser idempotentes.
- O cabeçalho `Idempotency-Key` DEVE ser obrigatório nesses endpoints.
- QUANDO não informado, o sistema DEVE retornar `400 BAD REQUEST`, com código `ERR400_INVALID_ARGUMENT` e motivo `IDEMPOTENCY_KEY_REQUIRED`.
- A resposta DEVE incluir o mesmo cabeçalho `Idempotency-Key`.
- A primeira execução DEVE armazenar:
  - O resultado da operação.
  - O hash do payload.
  - A chave de idempotência e timestamp.
- Requisições subsequentes com mesma chave e hash do payload:
  - DEVE retornar o resultado original armazenado.
  - NÃO DEVE executar a operação novamente.
  - DEVE incluir o header `Last-Modified` com a data original da execução.
- QUANDO a chave já estiver registrada, MAS o hash do payload for diferente:
  - O sistema DEVE rejeitar a requisição com erro `409 CONFLICT`, código `ERR409_CONFLICT` e motivo `CONFLICTING_IDEMPOTENT_REQUEST`.
---

## Implementação em Eventos

- Todos os eventos publicados pela plataforma DEVEM ser idempotentes.
- O campo `idempotencykey` DEVE estar presente no payload, conforme [spec de eventos](../specifications/cloud-events.md).
- O consumidor DEVE registrar o estado de execução com base na chave e hash do evento.
- O evento DEVE ser considerado único por `idempotencykey`.
- Se um evento já tiver sido processado:
  - O sistema DEVE ignorá-lo e retornar ACK ao broker.
  - NÃO DEVE reexecutar a lógica associada.
  - A execução original PODE ser registrada em logs para fins de auditoria.

## Comportamentos Esperados

### Em APIs

#### Primeira requisição:
- Operação é processada.
- Resultado é persistido com a chave e o hash do payload.
- Retorna 200 com payload e `Idempotency-Key`.

#### Requisição repetida com mesma chave e hash do payload:
- Resultado anterior é retornado.
- Operação NÃO é reexecutada.
- Retorna 200 e header `Last-Modified`.

#### Requisição com mesma chave e hash do payload diferente:
- O sistema REJEITA com erro `409 CONFLICT`.
- Deve retornar mensagem clara com código `ERR409_CONFLICT` e motivo `CONFLICTING_IDEMPOTENT_REQUEST`.

### Em Eventos

#### Primeiro recebimento:
- Evento é processado normalmente.
- Resultado é persistido para deduplicação futura.
- Estado do sistema é alterado conforme regra de negócio.

#### Evento duplicado:
- Evento é reconhecido como já processado.
- Operação é ignorada.
- ACK é enviado ao broker.
- Logs PODEM indicar que se tratava de evento repetido.

## Quando Usar

A idempotência DEVE ser aplicada:

- Em qualquer operação que modifique o estado do sistema (APIs e eventos).
- Em fluxos críticos de negócio (ex: criação de transações, usuários, contratos).
- Em sistemas sujeitos a falhas de rede, replicações ou timeouts.
- Sempre que o cliente ou consumidor tiver política de retry ativa.

## Quando Não Usar

A idempotência NÃO DEVE ser aplicada:

- Em operações puramente de leitura (ex: `GET`, eventos de consulta).
- Em fluxos que não geram efeitos colaterais.
- Em chamadas que, por definição, sempre devem produzir resultado novo (ex: geração de UUID aleatório, polling, etc).


## Referências

- [Draft RFC The Idempotency-Key Header Field](https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-01.html)
- [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562)
