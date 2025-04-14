---
sidebar_position: 1
---

# RESTful APIs

This specification consolidates the guidelines for building, consuming, and documenting RESTful APIs on the Guardia platform. Its goal is to ensure standardization in responses and behaviors, promoting interoperability, traceability, and clarity for both internal and external consumers.

Guardia's REST APIs follow the standards defined by official HTTP protocol RFCs, with necessary adjustments to resolve potential ambiguities and adherence to [Compliance by Design](../../community/governance/COMPLIANCE.md) principles.

The RESTful specification is structured into reusable and versionable modules that cover the following aspects:

| Topic | Description |
|------|-----------|
| [Status Codes](./http-status-code.md) | List of allowed HTTP status codes and usage rules. |
| [Response Payloads](./http-response-payloads.md) | Unified format for success and error responses. |
| [Pagination](./http-pagination.md) | Standard structure for navigating between paginated resources. |
| [Sorting](./http-sorting.md) | Rules for using `order_by` and `sort` parameters. |
| [Headers](./http-headers.md) | Standard and custom headers used in APIs. |


> **IMPORTANT:**
> All rules described here MUST be applied to any HTTP endpoint implemented on the platform, except for justified and documented exceptions in ADR.
