---
sidebar_position: 0
---

import MermaidDiagram from '@site/src/components/MermaidDiagram';

# Entidades e Relacionamentos

<MermaidDiagram>
```mermaid
erDiagram
    LEDGER ||--o{ CHAPTER : contains
    LEDGER ||--o{ LEDGER_HISTORY : tracks
    LEDGER {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        string name "Unique within organization and tenant. Max length: 128 characters."
        string description "Description for reporting purposes. Max length: 256 characters."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59."
    }

    LEDGER_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        string name "Unique within organization and tenant. Max length: 128 characters."
        string description "Description for reporting purposes. Max length: 256 characters."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }

    CHAPTER ||--o{ CHAPTER_HISTORY : tracks
    CHAPTER {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        string name "Unique within ledger. Max length: 128 characters."
        string description "Description for reporting purposes. Max length: 256 characters."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59."
    }


    CHAPTER_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        string name "Unique within ledger. Max length: 128 characters."
        string description "Description for reporting purposes. Max length: 256 characters."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }

    BOOK ||--o{ ENTRY : contains
    BOOK ||--|| POSITION : has
    BOOK ||--|| LEDGER : belongs_to
    BOOK ||--o{ CHAPTER : references
    BOOK ||--o{ BOOK_HISTORY : tracks
    BOOK {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        uuid chapter_id FK "Relationship with CHAPTER."
        uuid position_id FK "Relationship with POSITION."
        string name "Unique within ledger. Max length: 128 characters."
        enum nature "Nature of the book. Must be CREDITOR or DEBITOR."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59"
    }

    BOOK_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        uuid chapter_id FK "Relationship with CHAPTER."
        uuid position_id FK "Relationship with POSITION."
        string name "Unique within ledger. Max length: 128 characters."
        enum nature "Nature of the book. Must be CREDITOR or DEBITOR."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }

    POSITION ||--|| ASSET : references
    POSITION ||--o{ POSITION_HISTORY : tracks
    POSITION {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid book_id FK "Relationship with BOOK."
        uuid asset_id FK "Relationship with ASSET."
        timestamp reference_date "Date of transaction. If not provided, it will be the date of insertion on database."
        bigint posted_amount "Total amount posted on the position."
        bigint posted_credits "Total credits posted on the position."
        bigint posted_debits "Total debits posted on the position."
        bigint confirmable_amount "Total amount to be confirmed on the position."
        bigint confirmable_credits "Total credits to be confirmed on the position."
        bigint confirmable_debits "Total debits to be confirmed on the position."
        bigint provisioned_amount "Total amount provisioned (posted and confirmable) on the position."
        bigint provisioned_credits "Total credits provisioned on the position."
        bigint provisioned_debits "Total debits provisioned on the position."
        bigint available_amount "Total amount available on the position."
        bigint available_credits "Total credits available on the position."
        bigint available_debits "Total debits available on the position."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59."
    }

    POSITION_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid book_id FK "Relationship with BOOK."
        uuid asset_id FK "Relationship with ASSET."
        timestamp reference_date "Date of transaction. If not provided, it will be the date of insertion on database."
        bigint posted_amount "Amount posted on the position."
        bigint posted_credits "Credits posted on the position."
        bigint posted_debits "Debits posted on the position."
        bigint confirmable_amount "Amount confirmable on the position."
        bigint confirmable_credits "Credits confirmable on the position."
        bigint confirmable_debits "Debits confirmable on the position."
        bigint provisioned_amount "Amount provisioned on the position."
        bigint provisioned_credits "Credits provisioned on the position."
        bigint provisioned_debits "Debits provisioned on the position."
        bigint available_amount "Amount available on the position."
        bigint available_credits "Credits available on the position."
        bigint available_debits "Debits available on the position."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }

    ASSET ||--o{ ASSET_HISTORY : tracks
    ASSET {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        string code "Unique within ledger. Max length: 12 characters."
        string number "Unique within ledger. Max length: 128 characters."
        int exponent "Exponent of the asset. Must be between 0 and 18."
        boolean is_fiat "Indicates if the asset is a fiat currency."
        array locations "Regions where the asset is accepted as a currency for exchange. Must be an array of ISO 3166-2 codes."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59."
    }

    ASSET_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        string code "Unique within ledger. Max length: 12 characters."
        string number "Unique within ledger. Max length: 128 characters."
        int exponent "Exponent of the asset. Must be between 0 and 18."
        boolean is_fiat "Indicates if the asset is a fiat currency."
        array locations "Regions where the asset is accepted as a currency for exchange. Must be an array of ISO 3166-2 codes."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp discarded_at "Date of deletion on database. Must implement soft delete pattern."
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }

    ENTRY }o--|| TRANSACTION : belongs_to
    ENTRY ||--|| POSITION : references
    ENTRY ||--|| BOOK : references
    ENTRY ||--o{ ENTRY_HISTORY : tracks
    ENTRY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid transaction_id FK "Relationship with TRANSACTION."
        uuid position_id FK "Relationship with POSITION."
        uuid book_id FK "Relationship with BOOK."
        timestamp reference_date "Date of transaction. If not provided, it will be the date of insertion on database."
        enum direction "Direction of the entry. Must be CREDIT or DEBIT."
        enum status "Status of the entry. Must be PENDING, POSTED or DISCARDED."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp posted_at "Date of posting on ledger."
        timestamp discarded_at "Date of deletion on ledger. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59."
    }

    ENTRY_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid transaction_id FK "Relationship with TRANSACTION."
        uuid position_id FK "Relationship with POSITION."
        uuid book_id FK "Relationship with BOOK."
        timestamp reference_date "Date of transaction. If not provided, it will be the date of insertion on database."
        enum direction "Direction of the entry. Must be CREDIT or DEBIT."
        enum status "Status of the entry. Must be PENDING, POSTED or DISCARDED."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp posted_at "Date of posting on ledger."
        timestamp discarded_at "Date of deletion on ledger. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }

    TRANSACTION ||--|| LEDGER : belongs_to
    TRANSACTION ||--o| TRANSACTION : reverses
    TRANSACTION ||--o{ TRANSACTION_HISTORY : tracks
    TRANSACTION {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        timestamp reference_date "Date of transaction. If not provided, it will be the date of insertion on database."
        enum status "Status of the transaction. Must be PENDING, POSTED or DISCARDED."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp posted_at "Date of posting on ledger."
        timestamp discarded_at "Date of deletion on ledger. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity. Default: 31/12/9999 23:59:59."
    }

    TRANSACTION_HISTORY {
        uuid entity_id PK "Field controled by application. UUID v7, with temporal order."
        string external_entity_id "Unique identifier for interoperability with other systems. Max length: 36 characters."
        uuid ledger_id FK "Relationship with LEDGER."
        timestamp reference_date "Date of transaction. If not provided, it will be the date of insertion on database."
        enum status "Status of the transaction. Must be PENDING, POSTED or DISCARDED."
        timestamp created_at "Date of insertion on database."
        timestamp updated_at "Date of last update on database."
        timestamp posted_at "Date of posting on ledger."
        timestamp discarded_at "Date of deletion on ledger. Must implement soft delete pattern."
        hstore metadata "Additional metadata for interoperability with other systems. Max length: 4KB"
        int version "Field controled by application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this version of the entity."
        timestampz valid_to "Field indicating the end of the validity period of this version of the entity."
    }
```
</MermaidDiagram>
