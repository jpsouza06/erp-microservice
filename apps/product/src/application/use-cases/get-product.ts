import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'

import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface GetProductUseCaseRequest {
  id: string
}

export type GetProductUseCaseResponse = Either<ResourceNotFoundError, { product: Product }>

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const { id } = request
    const product = await this.productRepository.findById(id)

    if (!product) {
      return left(new ResourceNotFoundError('Product'))
    }

    return right({ product })
  }
}
