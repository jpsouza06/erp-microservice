import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import Decimal from 'decimal.js'
import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface UpdateProductUseCaseRequest {
  id: string
  ean?: string
  name?: string
  description?: string
  price?: string
  stock?: number
}

export type UpdateProductUseCaseResponse = Either<Error, { product: Product }>

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const { id, ean, name, description, price, stock } = request
    const product = await this.productRepository.findById(id)
    if (!product) {
      return left(new Error('Product not found'))
    }

    if (ean !== undefined) {
      product.ean = ean
    }
    if (name !== undefined) {
      product.name = name
    }
    if (description !== undefined) {
      product.description = description
    }
    if (price !== undefined) {
      product.price = new Decimal(price)
    }
    if (stock !== undefined) {
      product.stock = stock
    }

    await this.productRepository.update(product)
    return right({ product })
  }
}
