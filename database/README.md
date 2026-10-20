# Basobas local database

This folder contains the Prisma + SQLite database used by the local NestJS
backend during development.

## Setup

```powershell
Copy-Item .env.example .env
npm install
npm run db:migrate -- --name init
npm run db:generate
```

The SQLite database is created at `database/prisma/dev.db`.

## Useful commands

```powershell
npm run db:studio
npm run db:validate
npm run db:format
```

The schema covers users, persistent auth sessions, landlords' listings, listing
features, and tenants' rental applications. Status and role values are strings
for SQLite portability.
