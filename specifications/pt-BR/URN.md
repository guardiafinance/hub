# Uniform Resource Name

Uniform Resource Name (URN) é um tipo de URI (Uniform Resource Identifier) que usa o esquema URN para identificar recursos de forma única, persistente e independente de localização. Os URNs, definidos pela [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141.html), tem como característica principal ser um identificador que permanece globalmente único e persistente mesmo quando o recurso deixa de estar disponível ou deixa de existir.


## Por que usar?

O uso de URNs oferece benefícios significativos para a identificação e gerenciamento de recursos:

- **Persistência**: Garante que a identificação dos recursos permaneça estável e confiável ao longo do tempo, independentemente de mudanças em sua localização, estado ou disponibilidade. Isso é crucial para manter referências consistentes em sistemas de longa duração.

- **Unicidade**: Assegura que cada recurso tenha um identificador verdadeiramente único em escala mundial, eliminando ambiguidades e conflitos mesmo em ambientes distribuídos complexos.

- **Interoperabilidade**: Facilita significativamente a integração entre diferentes sistemas e domínios, permitindo referências consistentes e confiáveis aos recursos compartilhados, mesmo em arquiteturas distribuídas.

- **Padronização**: Segue especificações técnicas rigorosas definidas por RFCs, garantindo consistência na implementação e compatibilidade entre diferentes sistemas e tecnologias.

- **Independência de Localização**: O URN mantém independência da localização física do recurso, permitindo sua movimentação sem quebrar referências existentes.


## Quando usar?

URNs devem ser utilizados em cenários onde:

- **Identificação persistente**: No Guardia, é crucial manter identificadores imutáveis para contas, transações e outros registros financeiros ao longo do tempo. Por exemplo, mesmo que uma conta seja encerrada, seu histórico e identificador único precisam ser preservados para fins de auditoria e conformidade regulatória.

- **Referência cruzada**: O Guardia precisa integrar diversos módulos como Ledger Kernel Engine, Banking System Engine, Treasury Management Services, Payments Service Adapters, Banking Service Adapters e Data Warehouse Adapter, entre outros, que precisam referenciar recursos compartilhados como contas e clientes de forma consistente e confiável entre si.

- **Recursos globais**: Em ambientes cloud native com múltiplas regiões e zonas de disponibilidade como o Guardia, é essencial ter identificadores únicos e consistentes que funcionem através de toda a infraestrutura distribuída, permitindo rastreabilidade e consistência mesmo em cenários de disaster recovery e failover entre regiões.

- **Conformidade**: O setor bancário possui rigorosas exigências regulatórias que demandam rastreabilidade completa de todas as operações. URNs garantem identificação única e persistente necessária para atender requisitos do Banco Central e outros órgãos reguladores.

- **Integração de sistemas**: O Guardia pode se integrar com diversos sistemas externos do ecossistema financeiro. URNs estabelecem um padrão consistente de identificação que facilita essas integrações críticas do sistema financeiro.


## Como usar?

A norma [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141.html) descreve que o URN é composto por um NID e um NSS.

```
[URN] ::= "urn:" [NID] ":" [NSS]*
```

Observações importantes:
- As palavras e pontuações entre aspas ("urn:" e ":") são obrigatórias
- O prefixo "urn:" é case-insensitive (pode ser "URN:", "urn:", etc)
- O NID determina como a string NSS deve ser interpretada sintaticamente

### NID

O NID (Namespace Identifier) é a primeira parte do URN que identifica o namespace específico. No caso da Guardia, o NID é sempre "guardia".

Exemplo completo de URN:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{product}:\{entity_id}

urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{product}:\{entity_type}:\{entity_id}

urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{product}/\{entity_type}:\{entity_id}
```

### NSS 

O NSS (Namespace Specific String) é a parte restante que contém os identificadores específicos dentro do namespace Guardia. O NSS é composto pelos seguintes segmentos:

Campos globais:
- organization_id: Identificador único da organização
- tenant_id: Identificador único do tenant
- product: Identifica o produto Guardia (ex: lke, base, tms, psa, bsa)
- entity_type: Tipo da entidade
- entity_id: Identificador único da entidade

Campos contextuais:
- rail: Identifica o tipo de transação (ex: p2p, pix, ted, boleto, wire, ach)
- provider: Identifica o provedor do serviço (ex: guardia)

- protocol: Identifica o protocolo de comunicação (ex: stream, http, obdc, tcp)
- provider: Identifica o provedor do serviço (ex: guardia)

> NOTA:
>
> Os campos contextuais são necessarios quandos os produtos forem psa, bsa ou dwa.

#### Exemplo:

```
urn:guardia:org:6683756247371776:tenant:6683756247371777:lke:ledger:6683756247371778
```

#### Onde:
- organization_id = 6683756247371776
- tenant_id = 6683756247371777
- product = lke
- entity_type = ledger
- entity_id = 6683756247371778

> IMPORTANTE:
> 
> A implementação do URN deve ser feita de forma que o NID seja case-insensitive, e o NSS seja case-sensitive.
> 
> Por convenção, o NID deve ser escrito em letras minúsculas.

# Products:

Os produtos são os módulos básicos que compõem o Guardia, que podem ser utilizados em conjunto ou isoladamente, dependendo das necessidades do cliente.

## Core Modules:
- Guardia Ledger Kernel Engine:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:lke:*
```

- Guardia Banking System Engine: 

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:base:*
```
## Service Modules:
- Guardia Treasury Management Services: 

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:tms:*
```
- Guardia Payments Service Adapters: 

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:psa:\{rail}:\{provider}*
```
- Guardia Banking Service Adapters: 

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:bsa:\{rail}:\{provider}*
```
### Rails:

- p2p
- pix
- ted
- boleto
- wire
- ach
- fx
...

#### Providers:

p2p Providers:
- guardia

Pix Providers:
- transfeera
- celcoin

## Data Modules:
- Guardia Data Warehouse Adapter:     

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:dwa:\{protocol}:\{provider}*
```

#### Protocol
- stream
- http
- obdc
- tcp

#### Provider
- kafka
- postgres
- mysql
- mongodb
- rabbitmq

# Environments:

As seguintes variáveis de ambiente são utilizadas para identificar o ambiente onde o recurso está sendo executado:

- ORGANIZATION_ID: Identificador único da organização
- TENANT_ID: Identificador único do tenant
- PRODUCT: Identifica o produto Guardia (ex: lke, base, tms, psa, bsa, dwa)

Adicionalmente, as seguintes variáveis de ambiente são utilizadas para identificar o serviço de pagamento e o provedor do recurso:

- RAIL: Identifica o tipo de transação (ex: p2p, pix, ted, boleto, wire, ach)
- PAYMENT_PROVIDER: Identifica o provedor do serviço (ex: guardia)
- BANKING_PROVIDER: Identifica o provedor do serviço (ex: guardia)
- PROTOCOL: Identifica o protocolo de comunicação (ex: stream, http, obdc, tcp)
- DATA_PROVIDER: Identifica o provedor do serviço (ex: kafka, postgres, mysql, mongodb, rabbitmq)



