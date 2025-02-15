import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaProdutoRepository } from './prisma/repositories/prisma-produto-repository'
import { ProdutoRepository } from '../../application/repositories/produto-repository'

@Module({
	providers: [
		PrismaService,
		{
			provide: ProdutoRepository,
			useClass: PrismaProdutoRepository
		}
	],
	exports: [
		PrismaService,
		ProdutoRepository
	],
})
export class DatabaseModule {}