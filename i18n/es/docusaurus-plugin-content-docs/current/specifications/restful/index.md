---
sidebar_position: 1
---

# APIs RESTful

Esta especificación consolida las directrices para construir, consumir y documentar APIs RESTful en la plataforma Guardia. Su objetivo es garantizar la estandarización en las respuestas y comportamientos, promoviendo la interoperabilidad, trazabilidad y claridad tanto para consumidores internos como externos.

Las APIs REST de Guardia siguen los estándares definidos por las RFCs oficiales del protocolo HTTP, con ajustes necesarios para resolver ambigüedades potenciales y adherencia a los principios de [Compliance by Design](../../community/governance/COMPLIANCE.md).

La especificación RESTful está estructurada en módulos reutilizables y versionables que cubren los siguientes aspectos:

| Tema | Descripción |
|------|-----------|
| [Códigos de Estado](./http-status-code.md) | Lista de códigos de estado HTTP permitidos y reglas de uso. |
| [Payloads de Respuesta](./http-response-payloads.md) | Formato unificado para respuestas de éxito y error. |
| [Paginación](./http-pagination.md) | Estructura estándar para navegar entre recursos paginados. |
| [Ordenamiento](./http-sorting.md) | Reglas para usar los parámetros `order_by` y `sort`. |
| [Headers](./http-headers.md) | Headers estándar y personalizados utilizados en las APIs. |


> **IMPORTANTE:**
> Todas las reglas descritas aquí DEBEN ser aplicadas a cualquier endpoint HTTP implementado en la plataforma, excepto por excepciones justificadas y documentadas en ADR.
