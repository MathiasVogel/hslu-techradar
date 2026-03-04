# Client
Dieses Readme enthält alle Informationen für die Entwicklung und das Testen des Clients. Es beschreibt die notwendigen Schritte, um die Entwicklungsumgebung einzurichten, den Client lokal auszuführen und die Tests durchzuführen.

## Tech-Stack
- **Angular 21** – Frontend-Framework
- **Tailwind CSS 4** + **daisyUI 5** – Styling
- **Auth0** – Authentifizierung
- **openapi-fetch** – Typsicherer API-Client
- **Vitest** – Unit-Tests
- **Cypress 15** – E2E-Tests

## Voraussetzungen

| Software | Version | Prüfen mit |
|---|---|---|
| **Node.js** | ≥ 22 | `node -v` |
| **npm** | ≥ 10 | `npm -v` |
| **Server** | läuft | http://localhost:3000/api-docs |

**Wichtig:** Damit der Client korrekt funktioniert, muss der Server laufen. Bitte zuerst die Schritte im [Server README](../server/README.md) befolgen, um die Entwicklungsumgebung für den Server einzurichten und zu starten.

## Einrichten der Entwicklungsumgebung

### 1. Abhängigkeiten installieren
In das Root-Verzeichnis des Clients wechseln:

```bash
npm install
```

### 2. API-Typen vom Server generieren
Der Server muss dafür laufen (`npm run dev` im `server/`-Ordner).

```bash
npm run generate-types
```
Generiert die TypeScript-Typen aus der OpenAPI-Spezifikation des Servers nach `src/app/core/api/schema.d.ts`.

### 3. Client starten (Entwicklungsmodus)

```bash
npm start
```
Startet den Angular-Dev-Server auf **http://localhost:4200**.

#### Zugangsdaten

| Rolle | E-Mail | Passwort |
|---|---|---|
| **Admin** | `hoyt38@ethereal.email` | `Admin123` |
| **User** | `maia3@ethereal.email` | `User1234` |

Die Authentifizierung läuft über **Auth0** (`mathias-vogel.eu.auth0.com`).

## Unit-Tests ausführen

```bash
npm test
```
Führt die Unit-Tests mit **Vitest** aus.

## E2E-Tests (Cypress)

### Voraussetzungen für E2E-Tests

1. **Datenbank** muss laufen (Docker)
2. **Server** muss laufen (`npm run dev` im `server/`-Ordner)
3. **Client** muss laufen (`npm start` im `client/`-Ordner)
4. **Datenbank** muss frisch geseeded sein (`npm run db:seed` im `server/`-Ordner)

#### Cypress interaktiv öffnen

```bash
npm run cy:open
```
Öffnet die Cypress-Oberfläche in der einzelne Tests ausgewählt und im Browser ausgeführt werden können.

**Wichtig:** Da nicht automatische bei Test der Seed ausgeführt wird, muss nach jedem durchlauf eines Testfiles die Datenbank neu geseeded werden.

#### Cypress headless ausführen

```bash
npm run cy:run
```
Führt alle E2E-Tests im Headless-Modus aus (z. B. für CI/CD).

**Wichtig:** Da nicht automatische bei Test der Seed ausgeführt wird, muss vor jedem Durchlauf aller Tests die Datenbank neu geseeded werden.

## Nützliche Befehle

| Befehl | Beschreibung |
|---|---|
| `npm start` | Dev-Server starten (Port 4200) |
| `npm run build` | Produktions-Build erstellen (`dist/`) |
| `npm test` | Unit-Tests ausführen (Vitest) |
| `npm run cy:open` | Cypress interaktiv öffnen |
| `npm run cy:run` | Cypress headless ausführen |
| `npm run generate-types` | API-Typen vom Server generieren |

## Deployment (Docker-Image erstellen)

Im Verzeichnis `client/`:

```bash
docker build -t client .
```

Erstellt ein Docker-Image mit dem Tag `client`. Das Image baut die Angular-App und stellt sie über **Nginx** auf Port 80 bereit.

## Projektstruktur

```
client/
├── src/
│   ├── main.ts
│   ├── index.html
│   ├── styles.css                  # Globale Styles (Tailwind CSS)
│   ├── environments/
│   │   └── environment.ts          # Auth0-Konfiguration
│   └── app/
│       ├── app.ts                  # Root-Komponente
│       ├── app.routes.ts           # Routing
│       ├── app.config.ts           # App-Konfiguration
│       ├── core/
│       │   ├── api/                # API-Client & generierte Typen
│       │   ├── layout/             # Layout-Komponenten
│       │   ├── logout-button/      # Logout-Komponente
│       │   └── tech-service/       # Zentraler TechService (Signals)
│       ├── features/
│       │   ├── admin/              # Radar-Administration
│       │   ├── home/               # Startseite
│       │   ├── radar/              # Radar-Ansicht
│       │   └── tech-form/          # Technologie-Formular
│       └── shared/
│           ├── navbar/             # Navigation
│           ├── constants/          # Konstanten
│           ├── pipes/              # TechLabel-Pipe
│           └── tech-detail/        # Technologie-Detail
├── cypress/
│   ├── e2e/                        # E2E-Testdateien
│   ├── support/                    # Custom Commands & Typen
│   └── cypress.config.ts
├── package.json
├── angular.json
├── tsconfig.json
└── tsconfig.app.json
```
