# M365 Security Audit Dashboard

> **Enterprise-Grade Security & Compliance Dashboard für Microsoft 365 Tenants**
> Echtzeit-Sicherheitsanalyse mit KI-gestützten Empfehlungen — gebaut mit Next.js, Azure AD (Entra ID) und Microsoft Graph API.

[![Deploy to Azure](https://img.shields.io/badge/Azure-Static%20Web%20Apps-0078D4?logo=microsoft-azure&logoColor=white)](https://kind-ocean-09023de03.4.azurestaticapps.net)
[![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform&logoColor=white)](#infrastruktur-terraform)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)](#cicd-pipeline)

---

## Live Demo

**[https://kind-ocean-09023de03.4.azurestaticapps.net](https://kind-ocean-09023de03.4.azurestaticapps.net)**

Die App läuft im **Demo-Modus** mit simulierten Daten. Sobald sich ein Benutzer mit einem echten Microsoft 365 Tenant anmeldet, werden **ausschließlich echte Daten** aus der Microsoft Graph API geladen — Demo- und Live-Daten werden niemals vermischt.

---

## Projektübersicht

Dieses Dashboard wurde entwickelt, um IT-Administratoren und Security Engineers einen zentralen Überblick über den Sicherheitsstatus ihres Microsoft 365 Tenants zu geben. Es kombiniert **Identity & Access Management**, **Device Compliance**, **Threat Detection** und **KI-gestützte Sicherheitsanalysen** in einer einzigen, modernen Oberfläche.

### Architektur

```
┌─────────────────────────────────────────────────────────┐
│                    Azure Static Web Apps                 │
│                  (Next.js Static Export)                  │
│                                                          │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Fluent  │  │   MSAL.js    │  │  KI-Empfehlungs-  │  │
│  │  UI v9   │  │  (Auth Flow) │  │     Engine         │  │
│  └──────────┘  └──────┬───────┘  └─────────┬─────────┘  │
│                       │                     │            │
└───────────────────────┼─────────────────────┼────────────┘
                        │                     │
                        ▼                     ▼
              ┌──────────────────┐   ┌──────────────────┐
              │   Microsoft      │   │   Tenant-Daten   │
              │   Entra ID       │   │   analysieren &  │
              │   (Azure AD)     │   │   bewerten       │
              └────────┬─────────┘   └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Microsoft Graph │
              │      API         │
              │                  │
              │ • /users         │
              │ • /security      │
              │ • /identityProt  │
              │ • /deviceMgmt   │
              │ • /auditLogs    │
              │ • /authMethods  │
              └──────────────────┘
```

```
┌──────────────────────────────────────────────────────┐
│                Azure Infrastruktur (Terraform)        │
│                                                       │
│  ┌─────────────┐  ┌────────┐  ┌───────────────────┐  │
│  │ Static Web  │  │  VNet  │  │    Key Vault       │  │
│  │    App       │──│ Subnet │──│  (Secrets Mgmt)   │  │
│  │  (Free)     │  │        │  │                    │  │
│  └─────────────┘  └────────┘  └───────────────────┘  │
│                                                       │
│  CI/CD: GitHub Actions → Auto-Deploy bei git push     │
└──────────────────────────────────────────────────────┘
```

---

## Features

### Identity & Access Management (Entra ID / Azure AD)

| Feature | Beschreibung | Graph API Endpoint |
|---|---|---|
| **Benutzer & Rollen** | Alle Tenant-Benutzer mit Rollenzuweisungen (Global Admin, Security Admin, etc.) | `/users`, `/directoryRoles` |
| **MFA-Status** | Echtzeit-MFA-Registrierungsstatus pro Benutzer | `/reports/authenticationMethods/userRegistrationDetails` |
| **Risiko-Benutzer** | Identity Protection — Benutzer mit erkanntem Risiko (Low/Medium/High) | `/identityProtection/riskyUsers` |
| **Conditional Access** | Alle CA-Policies mit Status (Aktiv/Inaktiv/Report-Only) | `/identity/conditionalAccess/policies` |

### Security & Compliance

| Feature | Beschreibung | Graph API Endpoint |
|---|---|---|
| **Secure Score** | Microsoft Secure Score mit Trend-Analyse und Vergleichswerten | `/security/secureScores` |
| **Security Alerts** | Echtzeit-Sicherheitswarnungen (Severity: High/Medium/Low) | `/security/alerts_v2` |
| **Intune Geräte** | Device Compliance Status, OS-Versionen, Verschlüsselungsstatus | `/deviceManagement/managedDevices` |
| **Audit Logs** | Verzeichnis-Audit-Protokolle für Compliance-Nachweise | `/auditLogs/directoryAudits` |

### KI-gestützte Sicherheitsanalyse

Das **AI Security Recommendations Panel** analysiert automatisch alle Tenant-Daten und generiert priorisierte Handlungsempfehlungen:

- **MFA-Abdeckung** — Erkennt Benutzer ohne MFA und priorisiert Admin-Konten
- **Privilegierte Rollen** — Warnt bei zu vielen Global Admins (Least Privilege Prinzip)
- **Conditional Access Lücken** — Identifiziert fehlende oder deaktivierte Policies
- **Risiko-Bewertung** — Korreliert Identity Protection Signale mit Benutzerrollen
- **Device Compliance** — Erkennt nicht-konforme oder nicht-verschlüsselte Geräte
- **Secure Score Optimierung** — Konkrete Schritte zur Verbesserung des Scores

Jede Empfehlung enthält: **Priorität** (High/Medium/Low), **Beschreibung**, **Auswirkung** und **konkrete nächste Schritte**.

### Weitere Features

- **DSGVO-Checkliste** — Compliance-Tracking für DSGVO-Anforderungen
- **App-Berechtigungen** — Übersicht über OAuth App Permissions im Tenant
- **Report Export** — Dashboard-Daten als Report exportieren
- **Demo-Modus** — Vollständiger Demo-Modus mit realistischen Beispieldaten (automatisch aktiv ohne Login)
- **Daten-Trennung** — Strikte Trennung: Demo-Daten nur ohne Login, echte Graph-Daten nur mit Login — niemals gemischt

---

## Technologie-Stack

### Frontend
| Technologie | Verwendung |
|---|---|
| **Next.js 16** (App Router) | React-Framework mit Static Export für Azure SWA |
| **TypeScript** | Type-Safety über die gesamte Codebase |
| **Fluent UI v9** | Microsoft Design System für konsistente Enterprise-UX |
| **Recharts** | Datenvisualisierung (Secure Score Trends, MFA-Charts) |

### Authentifizierung & API
| Technologie | Verwendung |
|---|---|
| **MSAL.js v5** | OAuth 2.0 / OpenID Connect mit Azure AD (Entra ID) |
| **Microsoft Graph API** | Zugriff auf alle M365 Security- & Identity-Daten |
| **Delegated Permissions** | Scoped Access: SecurityEvents, User, Policy, AuditLog, etc. |

### Infrastruktur & DevOps
| Technologie | Verwendung |
|---|---|
| **Azure Static Web Apps** (Free Tier) | Hosting — $0/Monat, global verteilt |
| **Azure Virtual Network + Subnet** | Netzwerkisolierung für Enterprise-Sicherheit |
| **Azure Key Vault** | Sichere Verwaltung von Secrets (Deployment Token, API Keys) |
| **Terraform** | Infrastructure as Code — reproduzierbare Azure-Umgebung |
| **GitHub Actions** | CI/CD Pipeline — automatisches Build & Deploy bei `git push` |

---

## Eingesetzte Microsoft Graph API Scopes

```
SecurityEvents.Read.All          — Security Alerts & Secure Score
User.Read.All                    — Benutzer & Profile
Policy.Read.All                  — Conditional Access Policies
IdentityRiskyUser.Read.All       — Identity Protection / Risiko-Benutzer
DeviceManagementManagedDevices.Read.All — Intune Geräteverwaltung
AuditLog.Read.All                — Verzeichnis-Audit-Logs
Directory.Read.All               — Verzeichnisrollen & -objekte
UserAuthenticationMethod.Read.All — MFA-Registrierungsstatus
```

---

## Infrastruktur (Terraform)

Die gesamte Azure-Infrastruktur ist als **Infrastructure as Code** mit Terraform definiert:

```
infra-sec-app/
├── main.tf          # Azure Resources (SWA, VNet, Subnet, Key Vault)
├── variables.tf     # Konfigurierbare Parameter
└── outputs.tf       # Outputs (SWA URL, Key Vault URI, etc.)
```

### Ressourcen

| Azure Resource | Zweck | Kosten |
|---|---|---|
| `azurerm_static_web_app` | Next.js Hosting (Free Tier) | **$0/Monat** |
| `azurerm_virtual_network` | Netzwerkisolierung | **$0/Monat** |
| `azurerm_subnet` | Subnetz für App-Integration | **$0/Monat** |
| `azurerm_key_vault` | Secrets Management | **$0/Monat** (Free Tier) |

### Deployment

```bash
cd infra-sec-app
terraform init
terraform plan
terraform apply
```

---

## CI/CD Pipeline

Die GitHub Actions Pipeline automatisiert den gesamten Build- und Deployment-Prozess:

```
git push → GitHub Actions → npm ci → npm run build → Deploy to Azure SWA
```

**Features:**
- Automatisches Build & Deploy bei Push auf `master`
- Node.js 20 mit npm-Caching für schnelle Builds
- Environment Variables über GitHub Repository Settings
- Staging-Environments für Pull Requests (automatisch erstellt & bereinigt)

---

## Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/<username>/m365-security-app.git
cd m365-security-app

# Dependencies installieren
npm install

# Environment-Variablen setzen (.env.local erstellen)
NEXT_PUBLIC_AZURE_CLIENT_ID=<deine-app-client-id>
NEXT_PUBLIC_AZURE_TENANT_ID=<deine-tenant-id>

# Entwicklungsserver starten
npm run dev          # → http://localhost:3000

# Production Build (Static Export)
npm run build        # → Ausgabe in /out
```

### Azure App Registration einrichten

Für die Verbindung zu einem echten M365 Tenant wird eine App Registration in Azure AD benötigt:

1. **Azure Portal** → App Registrations → New Registration
2. **Redirect URIs**: `http://localhost:3000` (SPA) + `https://<swa-url>` (Web)
3. **API Permissions** (Delegated): Alle oben genannten Scopes hinzufügen
4. **Admin Consent** erteilen

---

## Projektstruktur

```
m365-security-app/
├── .github/workflows/
│   └── deploy.yml              # CI/CD: GitHub Actions → Azure SWA
├── infra-sec-app/
│   ├── main.tf                 # Terraform: Azure Infrastruktur
│   ├── variables.tf            # Terraform: Variablen
│   └── outputs.tf              # Terraform: Outputs
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── alerts/         # Security Alerts
│   │   │   ├── audit-logs/     # Verzeichnis-Audit-Logs
│   │   │   ├── conditional-access/  # CA Policies
│   │   │   ├── devices/        # Intune Geräte
│   │   │   ├── gdpr-checklist/ # DSGVO Compliance
│   │   │   ├── mfa-status/     # MFA-Registrierungsstatus
│   │   │   ├── risky-users/    # Identity Protection
│   │   │   ├── users/          # Benutzer & Rollen
│   │   │   └── page.tsx        # Dashboard Overview
│   │   ├── layout.tsx          # Root Layout (MSAL Provider)
│   │   └── page.tsx            # Landing Page
│   ├── components/
│   │   ├── dashboard/          # Dashboard-spezifische Komponenten
│   │   └── shared/             # Wiederverwendbare UI-Komponenten
│   ├── hooks/
│   │   └── useGraphData.ts     # Generic Graph API Data Hook
│   ├── lib/
│   │   ├── graph/              # Microsoft Graph API Fetcher
│   │   ├── msal/               # MSAL Konfiguration & Scopes
│   │   ├── mock/               # Demo-Daten (nur ohne Login)
│   │   └── recommendations.ts  # KI-Empfehlungs-Engine
│   └── types/                  # TypeScript Interfaces
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Skills & Technologien

| Bereich | Technologien |
|---|---|
| **Cloud & Azure** | Microsoft 365, Azure AD (Entra ID), Azure Static Web Apps, Azure Key Vault, Virtual Networks, RBAC |
| **Identity & Security** | Entra ID, Conditional Access, MFA, Identity Protection, Privileged Identity Management, Secure Score, DSGVO |
| **KI-Integration** | AI-basierte Security-Analyse, Automatisierte Risikobewertung, Priorisierte Handlungsempfehlungen |
| **Infrastructure as Code** | Terraform (Azure Provider), Reproduzierbare Environments, State Management |
| **DevOps & CI/CD** | GitHub Actions, Automatisiertes Build & Deploy, Staging Environments |
| **Fullstack Development** | Next.js 16, TypeScript, React 19, Fluent UI v9, Microsoft Graph API, MSAL.js, OAuth 2.0 / OIDC |
| **API-Integration** | Microsoft Graph API (15+ Endpoints), REST APIs, Delegated Permissions, Token Management |

---

## Lizenz

Dieses Projekt wurde als Portfolio-Projekt entwickelt und dient der Demonstration von Microsoft 365 Security, Cloud-Infrastruktur und KI-Integration Fähigkeiten.

---

*Entwickelt von Youssef Tayachi — Microsoft 365 Security & Cloud Engineer*
