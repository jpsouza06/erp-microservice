import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ProductModule } from '@/infra/product.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[POST] /products - Create Product', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a product successfully', async () => {
    const productData = {
      ean: '1234567890123',
      name: 'E2E Test Product',
      description: 'E2E Description',
      price: '49.99',
      stock: 100,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData);

    expect(response.status).toBe(201);
    expect(response.body.product).toBeDefined();
  });
});
