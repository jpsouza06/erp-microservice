import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ProductModule } from '@/infra/product.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[GET] /products - Find Products', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();

    const productData1 = {
      ean: '1111111111111',
      name: 'Product 1 for Find',
      description: 'Description 1 for Find',
      price: '19.99',
      stock: 10,
    };

    const productData2 = {
      ean: '2222222222222',
      name: 'Product 2 for Find',
      description: 'Description 2 for Find',
      price: '39.99',
      stock: 20,
    };

    await request(app.getHttpServer()).post('/products').send(productData1);
    await request(app.getHttpServer()).post('/products').send(productData2);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should find all products', async () => {
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Optionally, verify that at least 2 products exist
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });
});
