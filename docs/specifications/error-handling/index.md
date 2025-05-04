---
sidebar_position: 6
---

# Tratamento de Erros

Esta especificação define o padrão para representação, categorização e manipulação de erros na plataforma Guardia. O objetivo é garantir consistência, clareza e rastreabilidade na comunicação de falhas entre serviços, consumidores de API e interfaces de usuário.

## Estrutura do Payload de Erro

Todos os erros DEVEM ser encapsulados no campo `errors`, que DEVE ser um array de objetos, mesmo quando houver apenas um erro.

Cada objeto de erro DEVE conter as seguintes propriedades:

| Propriedade | Tipo   | Descrição                                                               |
| ----------- | ------ | ----------------------------------------------------------------------- |
| [`code`](#códigos-de-erro-code)      | string | Código semântico e descritivo, em UPPER\_SNAKE\_CASE, único no domínio. |
| [`reason`](#motivo-do-erro-reason)    | string | Categoria semântica do erro, usada para tratamento programático.        |
| [`message`](#mensagem-message)   | string | Descrição voltada ao desenvolvedor, sem revelar detalhes sensíveis.     |

### Exemplo de Payload

```json
{
  "errors": [
    {
      "code": "ERR402_INSUFFICIENT_FUNDS",
      "reason": "PAYMENT_IS_REQUIRED",
      "message": "É necessário regularizar o pagamento para continuar com a operação."
    }
  ]
}
```

## Regras Gerais

### Códigos de Erro (`code`)

- DEVEM ser únicos, em UPPER\_SNAKE\_CASE.
- DEVEM ser prefixados com ERR e o código HTTP (ex: `ERR400_...`) .
- DEVEM seguir coerência com os status HTTP correspondentes.

### Motivo do Erro (`reason`)

- DEVE ser uma string em UPPER_SNAKE_CASE.
- DEVE indicar a causa específica e direta do erro ocorrido, visando facilitar o diagnóstico técnico e o tratamento programático.
- DEVE complementar o `code`, oferecendo contexto adicional sobre a origem do problema.
- PODE haver múltiplos `reason` possíveis para um mesmo `code`, variando conforme a situação de origem.
- DEVEM estar listados em [Erros Conhecidos](./known-errors.md).
- NÃO DEVE conter dados sensíveis ou rastros técnicos internos.

### Mensagem (`message`)

- DEVE ser descritiva e orientada ao desenvolvedor.
- NUNCA DEVE expor informações sensíveis ou técnicas internas.
- PODE ser internacionalizável via header `Accept-Language`.

## Retentativa de Requisições

- As condições para retry DEVEM ser documentadas em [Erros Conhecidos](./known-errors.md).
- Quando aplicável, erros DEVEM indicar se são elegíveis a retry e incluir o tempo recomendado por meio do header `Retry-After`.
- Clientes DEVEM aplicar backoff exponencial com base 2 quando o tempo não for explicitado, até no máximo 4 tentativas.
- Após a 4ª tentativa, os clientes DEVEM adotar o padrão de circuit breaker para prevenir sobrecarga no serviço.
  - O estado half-open do circuit breaker PODE ser testado a cada 60 segundos.
- O número de tentativas e intervalos DEVEM ser configuráveis pelo cliente, respeitando limites definidos pela plataforma.

## Criação de Novos Erros

- DEVEM seguir a estrutura padronizada.
- DEVEM ser registrados em [Erros Conhecidos](./known-errors.md).
- Novos grupos de `reason` DEVEM ser justificados por contextos inéditos de negócio.

### Considerações de Segurança

- Erros de autenticação NUNCA DEVEM indicar se um usuário existe.
- Nenhuma mensagem DEVE conter stack trace ou identificadores internos sensíveis.

### Monitoramento

- TODOS os erros DEVEM ser registrados para auditoria.
- Erros `4xx` e `5xx` DEVEM ser monitorados continuamente.
- Erros `5xx` DEVEM acionar alertas.

## Quando Usar

Esta especificação DEVE ser aplicada em:

- APIs REST públicas e internas
- Comunicação entre microsserviços
- Integrações com parceiros e sistemas externos
- Interfaces de usuário que consomem APIs da plataforma

## Notas Adicionais

- Documentação de APIs DEVEM listar os possíveis `code` e `reason` por operação.



