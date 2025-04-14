---
sidebar_position: 0
---

# Entities

This specification defines the minimum structural model that all Guardia platform entities MUST follow. The goal is to ensure consistency between services, interoperability between domains, and adherence to security, traceability, and compliance requirements from conception.

This base structure applies to any persistent and traceable object in the platform, covering APIs, databases, domain events, external integrations, and other entity representation mechanisms.

By adopting this standard, every entity:
- Has a unique and global identifier;
- Is versioned with explicit change control;
- Maintains complete and auditable history;
- Can be integrated and eventually discarded without losing traceability.

The application of this structure reduces inconsistencies, facilitates integrations, and eliminates audit gaps that could compromise compliance with standards such as **LGPD**, **SOC 2**, and **ISO 27001**.

Furthermore, the model reinforces **Compliance by Design** principles, ensuring:
- Unique identification (`entity_id`);
- Temporal traceability (`created_at`, `updated_at`, `discarded_at`);
- Integrity and concurrency control (`version`);
- History preservation and reversibility (`history`);
- Integration and interoperability with external systems (`external_entity_id`, `metadata`).

### Base Structure

The base structure of an entity in Guardia MUST contain the following fields:

| Field                | Type         | Required | Purpose                                                                 |
|----------------------|--------------|----------|---------------------------------------------------------------------------|
| [`entity_id`](#entity_id)          | UUID v7      | Yes      | Global unique identifier. Ensures uniqueness and temporal ordering.       |
| [`entity_type`](#entity_type)        | string       | Yes      | Logical entity type (e.g., ledger, chapter, asset).                      |
| [`external_entity_id`](#external_entity_id) | string       | No       | External ID provided by client systems (max. 36 characters).             |
| [`created_at`](#created_at)         | datetime     | Yes      | Creation date/time in UTC (ISO 8601).                                   |
| [`updated_at`](#updated_at)         | datetime     | Yes      | Last recorded modification in UTC (ISO 8601).                           |
| [`discarded_at`](#discarded_at)       | datetime     | No       | Logical deletion mark in UTC (ISO 8601).                                |
| [`metadata`](#metadata)           | JSON         | No       | Key-value parameters (max. 10KB).                                       |
| [`version`](#version)            | integer      | Yes      | Sequential version control number.                                      |
| [`history`](#history)            | array        | No       | Complete record of changes and previous versions.                       |

### Detailed Requirements

#### `entity_id`
- MUST be unique, immutable, and system-generated.
- MUST implement UUID v7 according to [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7) ensuring temporal ordering.

#### `entity_type`
- MUST belong to a controlled list of entities known by the system.

#### `external_entity_id`
- MAY be null.
- MUST have a maximum of 36 characters.
- WHEN present, MUST be unique within the `entity_type`.
- Ideal for cross-references with legacy or external systems.

#### `created_at`
- MUST be a datetime in UTC formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- MUST be automatically generated upon creation.
- MUST NOT be modified after creation.

#### `updated_at`
- MUST be a datetime in UTC formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- MUST be updated with each persistent modification.
- Upon creation, MUST assume the same value as `created_at`.
- Upon discard, MUST assume the same value as `discarded_at`.
- Used for concurrency control and synchronization.

#### `discarded_at`
- MUST be a datetime in UTC formatted according to [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- MAY be null.
- When filled, indicates soft delete. The entity remains in the system for traceability purposes.

#### `metadata`
- MUST be a JSON Object.
- Key and value MUST be strings.
- SHOULD follow the ideal size of 4KB whenever possible and MUST NOT exceed 10KB.
- Updates MUST be done via JSON Merge Patch (RFC 7386).
- MUST NOT contain sensitive or personal data without legal provision.
- Values MAY be stored encrypted, with performance impact.

#### `version`
- Initializes at 1 and is automatically incremented along with `updated_at`.
- NEVER resets, even after restoring a discarded entity.
- In case of version conflict, the latest version is preserved, discarding the conflicting one.

#### `history`
- Stores snapshots of previous versions.
- Used for audit, rollback, and investigation.
- By default, stores the last 10 most recent versions for up to 365 days.
- History MUST be omitted from temporal responses (create, update, delete, and get).
- History MUST be provided in read responses (get) when requested by the client at the endpoint `api/v1/<entity_type>/<entity_id>/history`.
- The history endpoint returns a list of up to 10 historical records of the same entity.
- Values MAY be stored encrypted, with performance impact.

### When to apply

This model MUST be adopted whenever:
- A new domain resource is modeled;
- APIs are exposed internally or externally;
- Domain events are generated;
- Data requires uniqueness, traceability, reversibility, or interoperability.

> IMPORTANT: Exceptions MUST be justified and approved by the Steering Committee and recorded in a [Product Decision Record (PDR)](../community/governance/index.md#product-decision-records-pdr).

### References
- [RFC 9562: UUID Version 7](https://datatracker.ietf.org/doc/html/rfc9562)
- [RFC 7386: JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7386)
- [RFC 3339: Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339)
