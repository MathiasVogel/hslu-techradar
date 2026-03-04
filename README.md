# HSLU Tech Radar

Der **HSLU Tech Radar** ist eine Webapplikation, die im Rahmen des Moduls *Web Programming Lab* an der Hochschule Luzern entwickelt wurde. Die Applikation visualisiert Technologien als interaktiven Radar und ermöglicht es Admins, Technologien zu erstellen, zu bearbeiten und zu publizieren. Benutzer können die publizierten Technologien auf dem Radar einsehen.

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