// Prisma Repository: PrismaProductRepository.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ProductRepository } from '@/application/repositories/product-repository'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'
import { Product } from '@/enterprise/entities/product'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async list(filters?: any, pagination?: any): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: filters,
      skip: pagination?.skip,
      take: pagination?.take,
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async update(product: Product): Promise<void> {
    const { id, ...data } = PrismaProductMapper.toPrisma(product)
    await this.prisma.product.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    })
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)
    await this.prisma.product.create({
      data,
    })
  }
}
