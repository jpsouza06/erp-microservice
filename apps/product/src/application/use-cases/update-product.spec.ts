import { InMemoryProductRepository } from "test/repositories/in-memory-product-repository"
import { CreateProductUseCase } from "./create-product"
import { GetProductUseCase } from "./get-product"
import { UpdateProductUseCase } from "./update-product"


describe('UpdateProductUseCase', () => {
  let inMemoryRepo: InMemoryProductRepository
  let createProductUseCase: CreateProductUseCase
  let updateProductUseCase: UpdateProductUseCase
  let getProductUseCase: GetProductUseCase

  beforeEach(() => {
    inMemoryRepo = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryRepo)
    updateProductUseCase = new UpdateProductUseCase(inMemoryRepo)
    getProductUseCase = new GetProductUseCase(inMemoryRepo)
  })

  it('should update an existing product', async () => {
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

    const updateData = {
      id: productId,
      name: 'Updated Product',
      price: '59.99',
    }

    const updateResult = await updateProductUseCase.execute(updateData)
    expect(updateResult.isRight()).toBe(true)

    const getResult = await getProductUseCase.execute({ id: productId })
    if (getResult.isRight()) {
      const { product } = getResult.value
      expect(product.name).toEqual('Updated Product')
      expect(product.price.toString()).toEqual('59.99')
    }
  })
})
