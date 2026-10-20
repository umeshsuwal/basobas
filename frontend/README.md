# Basobas frontend

The Basobas frontend is a Next.js App Router application using TypeScript and
Tailwind CSS v4.

## Structure

```text
app/                  Route entry points and global styles
components/           Shared presentational components
features/             Feature-specific UI and behavior
lib/                  Data access and service helpers
providers/             React context providers
types/                Shared domain types
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
```

Authentication uses the local NestJS API. Set `NEXT_PUBLIC_API_URL` when the
API is not running at `http://localhost:3001`.
