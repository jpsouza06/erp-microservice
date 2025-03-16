import { InMemoryProductRepository } from "test/repositories/in-memory-product-repository"
import { CreateProductUseCase } from "./create-product"
import { FindProductUseCase } from "./find-products"


describe('FindProductUseCase', () => {
  let inMemoryRepo: InMemoryProductRepository
  let createProductUseCase: CreateProductUseCase
  let findProductUseCase: FindProductUseCase

  beforeEach(() => {
    inMemoryRepo = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryRepo)
    findProductUseCase = new FindProductUseCase(inMemoryRepo)
  })

  it('should find all products', async () => {
    const product1 = {
      ean: '1234567890123',
      name: 'Product 1',
      description: 'Description 1',
      price: '49.99',
      stock: 100,
    }

    const product2 = {
      ean: '9876543210987',
      name: 'Product 2',
      description: 'Description 2',
      price: '29.99',
      stock: 50,
    }

    await createProductUseCase.execute(product1)
    await createProductUseCase.execute(product2)

    const products = await findProductUseCase.execute()
    expect(products.length).toBe(2)
  })
})
