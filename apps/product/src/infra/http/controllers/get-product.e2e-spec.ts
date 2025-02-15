import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ProductModule } from '@/infra/product.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[GET] /products/:id - Get Product by ID', () => {
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

    // Create a product to retrieve later
    const productData = {
      ean: '9876543210987',
      name: 'Product for GET',
      description: 'Description for GET',
      price: '29.99',
      stock: 50,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData);

    productId = response.body.product.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get the product by id', async () => {
    const response = await request(app.getHttpServer()).get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.product).toBeDefined();
    expect(response.body.product.id).toEqual(productId);
  });
});
