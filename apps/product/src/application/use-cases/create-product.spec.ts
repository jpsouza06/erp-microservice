import { InMemoryProductRepository } from "test/repositories/in-memory-produto-repository"
import { CreateProductUseCase } from "./create-product"

describe('CreateProductUseCase', () => {
  let inMemoryRepo: InMemoryProductRepository
  let createProductUseCase: CreateProductUseCase

  beforeEach(() => {
    inMemoryRepo = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryRepo)
  })

  it('should create a product successfully', async () => {
    const request = {
      ean: '1234567890123',
      name: 'Test Product',
      description: 'Test Description',
      price: '49.99',
      stock: 100,
    }

    const result = await createProductUseCase.execute(request)
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { product } = result.value
      expect(product).toBeDefined()
      expect(product.name).toEqual('Test Product')
    }
  })
})
