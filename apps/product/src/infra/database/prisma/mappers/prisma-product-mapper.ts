import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Product } from '@/enterprise/entities/product'
import { Prisma, Product as PrismaProduct} from '@prisma/client'

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        ean: raw.ean,
        price: raw.price,
        stock: raw.stock
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      ean: product.ean,
      price: product.price,
      stock: product.stock
    }
  }
}
