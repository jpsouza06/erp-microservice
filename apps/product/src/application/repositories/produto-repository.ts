import { Product } from "../../enterprise/entities/product";

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>
  abstract list(filters?: any, pagination?: any): Promise<Product[]>
  abstract findById(id: string): Promise<Product | null>
  abstract update(product: Product): Promise<void>
  abstract delete(id: string): Promise<void>
}
