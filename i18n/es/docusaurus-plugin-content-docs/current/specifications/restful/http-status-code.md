---
sidebar_position: 1
---

# Status Code

Este documento define directrices de uso para los principales códigos de estado HTTP en el contexto de las APIs RESTful de Guardia. El objetivo es promover la consistencia entre equipos y evitar ambigüedades en las integraciones, garantizando una experiencia predecible para consumidores internos y externos.

Estas directrices DEBEN aplicarse a todos los módulos y servicios de Guardia, ya sea en la capa de API pública o en integraciones internas. La consistencia en los códigos de estado mejora la trazabilidad, reduce errores de consumo y facilita los diagnósticos.

## 2xx - Respuestas de Éxito

| Código                       | Estado                    | Métodos                        | Descripción                                           |
|------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [200](#200-ok)               | OK                        | `GET`, `POST`, `PUT`, `PATCH`  | Operaciones exitosas que retornan datos.              |
| [201](#201-created)          | Created                   | `POST`, `PUT`                  | Cuando se crea un nuevo recurso.                      |
| [202](#202-accepted)         | Accepted                  | `POST`, `PUT`, `PATCH`         | Procesamiento asíncrono.                              |
| [204](#204-no-content)       | No Content                | `DELETE`, `PUT`, `PATCH`       | Éxito sin contenido en la respuesta.                  |

### 200 OK

**Cuándo usar:**
- Solicitud procesada con éxito.
- Respuesta incluye datos o confirmación de la operación.
- Listados que no retornan resultados (ej: array vacío), pero fueron procesados con éxito.

**Cuándo no usar:**
- Cuando se creó una nueva entidad (use `201`).
- Cuando el procesamiento aún está pendiente (use `202`).
- Cuando no hay contenido relevante para retornar (use `204`).

### 201 Created

**Cuándo usar:**
- Una nueva entidad fue creada con éxito.
- Solicitud de tipo `POST` o `PUT` resultó en la creación del recurso.

**Cuándo no usar:**
- Cuando el recurso ya existía y solo fue actualizado.
- Cuando el proceso de creación aún no ha terminado (use `202`).

### 202 Accepted

**Cuándo usar:**
- La solicitud fue aceptada, pero el procesamiento ocurrirá de forma asíncrona.
- El resultado final será notificado posteriormente o estará disponible en otro endpoint.

**Cuándo no usar:**
- Cuando el resultado de la operación ya está disponible.
- Cuando no hay intención de procesar la solicitud.

### 204 No Content

**Cuándo usar:**
- Operación fue concluida con éxito, pero no hay contenido a retornar.
- Casos como eliminación, confirmación de actualización, o respuesta vacía de consulta.

**Cuándo no usar:**
- Cuando se espera retorno de contenido.
- Cuando la ausencia de contenido indica un error.
- En situaciones donde la respuesta será usada para validación de caché, pues `204` no transporta encabezados de control de caché aplicables al cuerpo.

## 3xx - Redireccionamientos

| Código                              | Estado                    | Métodos                        | Descripción                                           |
|-------------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [301](#301-moved-permanently)       | Moved Permanently         | `GET`                          | Redireccionamiento permanente de rutas.               |
| [304](#304-not-modified)            | Not Modified              | `GET`                          | Respuesta de caché cuando no hubo cambios.            |
| [307](#307-temporary-redirect)      | Temporary Redirect        | Todos                          | Redirecciona manteniendo el método y cuerpo original. |

### 301 Moved Permanently

**Cuándo usar:**
- Cuando un endpoint o recurso fue movido permanentemente a una nueva URL.
- DEBE ser usado en APIs que están en proceso de descontinuación de rutas antiguas.

**Cuándo no usar:**
- Cuando el cambio de ruta es temporal (use 307).
- Cuando el cliente aún DEBE utilizar la URL actual.

### 304 Not Modified

**Cuándo usar:**
- Cuando el recurso solicitado no cambió desde la última solicitud con caché (usando If-Modified-Since o ETag).
- Útil para optimizar consumo de red en APIs con caché fuerte.

**Cuándo no usar:**
- Cuando la respuesta no utiliza mecanismos de caché o control de versión.
- Cuando el contenido del recurso fue alterado y necesita ser retornado (use 200).

### 307 Temporary Redirect

**Cuándo usar:**
- Cuando un recurso está temporalmente accesible en otra URL.
- El método HTTP y el cuerpo de la solicitud original DEBE ser preservados.
- Casos de redireccionamiento temporal después de autenticación o delegación.

**Cuándo no usar:**
- Cuando el cambio es permanente (use 301).
- Cuando la intención es forzar al cliente a cambiar la URL de forma definitiva.
- Cuando el método DEBE ser convertido a GET (nunca use 307 en este caso).

## 4xx - Errores del Cliente

| Código                              | Estado                    | Métodos                        | Descripción                                       |
|-------------------------------------|---------------------------|--------------------------------|---------------------------------------------------|
| [400](#400-bad-request)             | Bad Request               | Todos                          | Solicitud malformada o inválida.                  |
| [401](#401-unauthorized)            | Unauthorized              | Todos                          | Autenticación ausente o inválida.                 |
| [402](#402-payment-required)        | Payment Required          | Todos                          | Pago requerido para acceso.                       |
| [403](#403-forbidden)               | Forbidden                 | Todos                          | Acceso denegado incluso con autenticación.        |
| [404](#404-not-found)               | Not Found                 | Todos                          | Recurso inexistente.                              |
| [408](#408-request-timeout)         | Request Timeout           | Todos                          | Cliente demoró para completar la solicitud.       |
| [409](#409-conflict)                | Conflict                  | `PUT`, `PATCH`, `POST`         | Conflicto con el estado actual del recurso.       |
| [422](#422-unprocessable-entity)    | Unprocessable Entity      | `POST`, `PUT`, `PATCH`         | Datos válidos, pero con error semántico.          |
| [429](#429-too-many-requests)       | Too Many Requests         | Todos                          | Límite de solicitudes excedido.                   |

### 400 Bad Request

**Cuándo usar:**
- Solicitud malformada o con datos inválidos.
- Fallo de validación sintáctica o semántica simple.

**Cuándo no usar:**
- Cuando los datos están correctos, pero no tienen sentido en el contexto (use `422`).

### 401 Unauthorized

**Cuándo usar:**
- Autenticación obligatoria no proporcionada o token inválido.

**Cuándo no usar:**
- Cuando el cliente está autenticado, pero no tiene permiso (use `403`).

### 402 Payment Required

**Cuándo usar:**
- Acceso al recurso condicionado a pago o suscripción activa.

**Cuándo no usar:**
- Cuando el problema está relacionado con permisos (use `403`).
- Cuando no hay relación con cobro o planes.

### 403 Forbidden

**Cuándo usar:**
- Cliente está autenticado, pero no tiene autorización para el recurso.

**Cuándo no usar:**
- Cuando el usuario no está autenticado (use `401`).

### 404 Not Found

**Cuándo usar:**
- El recurso solicitado no fue encontrado.
- El ID proporcionado no corresponde a ningún elemento conocido.

**Cuándo no usar:**
- Cuando el recurso existe, pero el acceso es restringido (use `403`).

### 408 Request Timeout

**Cuándo usar:**
- Cliente demoró para enviar la solicitud completa.

**Cuándo no usar:**
- Cuando el timeout ocurrió entre servidores (use `504`).

### 409 Conflict

**Cuándo usar:**
- Conflicto con el estado actual del recurso (ej: duplicidad, versión desactualizada).

**Cuándo no usar:**
- Cuando el error es de validación (use `400` o `422`).

### 422 Unprocessable Entity

**Cuándo usar:**
- Datos sintácticamente correctos, pero semánticamente inválidos (ej: CPF inválido, saldo insuficiente).

**Cuándo no usar:**
- Cuando el problema es de formato o falta de propiedades (use `400`).

### 429 Too Many Requests

**Cuándo usar:**
- El cliente excedió límites de solicitudes por tiempo (rate limit).

**Cuándo no usar:**
- Cuando el error no está relacionado con volumen o límite de uso.

## 5xx - Errores del Servidor

| Código                              | Estado                    | Métodos                        | Descripción                                           |
|-------------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [500](#500-internal-server-error)   | Internal Server Error     | Todos                          | Error interno inesperado.                             |
| [501](#501-not-implemented)         | Not Implemented           | Cualquier no soportado         | Método válido, pero no implementado en el servidor.   |
| [502](#502-bad-gateway)             | Bad Gateway               | Todos                          | Error al recibir respuesta de otro servidor.          |
| [503](#503-service-unavailable)     | Service Unavailable       | Todos                          | Servicio fuera de línea temporalmente.                |
| [504](#504-gateway-timeout)         | Gateway Timeout           | Todos                          | Sin respuesta a tiempo de otro servidor.              |

### 500 Internal Server Error

**Cuándo usar:**
- Fallas inesperadas o excepciones no tratadas.
- Problemas internos del sistema.

**Cuándo no usar:**
- Cuando el error es predecible o tratable por el cliente.

### 501 Not Implemented

**Cuándo usar:**
- Método HTTP válido pero no soportado.
- Funcionalidad aún no implementada.

**Cuándo no usar:**
- Cuando el recurso existe pero hay falla interna al procesar (use `500`).

### 502 Bad Gateway

**Cuándo usar:**
- Gateway recibió respuesta inválida de otro servidor.

**Cuándo no usar:**
- Cuando el error está en el propio servicio y no en el intermediario (use `500`).

### 503 Service Unavailable

**Cuándo usar:**
- Servicio temporalmente no disponible por mantenimiento o sobrecarga.

**Cuándo no usar:**
- Cuando el servicio está activo pero falló internamente (use `500`).

### 504 Gateway Timeout

**Cuándo usar:**
- Gateway o proxy no recibió respuesta a tiempo de otro servidor.

**Cuándo no usar:**
- Cuando el timeout ocurrió del cliente al servidor (use `408`).

## Notas adicionales

- Los códigos de estado utilizados en cada endpoint DEBEN ser documentados en el contrato OAS de la API.
- Los códigos de estado aquí descritos son considerados el **estándar mínimo** para cualquier API RESTful de Guardia.

## Referencias

- [RFC 9110 – HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110#name-status-codes)
- [Códigos de estado de respuesta HTTP - HTTP | MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
