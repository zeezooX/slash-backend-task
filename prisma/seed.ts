import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  console.log('Start seeding ...');

  // Seed products
  const productA = await prisma.product.create({
    data: {
      name: 'Apples',
      description: 'Apples are a good source of fiber and vitamin C.',
      price: 9.99,
      stock: 100,
    },
  });

  const productB = await prisma.product.create({
    data: {
      name: 'Bananas',
      description: 'Bananas are a good source of potassium.',
      price: 14.99,
      stock: 50,
    },
  });

  const productC = await prisma.product.create({
    data: {
      name: 'Carrots',
      description: 'Carrots are a good source of beta-carotene.',
      price: 19.99,
      stock: 75,
    },
  });

  const productD = await prisma.product.create({
    data: {
      name: 'Dates',
      description: 'Dates are a good source of fiber and antioxidants.',
      price: 29.99,
      stock: 25,
    },
  });

  // Define seed data
  const userData: Prisma.UserCreateInput[] = [
    {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      address: '123 Main St, Anytown',
      cart: {
        create: {
          items: {
            create: [
              {
                productId: productA.productId,
                quantity: 2,
              },
              {
                productId: productB.productId,
                quantity: 1,
              },
            ],
          },
        },
      },
      orders: {
        create: [
          {
            orderDate: new Date('2023-01-01'),
            status: 'Completed',
            orderItems: {
              create: [
                {
                  productId: productA.productId,
                  quantity: 2,
                },
              ],
            },
          },
          {
            orderDate: new Date('2023-02-15'),
            status: 'Shipped',
            orderItems: {
              create: [
                {
                  productId: productB.productId,
                  quantity: 1,
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'securepassword',
      address: '456 Oak Ave, Anycity',
      cart: {
        create: {
          items: {
            create: [
              {
                productId: productB.productId,
                quantity: 1,
              },
              {
                productId: productD.productId,
                quantity: 2,
              },
            ],
          },
        },
      },
      orders: {
        create: [
          {
            orderDate: new Date('2023-03-20'),
            status: 'Pending',
            orderItems: {
              create: [
                {
                  productId: productD.productId,
                  quantity: 1,
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'Carol',
      email: 'carol@example.com',
      password: 'password123',
      address: '789 Pine Blvd, Anothercity',
      cart: {
        create: {
          items: {
            create: [
              {
                productId: productA.productId,
                quantity: 1,
              },
              {
                productId: productB.productId,
                quantity: 2,
              },
              {
                productId: productC.productId,
                quantity: 1,
              },
            ],
          },
        },
      },
      orders: {
        create: [],
      },
    },
  ];

  // Seed users
  for (const user of userData) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create the user with the hashed password
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
        orders: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    console.log(`Created user with id: ${createdUser.userId}`);
  }

  console.log('Seeding finished.');
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
