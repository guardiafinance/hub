---
sidebar_position: 0
---

# Gobernanza de Guardia

Este documento establece la estructura y los procesos de gobernanza de **Guardia**, reflejando nuestros valores fundamentales y promoviendo un entorno transparente, eficiente y colaborativo.

## Principios de Gobernanza

La gobernanza de **Guardia** se basa en los siguientes principios:

### Consenso y Compromiso
Las decisiones se toman basadas en el consenso entre los participantes, asegurando la alineación entre los objetivos del proyecto y los intereses de la comunidad. Se fomenta el compromiso con la excelencia y la participación activa para fortalecer el ecosistema.

### Transparencia y Responsabilidad
La confianza se construye a través de la transparencia en todos los procesos e interacciones. Compartimos abiertamente directrices, decisiones y evoluciones del proyecto, asegurando que todos los stakeholders tengan claridad sobre sus responsabilidades.

### Inclusión y Diversidad
Valoramos la diversidad de pensamiento, experiencia y perspectivas. Creamos un entorno inclusivo donde todas las voces son escuchadas y consideradas en el proceso de toma de decisiones.

### Seguridad y Confiabilidad
La integridad del sistema y la protección de datos son fundamentales para la estabilidad de la plataforma. Seguimos prácticas rigurosas para garantizar que cada componente sea seguro y confiable.

### Eficiencia y Agilidad
Adoptamos un enfoque pragmático y dinámico, asegurando procesos eficientes que permiten respuestas ágiles a los cambios del mercado y las necesidades de los usuarios.

## Estructura de Gobernanza

La gobernanza de **Guardia** se basa en tres pilares: **Mantenedores, Colaboradores y Comité Directivo**.

### **Mantenedores**
Los Mantenedores son responsables de la ejecución táctica, evolución del proyecto y toma de decisiones técnicas. Definen el roadmap y las directrices del proyecto, revisan y aprueban contribuciones y garantizan el cumplimiento de las mejores prácticas.

La lista de Mantenedores se puede encontrar en el archivo `CODEOWNERS` del repositorio del proyecto.

```
# CODEOWNERS - Responsable de revisión de código

# Mantenedores del Proyecto
* @guardia/{nombre del squad}

# Documentación
docs/ @usuario1 @usuario2

# Código Fuente
backend/ @usuario3 @usuario4
frontend/ @usuario5 @usuario6
database/ @usuario7

# Configuración e Infraestructura
.github/ @guardia/mantenedores
infra/ @devops1 @devops2
Dockerfile @usuario9
*.yml @usuario9

# Políticas y Gobernanza
GOVERNANCE @guardia/gobernanza
COMPLIANCE @guardia/cumplimiento
SECURITY @guardia/seguridad
CODE_OF_CONDUCT @guardia/cumplimiento
LICENSE @guardia/cumplimiento
```

### Colaboradores
Los Colaboradores son miembros de la comunidad que contribuyen regularmente al proyecto. Envían pull requests para revisión, ayudan en la resolución de problemas y son reconocidos por sus contribuciones consistentes.

Los interesados deben seguir las directrices descritas en la [Guía de Contribución](../CONTRIBUTING.md).

### Comité Directivo
El Comité Directivo es responsable de garantizar la alineación estratégica del proyecto y mediar en discusiones organizacionales. Resuelve disputas técnicas u organizacionales, reevalúa procesos y políticas cuando es necesario y actúa como instancia final para decisiones escaladas.

El Comité Directivo puede estar compuesto por Mantenedores activos, representantes de la comunidad con un historial consistente de contribución y otros miembros que se hayan destacado como líderes o expertos en tecnología del mercado financiero. La inclusión de nuevos integrantes está sujeta a la aprobación de los miembros actuales del Comité.

## Procesos de Gobernanza

### Toma de Decisiones

**Guardia** adopta un proceso estructurado para garantizar que todas las decisiones se tomen de manera **transparente, eficiente y documentada**. Utilizamos tres mecanismos principales: **ADRs** para decisiones arquitectónicas que impactan la evolución técnica del proyecto, **PDRs** para decisiones sobre la continuidad y dirección de productos, y **RFCs** para cambios estratégicos de interés interno y comunitario.

