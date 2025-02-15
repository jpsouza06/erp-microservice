import { Prisma, Produto as PrismaProduto } from '@prisma/client'
import { UniqueEntityId } from 'apps/core/entities/unique-entity-id'

export class PrismaProdutoMapper {
  static toDomain(raw: PrismaProduto): Produto {
    return Produto.create(
      {
        nome: raw.nome,
        descricao: raw.descricao,
        preco: raw.preco,
        estoque: raw.estoque,
        categoria: raw.categoria,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(produto: Produto): Prisma.ProdutoUncheckedCreateInput {
    return {
      id: produto.id.toString(),
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria,
    }
  }
}
