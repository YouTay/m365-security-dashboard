# Azure App Registration - Setup Anleitung

## Voraussetzungen
- Zugang zum Azure Portal (https://portal.azure.com)
- Global Administrator oder Application Administrator Rolle

## Schritt 1: App Registration erstellen

1. Navigiere zu **Microsoft Entra ID** > **App-Registrierungen** > **Neue Registrierung**
2. Name: `M365 Security Audit Dashboard`
3. Unterstuetzte Kontotypen: **Nur Konten in diesem Organisationsverzeichnis** (Einzelner Mandant)
4. Umleitungs-URI:
   - Typ: **Single-Page-Anwendung (SPA)**
   - URI: `http://localhost:3000`
5. Klicke **Registrieren**

## Schritt 2: IDs notieren

Nach der Erstellung:
- **Anwendungs-ID (Client-ID)**: Auf der Uebersichtsseite
- **Verzeichnis-ID (Mandanten-ID)**: Auf der Uebersichtsseite

## Schritt 3: API-Berechtigungen hinzufuegen

1. Gehe zu **API-Berechtigungen** > **Berechtigung hinzufuegen** > **Microsoft Graph**
2. Waehle **Delegierte Berechtigungen** und fuege folgende hinzu:

| Berechtigung | Beschreibung |
|---|---|
| `SecurityEvents.Read.All` | Sicherheitsereignisse lesen |
| `User.Read.All` | Alle Benutzerprofile lesen |
| `Policy.Read.All` | Richtlinien lesen |
| `IdentityRiskyUser.Read.All` | Risiko-Benutzer lesen |
| `DeviceManagementManagedDevices.Read.All` | Verwaltete Geraete lesen |
| `AuditLog.Read.All` | Audit-Protokolle lesen |
| `Directory.Read.All` | Verzeichnisdaten lesen |

3. Klicke **Administratorzustimmung fuer [Tenant] erteilen**
   - Erfordert Global Administrator Rolle

## Schritt 4: Umgebungsvariablen konfigurieren

Kopiere `.env.example` nach `.env.local` und fulle die Werte aus:

```env
NEXT_PUBLIC_AZURE_CLIENT_ID=deine-client-id-hier
NEXT_PUBLIC_AZURE_TENANT_ID=deine-tenant-id-hier
NEXT_PUBLIC_AZURE_REDIRECT_URI=http://localhost:3000
```

## Schritt 5: App starten

```bash
npm run dev
```

Oeffne http://localhost:3000 und klicke auf **Anmelden**.

## Hinweise

- Ohne konfigurierte Azure-Credentials zeigt die App automatisch **Demo-Daten**
- Der DEMO/LIVE Badge im Header zeigt den aktuellen Modus an
- Fuer Produktion: Umleitungs-URI auf die Produktions-URL aendern
