import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateProductUseCase } from '../../application/use-cases/create-product'
import { CreateProductController } from './controllers/create-product.controller'

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [
		CreateProductController, 
	],
	providers: [
		CreateProductUseCase, 
	]
})

export class HttpModule{}