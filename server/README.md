# Server
Dieser Readme enthält alle informationen für die Entwicklung und das Testen des Servers. Er beschreibt die notwendigen Schritte, um die Entwicklungsumgebung einzurichten, die Datenbank zu starten und den Server lokal auszuführen.

## Tech-Stack
- **Express 5** – Web-Framework
- **Prisma 7** – ORM & Datenbank-Migrationen
- **PostgreSQL** – Relationale Datenbank
- **Swagger (swagger-jsdoc + swagger-ui-express)** – API-Dokumentation
- **Vitest** – Unit-Tests
- **Supertest** – HTTP-Integrationstests

## Voraussetzungen

| Software | Version | Prüfen mit |
|---|---|---|
| **Node.js** | ≥ 22 | `node -v` |
| **npm** | ≥ 10 | `npm -v` |

## Einrichten der Entwicklungsumgebung

### 1. PostgreSQL-Datenbank starten

Im **Root-Verzeichnis** des Projekts (`hslu-techradar/`):

```bash
docker compose -f docker-compose.dev.yml up -d
```

Startet einen PostgreSQL-Container auf **Port 5432** mit:
- User: `user`
- Passwort: `password`
- Datenbank: `techradar`

### 2. Abhängigkeiten installieren
In das Root-Verzeichnis des Servers wechseln:

```bash
npm install
```

### 3. `.env`-Datei erstellen

Die mitgelieferte .env Datei für den Server in das Root-Verzeichnis des Servers kopieren.

### 4. Prisma Client generieren

```bash
npm run db:gen
```
Generiert den typisierten Prisma-Client unter `src/generated/client/`.

### 5. Datenbank-Migrationen ausführen

```bash
npm run db:migrate
```
Erstellt die Tabellen in der PostgreSQL-Datenbank anhand des Schemas (`prisma/schema.prisma`).

### 6. Datenbank mit Testdaten befüllen (Seed)

```bash
npm run db:seed
```
Befüllt die Datenbank mit den vordefinierten Technologien aus `prisma/seed.ts`.

### 7. Server starten (Entwicklungsmodus)

```bash
npm run dev
```
Startet den Server mit **tsx** im Watch-Modus auf **http://localhost:3000**.

### 8. API-Dokumentation und Endpunkte

- **Swagger-Dokumentation:** http://localhost:3000/api-docs
- **API-Spec (JSON):** http://localhost:3000/api-spec
- **Technologien abrufen:** http://localhost:3000/api/technologies


## Nützliche Befehle

| Befehl | Beschreibung |
|---|---|
| `npm run dev` | Server im Watch-Modus starten |
| `npm run build` | TypeScript kompilieren (`dist/`) |
| `npm start` | Kompilierten Server starten |
| `npm test` | Unit-Tests ausführen (Vitest) |
| `npm run test:watch` | Tests im Watch-Modus |
| `npm run db:migrate` | Prisma-Migrationen ausführen |
| `npm run db:seed` | Testdaten einfügen |
| `npm run db:reset` | DB zurücksetzen, Migrationen |
| `npm run db:studio` | Prisma Studio öffnen (DB-GUI im Browser) |
| `npm run db:gen` | Prisma Client neu generieren |
| `npm run db:push` | Schema direkt in DB pushen (ohne Migration) |

## Projektstruktur

```
server/
├── prisma/
│   ├── schema.prisma        # Datenbank-Schema
│   ├── seed.ts               # Testdaten
│   └── migrations/           # Migrationshistorie
├── src/
│   ├── server.ts             # Express-App & Swagger-Setup
│   ├── config/
│   │   └── db.ts             # Prisma-Client-Instanz
│   ├── controllers/
│   │   └── tech.controller.ts
│   ├── services/
│   │   └── tech.service.ts
│   ├── routes/
│   │   └── tech.routes.ts
│   └── schemas/
│       └── schemas.ts        # OpenAPI-Schemas
├── test/
│   ├── tech.routes.spec.ts
│   └── tech.service.spec.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── prisma.config.ts
```

