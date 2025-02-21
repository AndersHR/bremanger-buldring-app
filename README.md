# bremanger-buldring-app

# Environment variables

In webapp/ create the following .env-file:

```
NEXT_PUBLIC_SUPABASE_URL=<supabase project url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase api key>
```

## Getting Started

Navigate to the webapp:

`cd webapp`

Run the development server:

```bash
pnpm i

pnpm run dev
```

# Flyway

Install flyway:

`brew install flyway`

Create the following .env file in db/

```
DB_USER=<brukernavn for databasen>
DB_PSWD=<passord for databasen>
DB_HOST=<hostnavn>
DB_PORT=<port>
DB_NAME=<databasenavn>
```

Install the dotenv cli globally:

`npm install -g dotenv`

Navigate to db/:

`cd db`

Run migrations:

`dotenv -e .env -- flyway migrate`

The very first time you will ned to run baseline before migrate:

`dotenv -e .env -- flyway baseline`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
