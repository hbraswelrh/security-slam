---
title: Threat Assessment Guide
description: Step-by-step guide to performing Gemara-compatible threat assessments
tags: ["Assessment", "Security", "GRC-Engineering"]
---

## What This Is

This guide walks through a threat assessment using the [Gemara](https://gemara.openssf.org/) project.

**The basic idea:** Think of a project like a house. First, you identify what the house can do, its **capabilities** (e.g., "allow entry/exit", "store belongings"). Then, you identify **threats**, what could go wrong with those capabilities (e.g., "unauthorized entry through unlocked door", "theft of stored belongings").

In technical terms:
* **Capabilities** define what the technology can do. These form the **attack surface** or the points where an actor could potentially cause harm.
* **Threats** define specific ways those capabilities could be misused or exploited.

This exercise helps you systematically identify what occurs and what could go wrong, so you can build appropriate defenses.

## Walkthrough

### Step 0: Define Scope

Select a component or technology to assess (service, API, infrastructure component, or technology stack).

**Example:** Container management tool, catalog ID `SEC.SLAM.CM`

### Step 1: Identify Capabilities

Capabilities are the core functions and behaviors within the scope. Each capability defines part of the attack surface.

Required fields:

| Field         | Required | Description                                                        | Example                                                                                                   |
|---------------|----------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Capability ID | Yes      | Unique identifier following the pattern `ORG.PROJ.COMPONENT.CAP##` | `SEC.SLAM.CM.CAP01`                                                                                       |
| Title         | Yes      | A clear, concise name that describes the capability                | "Image Retrieval by Tag"                                                                                  |
| Description   | Yes      | A specific explanation of what this capability does                | "Ability to retrieve container images from registries using mutable tag names (e.g., 'latest', 'v1.0').." |

**Example (YAML):**

```yaml
capabilities:
  - id: SEC.SLAM.CM.CAP01
    title: Image Retrieval by Tag
    description: |
      Ability to retrieve container images from registries using mutable tag names
      (e.g., 'latest', 'v1.0').
```

**Note:** This is a minimal example showing one capability. Real assessments identify multiple capabilities (e.g., networking, storage, authentication, lifecycle management, configuration) that define the complete attack surface.

### Step 2: Identify Threats

Threats are specific ways capabilities can be misused, exploited, or cause problems. For each capability, identify potential threats.

Required fields:

| Field             | Required | Description                                                                        | Example                                           |
|-------------------|----------|------------------------------------------------------------------------------------|---------------------------------------------------|
| Threat ID         | Yes      | Unique identifier following the pattern `ORG.PROJ.COMPONENT.THR##`                 | `SEC.SLAM.CM.THR01`                               |
| Title             | Yes      | A clear, concise name describing the threat                                        | "Container Image Tampering or Poisoning" |
| Description       | Yes      | A specific explanation of what goes wrong and why it matters                       | See YAML example below                            |
| Capabilities      | Yes      | Links this threat to the capability(ies) it exploits                               | See YAML example below                            |
| External Mappings | No       | Optional links to industry standards like MITRE ATT&CK (useful for security teams) | See YAML example below                            |

**Example (YAML):**

```yaml
threats:
  - id: SEC.SLAM.CM.THR01
    title: Container Image Tampering or Poisoning
    description: |
      Attackers may replace a legitimately published image tag with a malicious image
      by exploiting tag mutability in image registries, especially when the container
      management tool retrieves images by tag name rather than digest. This enables
      unauthorized access, data exfiltration, and system compromise.
    capabilities:
      - reference-id: SEC.SLAM.CM
        entries:
          - reference-id: SEC.SLAM.CM.CAP01
    external-mappings:
      - reference-id: MITRE-ATT&CK
        entries:
          - reference-id: T1195.002
            remarks: Compromise Software Supply Chain
          - reference-id: T1204.003
            remarks: Malicious Image
```

**Note:** This is a minimal example showing one threat for one capability. Real assessments identify multiple threats per capability (e.g., exploitation of vulnerable base images, unauthorized access via exposed secrets, supply chain compromise).

### Step 3: Validate

The final YAML should look something like this:
```yaml
metadata:
  id: SEC.SLAM.CM
  description: Threat catalog for container management tool security assessment
  version: 1.0.0
  author:
    id: example
    name: Example
    type: Human
  mapping-references:
  - id: MITRE-ATT&CK
    title: MITRE ATT&CK Framework
    version: "16.0"
    description: |
      MITRE ATT&CK® is a globally-accessible knowledge base of adversary
      tactics and techniques based on real-world observations. The ATT&CK
      knowledge base is used as a foundation for the development of specific
      threat models and methodologies in the private sector, in government,
      and in the cybersecurity product and service community.
    url: https://attack.mitre.org/
title: Container Management Tool Security Threat Catalog
capabilities:
  - id: SEC.SLAM.CM.CAP01
    title: Image Retrieval by Tag
    description: |
      Ability to retrieve container images from registries using mutable tag names
      (e.g., 'latest', 'v1.0').
threats:
  - id: SEC.SLAM.CM.THR01
    title: Container Image Tampering or Poisoning
    description: |
      Attackers may replace a legitimately published image tag with a malicious image
      by exploiting tag mutability in image registries, especially when the container
      management tool retrieves images by tag name rather than digest. This enables
      unauthorized access, data exfiltration, and system compromise.
    capabilities:
      - reference-id: SEC.SLAM.CM
        entries:
          - reference-id: SEC.SLAM.CM.CAP01
    external-mappings:
      - reference-id: MITRE-ATT&CK
        entries:
          - reference-id: T1195.002
            remarks: Compromise Software Supply Chain
          - reference-id: T1204.003
            remarks: Malicious Image
```

**Validation commands:**

```bash
go install cuelang.org/go/cmd/cue@latest
cue vet -c -d '#ThreatCatalog' github.com/gemaraproj/gemara@latest your-threats.yaml
```

## What's Next

Create a Gemara Control Catalog that maps security controls to the identified threats, providing a structured approach to implementing mitigations.