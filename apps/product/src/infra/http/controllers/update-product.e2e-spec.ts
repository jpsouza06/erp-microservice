import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ProductModule } from '@/infra/product.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[PUT] /products/:id - Update Product', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let productId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();

    // Create a product to update later
    const productData = {
      ean: '3333333333333',
      name: 'Product for Update',
      description: 'Description for Update',
      price: '59.99',
      stock: 30,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData);

    productId = response.body.product.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update the product successfully', async () => {
    const updateData = {
      name: 'Updated Product Name',
      price: '69.99',
    };

    const response = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.product).toBeDefined();
    expect(response.body.product.name).toEqual('Updated Product Name');
  });
});
