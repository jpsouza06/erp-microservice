import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import Decimal from 'decimal.js'
import { Product, ProductProps } from '@/enterprise/entities/product'

export function makeProduct(
	override: Partial<ProductProps> = {},
	id?: UniqueEntityId,
) {
	const product = Product.create({
		name: faker.lorem.word(),
		description: faker.lorem.paragraphs(),
		ean: faker.string.numeric(),
		stock: faker.number.int(),
    price: new Decimal(faker.number.float()),
		...override
	},
	id,
	)

	return product
}