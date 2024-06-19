# Slash Backend Intern Task

This project was made as part of the Slash Backend Intern Task. It's an implementation for an Order Management System (OMS) for an e-commerce mobile app, built using Node.js, NestJS, Prisma, and PostgreSQL.

## Initial Setup

1. **Initialize the npm project:**
    ```bash
    npm init
    ```

2. **Set up your database connection in an `.env` file inside the root directory:**
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

3. **Run the migration:**
    ```bash
    npx prisma migrate dev
    ```

4. **Run the seed command:**
    ```bash
    npx prisma db seed
    ```
    
5. **Generate the Prisma client:**
    ```bash
    npx prisma generate
    ```

6. **Start the server:**
    ```bash
    npm run dev
    ```
