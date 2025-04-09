---
sidebar_position: 2
---

# Guardia Governance

This document establishes the governance structure and processes of **Guardia**, reflecting our core values and promoting a transparent, efficient, and collaborative environment.

## Governance Principles

Guardia's governance is based on the following principles:

### Consensus and Commitment
Decisions are made based on consensus among participants, ensuring alignment between project goals and community interests. Commitment to excellence and active participation are encouraged to strengthen the ecosystem.

### Transparency and Accountability
Trust is built through transparency in all processes and interactions. We openly share guidelines, decisions, and project developments, ensuring all stakeholders have clarity about their responsibilities.

### Inclusion and Diversity
We value diversity of thought, experience, and perspectives. We create an inclusive environment where all voices are heard and considered in the decision-making process.

### Security and Reliability
System integrity and data protection are fundamental to platform stability. We follow rigorous practices to ensure each component is secure and reliable.

### Efficiency and Agility
We adopt a pragmatic and dynamic approach, ensuring efficient processes that allow agile responses to market changes and user needs.

## Governance Structure

Guardia's governance is based on three pillars: **Maintainers, Contributors, and Steering Committee**.

### **Maintainers**
Maintainers are responsible for tactical execution, project evolution, and technical decision-making. They define the project roadmap and guidelines, review and approve contributions, and ensure compliance with best practices.

The list of Maintainers can be found in the project repository's `CODEOWNERS` file.

```
# CODEOWNERS - Responsible for code review

# Project Maintainers
* @guardia/{squad name}

# Documentation
docs/ @user1 @user2

# Source Code
backend/ @user3 @user4
frontend/ @user5 @user6
database/ @user7

# Configuration and Infrastructure
.github/ @guardia/maintainers
infra/ @devops1 @devops2
Dockerfile @user9
*.yml @user9

# Policies and Governance
GOVERNANCE @guardia/governance
COMPLIANCE @guardia/compliance
SECURITY @guardia/security
CODE_OF_CONDUCT @guardia/compliance
LICENSE @guardia/compliance
```

### Contributors
Contributors are community members who regularly contribute to the project. They submit pull requests for review, assist in problem resolution, and are recognized for their consistent contributions.

Interested parties should follow the guidelines described in the [Contribution Guide](../CONTRIBUTING.md).

### Steering Committee
The Steering Committee is responsible for ensuring project strategic alignment and mediating organizational discussions. It resolves technical or organizational disputes, reassesses processes and policies when necessary, and serves as the final instance for escalated decisions.

The Steering Committee may be composed of active Maintainers, community representatives with a consistent contribution history, and other members who have distinguished themselves as leaders or experts in financial technology. The inclusion of new members is subject to approval by current Committee members.

## Governance Processes

### Decision Making

Guardia adopts a structured process to ensure all decisions are made in a **transparent, efficient, and documented** manner. We use three main mechanisms: **ADRs** for architectural decisions impacting technical project evolution, **PDRs** for product continuity and direction decisions, and **RFCs** for strategic changes of internal and community interest.

- Anyone in the community can open a [Discussion](#) to propose ideas, raise questions, or suggest improvements.
- The team is constantly encouraged to participate with opinions, questions, and constructive feedback.
- We value diversity of thought as a differentiator to achieve more robust, inclusive, and innovative solutions.

Decisions must be formalized through one of the following mechanisms:

#### Architectural Decision Records (ADR)
Technical decisions must be documented in **Architectural Decision Records (ADR)**, ensuring a clear historical record.
Each ADR must contain:
- **Title**: Name of the decision
- **Date**: Date the decision was made
- **Status**: (Proposed, Approved, Rejected, Under Review, Under Discussion)
- **Context**: The problem or need that led to the decision
- **Decision**: The choice made and its details
- **Rationale**: Reasons for the choice and considered options
- **Consequences**: Expected positive and negative impacts
- **(Optional) PoC**: If the decision is based on a Proof of Concept (PoC), it must be informed

ADRs must be stored in the project repository and reviewed periodically.

---

#### Product Decision Records (PDR)
Decisions related to product evolution must be formalized through a **PDR**.
Each PDR must contain:
- **Title**: Name of the decision
- **Date**: Date the decision was made
- **Status**: (Proposed, Approved, Rejected, Under Review, Under Discussion)
- **Context**: The problem or need that led to the decision
- **Decision**: The choice made and its details
- **Rationale**: Reasons for the choice and considered options
- **Consequences**: Expected positive and negative impacts
- **(Optional) Benchmark**: If the decision is based on a benchmark, it must be informed

PDRs must be stored in the project repository and reviewed periodically.

---

#### Requests for Comments (RFCs)
Significant changes in processes, technologies, or strategies must be discussed through **RFCs**.

The process follows these steps:
1. **Proposal**: Any member can propose an RFC, documenting the problem and possible solutions
2. **Discussion**: The proposal is opened to the internal community for contributions and refinement
3. **Evaluation**: The Steering Committee analyzes feedback and decides on proposal adoption or rejection
4. **Implementation**: If approved, the decision is documented and an execution plan is defined

---

#### Consensus Seeking
- Whenever possible, agreement is sought among involved parties, ensuring all perspectives are considered
- Decisions must prioritize efficiency and agility without compromising quality
- Transparency is ensured through detailed documentation and open communication with stakeholders

#### Submission to Steering Committee
If consensus is not reached on a technical (ADR), product (PDR), or strategic (RFC) decision, the matter will be formally submitted to the Steering Committee. It will make the final decision based on Guardia's Principles and project strategic direction.

All resolutions must be documented and communicated, reinforcing the transparency and reliability of Guardia's governance.

---

### New Member Inclusion

#### Invitation Criteria
- Have at least 1 significant contribution in the last 3 months and demonstrate alignment with project values and practices
- The invitation to become a Maintainer must come from a Maintainer and be approved by at least 1 Steering Committee member
- Entry into the Steering Committee requires unanimous approval from its members

#### Invitation and Acceptance
- The Steering Committee evaluates the candidate and, if approved, they receive an email invitation to become a Maintainer
- The candidate has 7 days to accept the invitation
- If the invitation expires, they may be considered again in the future

#### Integration and Welcome
- If the invitation is accepted, the new Maintainer receives a welcome email with guidelines and responsibilities
- They will have access to documentation and support from other members for their project integration

---

### Conflict Resolution

Conflict resolution must always align with Guardia's Governance Principles, ensuring decisions are made transparently, inclusively, and responsibly.

#### Technical Disputes
- Must be analyzed and resolved by Maintainers, following Efficiency and Agility principles
- Discussions should seek Consensus and Commitment, ensuring active participation
- Whenever possible, Inclusion and Diversity should be encouraged, welcoming different perspectives
- If consensus is not reached, the conflict may be escalated to the Steering Committee, which will make the final decision

#### Organizational and Strategic Issues
- Are evaluated by the Steering Committee, considering Transparency and Accountability principles
- Decisions must prioritize Security and Reliability and ensure platform stability
- Every process must reinforce Stability and Integrity, promoting a reliable governance environment

All conflict resolutions must be documented and communicated, reinforcing Guardia's commitment to transparency and trust in project governance.

---

## Complementary Guidelines

All members and contributors must follow Guardia's guidelines:

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Compliance by Design](COMPLIANCE.md)

Additionally, all contributors must sign the CNCF [Contributor License Agreement (CLA)](CLA.md), as described in the official document.