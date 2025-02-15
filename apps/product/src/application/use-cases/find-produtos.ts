// domain/product/application/use-cases/list-product.ts
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/produto-repository';
import { Product } from '../../enterprise/entities/product';


@Injectable()
export class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(filters?: any, pagination?: any): Promise<Product[]> {
    const products = await this.productRepository.list(filters, pagination);
    return products;
  }
}
