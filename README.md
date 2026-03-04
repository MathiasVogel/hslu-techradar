# HSLU Tech Radar

Der **HSLU Tech Radar** ist eine Webapplikation, die im Rahmen des Moduls *Web Programming Lab* an der Hochschule Luzern entwickelt wurde. Die Applikation visualisiert Technologien als interaktiven Radar und ermöglicht es Admins, Technologien zu erstellen, zu bearbeiten und zu publizieren. Benutzer können die publizierten Technologien auf dem Radar einsehen.

## ⚠️ Hinweis zu Passwörtern

Die Passwörter und Zugangsdaten in den `.env`-Dateien sind **ausschliesslich für die lokale Entwicklung** gedacht und dürfen **nicht im Produktivbetrieb** verwendet werden. Vor einem Deployment müssen alle Passwörter und Secrets durch sichere, individuelle Werte ersetzt werden.

## Projektaufbau

Das Projekt besteht aus zwei Teilen:

| Komponente | Beschreibung | README |
|---|---|---|
| **Client** | Angular-Frontend mit Radar-Visualisierung & Admin-Bereich | [Client README](./client/README.md) |
| **Server** | Express-REST-API mit PostgreSQL-Datenbank | [Server README](./server/README.md) |

> **Entwicklungsumgebung einrichten:** Die Schritt-für-Schritt-Anleitungen zum Aufsetzen und Starten befinden sich in den jeweiligen READMEs. Zuerst den [Server](./server/README.md) einrichten, dann den [Client](./client/README.md).

## Zugangsdaten

Die Authentifizierung läuft über **Auth0**. Die folgenden Testaccounts verwenden Fake-E-Mail-Adressen von [Ethereal](https://ethereal.email/).

**Admin User**
- email: hoyt38@ethereal.email
- Password: Admin123
- role: admin
- email password: zccknabVz6Y8c8TCd7

**Normal User**
- email: maia3@ethereal.email
- Password: User1234
- role: user
- email password: Ta3C7n97GW1cCU3TXj

## Deployment (Docker Compose)

### 1. Docker-Images erstellen

Zuerst müssen die Images für Client und Server gebaut werden:

### 2. `.env`-Datei konfigurieren

Die `.env`-Datei im Root-Verzeichnis enthält alle konfigurierbaren Werte für Docker Compose:

```dotenv
# Datenbank
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=techradar

# Server
SERVER_PORT=3000
CORS_ORIGIN=http://localhost:4200
SWAGGER_SERVER_URL=http://localhost:3000

# Client
CLIENT_PORT=4200
```

Für den Livebetrieb die Werte entsprechend anpassen.

### 3. Alle Services starten

```bash
docker compose up -d
```

Startet die Datenbank, den Server und den Client. Anschliessend ist die Applikation erreichbar:

### 4. Datenbank migrieren und seeden

Beim ersten Start muss die Datenbank initialisiert werden:

```bash
docker compose exec server npx prisma migrate deploy
docker compose exec server npx prisma db seed
```
