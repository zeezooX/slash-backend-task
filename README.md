# Slash Backend Intern Task

This project was made as part of the Slash Backend Intern Task. It's an implementation for an Order Management System (OMS) for an e-commerce mobile app, built using Node.js, NestJS, Prisma, and PostgreSQL.

## Requirements

- Node.js
- npm
- PostgreSQL

## Initial Setup

1. **Initialize the npm project:**
    ```bash
    npm init
    ```

2. **Generate the Prisma client:**
    ```bash
    npx prisma generate
    ```

3. **Set up your `.env` file inside the root directory:**
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="This is a very secret secret key"
    ```

4. **Run the migration:**
    ```bash
    npx prisma migrate dev
    ```

5. **Run the seed command:**
    ```bash
    npx prisma db seed
    ```

## Running

To run the server, use the following command:

```bash 
npm run dev
```

To see the API documentation and test the endpoints using Swagger UI, navigate to `http://localhost:3000/api` in your browser.

## Testing

*work in progress*

## Seed Data

### Products

The script seeds the following products:

| Product Name | Description                                      | Price | Stock |
|--------------|--------------------------------------------------|-------|-------|
| Apples       | Apples are a good source of fiber and vitamin C. | 9.99  | 100   |
| Bananas      | Bananas are a good source of potassium.          | 14.99 | 50    |
| Carrots      | Carrots are a good source of beta-carotene.      | 19.99 | 75    |
| Dates        | Dates are a good source of fiber and antioxidants.| 29.99 | 25    |

### Users

The script seeds the following users with their respective carts and orders:

| Name  | Email              | Password      | Address                  | Cart Items                                          | Orders                                            |
|-------|--------------------|---------------|--------------------------|-----------------------------------------------------|--------------------------------------------------|
| Alice | alice@example.com  | password123   | 123 Main St, Anytown     | Apples (2), Bananas (1)                             | Order 1: Apples (2) - Completed, Order 2: Bananas (1) - Shipped |
| Bob   | bob@example.com    | securepassword| 456 Oak Ave, Anycity     | Bananas (1), Dates (2)                              | Order 1: Dates (1) - Pending                      |
| Carol | carol@example.com  | password123   | 789 Pine Blvd, Anothercity| Apples (1), Bananas (2), Carrots (1)                | None                                               |

### Coupons

The script seeds the following coupons:

| Code      | Discount |
|-----------|----------|
| SAVE10    | 10.0     |
| WELCOME20 | 20.0     |
| FREESHIP  | 100.0    |