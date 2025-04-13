---
sidebar_position: 2
---

# Headers

Esta especificación describe los headers estándar y personalizados adoptados por Guardia en sus APIs RESTful.

Su objetivo es promover la consistencia entre interfaces, garantizar la previsibilidad en el consumo de datos y facilitar la interoperabilidad entre módulos internos, servicios externos e integraciones de socios.

La estandarización de headers contribuye a una trazabilidad eficiente, depuración segura y escalabilidad de las integraciones.

| Header                  | Tipo     | Categoría | Dirección | Obligatorio | Propósito                                 |
|-------------------------|----------|-----------|-----------|-------------|--------------------------------------------|
| [Cache-Control](#cache-control)           | string   | estándar  | Response  | Opcional    | Directivas de control de caché.            |
| [Link](#link)             | string   | estándar  | Response  | Opcional    | Links referente a paginação de resultados ou estado de una entidad. |
| [X-Grd-Debug](#x-grd-debug)             | booleano | personalizado | Request   | Opcional    | Habilita el retorno de información de depuración.     |
| [X-Grd-Trace-Id](#x-grd-trace-id)          | uuid     | personalizado | Response  | Obligatorio | Trazabilidad interna.                   |
| [X-Grd-Correlation-Id](#x-grd-correlation-id)    | uuid     | personalizado | Req/Resp  | Opcional    | Propagación de contexto externo.            |

## Headers Estándar

### Cache-Control

El campo de header `Cache-Control` DEBE ser usado para guiar los mecanismos de caché tanto en solicitudes como en respuestas.

#### Respuesta

El caché DEBE ser configurado con la directiva `max-age=<seconds>`, precedida por:

- `public`, cuando el caché puede ser compartido entre múltiples usuarios;

```http
Cache-Control: public, max-age=<seconds>
```

- `private`, cuando el caché es exclusivo del usuario final.

```http
Cache-Control: private, max-age=<seconds>
```

Para respuestas que **NO DEBEN** ser almacenadas en caché, se DEBE usar el siguiente header:

```http
Cache-Control: no-store
```

Otras directivas pueden ser añadidas según sea necesario, siguiendo [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111#section-5.2).

---

### Link

El header `Link` PUEDE ser usado para proporcionar enlaces relacionados con la paginación de resultados o el estado de una entidad, indicado por el parámetro `rel`, siguiendo las directivas [HATEOAS](https://restfulapi.net/hateoas) de la especificación RESTful.

Ejemplo para paginación:

```http
Link: <https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first"
```

Ejemplo para estado de entidad:

```http
Link: <https://{tenant_id}.guardia.finance/api/v1/ledgers/{entity_id}>; rel="ledger"
```

---

## Headers Personalizados

Los headers personalizados utilizados por Guardia siguen la convención del prefijo `X-Grd-*`. Abordan necesidades específicas de trazabilidad, depuración y correlación entre sistemas.

### X-Grd-Debug

Header booleano opcional. Cuando está presente con el valor `true`, la respuesta DEBE incluir el campo `debug` en el payload, conteniendo información adicional según la [especificación de payloads de respuesta](./http-response-payloads.md#debug).

```http
X-Grd-Debug: true
```

**Valor predeterminado:** `false`

> **ADVERTENCIA:**
> El uso en entornos de producción DEBE ser restringido, ya que puede hacer que el payload de respuesta sea más verboso y consuma más recursos.

---

### X-Grd-Trace-Id

Header obligatorio devuelto en **todas las respuestas** de las APIs de Guardia. Representa el identificador único de la solicitud.

- Generado por la infraestructura de Guardia.
- Facilita la correlación de logs y eventos entre servicios.
- El valor DEBE seguir el estándar UUIDv7, con marcación temporal según lo especificado en [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7).

```http
X-Grd-Trace-Id: <uuid>
```

---

### X-Grd-Correlation-Id

Header opcional enviado por sistemas externos. Utilizado para propagar el contexto de seguimiento a lo largo de llamadas distribuidas.

- Si está presente en la solicitud, DEBE ser incluido en la respuesta.
- El valor DEBE seguir el estándar propuesto por [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).

```http
X-Grd-Correlation-Id: <uuid>
```

---

## Consideraciones de Seguridad

- El uso de `X-Grd-Debug: true` en entornos de producción DEBE ser controlado por alcance o autenticación.
- Los headers de seguimiento **NO DEBEN** contener datos sensibles, PII o secretos.
- Las solicitudes deben ser validadas independientemente del estado de autenticación.

---

## Referencias

- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [Headers HTTP - HTTP | MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Headers)
- [HATEOAS](https://restfulapi.net/hateoas)
