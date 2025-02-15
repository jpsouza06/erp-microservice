import { InMemoryProductRepository } from "test/repositories/in-memory-produto-repository"
import { CreateProductUseCase } from "./create-product"
import { GetProductUseCase } from "./get-product"
import { ResourceNotFoundError } from "@/core/erros/errors/resource-not-found-error"

describe('GetProductUseCase', () => {
  let inMemoryRepo: InMemoryProductRepository
  let createProductUseCase: CreateProductUseCase
  let getProductUseCase: GetProductUseCase

  beforeEach(() => {
    inMemoryRepo = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryRepo)
    getProductUseCase = new GetProductUseCase(inMemoryRepo)
  })

  it('should retrieve an existing product', async () => {
    const productData = {
      ean: '1234567890123',
      name: 'Test Product',
      description: 'Test Description',
      price: '49.99',
      stock: 100,
    }

    const createResult = await createProductUseCase.execute(productData)
    expect(createResult.isRight()).toBe(true)
    const productId = createResult.value.product.id.toString()

    const getResult = await getProductUseCase.execute({ id: productId })
    expect(getResult.isRight()).toBe(true)
    if (getResult.isRight()) {
      const { product } = getResult.value
      expect(product.name).toEqual('Test Product')
    }
  })

  it('should return error if product not found', async () => {
    const result = await getProductUseCase.execute({ id: 'non-existing-id' })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
