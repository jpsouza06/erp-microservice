import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Produto, ProdutoProps } from '@/domain/produto/enterprise/entities/produto'
import Decimal from 'decimal.js'

export function makeProduto(
	override: Partial<ProdutoProps> = {},
	id?: UniqueEntityId,
) {
	const produto = Produto.create({
    categoria: faker.lorem.word(),
		descricao: faker.lorem.paragraphs(),
    estoque: faker.number.int(),
    nome: faker.lorem.word(),
    preco: new Decimal(faker.number.float()),
		...override
	},
	id,
	)

	return produto
}