// Prisma Repository: PrismaProdutoRepository.ts
import { Injectable } from '@nestjs/common'
import { PrismaProdutoMapper } from '../mappers/prisma-produto-mapper'
import { PrismaService } from '../prisma.service'
import { Produto } from 'apps/product/src/enterprise/entities/product'
import { ProdutoRepository } from 'apps/product/src/application/repositories/produto-repository'

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepository {
  constructor(private prisma: PrismaService) {}

  async list(filters?: any, pagination?: any): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany({
      where: filters,
      skip: pagination?.skip,
      take: pagination?.take,
    })

    return produtos.map(PrismaProdutoMapper.toDomain)
  }

  async update(produto: Produto): Promise<void> {
    const { id, ...data } = PrismaProdutoMapper.toPrisma(produto)
    await this.prisma.produto.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.produto.delete({
      where: { id },
    })
  }

  async findById(id: string): Promise<Produto | null> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    })

    if (!produto) {
      return null
    }

    return PrismaProdutoMapper.toDomain(produto)
  }

  async create(produto: Produto): Promise<void> {
    const data = PrismaProdutoMapper.toPrisma(produto)
    await this.prisma.produto.create({
      data,
    })
  }
}
