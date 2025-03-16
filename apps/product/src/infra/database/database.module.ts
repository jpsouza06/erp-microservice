import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ProductRepository } from '@/application/repositories/product-repository'
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository'

@Module({
	providers: [
		PrismaService,
		{
			provide: ProductRepository,
			useClass: PrismaProductRepository
		}
	],
	exports: [
		PrismaService,
		ProductRepository
	],
})
export class DatabaseModule {}