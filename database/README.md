# Basobas MongoDB database

This folder contains the Prisma schema and tooling for the MongoDB database
used by the NestJS backend.

## Setup

```powershell
Copy-Item .env.example .env
npm install
npm run db:sync
npm run db:generate
```

Set `MONGODB_URI` in `.env` to your MongoDB Atlas connection string before
running the sync command. Prisma MongoDB does not use SQL migration files;
`db:sync` applies the schema and indexes with `prisma db push`.

## Useful commands

```powershell
npm run db:studio
npm run db:validate
npm run db:format
```

The schema covers users, persistent auth sessions, role-specific landlord and
tenant profiles, landlords' listings, listing features, listing image metadata,
and tenants' rental applications. Image files are stored in Cloudinary;
MongoDB stores their URLs and Cloudinary public IDs. Listing features and
images remain separate bounded collections because they are independently
managed and indexed.
