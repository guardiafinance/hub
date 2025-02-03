# Uniform Resource Name

A Uniform Resource Name (URN) is a type of URI (Uniform Resource Identifier) that uses the URN scheme to identify resources uniquely, persistently, and location-independently. URNs, defined by [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141.html), have the main characteristic of being an identifier that remains globally unique and persistent even when the resource becomes unavailable or ceases to exist.

## Why use it?

The use of URNs offers significant benefits for resource identification and management:

- **Persistence**: Ensures that resource identification remains stable and reliable over time, regardless of changes in location, state, or availability. This is crucial for maintaining consistent references in long-lasting systems.

- **Uniqueness**: Ensures that each resource has a truly unique identifier on a global scale, eliminating ambiguities and conflicts even in complex distributed environments.

- **Interoperability**: Significantly facilitates integration between different systems and domains, allowing consistent and reliable references to shared resources, even in distributed architectures.

- **Standardization**: Follows rigorous technical specifications defined by RFCs, ensuring consistency in implementation and compatibility between different systems and technologies.

- **Location Independence**: Although the URN includes region information in its structure for organizational purposes, the identifier still maintains independence from the resource's physical location, allowing it to be moved without breaking existing references.

## When to use?

URNs should be used in scenarios where:

- **Persistent identification**: In Guardia, it's crucial to maintain immutable identifiers for accounts, transactions, and other financial records over time. For example, even if an account is closed, its history and unique identifier need to be preserved for auditing and regulatory compliance purposes.

- **Cross-reference**: Guardia needs to integrate various modules such as Ledger Kernel Engine, Banking System Engine, Treasury Management Services, Payments Service Adapters, Banking Service Adapters, and Data Warehouse Adapter, among others, which need to reference shared resources like accounts and customers consistently and reliably among themselves.

- **Global resources**: In cloud-native environments with multiple regions and availability zones like Guardia, it's essential to have unique and consistent identifiers that work across the entire distributed infrastructure, enabling traceability and consistency even in disaster recovery and failover scenarios between regions.

- **Compliance**: The banking sector has strict regulatory requirements that demand complete traceability of all operations. URNs ensure unique and persistent identification necessary to meet Central Bank and other regulatory bodies' requirements.

- **System integration**: Guardia can integrate with various external systems in the financial ecosystem. URNs establish a consistent identification standard that facilitates these critical financial system integrations.

## How to use?

The [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141.html) standard describes that a URN is composed of an NID and an NSS.

```
[URN] ::= "urn:" [NID] ":" [NSS]*
```

Important notes:
- Words and punctuation in quotes ("urn:" and ":") are mandatory
- The "urn:" prefix is case-insensitive (can be "URN:", "urn:", etc.)
- The NID determines how the NSS string should be syntactically interpreted

### NID

The NID (Namespace Identifier) is the first part of the URN that identifies the specific namespace. In Guardia's case, the NID is always "guardia".

Complete URN example:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:[\{cloud_provider}:\{region}]:\{product}:\{entity_id}

urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:[\{cloud_provider}:\{region}]:\{product}:\{entity_type}:\{entity_id}


urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:[\{cloud_provider}:\{region}]:\{product}/\{entity_type}:\{entity_id}
```

#### Global resource:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{entity_type}:\{entity_id}
```

#### Resources with regional replication:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{cloud_provider}:\{region}:\{product}:\{entity_type}:\{entity_id}
```

### NSS 

The NSS (Namespace Specific String) is the remaining part that contains the specific identifiers within the Guardia namespace. The NSS is composed of the following segments:

Global fields:
- organization_id: Unique organization identifier
- tenant_id: Unique tenant identifier
- product: Identifies the Guardia product (e.g., lke, base, tms, psa, bsa)
- entity_type: Entity type
- entity_id: Unique entity identifier

Local fields (region-specific):
- cloud_provider: Cloud provider where the resource is hosted
- region: Cloud provider region

Contextual fields:
- rail: Identifies the transaction type (e.g., p2p, pix, ted, boleto, wire, ach)
- provider: Identifies the service provider (e.g., guardia)

- protocol: Identifies the communication protocol (e.g., stream, http, obdc, tcp)
- provider: Identifies the service provider (e.g., guardia)

> NOTE:
>
> Contextual fields are necessary when the products are psa, bsa, or dwa.

#### Example:

```
urn:guardia:org:6683756247371776:tenant:6683756247371777:aws:us-east-1:lke:ledger:6683756247371778
```

#### Where:
- organization_id = 6683756247371776
- tenant_id = 6683756247371777
- cloud_provider = aws  
- region = us-east-1
- product = lke
- entity_type = ledger
- entity_id = 6683756247371778

> IMPORTANT:
> 
> The URN implementation must be done so that the NID is case-insensitive, and the NSS is case-sensitive.
> 
> By convention, the NID should be written in lowercase letters.

# Products:

Products are the basic modules that make up Guardia, which can be used together or separately, depending on client needs.

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

## Cloud Providers:

- aws - Amazon Web Services
- azure - Microsoft Azure
- gcp - Google Cloud Platform
- self - Self-hosted

### Cloud Regions:

#### AWS
- us-east-1 - US East (N. Virginia)
- us-west-2 - US West (Oregon)
- sa-east-1 - South America (São Paulo)

#### Azure
- TBD

#### GCP
- TBD

# Environments:

The following environment variables are used to identify the environment where the resource is being executed:

- ORGANIZATION_ID: Unique organization identifier
- TENANT_ID: Unique tenant identifier
- CLOUD_PROVIDER: Cloud provider where the resource is hosted
- CLOUD_REGION: Cloud provider region
- PRODUCT: Identifies the Guardia product (e.g., lke, base, tms, psa, bsa, dwa)

Additionally, the following environment variables are used to identify the payment service and resource provider:

- RAIL: Identifies the transaction type (e.g., p2p, pix, ted, boleto, wire, ach)
- PAYMENT_PROVIDER: Identifies the service provider (e.g., guardia)
- BANKING_PROVIDER: Identifies the service provider (e.g., guardia)
- PROTOCOL: Identifies the communication protocol (e.g., stream, http, obdc, tcp)
- DATA_PROVIDER: Identifies the service provider (e.g., kafka, postgres, mysql, mongodb, rabbitmq)



