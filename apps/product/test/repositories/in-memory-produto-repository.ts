import { ProductRepository } from "apps/product/src/application/repositories/produto-repository";
import { Product } from "apps/product/src/enterprise/entities/product";


export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id.toString() === product.id.toString());
    if (index >= 0) {
      this.products[index] = product;
    }
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(product => product.id.toString() !== id);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(product => product.id.toString() === id);
    return product || null;
  }

  async list(filters?: any, pagination?: any): Promise<Product[]> {
    let result = [...this.products];
    if (filters) {
      result = result.filter(product => {
        return Object.entries(filters).every(([key, value]) => product[key] === value);
      });
    }
    if (pagination) {
      const { skip = 0, take = result.length } = pagination;
      result = result.slice(skip, skip + take);
    }
    return result;
  }
}
