---
sidebar_position: 0
---

# Entidades

Esta especificación define el modelo estructural mínimo que todas las entidades de la plataforma Guardia DEBEN seguir. El objetivo es garantizar la consistencia entre servicios, la interoperabilidad entre dominios y la adherencia a los requisitos de seguridad, trazabilidad y cumplimiento desde la concepción.

Esta estructura base se aplica a cualquier objeto persistente y rastreable de la plataforma, abarcando APIs, bases de datos, eventos de dominio, integraciones externas y demás mecanismos de representación de entidades.

Al adoptar este estándar, toda entidad:
- Posee un identificador único y global;
- Está versionada con control explícito de cambios;
- Mantiene un historial completo y auditable;
- Puede ser integrada y eventualmente descartada sin pérdida de trazabilidad.

La aplicación de esta estructura reduce inconsistencias, facilita integraciones y elimina brechas de auditoría que podrían comprometer el cumplimiento de normas como **LGPD**, **SOC 2** e **ISO 27001**.

Además, el modelo refuerza los principios de **Compliance by Design**, asegurando:
- Identificación única (`entity_id`);
- Trazabilidad temporal (`created_at`, `updated_at`, `discarded_at`);
- Integridad y control de concurrencia (`version`);
- Preservación de historial y reversibilidad (`history`);
- Integración e interoperabilidad con sistemas externos (`external_entity_id`, `metadata`).

### Estructura Base

La estructura base de una entidad en Guardia DEBE contener los siguientes campos:

| Campo                | Tipo         | Obligatorio | Propósito                                                                 |
|----------------------|--------------|-------------|---------------------------------------------------------------------------|
| [`entity_id`](#entity_id)          | UUID v7      | Sí          | Identificador único global. Garantiza unicidad y ordenación temporal.       |
| [`entity_type`](#entity_type)        | string       | Sí          | Tipo lógico de entidad (ej: ledger, chapter, asset).                      |
| [`external_entity_id`](#external_entity_id) | string       | No          | ID externo proporcionado por sistemas clientes (máx. 36 caracteres).      |
| [`created_at`](#created_at)         | datetime     | Sí          | Fecha/hora de creación en UTC.                                |
| [`updated_at`](#updated_at)         | datetime     | Sí          | Última modificación registrada en UTC.                        |
| [`discarded_at`](#discarded_at)       | datetime     | No          | Marca lógica de eliminación en UTC.                           |
| [`metadata`](#metadata)           | JSON         | No          | Parámetros clave y valor (máx. 10KB).                                    |
| [`version`](#version)            | integer      | Sí          | Número secuencial de control de versión.                                 |
| [`history`](#history)            | array        | No          | Registro completo de cambios y versiones anteriores.                     |

### Requisitos Detallados

#### `entity_id`
- DEBE ser único, inmutable y generado por el sistema.
- DEBE implementar UUID v7 según la [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7) asegurando ordenación temporal.

#### `entity_type`
- DEBE pertenecer a una lista controlada de entidades conocidas por el sistema.

#### `external_entity_id`
- PUEDE ser nulo.
- DEBE tener un máximo de 36 caracteres.
- CUANDO esté presente, DEBE ser único dentro del `entity_type`.
- Ideal para referencias cruzadas con sistemas heredados o externos.

#### `created_at`
- DEBE ser un datetime en UTC formateado según [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- DEBE ser generado automáticamente en la creación.
- NO PUEDE ser modificado después de la creación.

#### `updated_at`
- DEBE ser un datetime en UTC formateado según [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- DEBE ser actualizado con cada modificación persistente.
- En la creación, DEBE asumir el mismo valor que `created_at`.
- En el descarte, DEBE asumir el mismo valor que `discarded_at`.
- Utilizado para control de concurrencia y sincronización.

#### `discarded_at`
- DEBE ser un datetime en UTC formateado según [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- PUEDE ser nulo.
- Cuando está lleno, indica eliminación lógica. La entidad permanece en el sistema para fines de trazabilidad.

#### `metadata`
- DEBE ser un JSON Object.
- Clave y valor DEBEN ser strings.
- DEBE seguir el tamaño ideal de 4KB siempre que sea posible y NO DEBE exceder 10KB.
- Las actualizaciones DEBEN realizarse mediante JSON Merge Patch (RFC 7386).
- NO DEBE contener datos sensibles o personales sin previsión legal.
- Los valores PUEDEN ser almacenados cifrados, con impacto en el rendimiento.

#### `version`
- Se inicializa en 1 y se incrementa automáticamente junto con `updated_at`.
- NUNCA se reinicia, incluso después de restaurar una entidad descartada.
- En caso de conflicto de versión, se preserva la última versión, descartando la que entró en conflicto.

#### `history`
- Almacena instantáneas de versiones anteriores.
- Utilizado para auditoría, rollback e investigación.
- Por defecto, almacena las últimas 10 versiones más recientes por hasta 365 días.
- El historial DEBE ser omitido de las respuestas temporales (create, update, delete y get).
- El historial DEBE ser proporcionado en las respuestas de lectura (get) cuando sea solicitado por el cliente en el endpoint `api/v1/<entity_type>/<entity_id>/history`.
- El endpoint de historial devuelve una lista de hasta 10 registros históricos de la misma entidad.
- Los valores PUEDEN ser almacenados cifrados, con impacto en el rendimiento.

### Cuándo aplicar

Este modelo DEBE ser adoptado siempre que:
- Se modele un nuevo recurso de dominio;
- Se expongan APIs internamente o externamente;
- Se generen eventos de dominio;
- Los datos requieran unicidad, trazabilidad, reversibilidad o interoperabilidad.

> IMPORTANTE: Las excepciones DEBEN ser justificadas y aprobadas por el Comité Directivo y registradas en un [Registro de Decisión de Producto (PDR)](../community/governance/index.md#registros-de-decisión-de-producto-pdr).

### Referencias
- [RFC 9562: UUID Version 7](https://datatracker.ietf.org/doc/html/rfc9562)
- [RFC 7386: JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7386)
- [RFC 3339: Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339)
