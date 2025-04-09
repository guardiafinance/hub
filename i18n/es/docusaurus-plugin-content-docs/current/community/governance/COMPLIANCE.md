---
sidebar_position: 0
---

# Compliance by Design

El **Compliance by Design** es un modelo que incorpora principios de conformidad regulatoria desde la concepción de sistemas, procesos y productos. Este enfoque evita la necesidad de correcciones exhaustivas posteriores y garantiza la adherencia continua a los estándares y regulaciones que guían la evolución tecnológica del mercado financiero global.

Este documento establece las directrices de Compliance by Design que deben seguirse en todos los proyectos y operaciones de Guardia. La adopción de estas prácticas no es opcional, siendo obligatoria para garantizar la seguridad, conformidad regulatoria y gobernanza continua.

Cada sistema, proceso o producto desarrollado debe estar en total alineación con las normas y estándares aquí definidos, incluyendo, pero no limitándose a, los principios y directrices de Compliance by Design.

El incumplimiento de estas directrices puede resultar en revisiones obligatorias, bloqueos en procesos de implementación y acciones correctivas impuestas por el Comité de Compliance de Guardia.

Para dudas o solicitudes relacionadas con la aplicación de estas normas, consulte al equipo de Gobernanza y Compliance o acceda a los documentos complementarios disponibles en el repositorio oficial de Guardia.

## Principios

- **Automatización de la Conformidad** – Los controles y verificaciones automatizadas se implementan desde las primeras etapas del proyecto, permitiendo conformidad continua con menores costos operativos y riesgo reducido de errores humanos.

- **Zero Trust** – Ningún acceso se presume como confiable. Cada solicitud se valida de forma rigurosa, con autenticación multifactor, políticas de acceso dinámico, cifrado fuerte y registros auditables.

- **Transparencia y Auditabilidad** – Toda acción relevante se registra con granularidad, utilizando el modelo 5W1H (Who, What, When, Where, Why, How), permitiendo trazabilidad y rendición de cuentas efectiva.

- **Reversibilidad y Trazabilidad** – Cualquier cambio de estado en el sistema se registra de forma inmutable. Las reversiones generan nuevos eventos auditables, asegurando un historial completo de decisiones y cambios.

- **Gobernanza Continua** – Las políticas y controles pasan por revisión y monitoreo periódicos. Esto garantiza alineación constante con nuevas regulaciones y evolución de riesgos.

- **Compromiso Interdisciplinario** – Las áreas de Gobernanza, Legal, Ingeniería y Seguridad trabajan de forma integrada desde la concepción de nuevos productos, promoviendo responsabilidad compartida por la conformidad.

## Normas, Estándares y Certificaciones

### PCI DSS 4.0

Guardia es adherente a la versión más actual de PCI DSS (Payment Card Industry Data Security Standard), garantizando controles rigurosos para el procesamiento, almacenamiento y transmisión de datos de tarjeta de pago. La seguridad se asegura mediante cifrado fuerte (AES-256, TLS 1.2+), autenticación multifactor para entornos sensibles, segmentación de red y monitoreo continuo con uso de SIEM.

Estas medidas evitan fraudes financieros, refuerzan la integridad de las operaciones y garantizan conformidad con los principales requisitos del sector financiero.

**Entienda en más detalles en:** [PCI DSS 4.0 Compliance Spec.](#)

### SOC 1 Type I y SOC 2 Type II

La conformidad con los estándares SOC asegura que los procesos de Guardia sean auditables, resilientes y confiables. Esto incluye control de acceso granular, retención y monitoreo de logs por al menos 12 meses, auditorías externas regulares y pruebas recurrentes de continuidad de negocios.

Estas prácticas refuerzan la confianza de clientes y socios en la integridad de las operaciones financieras y en la gobernanza de la plataforma.

**Entienda en más detalles en:** [SOC Compliance Spec.](#)

### NIST CSF v2

El framework NIST CSF guía la estrategia de Guardia en ciberseguridad. Se mantienen inventarios actualizados de activos, procesos de gestión de riesgos, threat intelligence integrado al SIEM y planes de respuesta a incidentes.

Esta estructura garantiza preparación frente a amenazas emergentes y fortalece la capacidad de respuesta de la organización ante incidentes operacionales y de seguridad.

**Entienda en más detalles en:** [NIST CSF Compliance Spec.](#)

### LGPD (Ley General de Protección de Datos)

Guardia adopta políticas y controles adherentes a la LGPD, priorizando privacidad desde la concepción. Se aplican prácticas de minimización de datos, gestión activa de consentimiento, registros de tratamiento y la actuación de un DPO dedicado.

Esta conformidad mitiga riesgos legales y reputacionales, promoviendo transparencia y fortaleciendo la relación de confianza con los titulares de datos.

**Entienda en más detalles en:** [LGPD Compliance Spec.](#)

### FAPI (Financial-grade API Security Profile)

Para garantizar seguridad en APIs de alto riesgo, especialmente en el contexto financiero, Guardia adopta el estándar FAPI. Esto incluye autenticación robusta con OAuth 2.0 y OpenID Connect, tokens firmados y cifrados, rate limiting y mecanismos antifraude integrados.

Este enfoque protege contra acceso indebido, fraude y fuga de datos, alineando la plataforma con los requisitos de instituciones financieras y reguladores.

**Entienda en más detalles en:** [FAPI Compliance Spec.](#)

### ISO 27001

El Sistema de Gestión de Seguridad de la Información (SGSI) de Guardia se basa en la norma ISO 27001. Contempla políticas formalizadas, evaluaciones de riesgo recurrentes, segregación de funciones y controles de acceso adaptativos.

La implementación de esta norma reduce la superficie de ataque, promueve protección continua de activos y asegura resiliencia operacional incluso en escenarios adversos.

**Entienda en más detalles en:** [ISO 27001 Compliance Spec.](#)

### ISO 27701

Como extensión de la ISO 27001, la ISO 27701 orienta la gestión de privacidad de la información. Guardia aplica prácticas de gobernanza de datos personales, respuesta rápida a incidentes de privacidad y registro transparente de base legal para tratamiento de datos.

Este estándar refuerza el compromiso con la privacidad desde la concepción y facilita conformidad con legislaciones internacionales como LGPD y GDPR.

**Entienda en más detalles en:** [ISO 27701 Compliance Spec.](#)

---

## Reportar Bugs y Problemas

Para reportar vulnerabilidades de seguridad, bugs o problemas de conformidad, envíe detalles a [security@guardia.finance](mailto:security@guardia.finance) con información detallada o a través de nuestra comunidad en [WhatsApp](#)

Todas las comunicaciones son tratadas con confidencialidad y siguen nuestro proceso formal de respuesta a incidentes, en conformidad con ISO 27001 y NIST CSF.

## Dudas y Sugerencias

Para dudas o solicitudes relacionadas con la aplicación de estas normas:

- Consulte al equipo de **Gobernanza y Compliance** [@guardia/governance](https://github.com/orgs/guardiafinance/teams/governance) en WhatsApp.
- Envíe un correo a [governance@guardia.finance](mailto:governance@guardia.finance)
- Abra una discusión en la [página de discusión](https://github.com/orgs/guardiafinance/discussions/new?category=bug-report) de **Guardia**

