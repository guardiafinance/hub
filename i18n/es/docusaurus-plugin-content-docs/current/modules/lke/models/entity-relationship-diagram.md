---
sidebar_position: 0
---

import MermaidDiagram from '@site/src/components/MermaidDiagram';

# Entidades y Relaciones

<MermaidDiagram>
```mermaid
erDiagram
    LEDGER ||--o{ CHAPTER : contiene
    LEDGER ||--o{ LEDGER_HISTORY : rastrea
    LEDGER {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        string name "Único dentro de la organización y tenant. Longitud máxima: 128 caracteres."
        string description "Descripción para propósitos de reportes. Longitud máxima: 256 caracteres."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59."
    }

    LEDGER_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        string name "Único dentro de la organización y tenant. Longitud máxima: 128 caracteres."
        string description "Descripción para propósitos de reportes. Longitud máxima: 256 caracteres."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }

    CHAPTER ||--o{ CHAPTER_HISTORY : rastrea
    CHAPTER {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        string name "Único dentro del ledger. Longitud máxima: 128 caracteres."
        string description "Descripción para propósitos de reportes. Longitud máxima: 256 caracteres."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59."
    }

    CHAPTER_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        string name "Único dentro del ledger. Longitud máxima: 128 caracteres."
        string description "Descripción para propósitos de reportes. Longitud máxima: 256 caracteres."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }

    BOOK ||--o{ ENTRY : contiene
    BOOK ||--|| POSITION : tiene
    BOOK ||--|| LEDGER : pertenece_a
    BOOK ||--o{ CHAPTER : referencia
    BOOK ||--o{ BOOK_HISTORY : rastrea
    BOOK {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        uuid chapter_id FK "Relación con CHAPTER."
        uuid position_id FK "Relación con POSITION."
        string name "Único dentro del ledger. Longitud máxima: 128 caracteres."
        enum nature "Naturaleza del book. Debe ser CREDITOR o DEBITOR."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59"
    }

    BOOK_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        uuid chapter_id FK "Relación con CHAPTER."
        uuid position_id FK "Relación con POSITION."
        string name "Único dentro del ledger. Longitud máxima: 128 caracteres."
        enum nature "Naturaleza del book. Debe ser CREDITOR o DEBITOR."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }

    POSITION ||--|| ASSET : referencia
    POSITION ||--o{ POSITION_HISTORY : rastrea
    POSITION {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid book_id FK "Relación con BOOK."
        uuid asset_id FK "Relación con ASSET."
        timestamp reference_date "Fecha de transacción. Si no se proporciona, será la fecha de inserción en la base de datos."
        bigint posted_amount "Total monto publicado en la posición."
        bigint posted_credits "Total créditos publicados en la posición."
        bigint posted_debits "Total débitos publicados en la posición."
        bigint confirmable_amount "Total monto a ser confirmado en la posición."
        bigint confirmable_credits "Total créditos a ser confirmados en la posición."
        bigint confirmable_debits "Total débitos a ser confirmados en la posición."
        bigint provisioned_amount "Total monto provisionado (publicado y confirmable) en la posición."
        bigint provisioned_credits "Total créditos provisionados en la posición."
        bigint provisioned_debits "Total débitos provisionados en la posición."
        bigint available_amount "Total monto disponible en la posición."
        bigint available_credits "Total créditos disponibles en la posición."
        bigint available_debits "Total débitos disponibles en la posición."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59."
    }

    POSITION_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid book_id FK "Relación con BOOK."
        uuid asset_id FK "Relación con ASSET."
        timestamp reference_date "Fecha de transacción. Si no se proporciona, será la fecha de inserción en la base de datos."
        bigint posted_amount "Total monto publicado en la posición."
        bigint posted_credits "Total créditos publicados en la posición."
        bigint posted_debits "Total débitos publicados en la posición."
        bigint confirmable_amount "Total monto a ser confirmado en la posición."
        bigint confirmable_credits "Total créditos a ser confirmados en la posición."
        bigint confirmable_debits "Total débitos a ser confirmados en la posición."
        bigint provisioned_amount "Total monto provisionado (publicado y confirmable) en la posición."
        bigint provisioned_credits "Total créditos provisionados en la posición."
        bigint provisioned_debits "Total débitos provisionados en la posición."
        bigint available_amount "Total monto disponible en la posición."
        bigint available_credits "Total créditos disponibles en la posición."
        bigint available_debits "Total débitos disponibles en la posición."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }

    ASSET ||--o{ ASSET_HISTORY : rastrea
    ASSET {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        string code "Único dentro del ledger. Longitud máxima: 12 caracteres."
        string number "Único dentro del ledger. Longitud máxima: 128 caracteres."
        int exponent "Exponente del asset. Debe estar entre 0 y 18."
        boolean is_fiat "Indica si el asset es una moneda fiduciaria."
        array locations "Regiones donde el asset es aceptado como moneda de intercambio. Debe ser un array de códigos ISO 3166-2."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59."
    }

    ASSET_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        string code "Único dentro del ledger. Longitud máxima: 12 caracteres."
        string number "Único dentro del ledger. Longitud máxima: 128 caracteres."
        int exponent "Exponente del asset. Debe estar entre 0 y 18."
        boolean is_fiat "Indica si el asset es una moneda fiduciaria."
        array locations "Regiones donde el asset es aceptado como moneda de intercambio. Debe ser un array de códigos ISO 3166-2."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp discarded_at "Fecha de eliminación en la base de datos. Debe implementar patrón de eliminación suave."
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }

    ENTRY }o--|| TRANSACTION : pertenece_a
    ENTRY ||--|| POSITION : referencia
    ENTRY ||--|| BOOK : referencia
    ENTRY ||--o{ ENTRY_HISTORY : rastrea
    ENTRY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid transaction_id FK "Relación con TRANSACTION."
        uuid position_id FK "Relación con POSITION."
        uuid book_id FK "Relación con BOOK."
        timestamp reference_date "Fecha de transacción. Si no se proporciona, será la fecha de inserción en la base de datos."
        enum direction "Dirección de la entry. Debe ser CREDIT o DEBIT."
        enum status "Estado de la entry. Debe ser PENDING, POSTED o DISCARDED."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp posted_at "Fecha de publicación en el ledger."
        timestamp discarded_at "Fecha de eliminación en el ledger. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59."
    }

    ENTRY_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid transaction_id FK "Relación con TRANSACTION."
        uuid position_id FK "Relación con POSITION."
        uuid book_id FK "Relación con BOOK."
        timestamp reference_date "Fecha de transacción. Si no se proporciona, será la fecha de inserción en la base de datos."
        enum direction "Dirección de la entry. Debe ser CREDIT o DEBIT."
        enum status "Estado de la entry. Debe ser PENDING, POSTED o DISCARDED."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp posted_at "Fecha de publicación en el ledger."
        timestamp discarded_at "Fecha de eliminación en el ledger. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }

    TRANSACTION ||--|| LEDGER : pertenece_a
    TRANSACTION ||--o| TRANSACTION : revierte
    TRANSACTION ||--o{ TRANSACTION_HISTORY : rastrea
    TRANSACTION {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        timestamp reference_date "Fecha de transacción. Si no se proporciona, será la fecha de inserción en la base de datos."
        enum status "Estado de la transacción. Debe ser PENDING, POSTED o DISCARDED."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp posted_at "Fecha de publicación en el ledger."
        timestamp discarded_at "Fecha de eliminación en el ledger. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad. Por defecto: 31/12/9999 23:59:59."
    }

    TRANSACTION_HISTORY {
        uuid entity_id PK "Campo controlado por la aplicación. UUID v7, con orden temporal."
        string external_entity_id "Identificador único para interoperabilidad con otros sistemas. Longitud máxima: 36 caracteres."
        uuid ledger_id FK "Relación con LEDGER."
        timestamp reference_date "Fecha de transacción. Si no se proporciona, será la fecha de inserción en la base de datos."
        enum status "Estado de la transacción. Debe ser PENDING, POSTED o DISCARDED."
        timestamp created_at "Fecha de inserción en la base de datos."
        timestamp updated_at "Fecha de última actualización en la base de datos."
        timestamp posted_at "Fecha de publicación en el ledger."
        timestamp discarded_at "Fecha de eliminación en el ledger. Debe implementar patrón de eliminación suave."
        hstore metadata "Metadatos adicionales para interoperabilidad con otros sistemas. Longitud máxima: 4KB"
        int version "Campo controlado por la aplicación. Debe incrementarse en 1 cada vez que la entidad cambia."
        timestampz valid_from "Campo que indica el inicio del período de validez de esta versión de la entidad."
        timestampz valid_to "Campo que indica el fin del período de validez de esta versión de la entidad."
    }
```
</MermaidDiagram>