- Cualquier persona de la comunidad puede abrir una [Discusión](#) para proponer ideas, plantear dudas o sugerir mejoras.
- El equipo es constantemente incentivado a participar con opiniones, preguntas y retroalimentación constructiva.
- Valoramos la diversidad de pensamiento como un diferenciador para alcanzar soluciones más robustas, inclusivas e innovadoras.

Las decisiones deben formalizarse a través de uno de los siguientes mecanismos:

#### Registros de Decisión Arquitectural (ADR)
Las decisiones técnicas deben documentarse en **Registros de Decisión Arquitectural (ADR)**, asegurando un registro histórico claro.
Cada ADR debe contener:
- **Título**: Nombre de la decisión
- **Fecha**: Fecha en que se tomó la decisión
- **Estado**: (Propuesto, Aprobado, Rechazado, En Revisión, En Discusión)
- **Contexto**: El problema o necesidad que llevó a la decisión
- **Decisión**: La elección realizada y sus detalles
- **Justificación**: Razones para la elección y opciones consideradas
- **Consecuencias**: Impactos positivos y negativos esperados
- **(Opcional) PoC**: Si la decisión se basa en una Prueba de Concepto (PoC), debe informarse

Los ADRs deben almacenarse en el repositorio del proyecto y revisarse periódicamente.

---

#### Registros de Decisión de Producto (PDR)
Las decisiones relacionadas con la evolución de productos deben formalizarse a través de un **PDR**.
Cada PDR debe contener:
- **Título**: Nombre de la decisión
- **Fecha**: Fecha en que se tomó la decisión
- **Estado**: (Propuesto, Aprobado, Rechazado, En Revisión, En Discusión)
- **Contexto**: El problema o necesidad que llevó a la decisión
- **Decisión**: La elección realizada y sus detalles
- **Justificación**: Razones para la elección y opciones consideradas
- **Consecuencias**: Impactos positivos y negativos esperados
- **(Opcional) Benchmark**: Si la decisión se basa en un benchmark, debe informarse

Los PDRs deben almacenarse en el repositorio del proyecto y revisarse periódicamente.

---

#### Requests for Comments (RFCs)
Los cambios significativos en procesos, tecnologías o estrategias deben discutirse a través de **RFCs**.

El proceso sigue estos pasos:
1. **Propuesta**: Cualquier miembro puede proponer una RFC, documentando el problema y posibles soluciones
2. **Discusión**: La propuesta se abre a la comunidad interna para contribuciones y refinamiento
3. **Evaluación**: El Comité Directivo analiza la retroalimentación y decide sobre la adopción o rechazo de la propuesta
4. **Implementación**: Si se aprueba, la decisión se documenta y se define un plan de ejecución

---

#### Búsqueda de Consenso
- Siempre que sea posible, se busca un acuerdo entre las partes involucradas, asegurando que todas las perspectivas sean consideradas
- Las decisiones deben priorizar la eficiencia y agilidad sin comprometer la calidad
- La transparencia se asegura a través de documentación detallada y comunicación abierta con los stakeholders

#### Envío al Comité Directivo
Si no se alcanza el consenso en una decisión técnica (ADR), de producto (PDR) o estratégica (RFC), el asunto se enviará formalmente al Comité Directivo. Este tomará la decisión final basándose en los Principios de Guardia y la dirección estratégica del proyecto.

Todas las resoluciones deben documentarse y comunicarse, reforzando la transparencia y confiabilidad de la gobernanza de Guardia.

---

### Inclusión de Nuevos Miembros

#### Criterios para Invitación
- Tener al menos 1 contribución significativa en los últimos 3 meses y demostrar alineación con los valores y prácticas del proyecto
- La invitación para convertirse en Mantenedor debe provenir de un Mantenedor y ser aprobada por al menos 1 miembro del Comité Directivo
- La entrada al Comité Directivo requiere aprobación unánime de sus miembros

#### Invitación y Aceptación
- El Comité Directivo evalúa al candidato y, si es aprobado, recibe un correo electrónico de invitación para convertirse en Mantenedor
- El candidato tiene 7 días para aceptar la invitación
- Si la invitación expira, podrá ser considerado nuevamente en el futuro

#### Integración y Bienvenida
- Si la invitación es aceptada, el nuevo Mantenedor recibe un correo electrónico de bienvenida con directrices y responsabilidades
- Tendrá acceso a documentación y apoyo de otros miembros para su integración en el proyecto

---

### Resolución de Conflictos

La resolución de conflictos debe estar siempre alineada con los Principios de Gobernanza de Guardia, asegurando que las decisiones se tomen de forma transparente, inclusiva y responsable.

#### Disputas Técnicas
- Deben ser analizadas y resueltas por los Mantenedores, siguiendo los principios de Eficiencia y Agilidad
- Las discusiones deben buscar Consenso y Compromiso, asegurando participación activa
- Siempre que sea posible, se debe fomentar la Inclusión y Diversidad, acogiendo diferentes perspectivas
- Si no se alcanza el consenso, el conflicto puede escalarse al Comité Directivo, que tomará la decisión final

#### Cuestiones Organizacionales y Estratégicas
- Son evaluadas por el Comité Directivo, considerando los principios de Transparencia y Responsabilidad
- Las decisiones deben priorizar Seguridad y Confiabilidad y garantizar la estabilidad de la plataforma
- Todo proceso debe reforzar Estabilidad e Integridad, promoviendo un entorno de gobernanza confiable

Todas las resoluciones de conflictos deben documentarse y comunicarse, reforzando el compromiso de Guardia con la transparencia y la confianza en la gobernanza del proyecto.

---

## Directrices Complementarias

Todos los miembros y contribuidores deben seguir las directrices de Guardia:

- [Código de Conducta](CODE_OF_CONDUCT.md)
- [Compliance by Design](COMPLIANCE.md)

Además, todos los contribuidores deben firmar el [Contributor License Agreement (CLA)](CLA.md), como se describe en el documento oficial.