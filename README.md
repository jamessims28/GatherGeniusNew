# GatherGenius Acquisition Ready Build

Built the requested acquisition path:

1. Stable Vercel production build
2. OpenAI realtime voice readiness
3. Supabase memory
4. Google Calendar readiness
5. Stripe readiness
6. 100 beta user target tracking
7. Retention measurement
8. Investor demo package
9. Faster runtime response path
10. Living orb motion

## Run locally

```bash
npm install
npm run build
npm run dev
```

## API

- `POST /api/acquisition/run`
- `GET /api/acquisition/run`

## Supabase

Run `docs/database.sql` in Supabase.

## Required environment variables

See `.env.example`.

## Safety

Calendar, Stripe, deployment, and other external actions are prepared for approval. Nothing external is executed automatically.
