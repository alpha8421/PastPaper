# Topical Cambridge

A Next.js 16 + React 19 + TypeScript app for Cambridge International AS & A Level students to browse past-paper questions by subject, topic, and filterable metadata.

## What is included
- Subject browser with instant search
- Topic explorer and question explorer
- Question viewer with zoom, next/previous navigation, and fullscreen control
- Prisma schema for PostgreSQL-backed catalog storage
- Local ingestion and sync scaffolding for public paper sources
- Admin shell for bulk operations and metadata correction

## Local development

```bash
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

## Production checks

```bash
npm run build
npm run lint
```

## Verified current state
- Static and dynamic routes build successfully
- Browser navigation from home to subject and question routes is stable
- The image runtime issue was eliminated by replacing the remote placeholder source with local assets
- The app is now backed by a real PostgreSQL seed and reads catalog data through Prisma
