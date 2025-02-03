# Uniform Resource Name

Uniform Resource Name (URN) es un tipo de URI (Uniform Resource Identifier) que utiliza el esquema URN para identificar recursos de forma única, persistente e independiente de la ubicación. Los URNs, definidos por la [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141.html), tienen como característica principal ser un identificador que permanece globalmente único y persistente incluso cuando el recurso deja de estar disponible o deja de existir.

## ¿Por qué usar?

El uso de URNs ofrece beneficios significativos para la identificación y gestión de recursos:

- **Persistencia**: Garantiza que la identificación de los recursos permanezca estable y confiable a lo largo del tiempo, independientemente de cambios en su ubicación, estado o disponibilidad. Esto es crucial para mantener referencias consistentes en sistemas de larga duración.

- **Unicidad**: Asegura que cada recurso tenga un identificador verdaderamente único a escala mundial, eliminando ambigüedades y conflictos incluso en entornos distribuidos complejos.

- **Interoperabilidad**: Facilita significativamente la integración entre diferentes sistemas y dominios, permitiendo referencias consistentes y confiables a los recursos compartidos, incluso en arquitecturas distribuidas.

- **Estandarización**: Sigue especificaciones técnicas rigurosas definidas por RFCs, garantizando consistencia en la implementación y compatibilidad entre diferentes sistemas y tecnologías.

- **Independencia de Ubicación**: Aunque el URN incluye información de región en su estructura para fines organizacionales, el identificador mantiene independencia de la ubicación física del recurso, permitiendo su movimiento sin romper referencias existentes.

## ¿Cuándo usar?

Los URNs deben utilizarse en escenarios donde:

- **Identificación persistente**: En Guardia, es crucial mantener identificadores inmutables para cuentas, transacciones y otros registros financieros a lo largo del tiempo. Por ejemplo, incluso si una cuenta se cierra, su historial e identificador único necesitan ser preservados para fines de auditoría y conformidad regulatoria.

- **Referencia cruzada**: Guardia necesita integrar diversos módulos como Ledger Kernel Engine, Banking System Engine, Treasury Management Services, Payments Service Adapters, Banking Service Adapters y Data Warehouse Adapter, entre otros, que necesitan referenciar recursos compartidos como cuentas y clientes de forma consistente y confiable entre sí.

- **Recursos globales**: En ambientes cloud native con múltiples regiones y zonas de disponibilidad como Guardia, es esencial tener identificadores únicos y consistentes que funcionen a través de toda la infraestructura distribuida, permitiendo trazabilidad y consistencia incluso en escenarios de disaster recovery y failover entre regiones.

- **Conformidad**: El sector bancario posee rigurosas exigencias regulatorias que demandan trazabilidad completa de todas las operaciones. Los URNs garantizan identificación única y persistente necesaria para cumplir requisitos del Banco Central y otros órganos reguladores.

- **Integración de sistemas**: Guardia puede integrarse con diversos sistemas externos del ecosistema financiero. Los URNs establecen un estándar consistente de identificación que facilita estas integraciones críticas del sistema financiero.

## ¿Cómo usar?

La norma [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141.html) describe que el URN está compuesto por un NID y un NSS.

```
[URN] ::= "urn:" [NID] ":" [NSS]*
```

Observaciones importantes:
- Las palabras y puntuaciones entre comillas ("urn:" y ":") son obligatorias
- El prefijo "urn:" es case-insensitive (puede ser "URN:", "urn:", etc)
- El NID determina cómo la cadena NSS debe ser interpretada sintácticamente

### NID

El NID (Namespace Identifier) es la primera parte del URN que identifica el namespace específico. En el caso de Guardia, el NID es siempre "guardia".

Ejemplo completo de URN:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:[\{cloud_provider}:\{region}]:\{product}:\{entity_id}

urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:[\{cloud_provider}:\{region}]:\{product}:\{entity_type}:\{entity_id}

urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:[\{cloud_provider}:\{region}]:\{product}/\{entity_type}:\{entity_id}
```

#### Recurso global:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{entity_type}:\{entity_id}
```

#### Recursos con replicación regional:

```
urn:guardia:org:\{organization_id}:tenant:\{tenant_id}:\{cloud_provider}:\{region}:\{product}:\{entity_type}:\{entity_id}
```

### NSS 

El NSS (Namespace Specific String) es la parte restante que contiene los identificadores específicos dentro del namespace Guardia. El NSS está compuesto por los siguientes segmentos:

Campos globales:
- organization_id: Identificador único de la organización
- tenant_id: Identificador único del tenant
- product: Identifica el producto Guardia (ej: lke, base, tms, psa, bsa)
- entity_type: Tipo de la entidad
- entity_id: Identificador único de la entidad

Campos locales (específicos de la región):
- cloud_provider: Proveedor de nube donde el recurso está alojado
- region: Región del proveedor de nube

Campos contextuales:
- rail: Identifica el tipo de transacción (ej: p2p, pix, ted, boleto, wire, ach)
- provider: Identifica el proveedor del servicio (ej: guardia)

- protocol: Identifica el protocolo de comunicación (ej: stream, http, obdc, tcp)
- provider: Identifica el proveedor del servicio (ej: guardia)

> NOTA:
>
> Los campos contextuales son necesarios cuando los productos son psa, bsa o dwa.

#### Ejemplo:

```
urn:guardia:org:6683756247371776:tenant:6683756247371777:aws:us-east-1:lke:ledger:6683756247371778
```

#### Donde:
- organization_id = 6683756247371776
- tenant_id = 6683756247371777
- cloud_provider = aws  
- region = us-east-1
- product = lke
- entity_type = ledger
- entity_id = 6683756247371778

> IMPORTANTE:
> 
> La implementación del URN debe hacerse de forma que el NID sea case-insensitive, y el NSS sea case-sensitive.
> 
> Por convención, el NID debe escribirse en letras minúsculas.

# Products:

Los productos son los módulos básicos que componen Guardia, que pueden utilizarse en conjunto o aisladamente, dependiendo de las necesidades del cliente.

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
- self - Autoalojado

### Cloud Regions:

#### AWS
- us-east-1 - US East (N. Virginia)
- us-west-2 - US West (Oregon)
- sa-east-1 - South America (São Paulo)

#### Azure
- Por determinar

#### GCP
- Por determinar

# Environments:

Las siguientes variables de entorno se utilizan para identificar el ambiente donde el recurso está siendo ejecutado:

- ORGANIZATION_ID: Identificador único de la organización
- TENANT_ID: Identificador único del tenant
- CLOUD_PROVIDER: Proveedor de nube donde el recurso está alojado
- CLOUD_REGION: Región del proveedor de nube
- PRODUCT: Identifica el producto Guardia (ej: lke, base, tms, psa, bsa, dwa)

Adicionalmente, las siguientes variables de entorno se utilizan para identificar el servicio de pago y el proveedor del recurso:

- RAIL: Identifica el tipo de transacción (ej: p2p, pix, ted, boleto, wire, ach)
- PAYMENT_PROVIDER: Identifica el proveedor del servicio (ej: guardia)
- BANKING_PROVIDER: Identifica el proveedor del servicio (ej: guardia)
- PROTOCOL: Identifica el protocolo de comunicación (ej: stream, http, obdc, tcp)
- DATA_PROVIDER: Identifica el proveedor del servicio (ej: kafka, postgres, mysql, mongodb, rabbitmq)



