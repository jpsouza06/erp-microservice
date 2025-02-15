import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/produto-repository'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { Product } from '../../enterprise/entities/product'

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
