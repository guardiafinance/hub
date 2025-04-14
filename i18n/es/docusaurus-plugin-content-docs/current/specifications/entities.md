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
| `entity_id`          | UUID v7      | Sí          | Identificador único global. Garantiza unicidad y ordenación temporal.       |
| `entity_type`        | string       | Sí          | Tipo lógico de entidad (ej: ledger, chapter, asset).                      |
| `external_entity_id` | string       | No          | ID externo proporcionado por sistemas clientes.                               |
| `created_at`         | datetime     | Sí          | Fecha/hora de creación (ISO 8601).                                          |
| `updated_at`         | datetime     | No          | Última modificación registrada (ISO 8601).                                   |
| `discarded_at`       | datetime     | No          | Marca lógica de eliminación (soft delete).                                   |
| `metadata`           | JSON         | No          | Parámetros personalizables por clave-valor (máx. 10KB).          |
| `version`            | integer      | Sí          | Número secuencial de control de versión.                                  |
| `history`            | array        | No          | Registro completo de cambios y versiones anteriores.                     |

### Requisitos Detallados

#### `entity_id`
- DEBE ser único, inmutable y generado por el sistema.
- DEBE implementar UUID v7 según la [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7) asegurando ordenación temporal.

#### `entity_type`
- DEBE pertenecer a una lista controlada de entidades conocidas por el sistema.

#### `external_entity_id`
- PUEDE ser nulo.
- PUEDE implementar cualquier versión de UUID o hash de hasta 36 caracteres.
- CUANDO esté presente, DEBE ser único dentro del `entity_type`.
- Ideal para referencias cruzadas con sistemas heredados o externos.

#### `created_at`
- DEBE ser un datetime en UTC formateado según [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- DEBE ser generado automáticamente en la creación.
- NO PUEDE ser modificado después de la creación.

#### `updated_at`
- DEBE ser un datetime en UTC formateado según [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- DEBE ser actualizado con cada modificación persistente.
- Utilizado para control de concurrencia y sincronización.

#### `discarded_at`
- DEBE ser un datetime en UTC formateado según [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- PUEDE ser nulo.
- Cuando está lleno, indica eliminación lógica. La entidad permanece en el sistema para fines de trazabilidad.

#### `metadata`
- DEBE ser un JSON Object.
- Clave y valor DEBEN ser strings.
- DEBE seguir el tamaño ideal de 4KB siempre que sea posible y NO DEBE exceder 10KB.
- Las actualizaciones DEBEN realizarse mediante JSON Merge Patch (RFC 7386).
- NO DEBE contener datos sensibles o personales sin previsión legal.

#### `version`
- Se inicializa en 1 y se incrementa automáticamente junto con `updated_at`.

#### `history`
- Almacena instantáneas de versiones anteriores.
- Utilizado para auditoría, rollback e investigación.
- El historial DEBE ser omitido de las respuestas temporales (create, update, delete y get).
- El historial DEBE ser proporcionado en las respuestas de lectura (get) cuando sea solicitado por el cliente en el endpoint `api/v1/<entity_type>/<entity_id>/history`.

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
