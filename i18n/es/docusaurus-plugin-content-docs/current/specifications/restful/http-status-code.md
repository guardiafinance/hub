---
sidebar_position: 1
---

# Códigos de Estado

Este documento define directrices de uso para los principales códigos de estado HTTP en el contexto de las APIs RESTful de Guardia. El objetivo es promover la consistencia entre los equipos y evitar ambigüedades en integraciones, garantizando una experiencia predecible para consumidores internos y externos.

Estas directrices deben ser aplicadas en todos los módulos y servicios de Guardia, sea en la capa de API pública o en integraciones internas. La consistencia en los códigos de estado mejora la trazabilidad, reduce errores de consumo y facilita diagnósticos.

Cada código tiene dos secciones:
- **Cuándo usar**: casos apropiados para aplicar el código.
- **Cuándo no usar**: trampas comunes o situaciones donde el uso sería inadecuado.

## 2xx - Respuestas de Éxito

### 200 OK

**Cuándo usar:**
- Solicitud procesada con éxito.
- Respuesta incluye datos o confirmación de la operación.

**Cuándo no usar:**
- Cuando una nueva entidad ha sido creada (use `201`).
- Cuando el procesamiento aún está pendiente (use `202`).
- Cuando no hay contenido relevante para retornar (use `204`).

### 201 Created

**Cuándo usar:**
- Una nueva entidad ha sido creada con éxito.
- Solicitud del tipo `POST` o `PUT` resultó en la creación de recurso.

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
- Cuando la ausencia de

## 3xx - Redirecciones

### 301 Moved Permanently

**Cuándo usar:**
- Cuando un endpoint o recurso ha sido movido permanentemente a una nueva URL.
- Debe ser usado en APIs que están en proceso de descontinuación de rutas antiguas.

**Cuándo no usar:**
- Cuando el cambio de ruta es temporal (use 307).
- Cuando el cliente aún debe utilizar la URL actual.

### 304 Not Modified

**Cuándo usar:**
- Cuando el recurso solicitado no ha cambiado desde la última solicitud con caché (usando If-Modified-Since o ETag).
- Útil para optimizar consumo de red en APIs con caché fuerte.

**Cuándo no usar:**
- Cuando la respuesta no utiliza mecanismos de caché o control de versión.
- Cuando el contenido del recurso ha sido alterado y necesita ser retornado (use 200).

### 307 Temporary Redirect

**Cuándo usar:**
- Cuando un recurso está temporalmente accesible en otra URL.
- El método HTTP y el cuerpo de la solicitud original deben ser preservados.
- Casos de redirección temporal después de autenticación o delegación.

**Cuándo no usar:**
- Cuando el cambio es permanente (use 301).
- Cuando la intención es forzar al cliente a cambiar la URL de forma definitiva.
- Cuando el método debe ser convertido a GET (nunca use 307 en ese caso).


## 4xx - Errores del Cliente

### 400 Bad Request

**Cuándo usar:**
- Solicitud malformada o con datos inválidos.
- Falla de validación sintáctica o semántica simple.

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
- El ID proporcionado no corresponde a ningún ítem conocido.

**Cuándo no usar:**
- Cuando el recurso existe, pero el acceso está restringido (use `403`).

### 408 Request Timeout

**Cuándo usar:**
- Cliente demoró en enviar la solicitud completa.

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
- Cuando el problema es de formateo o falta de campos (use `400`).

### 429 Too Many Requests

**Cuándo usar:**
- El cliente excedió límites de solicitudes por tiempo (rate limit).

**Cuándo no usar:**
- Cuando el error no está relacionado con volumen o límite de uso.

## 5xx - Errores del Servidor

### 500 Internal Server Error

**Cuándo usar:**
- Fallos inesperados o excepciones no tratadas.
- Problemas internos del sistema.

**Cuándo no usar:**
- Cuando el error es previsible o tratable por el cliente.

### 501 Not Implemented

**Cuándo usar:**
- Método HTTP válido pero no soportado.
- Funcionalidad aún no implementada.

**Cuándo no usar:**
- Cuando el recurso existe pero hay fallo interno al procesar (use `500`).

### 502 Bad Gateway

**Cuándo usar:**
- Gateway recibió respuesta inválida de otro servidor.

**Cuándo no usar:**
- Cuando el error está en el propio servicio y no en el intermediario (use `500`).

### 503 Service Unavailable

**Cuándo usar:**
- Servicio temporalmente indisponible por mantenimiento o sobrecarga.

**Cuándo no usar:**
- Cuando el servicio está activo pero falló internamente (use `500`).

### 504 Gateway Timeout

**Cuándo usar:**
- Gateway o proxy no recibió respuesta a tiempo de otro servidor.

**Cuándo no usar:**
- Cuando el timeout ocurrió del cliente al servidor (use `408`).

## Referencias

- [RFC 9110 – HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110#name-status-codes)
- [Códigos de estado de respuestas HTTP - HTTP | MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)