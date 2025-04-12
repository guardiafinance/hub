---
sidebar_position: 3
---

# Compliance by Design

**Compliance by Design** is a model that incorporates regulatory compliance principles from the conception of systems, processes, and products. This approach avoids the need for exhaustive subsequent corrections and ensures continuous adherence to the standards and regulations that guide the technological evolution of the global financial market.

This document establishes the Compliance by Design guidelines that must be followed in all Guardia projects and operations. The adoption of these practices is not optional, being mandatory to ensure security, regulatory compliance, and continuous governance.

Each system, process, or product developed must be in total alignment with the norms and standards defined here, including, but not limited to, the principles and guidelines of Compliance by Design.

Non-compliance with these guidelines may result in mandatory reviews, deployment process blocks, and corrective actions imposed by the Guardia Compliance Committee.

For questions or requests related to the application of these standards, consult the Governance and Compliance team or access the complementary documents available in the official Guardia repository.

## Principles

- **Compliance Automation** – Automated controls and verifications are implemented from the early stages of the project, allowing continuous compliance with lower operational costs and reduced risk of human errors.

- **Zero Trust** – No access is presumed to be trustworthy. Each request is rigorously validated, with multi-factor authentication, dynamic access policies, strong encryption, and auditable records.

- **Transparency and Auditability** – Every relevant action is recorded with granularity, using the 5W1H model (Who, What, When, Where, Why, How), allowing traceability and effective accountability.

- **Reversibility and Traceability** – Any state change in the system is recorded immutably. Reversions generate new auditable events, ensuring a complete history of decisions and changes.

- **Efficiency** – Guardia is a technology company that uses technology to offer high-quality and efficient services, therefore, the adoption of practices that ensure the efficiency of systems and processes is necessary to maintain competitiveness and the quality of the services offered.

- **Continuous Governance** – Policies and controls undergo periodic review and monitoring. This ensures constant alignment with new regulations and the evolution of risks.

- **Interdisciplinary Engagement** – Governance, Legal, Engineering, and Security areas work in an integrated manner from the conception of new products, promoting shared responsibility for compliance.

## Standards, Norms, and Certifications

### PCI DSS 4.0

Guardia is compliant with the latest version of PCI DSS (Payment Card Industry Data Security Standard), ensuring rigorous controls for the processing, storage, and transmission of payment card data. Security is ensured by strong encryption (AES-256, TLS 1.2+), multi-factor authentication for sensitive environments, network segmentation, and continuous monitoring using SIEM.

These measures prevent financial fraud, reinforce operational integrity, and ensure compliance with the main requirements of the financial sector.

**Learn more details at:** [PCI DSS 4.0 Compliance Spec.](#)

### SOC 1 Type I and SOC 2 Type II

Compliance with SOC standards ensures that Guardia's processes are auditable, resilient, and reliable. This includes granular access control, log retention and monitoring for at least 12 months, regular external audits, and recurring business continuity tests.

These practices reinforce customer and partner trust in the integrity of financial operations and platform governance.

**Learn more details at:** [SOC Compliance Spec.](#)

### NIST CSF v2

The NIST CSF framework guides Guardia's cybersecurity strategy. Updated asset inventories, risk management processes, threat intelligence integrated with SIEM, and incident response plans are maintained.

This structure ensures preparedness against emerging threats and strengthens the organization's response capacity in the face of operational and security incidents.

**Learn more details at:** [NIST CSF Compliance Spec.](#)

### LGPD (General Data Protection Law)

Guardia adopts policies and controls compliant with LGPD, prioritizing privacy from conception. Data minimization practices, active consent management, treatment records, and the work of a dedicated DPO are applied.

This compliance mitigates legal and reputational risks, promoting transparency and strengthening the trust relationship with data subjects.

**Learn more details at:** [LGPD Compliance Spec.](#)

### FAPI (Financial-grade API Security Profile)

To ensure security in high-risk APIs, especially in the financial context, Guardia adopts the FAPI standard. This includes robust authentication with OAuth 2.0 and OpenID Connect, signed and encrypted tokens, rate limiting, and integrated anti-fraud mechanisms.

This approach protects against unauthorized access, fraud, and data leakage, aligning the platform with the requirements of financial institutions and regulators.

**Learn more details at:** [FAPI Compliance Spec.](#)

### ISO 27001

Guardia's Information Security Management System (ISMS) is based on the ISO 27001 standard. It includes formalized policies, recurring risk assessments, segregation of duties, and adaptive access controls.

The implementation of this standard reduces the attack surface, promotes continuous asset protection, and ensures operational resilience even in adverse scenarios.

**Learn more details at:** [ISO 27001 Compliance Spec.](#)

### ISO 27701

As an extension of ISO 27001, ISO 27701 guides information privacy management. Guardia applies personal data governance practices, quick response to privacy incidents, and transparent recording of legal basis for data processing.

This standard reinforces the commitment to privacy by design and facilitates compliance with international legislation such as LGPD and GDPR.

**Learn more details at:** [ISO 27701 Compliance Spec.](#)

---

## Reporting Bugs and Issues

To report security vulnerabilities, bugs, or compliance issues, send details to [security@guardia.finance](mailto:security@guardia.finance) with detailed information or through our community on [WhatsApp](#)

All communications are treated confidentially and follow our formal incident response process, in compliance with ISO 27001 and NIST CSF.

## Questions and Suggestions

For questions or requests related to the application of these standards:

- Consult the **Governance and Compliance** team [@guardia/governance](https://github.com/orgs/guardiafinance/teams/governance) on WhatsApp.
- Send an email to [governance@guardia.finance](mailto:governance@guardia.finance)
- Open a discussion on the [discussion page](https://github.com/orgs/guardiafinance/discussions/new?category=bug-report) of **Guardia**

