import { Injectable } from '@nestjs/common'

import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product-repository'

@Injectable()
export class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(filters?: any, pagination?: any): Promise<Product[]> {
    const products = await this.productRepository.list(filters, pagination)
    return products
  }
}
