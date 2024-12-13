# bremanger-buldring-app

### Frontnend

### Database migrations

Set environment variables in /db/.env:

```
DB_USER=<db admin user>
DB_PSWD=<db admin password>
DB_HOST=<db hosturl>
DB_PORT=<db port, default is 5432>
DB_NAME=<db name, default is postgres>
```

Navigate to ./db

`cd db`

On initial run, start with baseline:

`dotenv -e .env.local -- flyway baseline`

Run migrations:

`dotenv -e .env.local -- flyway migrate`
