// domain/product/application/use-cases/create-product.ts
import { Injectable } from '@nestjs/common';
import { Either, right } from 'apps/core/either';

import Decimal from 'decimal.js';
import { Product } from '../../enterprise/entities/product';
import { ProductRepository } from '../repositories/produto-repository';

interface CreateProductUseCaseRequest {
  ean: string;
  name: string;
  description: string;
  price: string;
  stock: number;
}

export type CreateProductUseCaseResponse = Either<Error, { product: Product }>;

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const { ean, name, description, price, stock } = request;
    const product = Product.create({
      ean,
      name,
      description,
      price: new Decimal(price),
      stock,
    });
    await this.productRepository.create(product);
    return right({ product });
  }
}
